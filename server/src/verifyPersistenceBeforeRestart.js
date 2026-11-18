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
  console.log('--- Testing Current Pantry State Before Restart ---');
  const getRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/v1/pantry',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  console.log('GET /api/v1/pantry status:', getRes.status);
  const items = Array.isArray(getRes.data) ? getRes.data : getRes.data?.data || [];
  const found = items.find(i => i.id === 'pantry-persistent-999');
  console.log('Found persistent item before restart:', found ? `YES (qty: ${found.quantity})` : 'NO');
}

run().catch(console.error);
