const Recipe = require('../models/Recipe');
const seedData = require('../seed/seedData.json');
const geminiService = require('../services/geminiService');

/**
 * Controller for comprehensive Recipe operations
 * Operates in hybrid mode: queries MongoDB Atlas when connected,
 * and falls back to full in-memory seed catalog with search, filter,
 * pagination and AI synthesis when the database is offline.
 */
exports.getRecipes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      q,
      cuisine,
      region,
      mealType,
      diet,
      dietary,
      difficulty,
      maxTime,
      minProtein,
      maxCalories,
      ingredients,
      sortBy = 'rating',
      featured
    } = req.query;

    const query = {};

    // 1. Text Search
    const searchTerm = search || q;
    if (searchTerm && searchTerm.trim()) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { 'ingredients.name': { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // 2. Cuisine & Region Filters
    if (cuisine && cuisine.toLowerCase() !== 'all') {
      query.cuisine = { $regex: new RegExp(`^${cuisine}$`, 'i') };
    }
    if (region && region.toLowerCase() !== 'all') {
      query.region = { $regex: new RegExp(`^${region}$`, 'i') };
    }

    // 3. Meal / Food Type Filter
    if (mealType && mealType.toLowerCase() !== 'all') {
      query.mealType = { $regex: new RegExp(`^${mealType}$`, 'i') };
    }

    // 4. Primary Diet & Dietary Classification
    if (diet && diet.toLowerCase() !== 'all') {
      query.diet = { $regex: new RegExp(`^${diet}$`, 'i') };
    }
    if (dietary && dietary.toLowerCase() !== 'all') {
      query.dietaryClassifications = { $in: [new RegExp(dietary, 'i')] };
    }

    // 5. Difficulty
    if (difficulty && difficulty.toLowerCase() !== 'all') {
      query.difficulty = { $regex: new RegExp(`^${difficulty}$`, 'i') };
    }

    // 6. Max Cooking Time
    if (maxTime && !isNaN(Number(maxTime))) {
      query.totalTime = { $lte: Number(maxTime) };
    }

    // 7. Max Calories
    if (maxCalories && !isNaN(Number(maxCalories))) {
      query.calories = { $lte: Number(maxCalories) };
    }

    // 8. Featured flag
    if (featured === 'true') {
      query.featured = true;
    }

    // Build Sorting Criteria
    let sortObj = { rating: -1, reviewsCount: -1 };
    if (sortBy === 'time') {
      sortObj = { totalTime: 1 };
    } else if (sortBy === 'calories') {
      sortObj = { calories: 1 };
    } else if (sortBy === 'popularity') {
      sortObj = { reviewsCount: -1, rating: -1 };
    } else if (sortBy === 'newest') {
      sortObj = { createdAt: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, Math.min(100, parseInt(limit, 10)));
    const skip = (pageNum - 1) * pageSize;

    // Check if MongoDB is connected
    const isDbConnected = Recipe.db && Recipe.db.readyState === 1;

    if (isDbConnected) {
      const [recipes, totalCount] = await Promise.all([
        Recipe.find(query).sort(sortObj).skip(skip).limit(pageSize).lean(),
        Recipe.countDocuments(query)
      ]);

      return res.status(200).json({
        success: true,
        count: recipes.length,
        pagination: {
          page: pageNum,
          limit: pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
          totalCount
        },
        data: recipes,
        source: 'mongodb'
      });
    }

    // Fallback if DB is disconnected: filter and paginate in-memory seed catalog
    let filtered = [...seedData];

    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(r => 
        (r.title && r.title.toLowerCase().includes(term)) ||
        (r.description && r.description.toLowerCase().includes(term)) ||
        (r.cuisine && r.cuisine.toLowerCase().includes(term)) ||
        (r.ingredients && r.ingredients.some(ing => (typeof ing === 'string' ? ing : ing.name).toLowerCase().includes(term)))
      );
    }

    if (cuisine && cuisine.toLowerCase() !== 'all') {
      filtered = filtered.filter(r => r.cuisine && r.cuisine.toLowerCase() === cuisine.toLowerCase());
    }

    if (diet && diet.toLowerCase() !== 'all') {
      filtered = filtered.filter(r => r.diet && r.diet.toLowerCase() === diet.toLowerCase());
    }

    if (difficulty && difficulty.toLowerCase() !== 'all') {
      filtered = filtered.filter(r => r.difficulty && r.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (maxTime && !isNaN(Number(maxTime))) {
      filtered = filtered.filter(r => (r.totalTime || (r.prepTime || 15) + (r.cookTime || 20)) <= Number(maxTime));
    }

    if (maxCalories && !isNaN(Number(maxCalories))) {
      filtered = filtered.filter(r => (r.calories || 350) <= Number(maxCalories));
    }

    // Sort
    if (sortBy === 'time') {
      filtered.sort((a, b) => (a.totalTime || 30) - (b.totalTime || 30));
    } else if (sortBy === 'calories') {
      filtered.sort((a, b) => (a.calories || 300) - (b.calories || 300));
    } else {
      filtered.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
    }

    const totalCount = filtered.length;
    const paginated = filtered.slice(skip, skip + pageSize);

    return res.status(200).json({
      success: true,
      count: paginated.length,
      pagination: {
        page: pageNum,
        limit: pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount
      },
      data: paginated,
      source: 'in-memory-catalog'
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recipes',
      error: error.message
    });
  }
};

/**
 * Get single recipe by ID
 */
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const isDbConnected = Recipe.db && Recipe.db.readyState === 1;

    if (isDbConnected) {
      const recipe = await Recipe.findOne({ id }).lean();
      if (recipe) {
        return res.status(200).json({ success: true, data: recipe, source: 'mongodb' });
      }
    }

    // Fallback to seed catalog
    const localRecipe = seedData.find(r => r.id === id);
    if (localRecipe) {
      return res.status(200).json({ success: true, data: localRecipe, source: 'in-memory-catalog' });
    }

    return res.status(404).json({ success: false, message: 'Recipe not found' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching recipe details',
      error: error.message
    });
  }
};

/**
 * Get distinct categories, cuisines, meal types and dietary classifications
 */
exports.getCategories = async (req, res) => {
  try {
    const isDbConnected = Recipe.db && Recipe.db.readyState === 1;
    if (isDbConnected) {
      const [cuisines, mealTypes, dietaryClassifications, regions] = await Promise.all([
        Recipe.distinct('cuisine'),
        Recipe.distinct('mealType'),
        Recipe.distinct('dietaryClassifications'),
        Recipe.distinct('region')
      ]);

      return res.status(200).json({
        success: true,
        data: { cuisines, mealTypes, dietaryClassifications, regions },
        source: 'mongodb'
      });
    }

    // Fallback: extract distinct from seedData
    const cuisines = [...new Set(seedData.map(r => r.cuisine).filter(Boolean))];
    const mealTypes = [...new Set(seedData.map(r => r.mealType).filter(Boolean))];
    const dietaryClassifications = ['Vegetarian', 'Vegan', 'Gluten-Free', 'High-Protein', 'Balanced Diet'];
    const regions = [...new Set(seedData.map(r => r.region).filter(Boolean))];

    return res.status(200).json({
      success: true,
      data: { cuisines, mealTypes, dietaryClassifications, regions },
      source: 'in-memory-catalog'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Generate Recipe using RasaGen AI (Real Gemini API with fallback)
 */
exports.generateRecipe = async (req, res) => {
  try {
    const { 
      ingredients = [], 
      cuisine = 'All', 
      diet = 'All', 
      servings = 4, 
      maxTime = 45,
      mealType = 'Dinner',
      language = 'en'
    } = req.body;

    const userIngs = (ingredients || []).map((i) => (typeof i === 'string' ? i : i.name).toLowerCase().trim());
    const isDbConnected = Recipe.db && Recipe.db.readyState === 1;

    // 1. Real Gemini Generation if configured
    if (geminiService.isConfigured()) {
      try {
        const geminiResult = await geminiService.generateRecipe({
          ingredients: userIngs,
          cuisine,
          diet,
          servings,
          maxTime,
          mealType,
          language
        });

        // Persist newly generated AI recipe into MongoDB Atlas if connected
        if (isDbConnected && geminiResult.recipe) {
          try {
            await Recipe.findOneAndUpdate(
              { id: geminiResult.recipe.id },
              geminiResult.recipe,
              { upsert: true, new: true, setDefaultsOnInsert: true }
            );
          } catch (dbErr) {
            console.warn('[RecipeController] Failed to persist generated recipe to Atlas:', dbErr.message);
          }
        }

        return res.status(200).json({
          success: true,
          message: 'AI recipe synthesis generated via Gemini',
          recipe: geminiResult.recipe,
          recipes: [geminiResult.recipe],
          source: geminiResult.source,
          model: geminiResult.model,
          isDemo: false
        });
      } catch (geminiError) {
        console.warn('[Gemini Generation Warning]:', geminiError.message);
        if (req.query.strict === 'true' || req.body.strict === true) {
          return res.status(502).json({
            success: false,
            message: 'Failed to generate recipe via Gemini AI.',
            error: geminiError.message
          });
        }
      }
    }

    // 2. Intelligent Culinary Fallback (when Gemini API is unconfigured or offline)
    let matchedRecipes = [];
    if (isDbConnected) {
      matchedRecipes = await Recipe.find({
        'ingredients.name': { $in: userIngs.map((i) => new RegExp(i, 'i')) }
      }).limit(4).lean();
    }

    if (matchedRecipes.length === 0) {
      matchedRecipes = seedData.filter(r => {
        if (!r.ingredients) return false;
        const recipeIngs = r.ingredients.map(ing => (typeof ing === 'string' ? ing : ing.name).toLowerCase());
        const matchCount = userIngs.filter(ui => recipeIngs.some(ri => ri.includes(ui) || ui.includes(ri))).length;
        return matchCount > 0;
      }).slice(0, 4);
    }

    if (matchedRecipes.length === 0) {
      matchedRecipes = seedData.slice(0, 3);
    }

    return res.status(200).json({
      success: true,
      message: 'Culinary synthesis complete (catalog fallback)',
      recipes: matchedRecipes,
      recipe: matchedRecipes[0],
      userIngredients: userIngs,
      source: 'offline-catalog-fallback',
      isDemo: true
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

let inMemoryFavorites = [];

exports.toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const idx = inMemoryFavorites.indexOf(id);
    let isFavorite = false;
    if (idx > -1) {
      inMemoryFavorites.splice(idx, 1);
      isFavorite = false;
    } else {
      inMemoryFavorites.push(id);
      isFavorite = true;
    }

    return res.status(200).json({
      success: true,
      recipeId: id,
      isFavorite,
      favorites: inMemoryFavorites
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
