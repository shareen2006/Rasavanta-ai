const PantryItem = require('../models/PantryItem');

/**
 * Controller for Smart Pantry management
 * Features hybrid architecture:
 * - Operates with full MongoDB persistence via Mongoose PantryItem model when connected.
 * - Auto-seeds initial pantry items into MongoDB on first connection if empty.
 * - Falls back to stateful in-memory store when MongoDB is offline.
 */

// Initial seed pantry items with dynamic relative dates
const today = new Date();
const addDays = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

const DEFAULT_ITEMS = [
  {
    id: "p-1",
    name: "Fresh Baby Spinach (Palak)",
    category: "Vegetables",
    quantity: 250,
    unit: "g",
    purchaseDate: addDays(-3),
    expiryDate: addDays(1),
    location: "Refrigerator"
  },
  {
    id: "p-2",
    name: "Malai Paneer",
    category: "Dairy",
    quantity: 200,
    unit: "g",
    purchaseDate: addDays(-4),
    expiryDate: addDays(2),
    location: "Refrigerator"
  },
  {
    id: "p-3",
    name: "Ripe Hybrid Tomatoes",
    category: "Vegetables",
    quantity: 1,
    unit: "kg",
    purchaseDate: addDays(-5),
    expiryDate: addDays(-1),
    location: "Countertop"
  },
  {
    id: "p-4",
    name: "Toor Dal (Oiled)",
    category: "Lentils",
    quantity: 1.5,
    unit: "kg",
    purchaseDate: addDays(-20),
    expiryDate: addDays(180),
    location: "Pantry Shelf"
  },
  {
    id: "p-5",
    name: "Fresh Greek Yogurt / Curd",
    category: "Dairy",
    quantity: 400,
    unit: "g",
    purchaseDate: addDays(-2),
    expiryDate: addDays(3),
    location: "Refrigerator"
  },
  {
    id: "p-6",
    name: "Fresh Curry Leaves",
    category: "Herbs",
    quantity: 50,
    unit: "g",
    purchaseDate: addDays(-2),
    expiryDate: addDays(6),
    location: "Refrigerator"
  },
  {
    id: "p-7",
    name: "Kashmiri Red Chilli Powder",
    category: "Spices",
    quantity: 250,
    unit: "g",
    purchaseDate: addDays(-60),
    expiryDate: addDays(240),
    location: "Spice Rack"
  },
  {
    id: "p-8",
    name: "Whole Wheat Pav Buns",
    category: "Bakery",
    quantity: 6,
    unit: "pieces",
    purchaseDate: addDays(-2),
    expiryDate: addDays(0),
    location: "Countertop"
  },
  {
    id: "p-9",
    name: "Cold-Pressed Mustard Oil",
    category: "Oils",
    quantity: 1,
    unit: "L",
    purchaseDate: addDays(-45),
    expiryDate: addDays(300),
    location: "Pantry Shelf"
  }
];

let inMemoryPantry = [...DEFAULT_ITEMS];

const isDbConnected = () => PantryItem.db && PantryItem.db.readyState === 1;

exports.getPantry = async (req, res) => {
  try {
    if (isDbConnected()) {
      let items = await PantryItem.find().sort({ createdAt: -1 }).lean();
      
      // Auto-seed if database collection is empty
      if (items.length === 0) {
        await PantryItem.insertMany(DEFAULT_ITEMS);
        items = await PantryItem.find().sort({ createdAt: -1 }).lean();
      }

      return res.status(200).json(items);
    }

    return res.status(200).json(inMemoryPantry);
  } catch (error) {
    console.error('Error in getPantry:', error);
    return res.status(200).json(inMemoryPantry);
  }
};

exports.addPantryItem = async (req, res) => {
  try {
    const itemData = req.body;
    const todayStr = new Date().toISOString().split('T')[0];
    const defaultExpiryStr = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

    const newItem = {
      ...itemData,
      id: itemData.id || `pantry-${Date.now()}`,
      purchaseDate: itemData.purchaseDate || todayStr,
      expiryDate: itemData.expiryDate || defaultExpiryStr,
      location: itemData.location || 'Pantry Shelf'
    };

    if (isDbConnected()) {
      const created = await PantryItem.create(newItem);
      return res.status(201).json(created);
    }

    inMemoryPantry.unshift(newItem);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Error in addPantryItem:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePantryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (isDbConnected()) {
      const updated = await PantryItem.findOneAndUpdate(
        { id },
        { $set: updateData },
        { new: true }
      ).lean();

      if (!updated) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json(updated);
    }

    const index = inMemoryPantry.findIndex(i => i.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    inMemoryPantry[index] = { ...inMemoryPantry[index], ...updateData };
    return res.status(200).json(inMemoryPantry[index]);
  } catch (error) {
    console.error('Error in updatePantryItem:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.deletePantryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      const deleted = await PantryItem.findOneAndDelete({ id });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json({ success: true, message: 'Item deleted from database' });
    }

    inMemoryPantry = inMemoryPantry.filter(i => i.id !== id);
    return res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (error) {
    console.error('Error in deletePantryItem:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
