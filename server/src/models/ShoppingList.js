const mongoose = require('mongoose');

const ShoppingItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  quantity: { type: String, default: '1' },
  unit: { type: String, default: 'portion' },
  category: { type: String, default: 'Pantry Staples' },
  checked: { type: Boolean, default: false },
  inPantry: { type: Boolean, default: false },
  sourceRecipes: [{ type: String }]
}, { _id: false });

const ShoppingListSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    default: 'usr-demo-chef',
    index: true
  },
  name: {
    type: String,
    default: 'Smart Basket'
  },
  items: [ShoppingItemSchema]
}, {
  timestamps: true
});

module.exports = mongoose.models.ShoppingList || mongoose.model('ShoppingList', ShoppingListSchema);
