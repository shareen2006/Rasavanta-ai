require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const recipesData = require('./seedData.json');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rasavanta_ai';
    console.log(`[Seed] Connecting to MongoDB: ${mongoUri.replace(/:([^:@]{3,})@/, ':***@')}`);

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('[Seed] Connected to database.');

    let inserted = 0;
    let updated = 0;

    for (const item of recipesData) {
      const res = await Recipe.updateOne(
        { id: item.id },
        { $set: item },
        { upsert: true }
      );
      if (res.upsertedCount > 0) inserted++;
      else updated++;
    }

    console.log(`[Seed Complete] Successfully processed ${recipesData.length} recipes (${inserted} inserted, ${updated} updated).`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
