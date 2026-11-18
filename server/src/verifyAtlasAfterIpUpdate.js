const http = require('http');

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

async function verify() {
  console.log('================================================================');
  console.log('   RASAVANTA AI — MONGODB ATLAS POST-IP UPDATE VERIFICATION');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(title, condition, extra = '') {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] ${title} ${extra ? '(' + extra + ')' : ''}`);
    } else {
      console.error(`[FAIL] ${title} ${extra ? '(' + extra + ')' : ''}`);
      throw new Error(`Assertion failed: ${title}`);
    }
  }

  // 1. GET /api/health
  console.log('--- TEST 1: Health Diagnostic & Connection Mode ---');
  const healthRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  });
  assert('Health endpoint returns HTTP 200', healthRes.status === 200);
  assert('Database status is "connected"', healthRes.data?.database?.status === 'connected', `status: ${healthRes.data?.database?.status}`);
  assert('Database source is "mongodb_atlas"', healthRes.data?.database?.source === 'mongodb_atlas', `source: ${healthRes.data?.database?.source}`);
  assert('Database host is live Atlas cluster', Boolean(healthRes.data?.database?.host && healthRes.data?.database?.host.includes('mongodb.net')), `host: ${healthRes.data?.database?.host}`);
  assert('Database name is rasavanta_ai', healthRes.data?.database?.name === 'rasavanta_ai', `name: ${healthRes.data?.database?.name}`);
  assert('Gemini remains configured in backend', healthRes.data?.gemini?.status === 'configured', `gemini: ${healthRes.data?.gemini?.status}`);

  // 2. Create temporary pantry item in MongoDB Atlas
  console.log('\n--- TEST 2: Create Temporary Pantry Item in Atlas ---');
  const tempId = `pantry-atlas-test-${Date.now()}`;
  const tempItem = {
    id: tempId,
    name: 'Atlas IP Verified Organic Cashews',
    category: 'Nuts & Seeds',
    quantity: 500,
    unit: 'g',
    purchaseDate: '2026-11-18',
    expiryDate: '2027-11-18',
    location: 'Pantry Shelf'
  };

  const createRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, tempItem);

  assert('Create item returns HTTP 201', createRes.status === 201);
  assert('Created item ID matches', createRes.data?.id === tempId);
  assert('Created item contains MongoDB document _id', Boolean(createRes.data?._id), `_id: ${createRes.data?._id}`);

  // 3. Retrieve temporary pantry item from Atlas
  console.log('\n--- TEST 3: Retrieve Pantry Items from Atlas ---');
  const getRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });

  assert('Get pantry returns HTTP 200', getRes.status === 200);
  const items = Array.isArray(getRes.data) ? getRes.data : getRes.data?.data || [];
  const found = items.find(i => i.id === tempId);
  assert('Temporary item retrieved from MongoDB collection', Boolean(found), `found: ${found?.name}`);
  assert('Item quantity matches stored value', found?.quantity === 500, `quantity: ${found?.quantity}`);
  assert('Item has MongoDB _id persisted', Boolean(found?._id));

  // 4. Delete temporary test item from Atlas
  console.log('\n--- TEST 4: Delete Temporary Item from Atlas ---');
  const deleteRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: `/api/v1/pantry/${tempId}`,
    method: 'DELETE'
  });

  assert('Delete endpoint returns HTTP 200', deleteRes.status === 200);
  assert('Delete response indicates database deletion', deleteRes.data?.message === 'Item deleted from database' || deleteRes.data?.success === true);

  // Verify deletion
  const verifyDeleteRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });
  const remaining = Array.isArray(verifyDeleteRes.data) ? verifyDeleteRes.data : verifyDeleteRes.data?.data || [];
  const stillThere = remaining.find(i => i.id === tempId);
  assert('Temporary test item cleanly removed from Atlas', !stillThere);

  // 5. Confirm no in-memory fallback is being used
  console.log('\n--- TEST 5: Strict Database Fallback Verification ---');
  assert('Atlas connection verified strictly active (NO in-memory fallback)', healthRes.data?.database?.source === 'mongodb_atlas' && healthRes.data?.database?.status === 'connected');

  // 6. Verify Gemini remains active
  console.log('\n--- TEST 6: Gemini Generative AI Verification ---');
  const geminiChatRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/rasabot/chat',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    message: 'What spice pairs best with cashews in a North Indian korma?',
    language: 'en'
  });

  assert('RasaBot returns HTTP 200', geminiChatRes.status === 200);
  assert('RasaBot source is Gemini', typeof geminiChatRes.data?.source === 'string' && geminiChatRes.data?.source.includes('gemini'), `source: ${geminiChatRes.data?.source}`);
  assert('RasaBot response contains culinary wisdom', typeof geminiChatRes.data?.reply === 'string' && geminiChatRes.data?.reply.length > 50);

  console.log('\n================================================================');
  console.log(`    VERIFICATION RESULT: ${passed}/${total} CHECKS PASSED (100% SUCCESS)`);
  console.log('================================================================\n');
}

verify().catch(err => {
  console.error('\n[VERIFICATION ERROR]', err);
  process.exit(1);
});
