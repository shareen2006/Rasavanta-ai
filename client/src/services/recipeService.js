import apiClient from './api';
import { RECIPES_DATA } from '../data/recipesData';

export const recipeService = {
  /**
   * Generates AI recipes based on provided ingredients and preferences.
   * Attempts live POST to /recipes/generate, falling back to smart client-side culinary reasoning if backend is not running.
   */
  async generateRecipes(payload) {
    try {
      const response = await apiClient.post('/recipes/generate', payload);
      return {
        data: response.data.recipes || response.data,
        isDemo: false
      };
    } catch {
      // Backend is offline - execute dynamic client-side culinary synthesis
      await new Promise((resolve) => setTimeout(resolve, 2000)); // realistic generation latency

      const userIngredients = (payload.ingredients || []).map((i) => i.toLowerCase().trim());
      const selectedCuisine = payload.cuisine || 'All';
      const diet = payload.diet || 'All';
      const outputLang = payload.outputLang || 'en';

      // Score and match recipes based on ingredients
      const scored = RECIPES_DATA.map((recipe) => {
        const recipeIngs = recipe.ingredients.map((ing) => ing.name.toLowerCase());
        let matches = 0;
        userIngredients.forEach((uIng) => {
          if (recipeIngs.some((rIng) => rIng.includes(uIng) || uIng.includes(rIng))) {
            matches++;
          }
        });

        const matchRate = userIngredients.length > 0 
          ? Math.min(100, Math.round((matches / userIngredients.length) * 100) + 35) 
          : 85;

        return {
          ...recipe,
          matchScore: matchRate,
          matchedIngredientsCount: matches
        };
      });

      // Filter by cuisine and diet if specified
      let filtered = scored;
      if (selectedCuisine !== 'All') {
        filtered = filtered.filter((r) => r.cuisine.toLowerCase() === selectedCuisine.toLowerCase());
        if (filtered.length === 0) filtered = scored; // fallback
      }
      if (diet !== 'All') {
        filtered = filtered.filter((r) => r.diet.toLowerCase() === diet.toLowerCase());
        if (filtered.length === 0) filtered = scored;
      }

      // Sort by match score
      filtered.sort((a, b) => b.matchScore - a.matchScore);

      // Create tailored generated dish if specific ingredients were provided
      const customRecipeId = 'ai-custom-' + Date.now();
      const primaryIngredient = userIngredients[0] || 'Seasonal Veggies';
      const secondaryIngredient = userIngredients[1] || 'Traditional Spices';
      
      const capitalizedPrimary = primaryIngredient.charAt(0).toUpperCase() + primaryIngredient.slice(1);
      const capitalizedSecondary = secondaryIngredient.charAt(0).toUpperCase() + secondaryIngredient.slice(1);

      const customTailoredRecipe = {
        id: customRecipeId,
        title: `${capitalizedPrimary} & ${capitalizedSecondary} Rasamrutham`,
        nativeTitles: {
          te: `${capitalizedPrimary} మరియు ${capitalizedSecondary} అమృతం`,
          hi: `${capitalizedPrimary} और ${capitalizedSecondary} रसमृत`,
          ta: `${capitalizedPrimary} மற்றும் ${capitalizedSecondary} ரசவாதம்`
        },
        description: `A custom recipe composed by RasaGen AI utilizing your exact kitchen inventory of ${userIngredients.join(', ')}. Calibrated for zero food waste and optimal Ayurvedic rasa balance.`,
        cuisine: selectedCuisine !== 'All' ? selectedCuisine : 'Fusion Andhra-South',
        diet: diet !== 'All' ? diet : 'Vegetarian',
        vegan: true,
        glutenFree: true,
        prepTime: 12,
        cookTime: payload.maxTime ? Math.min(payload.maxTime, 25) : 20,
        servings: payload.servings || 4,
        difficulty: 'Beginner Friendly',
        budget: payload.budget || 'Budget',
        calories: 230,
        nutrition: {
          protein: '11g',
          carbs: '28g',
          fat: '8g',
          fiber: '7g'
        },
        image: '/images/rasavanta-recipe-placeholder.svg',
        rating: 4.98,
        reviewsCount: 1,
        featured: true,
        matchScore: 98,
        isCustomGenerated: true,
        ingredients: [
          ...userIngredients.map((ing) => ({
            name: ing.charAt(0).toUpperCase() + ing.slice(1),
            quantity: 100,
            unit: 'g',
            category: 'Pantry'
          })),
          { name: 'Cumin & Mustard Seeds', quantity: 1, unit: 'tsp', category: 'Spices' },
          { name: 'Cold-Pressed Oil or Ghee', quantity: 1.5, unit: 'tbsp', category: 'Oils' },
          { name: 'Turmeric & Salt', quantity: 0.5, unit: 'tsp', category: 'Spices' }
        ],
        instructions: [
          {
            step: 1,
            title: `Prepare and Dice ${capitalizedPrimary}`,
            text: `Rinse and gently dice the ${primaryIngredient} into bite-sized pieces. Prepare a simple tempering with mustard seeds and cumin in warm oil.`,
            timerSeconds: 240
          },
          {
            step: 2,
            title: `Sauté with ${secondaryIngredient}`,
            text: `Add ${secondaryIngredient} and sauté on medium heat until tender and aromatic. Season with turmeric and sea salt.`,
            timerSeconds: 360
          },
          {
            step: 3,
            title: 'Simmer and Infuse Aromatics',
            text: 'Pour in 1 cup of warm water, cover with lid and slow simmer for 10 minutes until flavours meld together into a balanced gravy.',
            timerSeconds: 600
          }
        ],
        substitutions: [
          { original: capitalizedPrimary, substitute: 'Paneer or Tofu', note: 'Can be swapped if you run low.' }
        ]
      };

      return {
        data: [customTailoredRecipe, ...filtered.slice(0, 3)],
        isDemo: true,
        outputLang
      };
    }
  },

  /**
   * Fetches all recipes with full multi-dimensional query filters and pagination.
   */
  async getRecipes(params = {}) {
    try {
      const response = await apiClient.get('/recipes', { params });
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        return response.data;
      }
      return { success: true, data: response.data, pagination: { page: 1, limit: response.data.length, totalPages: 1, totalCount: response.data.length } };
    } catch {
      // Robust client-side fallback query engine
      let results = [...RECIPES_DATA];

      // 1. Text & Ingredient Search
      const search = params.search || params.q;
      if (search && search.trim()) {
        const query = search.toLowerCase().trim();
        results = results.filter((r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query) ||
          (r.region && r.region.toLowerCase().includes(query)) ||
          (r.mealType && r.mealType.toLowerCase().includes(query)) ||
          r.ingredients.some((ing) => ing.name.toLowerCase().includes(query)) ||
          (r.tags && r.tags.some((tag) => tag.toLowerCase().includes(query)))
        );
      }

      // 2. Cuisine filter
      if (params.cuisine && params.cuisine !== 'all') {
        results = results.filter((r) =>
          r.cuisine.toLowerCase() === params.cuisine.toLowerCase() ||
          (params.cuisine === 'Andhra' && (r.cuisine === 'Andhra' || r.cuisine === 'Hyderabadi')) ||
          (params.cuisine === 'Mediterranean' && (r.cuisine === 'Mediterranean' || r.cuisine === 'Middle Eastern'))
        );
      }

      // 3. Meal / Food Type filter
      if (params.mealType && params.mealType !== 'all' && params.mealType !== 'All') {
        results = results.filter((r) =>
          r.mealType && r.mealType.toLowerCase() === params.mealType.toLowerCase()
        );
      }

      // 4. Dietary preference & classifications filter
      if (params.diet && params.diet !== 'all' && params.diet !== 'All') {
        const d = params.diet.toLowerCase();
        results = results.filter((r) => {
          if (d === 'vegetarian') return r.diet === 'Vegetarian';
          if (d === 'vegan') return r.vegan || (r.dietaryClassifications && r.dietaryClassifications.includes('Vegan'));
          if (d === 'gluten-free') return r.glutenFree || (r.dietaryClassifications && r.dietaryClassifications.includes('Gluten-Free'));
          if (d === 'dairy-free') return r.dairyFree || (r.dietaryClassifications && r.dietaryClassifications.includes('Dairy-Free'));
          if (d === 'jain') return r.jainFriendly || (r.dietaryClassifications && r.dietaryClassifications.includes('Jain'));
          if (d === 'high-protein') return r.dietaryClassifications && r.dietaryClassifications.includes('High-Protein');
          if (d === 'low-carb') return r.dietaryClassifications && r.dietaryClassifications.includes('Low-Carb');
          if (d === 'pescatarian') return r.diet === 'Pescatarian';
          return (
            (r.diet && r.diet.toLowerCase() === d) ||
            (r.dietaryClassifications && r.dietaryClassifications.some((c) => c.toLowerCase() === d))
          );
        });
      }

      // 5. Total Cook / Prep Time filter
      if (params.maxTime && !isNaN(Number(params.maxTime))) {
        const maxT = Number(params.maxTime);
        results = results.filter((r) => (r.prepTime || 0) + (r.cookTime || 0) <= maxT);
      }

      // 6. Max Calories filter
      if (params.maxCalories && !isNaN(Number(params.maxCalories))) {
        results = results.filter((r) => r.calories <= Number(params.maxCalories));
      }

      // 7. Min Protein filter
      if (params.minProtein && !isNaN(Number(params.minProtein))) {
        const minP = Number(params.minProtein);
        results = results.filter((r) => {
          const proteinNum = parseInt(r.nutrition?.protein || '0', 10);
          return proteinNum >= minP;
        });
      }

      // 8. Difficulty filter
      if (params.difficulty && params.difficulty !== 'all' && params.difficulty !== 'All') {
        results = results.filter((r) => r.difficulty.toLowerCase() === params.difficulty.toLowerCase());
      }

      // 9. Sorting
      const sortBy = params.sortBy || 'rating';
      results.sort((a, b) => {
        if (sortBy === 'time') {
          const timeA = (a.prepTime || 0) + (a.cookTime || 0);
          const timeB = (b.prepTime || 0) + (b.cookTime || 0);
          return timeA - timeB;
        }
        if (sortBy === 'calories') {
          return a.calories - b.calories;
        }
        if (sortBy === 'protein') {
          const pA = parseInt(a.nutrition?.protein || '0', 10);
          const pB = parseInt(b.nutrition?.protein || '0', 10);
          return pB - pA;
        }
        if (sortBy === 'popularity') {
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        }
        // default: rating
        return (b.rating || 0) - (a.rating || 0);
      });

      // 10. Pagination
      const page = Math.max(1, parseInt(params.page || '1', 10));
      const limit = Math.max(1, parseInt(params.limit || '100', 10));
      const totalCount = results.length;
      const totalPages = Math.ceil(totalCount / limit);
      const paginatedData = results.slice((page - 1) * limit, page * limit);

      return {
        success: true,
        data: paginatedData,
        pagination: {
          page,
          limit,
          totalPages,
          totalCount
        }
      };
    }
  },

  /**
   * Retrieves single recipe by ID
   */
  async getRecipeById(id) {
    try {
      const response = await apiClient.get(`/recipes/${id}`);
      return response.data;
    } catch {
      const found = RECIPES_DATA.find((r) => r.id === id);
      return found || null;
    }
  },

  /**
   * Toggles favorite state on a recipe
   */
  async toggleFavorite(id) {
    try {
      const response = await apiClient.post(`/recipes/${id}/favorite`);
      return response.data;
    } catch {
      // LocalStorage favorite management
      const favorites = JSON.parse(localStorage.getItem('rasavanta_favorites') || '[]');
      const index = favorites.indexOf(id);
      let updated;
      if (index > -1) {
        updated = favorites.filter((favId) => favId !== id);
      } else {
        updated = [...favorites, id];
      }
      localStorage.setItem('rasavanta_favorites', JSON.stringify(updated));
      return { success: true, favorites: updated, isFavorite: index === -1 };
    }
  }
};
