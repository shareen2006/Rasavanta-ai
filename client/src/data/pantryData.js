// Helper to generate dates relative to today for dynamic demonstration
const today = new Date();

const addDays = (days) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const INITIAL_PANTRY_ITEMS = [
  {
    id: "p-1",
    name: "Fresh Baby Spinach (Palak)",
    category: "Vegetables",
    quantity: 250,
    unit: "g",
    purchaseDate: addDays(-3),
    expiryDate: addDays(1), // Expiring in 1 day!
    location: "Refrigerator"
  },
  {
    id: "p-2",
    name: "Malai Paneer",
    category: "Dairy",
    quantity: 200,
    unit: "g",
    purchaseDate: addDays(-4),
    expiryDate: addDays(2), // Expiring in 2 days!
    location: "Refrigerator"
  },
  {
    id: "p-3",
    name: "Ripe Hybrid Tomatoes",
    category: "Vegetables",
    quantity: 1,
    unit: "kg",
    purchaseDate: addDays(-5),
    expiryDate: addDays(-1), // Expired yesterday!
    location: "Countertop"
  },
  {
    id: "p-4",
    name: "Toor Dal (Oiled)",
    category: "Lentils",
    quantity: 1.5,
    unit: "kg",
    purchaseDate: addDays(-20),
    expiryDate: addDays(180), // Long shelf life
    location: "Pantry Shelf"
  },
  {
    id: "p-5",
    name: "Fresh Greek Yogurt / Curd",
    category: "Dairy",
    quantity: 400,
    unit: "g",
    purchaseDate: addDays(-2),
    expiryDate: addDays(3), // Expiring in 3 days!
    location: "Refrigerator"
  },
  {
    id: "p-6",
    name: "Fresh Curry Leaves",
    category: "Herbs",
    quantity: 50,
    unit: "g",
    purchaseDate: addDays(-1),
    expiryDate: addDays(6),
    location: "Refrigerator"
  },
  {
    id: "p-7",
    name: "Kashmiri Red Chilli Powder",
    category: "Spices",
    quantity: 250,
    unit: "g",
    purchaseDate: addDays(-40),
    expiryDate: addDays(240),
    location: "Spice Rack"
  },
  {
    id: "p-8",
    name: "Whole Wheat Pav Buns",
    category: "Bakery",
    quantity: 6,
    unit: "pieces",
    purchaseDate: addDays(-3),
    expiryDate: addDays(1), // Expiring tomorrow!
    location: "Countertop"
  },
  {
    id: "p-9",
    name: "Cold-Pressed Mustard Oil",
    category: "Oils",
    quantity: 1,
    unit: "L",
    purchaseDate: addDays(-15),
    expiryDate: addDays(300),
    location: "Pantry Shelf"
  }
];

export const PANTRY_CATEGORIES = [
  "Vegetables",
  "Dairy",
  "Lentils",
  "Spices",
  "Herbs",
  "Bakery",
  "Oils",
  "Pantry Staples",
  "Condiments"
];

export const PANTRY_UNITS = [
  "g",
  "kg",
  "ml",
  "L",
  "pieces",
  "tbsp",
  "tsp",
  "cups",
  "packets"
];
