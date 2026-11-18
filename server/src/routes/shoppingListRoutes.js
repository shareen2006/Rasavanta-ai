const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/', shoppingListController.getBasket);
router.post('/', shoppingListController.saveBasket);

module.exports = router;
