import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('=== VERIFYING DATA PERSISTENCE AFTER RESTART ===\n');

  // 1. Health check
  console.log('[1/5] Checking GET /api/health...');
  const healthRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/health',
    method: 'GET'
  });
  console.log('  Status:', healthRes.status);
  console.log('  Database Status:', healthRes.data?.database?.status, '| Host:', healthRes.data?.database?.host);

  // 2. Pantry persistence check
  console.log('\n[2/5] Checking GET /api/v1/pantry for persisted record...');
  const pantryRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });
  console.log('  Status:', pantryRes.status);
  const items = Array.isArray(pantryRes.data) ? pantryRes.data : pantryRes.data?.data || [];
  const found = items.find(i => i.id === 'pantry-persistent-999');
  if (found && found.quantity === 25) {
    console.log('  [PASS] Found persisted item "pantry-persistent-999" ("' + found.name + '") with quantity ' + found.quantity);
  } else {
    console.error('  [FAIL] Persistent item not found or quantity incorrect:', found);
    process.exit(1);
  }

  // 3. Recipes count and source check
  console.log('\n[3/5] Checking GET /api/v1/recipes...');
  const recipeRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/recipes',
    method: 'GET'
  });
  console.log('  Status:', recipeRes.status);
  console.log('  Page size returned:', recipeRes.data?.count);
  console.log('  Total recipes in DB:', recipeRes.data?.pagination?.totalCount);
  console.log('  Recipe source:', recipeRes.data?.source);
  if (recipeRes.data?.source === 'mongodb' && recipeRes.data?.pagination?.totalCount >= 40) {
    console.log('  [PASS] Authentic MongoDB recipes verified in Atlas.');
  } else {
    console.error('  [FAIL] Recipes not from MongoDB or count unexpected.');
    process.exit(1);
  }

  // 4. Test DELETE on pantry item
  console.log('\n[4/5] Testing DELETE /api/v1/pantry/pantry-persistent-999...');
  const deleteRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry/pantry-persistent-999',
    method: 'DELETE'
  });
  console.log('  Status:', deleteRes.status);
  console.log('  Delete message:', deleteRes.data?.message);

  // 5. Verify deletion
  console.log('\n[5/5] Verifying item is deleted in Atlas...');
  const verifyDelRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET'
  });
  const updatedItems = Array.isArray(verifyDelRes.data) ? verifyDelRes.data : verifyDelRes.data?.data || [];
  const stillFound = updatedItems.find(i => i.id === 'pantry-persistent-999');
  if (!stillFound) {
    console.log('  [PASS] Item "pantry-persistent-999" successfully removed from Atlas.');
  } else {
    console.error('  [FAIL] Item still exists after delete.');
    process.exit(1);
  }

  console.log('\n>>> ALL BACKEND RESTARTS AND RE-VERIFICATIONS PASSED 100% <<<');
}

run().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
