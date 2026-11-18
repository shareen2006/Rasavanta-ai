const ShoppingList = require('../models/ShoppingList');

const isDbConnected = () => ShoppingList.db && ShoppingList.db.readyState === 1;

let inMemoryBasket = {
  id: 'basket-default',
  userId: 'usr-demo-chef',
  name: 'Smart Basket',
  items: []
};

exports.getBasket = async (req, res) => {
  try {
    const userId = req.query.userId || 'usr-demo-chef';
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
    return res.status(200).json({ success: true, basket: inMemoryBasket, source: 'memory' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveBasket = async (req, res) => {
  try {
    const userId = req.body.userId || 'usr-demo-chef';
    const items = req.body.items || [];
    const basketId = req.body.id || `basket-${userId}`;

    if (isDbConnected()) {
      const updated = await ShoppingList.findOneAndUpdate(
        { userId },
        { id: basketId, userId, items, name: req.body.name || 'Smart Basket' },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();
      return res.status(200).json({ success: true, basket: updated, source: 'mongodb' });
    }

    inMemoryBasket = { id: basketId, userId, items, name: req.body.name || 'Smart Basket' };
    return res.status(200).json({ success: true, basket: inMemoryBasket, source: 'memory' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
