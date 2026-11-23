const http = require('http');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('./app');

function makeRequest(port, options, data = null) {
  return new Promise((resolve, reject) => {
    const reqOptions = {
      hostname: '127.0.0.1',
      port,
      path: options.path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runSecurityTests() {
  console.log('======================================================================');
  console.log('      RASAVANTA AI — AUTOMATED SECURITY & DATA ISOLATION TEST SUITE   ');
  console.log('======================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(title, condition, extra = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`  [PASS] ${title} ${extra ? '(' + extra + ')' : ''}`);
    } else {
      console.error(`  [FAIL] ${title} ${extra ? '(' + extra + ')' : ''}`);
      throw new Error(`Test assertion failed: ${title}`);
    }
  }

  // Start server on an ephemeral port
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Ephemeral test server running on port: ${port}\n`);

  try {
    // -------------------------------------------------------------
    // Test 1: Public Route Access (Recipes)
    // -------------------------------------------------------------
    console.log('--- TEST 1: Public Catalog Access ---');
    const pubRes = await makeRequest(port, { path: '/api/v1/recipes', method: 'GET' });
    assert('Public recipe route is accessible without token', pubRes.status === 200, `status: ${pubRes.status}`);

    // -------------------------------------------------------------
    // Test 2: Input Validation on Registration
    // -------------------------------------------------------------
    console.log('\n--- TEST 2: Input Validation on Registration ---');
    const badEmailRes = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Test Chef',
      email: 'not-an-email',
      password: 'password123'
    });
    assert('Rejects invalid email format with 400', badEmailRes.status === 400 && badEmailRes.data.code === 'INVALID_EMAIL');

    const shortPassRes = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Test Chef',
      email: 'valid@example.com',
      password: '123'
    });
    assert('Rejects short password (< 6 chars) with 400', shortPassRes.status === 400 && shortPassRes.data.code === 'INVALID_PASSWORD');

    // -------------------------------------------------------------
    // Test 3: Successful Registration with Bcrypt & JWT
    // -------------------------------------------------------------
    console.log('\n--- TEST 3: User Registration with Bcrypt & JWT Signing ---');
    const timestamp = Date.now();
    const user1Email = `chef.test.${timestamp}@rasavanta.ai`;
    const user1Password = 'SecureTaste2026!';

    const regRes = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Chef One',
      email: user1Email,
      password: user1Password
    });

    assert('Registration returns HTTP 201 Created', regRes.status === 201);
    assert('Registration response includes signed JWT token', typeof regRes.data.token === 'string' && regRes.data.token.split('.').length === 3);
    assert('Registration response omits password/hash', regRes.data.user && !regRes.data.user.password);
    const user1Token = regRes.data.token;
    const user1Id = regRes.data.user.id;

    // -------------------------------------------------------------
    // Test 4: Duplicate Registration Prevention
    // -------------------------------------------------------------
    console.log('\n--- TEST 4: Duplicate Account Prevention ---');
    const dupRes = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Chef One Imposter',
      email: user1Email,
      password: 'DifferentPassword123'
    });
    assert('Duplicate email registration returns 409 Conflict', dupRes.status === 409 && dupRes.data.code === 'DUPLICATE_EMAIL');

    // -------------------------------------------------------------
    // Test 5: Login with Bcrypt Verification
    // -------------------------------------------------------------
    console.log('\n--- TEST 5: Login & Password Verification ---');
    const wrongPassRes = await makeRequest(port, { path: '/api/v1/auth/login', method: 'POST' }, {
      email: user1Email,
      password: 'WrongPassword'
    });
    assert('Login with incorrect password returns 401 Unauthorized', wrongPassRes.status === 401);

    const validLoginRes = await makeRequest(port, { path: '/api/v1/auth/login', method: 'POST' }, {
      email: user1Email,
      password: user1Password
    });
    assert('Login with correct password returns 200 OK', validLoginRes.status === 200);
    assert('Login returns signed JWT with 3 segments', validLoginRes.data.token && validLoginRes.data.token.split('.').length === 3);
    assert('Login response omits password hash', !validLoginRes.data.user.password);

    // -------------------------------------------------------------
    // Test 6: Legacy / Plaintext Just-In-Time Migration
    // -------------------------------------------------------------
    console.log('\n--- TEST 6: Legacy Plaintext JIT Migration ---');
    // Login with demo chef (seed uses TasteIntelligence2026)
    const demoLoginRes = await makeRequest(port, { path: '/api/v1/auth/login', method: 'POST' }, {
      email: 'chef.rasavanta@example.com',
      password: 'TasteIntelligence2026'
    });
    assert('Legacy demo chef login succeeds with 200 OK', demoLoginRes.status === 200);
    assert('Legacy demo chef is issued a true signed JWT', demoLoginRes.data.token && demoLoginRes.data.token.split('.').length === 3);

    // -------------------------------------------------------------
    // Test 7: Protected Route /auth/me
    // -------------------------------------------------------------
    console.log('\n--- TEST 7: Protected /auth/me Route ---');
    const meAnonRes = await makeRequest(port, { path: '/api/v1/auth/me', method: 'GET' });
    assert('/auth/me without token returns 401 Unauthorized', meAnonRes.status === 401 && meAnonRes.data.code === 'NO_TOKEN');

    const meAuthRes = await makeRequest(port, {
      path: '/api/v1/auth/me',
      method: 'GET',
      headers: { Authorization: `Bearer ${user1Token}` }
    });
    assert('/auth/me with valid JWT returns 200 OK', meAuthRes.status === 200);
    assert('/auth/me returns authenticated user identity', meAuthRes.data.user.id === user1Id);

    // -------------------------------------------------------------
    // Test 8: Rejection of Legacy Mock Tokens and Forged Tokens
    // -------------------------------------------------------------
    console.log('\n--- TEST 8: Rejection of Legacy Mock & Tampered Tokens ---');
    const legacyTokenRes = await makeRequest(port, {
      path: '/api/v1/pantry',
      method: 'GET',
      headers: { Authorization: 'Bearer jwt_token_usr-fake_1731940000000' }
    });
    assert('Legacy mock token jwt_token_... is rejected with 401 INVALID_TOKEN', legacyTokenRes.status === 401 && legacyTokenRes.data.code === 'INVALID_TOKEN');

    const forgedToken = user1Token.slice(0, -6) + 'abcdef';
    const forgedTokenRes = await makeRequest(port, {
      path: '/api/v1/pantry',
      method: 'GET',
      headers: { Authorization: `Bearer ${forgedToken}` }
    });
    assert('Tampered/Forged JWT signature is rejected with 401 INVALID_TOKEN', forgedTokenRes.status === 401 && forgedTokenRes.data.code === 'INVALID_TOKEN');

    // -------------------------------------------------------------
    // Test 9: Protected Pantry CRUD & Data Isolation
    // -------------------------------------------------------------
    console.log('\n--- TEST 9: Protected Pantry CRUD & Data Isolation ---');
    const pantryAnonRes = await makeRequest(port, { path: '/api/v1/pantry', method: 'GET' });
    assert('Unauthenticated GET /pantry returns 401', pantryAnonRes.status === 401);

    // Register User 2 for cross-user tests
    const user2Email = `chef.two.${timestamp}@rasavanta.ai`;
    const regUser2 = await makeRequest(port, { path: '/api/v1/auth/register', method: 'POST' }, {
      name: 'Chef Two',
      email: user2Email,
      password: 'SecureTaste2026!'
    });
    const user2Token = regUser2.data.token;
    const user2Id = regUser2.data.user.id;

    // User 1 adds a pantry item
    const addRes1 = await makeRequest(port, {
      path: '/api/v1/pantry',
      method: 'POST',
      headers: { Authorization: `Bearer ${user1Token}` }
    }, {
      name: 'Kashmiri Saffron (User 1 Private)',
      category: 'Spices',
      quantity: 5,
      unit: 'g'
    });
    assert('User 1 can add pantry item (HTTP 201)', addRes1.status === 201);
    const item1Id = addRes1.data.id;
    assert('Pantry item is strictly stamped with User 1 ID', addRes1.data.userId === user1Id);

    // User 1 gets pantry items
    const getRes1 = await makeRequest(port, {
      path: '/api/v1/pantry',
      method: 'GET',
      headers: { Authorization: `Bearer ${user1Token}` }
    });
    assert('User 1 retrieves pantry containing created item', getRes1.data.some(i => i.id === item1Id));

    // -------------------------------------------------------------
    // Test 10: Cross-User Access Prevention (BOLA/IDOR Check)
    // -------------------------------------------------------------
    console.log('\n--- TEST 10: Cross-User Access Prevention (BOLA/IDOR) ---');
    // User 2 lists pantry -> should NOT see User 1's private saffron
    const getRes2 = await makeRequest(port, {
      path: '/api/v1/pantry',
      method: 'GET',
      headers: { Authorization: `Bearer ${user2Token}` }
    });
    assert('User 2 cannot see User 1 private item', !getRes2.data.some(i => i.id === item1Id));

    // User 2 tries to update User 1's item
    const updateRes2 = await makeRequest(port, {
      path: `/api/v1/pantry/${item1Id}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${user2Token}` }
    }, {
      name: 'Hacked Saffron by User 2'
    });
    assert('User 2 cannot update User 1 item (HTTP 404 / access denied)', updateRes2.status === 404);

    // User 2 tries to delete User 1's item
    const deleteRes2 = await makeRequest(port, {
      path: `/api/v1/pantry/${item1Id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user2Token}` }
    });
    assert('User 2 cannot delete User 1 item (HTTP 404 / access denied)', deleteRes2.status === 404);

    // User 1 successfully updates their own item
    const updateRes1 = await makeRequest(port, {
      path: `/api/v1/pantry/${item1Id}`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${user1Token}` }
    }, {
      quantity: 10
    });
    assert('User 1 can update their own item (HTTP 200)', updateRes1.status === 200 && updateRes1.data.quantity === 10);

    // User 1 successfully deletes their own item
    const deleteRes1 = await makeRequest(port, {
      path: `/api/v1/pantry/${item1Id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user1Token}` }
    });
    assert('User 1 can delete their own item (HTTP 200)', deleteRes1.status === 200);

    // -------------------------------------------------------------
    // Test 11: Shopping Basket Authorization & Isolation
    // -------------------------------------------------------------
    console.log('\n--- TEST 11: Shopping Basket Authorization & Data Isolation ---');
    const basketAnonRes = await makeRequest(port, { path: '/api/v1/basket', method: 'GET' });
    assert('Unauthenticated GET /basket returns 401', basketAnonRes.status === 401);

    const saveBasket1 = await makeRequest(port, {
      path: '/api/v1/basket',
      method: 'POST',
      headers: { Authorization: `Bearer ${user1Token}` }
    }, {
      items: [{ id: 'b-1', name: 'Fresh Coriander', quantity: '2 bunches' }]
    });
    assert('User 1 saves shopping basket successfully', saveBasket1.status === 200 && saveBasket1.data.basket.userId === user1Id);

    // User 2 gets their own basket
    const getBasket2 = await makeRequest(port, {
      path: '/api/v1/basket',
      method: 'GET',
      headers: { Authorization: `Bearer ${user2Token}` }
    });
    assert('User 2 basket is isolated and does not contain User 1 items', getBasket2.status === 200 && getBasket2.data.basket.items.length === 0);

    console.log('\n======================================================================');
    console.log(`ALL SECURITY ASSERTIONS PASSED: ${passed}/${total} checks verified!`);
    console.log('======================================================================\n');

  } finally {
    server.close();
  }
}

runSecurityTests()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('\n[FATAL TEST FAILURE]:', err.message);
    process.exit(1);
  });
