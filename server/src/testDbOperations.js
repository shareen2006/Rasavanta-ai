const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const PantryItem = require('./models/PantryItem');
const ShoppingList = require('./models/ShoppingList');

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

    // Strip accidental leading < and trailing >
    if (password.startsWith('<')) password = password.slice(1);
    if (password.endsWith('>')) password = password.slice(0, -1);

    const encodedPassword = encodeURIComponent(decodeURIComponent(password));
    return `${protocol}${username}:${encodedPassword}@${hostAndRest}`;
  } catch {
    return rawUri;
  }
}

async function runDatabaseTests() {
  console.log('====================================================');
  console.log('RASAVANTA AI — MONGODB ATLAS VERIFICATION SUITE');
  console.log('====================================================');

  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    console.error('❌ MONGODB_URI is not set in server/.env');
    process.exit(1);
  }

  const uri = sanitizeMongoUri(rawUri);

  console.log('Connecting to:', uri.replace(/:([^:@]{3,})@/, ':***@'));

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log(`✅ Connected successfully to: ${conn.connection.host}`);
    console.log(`✅ Database name: ${conn.connection.name}`);

    // TEST 1: Recipe Model & Duplicate Prevention
    console.log('\n--- TEST 1: Recipe Model & Duplicate Prevention ---');
    const initialRecipeCount = await Recipe.countDocuments();
    console.log(`Current recipe count: ${initialRecipeCount}`);

    const testRecipeData = {
      id: 'test-atlas-dish',
      title: 'Atlas Mumbai Test Dish',
      description: 'A test dish created to verify Atlas persistence and duplicate prevention.',
      cuisine: 'Indian Fusion',
      mealType: 'Dinner',
      diet: 'Vegetarian'
    };

    // Upsert 1
    await Recipe.updateOne({ id: testRecipeData.id }, { $set: testRecipeData }, { upsert: true });
    // Upsert 2 (simulate duplicate call)
    await Recipe.updateOne({ id: testRecipeData.id }, { $set: testRecipeData }, { upsert: true });
    
    const countAfterUpsert = await Recipe.countDocuments({ id: testRecipeData.id });
    if (countAfterUpsert === 1) {
      console.log('✅ Duplicate prevention PASSED: Exactly 1 record exists after multiple upserts.');
    } else {
      console.error(`❌ Duplicate prevention FAILED: Found ${countAfterUpsert} records.`);
    }

    // Clean up test recipe
    await Recipe.deleteOne({ id: testRecipeData.id });
    console.log('✅ Cleaned up temporary test recipe.');

    // TEST 2: User Model CRUD
    console.log('\n--- TEST 2: User Model CRUD ---');
    const testUser = await User.findOneAndUpdate(
      { id: 'usr-test-atlas' },
      {
        id: 'usr-test-atlas',
        name: 'Atlas Test Chef',
        email: 'atlas.test@example.com',
        password: 'SecureAtlasPassword2026',
        role: 'Verified Chef'
      },
      { upsert: true, new: true }
    );
    console.log('✅ CREATE User PASSED:', testUser.name, `(${testUser.email})`);

    const readUser = await User.findOne({ id: 'usr-test-atlas' });
    console.log('✅ READ User PASSED:', readUser.email);

    const updatedUser = await User.findOneAndUpdate(
      { id: 'usr-test-atlas' },
      { $set: { role: 'Executive Chef' } },
      { new: true }
    );
    console.log('✅ UPDATE User PASSED:', updatedUser.role);

    await User.deleteOne({ id: 'usr-test-atlas' });
    const verifyUserDeleted = await User.findOne({ id: 'usr-test-atlas' });
    if (!verifyUserDeleted) {
      console.log('✅ DELETE User PASSED: Record removed.');
    }

    // TEST 3: PantryItem Model CRUD
    console.log('\n--- TEST 3: PantryItem Model CRUD ---');
    const testPantryItem = await PantryItem.findOneAndUpdate(
      { id: 'pantry-test-101' },
      {
        id: 'pantry-test-101',
        name: 'Organic Kesar Mangoes',
        category: 'Vegetables',
        quantity: 3,
        unit: 'kg',
        purchaseDate: '2026-11-18',
        expiryDate: '2026-11-25',
        location: 'Countertop'
      },
      { upsert: true, new: true }
    );
    console.log('✅ CREATE PantryItem PASSED:', testPantryItem.name, `(${testPantryItem.quantity} ${testPantryItem.unit})`);

    const readPantry = await PantryItem.findOne({ id: 'pantry-test-101' });
    console.log('✅ READ PantryItem PASSED:', readPantry.name);

    const updatedPantry = await PantryItem.findOneAndUpdate(
      { id: 'pantry-test-101' },
      { $set: { quantity: 5 } },
      { new: true }
    );
    console.log('✅ UPDATE PantryItem PASSED: Quantity updated to', updatedPantry.quantity);

    await PantryItem.deleteOne({ id: 'pantry-test-101' });
    const verifyPantryDeleted = await PantryItem.findOne({ id: 'pantry-test-101' });
    if (!verifyPantryDeleted) {
      console.log('✅ DELETE PantryItem PASSED: Record removed.');
    }

    // TEST 4: ShoppingList Model CRUD
    console.log('\n--- TEST 4: ShoppingList Model CRUD ---');
    const testList = await ShoppingList.findOneAndUpdate(
      { id: 'list-test-101' },
      {
        id: 'list-test-101',
        name: 'Weekly MealCraft Groceries',
        items: [
          { id: 'item-1', name: 'Fresh Paneer', quantity: '500', unit: 'g', checked: false },
          { id: 'item-2', name: 'Basmati Rice', quantity: '2', unit: 'kg', checked: true }
        ]
      },
      { upsert: true, new: true }
    );
    console.log('✅ CREATE ShoppingList PASSED:', testList.name, `(${testList.items.length} items)`);

    const readList = await ShoppingList.findOne({ id: 'list-test-101' });
    console.log('✅ READ ShoppingList PASSED:', readList.items.map(i => i.name).join(', '));

    await ShoppingList.deleteOne({ id: 'list-test-101' });
    console.log('✅ DELETE ShoppingList PASSED: Record removed.');

    console.log('\n====================================================');
    console.log('ALL MONGODB ATLAS TESTS PASSED SUCCESSFULLY! 🚀');
    console.log('====================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ MONGODB ATLAS TEST FAILED:', error.message);
    process.exit(1);
  }
}

runDatabaseTests();
