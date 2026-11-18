const mongoose = require('mongoose');

const PantryItemSchema = new mongoose.Schema({
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
    required: true,
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    default: 'Vegetables',
    index: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  unit: {
    type: String,
    default: 'kg',
    trim: true
  },
  purchaseDate: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true,
    index: true
  },
  location: {
    type: String,
    default: 'Refrigerator',
    enum: ['Refrigerator', 'Freezer', 'Pantry Shelf', 'Countertop', 'Spice Rack']
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.PantryItem || mongoose.model('PantryItem', PantryItemSchema);
