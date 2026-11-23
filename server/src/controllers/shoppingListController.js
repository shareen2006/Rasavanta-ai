const ShoppingList = require('../models/ShoppingList');

const isDbConnected = () => ShoppingList.db && ShoppingList.db.readyState === 1;

let inMemoryBaskets = {};

/**
 * Get Authenticated User's Shopping Basket
 * Strictly derives userId from authenticated JWT session.
 */
exports.getBasket = async (req, res) => {
  try {
    const userId = req.user.id; // Strictly from JWT
    if (isDbConnected()) {
      let basket = await ShoppingList.findOne({ userId }).lean();
      if (!basket) {
        basket = await ShoppingList.create({
          id: `basket-${userId}`,
          userId,
          name: 'Smart Basket',
          items: []
        });
      }
      return res.status(200).json({ success: true, basket, source: 'mongodb' });
    }

    if (!inMemoryBaskets[userId]) {
      inMemoryBaskets[userId] = {
        id: `basket-${userId}`,
        userId,
        name: 'Smart Basket',
        items: []
      };
    }
    return res.status(200).json({ success: true, basket: inMemoryBaskets[userId], source: 'memory' });
  } catch (error) {
    console.error('Error in getBasket:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve shopping basket.' });
  }
};

/**
 * Save / Update Authenticated User's Shopping Basket
 * Strictly derives userId from authenticated JWT session.
 */
exports.saveBasket = async (req, res) => {
  try {
    const userId = req.user.id; // Strictly from JWT
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const basketId = `basket-${userId}`;
    const basketName = typeof req.body.name === 'string' && req.body.name.trim() ? req.body.name.trim() : 'Smart Basket';

    if (isDbConnected()) {
      const updated = await ShoppingList.findOneAndUpdate(
        { userId }, // Scoped strictly to authenticated user
        { id: basketId, userId, items, name: basketName },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.status(200).json({ success: true, basket: updated, source: 'mongodb' });
    }

    inMemoryBaskets[userId] = { id: basketId, userId, items, name: basketName };
    return res.status(200).json({ success: true, basket: inMemoryBaskets[userId], source: 'memory' });
  } catch (error) {
    console.error('Error in saveBasket:', error);
    return res.status(500).json({ success: false, message: 'Failed to save shopping basket.' });
  }
};
