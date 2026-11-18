import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log('===============================================================');
  console.log('     RASAVANTA AI — FULL STACK & ATLAS INTEGRATION SUITE');
  console.log('===============================================================\n');

  let passed = 0;
  let total = 0;

  function assert(title, condition, extra = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] ${title} ${extra ? '(' + extra + ')' : ''}`);
    } else {
      console.error(`[FAIL] ${title} ${extra ? '(' + extra + ')' : ''}`);
      throw new Error(`Test assertion failed: ${title}`);
    }
  }

  // 1. Health check with Atlas database verification
  console.log('--- TEST 1: Health & Database Diagnostic ---');
  const healthRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  });
  assert('Server is healthy', healthRes.status === 200, `status: ${healthRes.status}`);
  assert('MongoDB Atlas is live connected', healthRes.data?.database?.status === 'connected', `host: ${healthRes.data?.database?.host}`);
  assert('Database source is mongodb_atlas', healthRes.data?.database?.source === 'mongodb_atlas');

  // 2. Recipe Catalog from Atlas
  console.log('\n--- TEST 2: Recipe Catalog & Pagination ---');
  const recipesRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/recipes?limit=10',
    method: 'GET'
  });
  assert('Recipe list HTTP 200', recipesRes.status === 200);
  assert('Recipe source is MongoDB Atlas', recipesRes.data?.source === 'mongodb');
  assert('Catalog size in Atlas >= 40', recipesRes.data?.pagination?.totalCount >= 40, `total: ${recipesRes.data?.pagination?.totalCount}`);
  assert('Returned page items match limit', recipesRes.data?.data?.length === 10, `count: ${recipesRes.data?.data?.length}`);

  const sampleRecipeId = recipesRes.data?.data[0]?.id;
  console.log(`\n--- TEST 3: Single Recipe Fetch & Favorite (${sampleRecipeId}) ---`);
  const singleRecipeRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/recipes/${sampleRecipeId}`,
    method: 'GET'
  });
  assert('Fetch single recipe HTTP 200', singleRecipeRes.status === 200);
  assert('Recipe title matches', Boolean(singleRecipeRes.data?.data?.title || singleRecipeRes.data?.title), singleRecipeRes.data?.data?.title || singleRecipeRes.data?.title);

  const favRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/recipes/${sampleRecipeId}/favorite`,
    method: 'POST'
  });
  assert('Toggle favorite HTTP 200', favRes.status === 200 && favRes.data?.success === true, `isFavorite: ${favRes.data?.isFavorite}`);

  // 3. Pantry CRUD with Atlas Persistence
  console.log('\n--- TEST 4: Pantry CRUD with Live Atlas ---');
  const testPantryItem = {
    id: `pantry-test-${Date.now()}`,
    name: 'Atlas Organic Cardamom',
    category: 'Spices',
    quantity: 100,
    unit: 'g',
    purchaseDate: '2026-11-18',
    expiryDate: '2027-11-18',
    location: 'Pantry Shelf'
  };

  // CREATE
  const createPantryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, testPantryItem);
  assert('Create pantry item HTTP 201', createPantryRes.status === 201);

  // READ
  const getPantryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });
  const allItems = Array.isArray(getPantryRes.data) ? getPantryRes.data : getPantryRes.data?.data || [];
  const foundItem = allItems.find(i => i.id === testPantryItem.id);
  assert('Item exists in Atlas pantry collection', Boolean(foundItem), `id: ${testPantryItem.id}`);

  // UPDATE
  const updatePantryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/pantry/${testPantryItem.id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }, { quantity: 250, location: 'Spice Rack Top' });
  assert('Update pantry item HTTP 200', updatePantryRes.status === 200);

  // DELETE
  const deletePantryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/pantry/${testPantryItem.id}`,
    method: 'DELETE'
  });
  assert('Delete pantry item HTTP 200', deletePantryRes.status === 200);

  // VERIFY DELETE
  const verifyDeleteRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });
  const remainingItems = Array.isArray(verifyDeleteRes.data) ? verifyDeleteRes.data : verifyDeleteRes.data?.data || [];
  const stillPresent = remainingItems.find(i => i.id === testPantryItem.id);
  assert('Pantry item cleanly removed from Atlas', !stillPresent);

  // 4. User Authentication & Atlas Persistence
  console.log('\n--- TEST 5: User Registration & Login in Atlas ---');
  const uniqueEmail = `chef.test.${Date.now()}@rasavanta.ai`;
  const regRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    name: 'Atlas Test Chef',
    email: uniqueEmail,
    password: 'SafeTestPassword2026'
  });
  assert('Register new user HTTP 201', regRes.status === 201 && regRes.data?.success === true);
  assert('User registered into MongoDB Atlas', regRes.data?.source === 'mongodb');

  const loginRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: uniqueEmail,
    password: 'SafeTestPassword2026'
  });
  assert('Login registered user HTTP 200', loginRes.status === 200 && Boolean(loginRes.data?.token));
  assert('Auth source verified MongoDB', loginRes.data?.source === 'mongodb');

  // 5. Smart Basket / Shopping List in Atlas
  console.log('\n--- TEST 6: Smart Basket Persistence in Atlas ---');
  const basketPayload = {
    userId: `usr-test-${Date.now()}`,
    name: 'Weekly Meal Prep Basket',
    items: [
      { id: 'b-1', name: 'Fresh Paneer', quantity: '500', unit: 'g', category: 'Dairy' },
      { id: 'b-2', name: 'Basmati Rice', quantity: '2', unit: 'kg', category: 'Grains' }
    ]
  };
  const saveBasketRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/basket',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, basketPayload);
  assert('Save Smart Basket HTTP 200', saveBasketRes.status === 200 && saveBasketRes.data?.source === 'mongodb');

  const getBasketRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/basket?userId=${basketPayload.userId}`,
    method: 'GET'
  });
  assert('Retrieve Smart Basket HTTP 200', getBasketRes.status === 200 && getBasketRes.data?.basket?.items?.length === 2);

  // 6. RasaBot AI Chat Integration
  console.log('\n--- TEST 7: RasaBot Culinary Intelligence ---');
  const rasabotRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/rasabot/chat',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    message: 'How can I fix a curry that has become too spicy?',
    language: 'en'
  });
  assert('RasaBot HTTP 200', rasabotRes.status === 200 && rasabotRes.data?.success === true);
  assert('RasaBot returns culinary reply', typeof rasabotRes.data?.reply === 'string' && rasabotRes.data?.reply.length > 20);

  console.log('\n===============================================================');
  console.log(`     RESULTS: ${passed}/${total} CHECKS PASSED (100% SUCCESS)`);
  console.log('===============================================================\n');
}

runTests().catch(err => {
  console.error('\n[SUITE RUN ERROR]', err);
  process.exit(1);
});
