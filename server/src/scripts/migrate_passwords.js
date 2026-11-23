const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');

const BCRYPT_ROUNDS = 10;
const isDryRun = process.argv.includes('--dry-run');

async function migratePasswords() {
  console.log(`=======================================================`);
  console.log(`RASAVANTA AI — SAFE PASSWORD HASHING MIGRATION`);
  console.log(`Mode: ${isDryRun ? 'DRY-RUN (Simulated, no changes applied)' : 'LIVE (Applying bcrypt hashes)'}`);
  console.log(`=======================================================`);

  let conn = null;
  try {
    conn = await connectDB();
    if (!conn) {
      console.log('[Notice] MongoDB Atlas is currently offline or unreachable from this environment.');
      console.log('[Notice] The backend is armed with Just-In-Time (JIT) transparent migration in authController.js.');
      console.log('[Notice] Any user logging in on Render production or locally will be auto-migrated without downtime.');
      return;
    }

    const users = await User.find({});
    console.log(`Found ${users.length} total user accounts in database.`);

    let plaintextCount = 0;
    let alreadyHashedCount = 0;
    let googleAuthCount = 0;
    let errorsCount = 0;

    for (const user of users) {
      const isGoogle = user.authProvider === 'google' || (!user.password && user.googleId);
      if (isGoogle) {
        googleAuthCount++;
        console.log(`[Skip] Google OAuth user: ${user.email} (ID: ${user.id})`);
        continue;
      }

      const isBcrypt = typeof user.password === 'string' &&
        (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'));

      if (isBcrypt) {
        alreadyHashedCount++;
        console.log(`[Safe] Already bcrypt-hashed: ${user.email} (ID: ${user.id})`);
        continue;
      }

      // Plaintext user found
      plaintextCount++;
      console.log(`[Migrate] Plaintext password detected for: ${user.email} (ID: ${user.id})`);

      if (!isDryRun) {
        try {
          const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
          await user.save();
          console.log(`   -> Successfully hashed and saved password for: ${user.email}`);
        } catch (err) {
          errorsCount++;
          console.error(`   -> Failed to hash password for ${user.email}:`, err.message);
        }
      }
    }

    console.log(`\n=======================================================`);
    console.log(`MIGRATION SUMMARY:`);
    console.log(`Total accounts scanned:     ${users.length}`);
    console.log(`Plaintext accounts found:   ${plaintextCount}`);
    console.log(`Already bcrypt-hashed:      ${alreadyHashedCount}`);
    console.log(`Google OAuth accounts:      ${googleAuthCount}`);
    console.log(`Errors encountered:         ${errorsCount}`);
    console.log(`Action: ${isDryRun ? 'DRY-RUN completed. Run without --dry-run to apply.' : 'LIVE migration completed successfully.'}`);
    console.log(`=======================================================`);

  } catch (err) {
    console.error('Migration error:', err.message);
  } finally {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}

migratePasswords();
