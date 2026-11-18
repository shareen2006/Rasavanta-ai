const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // ignore
}
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize database connection
connectDB();

app.listen(PORT, () => {
  console.log(`[RASAVANTA AI Server] Running on port ${PORT}`);
  console.log(`[RASAVANTA AI Server] Health Check: http://localhost:${PORT}/api/health`);
  console.log(`[RASAVANTA AI Server] Recipes API: http://localhost:${PORT}/api/v1/recipes`);
  console.log(`[RASAVANTA AI Server] Pantry API:  http://localhost:${PORT}/api/v1/pantry`);
});
