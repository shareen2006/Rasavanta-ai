const mongoose = require('mongoose');
const dns = require('dns');
const Recipe = require('../models/Recipe');
const recipesData = require('../seed/seedData.json');

// Ensure reliable DNS resolution for MongoDB Atlas SRV records on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('[DNS Warning] Could not set custom DNS servers:', dnsErr.message);
}

// Attach persistent error & disconnect listeners to prevent unhandled EventEmitter crash
mongoose.connection.on('error', (err) => {
  console.warn('[MongoDB Atlas Runtime Warning]:', err.message);
});
mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB Atlas] Connection closed or unavailable. Server operating in resilient memory fallback mode.');
});

function sanitizeMongoUri(rawUri) {
  if (!rawUri || !rawUri.startsWith('mongodb')) return rawUri;
  try {
    const protocolMatch = rawUri.match(/^(mongodb(?:\+srv)?:\/\/)/);
    if (!protocolMatch) return rawUri;
    const protocol = protocolMatch[1];
    const rest = rawUri.slice(protocol.length);
    const lastAtIndex = rest.lastIndexOf('@');
    if (lastAtIndex === -1) return rawUri;

    const userPass = rest.slice(0, lastAtIndex);
    const hostAndRest = rest.slice(lastAtIndex + 1);

    const firstColonIndex = userPass.indexOf(':');
    if (firstColonIndex === -1) return rawUri;

    const username = userPass.slice(0, firstColonIndex);
    let password = userPass.slice(firstColonIndex + 1);

    if (password.startsWith('<')) password = password.slice(1);
    if (password.endsWith('>')) password = password.slice(0, -1);

    const encodedPassword = encodeURIComponent(decodeURIComponent(password));
    return `${protocol}${username}:${encodedPassword}@${hostAndRest}`;
  } catch {
    return rawUri;
  }
}

/**
 * MongoDB Atlas Connection Engine
 * Connects via Mongoose to existing MongoDB Atlas cluster.
 * Performs idempotent auto-seeding of curated recipes without duplicates.
 */
const connectDB = async () => {
  try {
    const rawUri = process.env.MONGODB_URI;

    if (!rawUri) {
      console.warn('[MongoDB Atlas Warning] MONGODB_URI is not set in server/.env.');
      console.warn('[MongoDB Atlas Warning] Operating in resilient local fallback mode.');
      return null;
    }

    const mongoUri = sanitizeMongoUri(rawUri);

    // Mask credentials for logging security
    const maskedUri = mongoUri.replace(/:([^:@]{3,})@/, ':***@');
    console.log(`[MongoDB Atlas] Attempting connection to: ${maskedUri}`);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 6000,
    });

    console.log(`[MongoDB Atlas] Connected successfully! Host: ${conn.connection.host}, Database: ${conn.connection.name}`);

    // Persist recipes without duplicates (idempotent upsert)
    const existingCount = await Recipe.countDocuments();
    if (existingCount === 0) {
      console.log('[MongoDB Atlas] Empty recipes collection detected. Seeding authentic recipes...');
      let inserted = 0;
      for (const item of recipesData) {
        const res = await Recipe.updateOne(
          { id: item.id },
          { $set: item },
          { upsert: true }
        );
        if (res.upsertedCount > 0) inserted++;
      }
      console.log(`[MongoDB Atlas] Successfully seeded ${inserted} authentic recipes.`);
    } else {
      console.log(`[MongoDB Atlas] Verified ${existingCount} persisted recipes in cluster.`);
    }

    return conn;
  } catch (error) {
    console.warn(`[MongoDB Atlas Connection Error] Could not connect: ${error.message}`);
    console.warn('[MongoDB Atlas] Server running in resilient in-memory / local fallback mode.');
    return null;
  }
};

module.exports = connectDB;
