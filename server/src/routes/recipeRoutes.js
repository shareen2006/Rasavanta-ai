const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Recipe discovery & filtering routes
router.get('/', recipeController.getRecipes);
router.get('/categories', recipeController.getCategories);
router.get('/:id', recipeController.getRecipeById);
router.post('/:id/favorite', recipeController.toggleFavorite);

// AI Kitchen Recipe Generation
router.post('/generate', recipeController.generateRecipe);

module.exports = router;
