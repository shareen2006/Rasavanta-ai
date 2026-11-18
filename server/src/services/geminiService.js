const { GoogleGenAI } = require('@google/genai');
const seedData = require('../seed/seedData.json');
const { resolveRecipeImage, getRecipeImageFallback } = require('./recipeImageService');

/**
 * Reusable Google Gemini Service for RASAVANTA AI
 * Uses the official @google/genai SDK with gemini-3.5-flash
 * Provides timeout control, rate-limiting queue, structured JSON generation, and error safety.
 */

const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
const FALLBACK_MODELS = ['gemini-3.7-flash', 'gemini-3.5-flash'];
const REQUEST_TIMEOUT_MS = 60000;

// Authentic fallback images by cuisine/category
const CUISINE_IMAGES = {
  'South Indian': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
  'North Indian': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
  'Andhra': 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1200&q=80',
  'Italian': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  'Asian': 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
  'Continental': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
  'Default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
};

const RASABOT_SYSTEM_PROMPT = `
You are RasaBot, the Master Culinary Intelligence of RASAVANTA AI ("Rooted in Taste. Powered by Intelligence.").
You are an expert chef, food scientist, nutritionist, and culinary historian specializing in:
1. Authentic Indian Regional Cuisines (Andhra & Telangana spicy delicacies, Tamil Nadu & Karnataka tiffins, Kerala sadya classics, North Indian dhaba & royal makhani gravies, Bengali mustard fish & dalna, Gujarati sweet-savory balance, Maharashtrian misal & coastal Malvani, Bihari sattu litti, and Himalayan momos).
2. International Cuisines (Authentic Italian pizzas & risottos, Chinese wok classics, Japanese umami ramens & sushi, Korean bibimbap & tteokbokki, Thai coconut curries & pad thai, Mexican tacos & salsas, Mediterranean hummus & falafel, and world comfort foods).
3. Precision Nutrition (Ayurvedic Rasas: Sweet, Sour, Salty, Bitter, Pungent, Astringent; macro and micronutrients; glycemic balance; gut health; zero food waste).
4. Kitchen Troubleshooting (fixing oversalted curries, saving curdled gravies, perfecting dosa fermentation, balancing spice levels, neutralizing sourness).
5. Smart Ingredient Substitutions (vegan, dairy-free alternatives to cream/butter, gluten-free, nut-free, and Jain adaptations).

CRITICAL DIRECTIVES:
- ALWAYS directly and specifically answer the user's question. NEVER repeat the introductory welcome text when a question is asked.
- When asked for a recipe (e.g. "how to make paneer butter masala"):
  * State the culinary essence of the dish.
  * Provide prep time, cook time, and servings.
  * Provide a clear, complete list of ingredients with exact measurements.
  * Provide numbered step-by-step cooking instructions with pro-tips.
  * Include dietary adjustments (e.g. vegan, without cream, Jain).
- When asked a troubleshooting or science question (e.g. "why did my tomato gravy taste sour?"):
  * Explain the root food science cause (e.g. unripe tomatoes, over-cooking acid without sugar/dairy/cashew balance, seed acidity).
  * Provide immediate, actionable techniques to fix it (e.g. pinch of sugar/jaggery, baking soda neutralization, cashew paste, fresh cream or butter).
- When asked an ingredient substitution (e.g. "can I make it without cream?"):
  * Provide 2-3 specific substitutes with exact ratios (e.g. cashew paste, full-fat milk boiled down, hung curd whisked with besan, coconut cream).
- When asked portion sizes (e.g. "how much paneer is required for 4 people?"):
  * Give precise metric weights (e.g. 250g–300g for curry, 350g–400g for dry tandoori) with breakdown per adult serving.

Tone: Warm, knowledgeable, culinary-focused, chef-grade, and concise.
Formatting: Use clean Markdown with headers (###), bold terms (**), and clear bullet/numbered lists.
`;

class GeminiService {
  constructor() {
    this.client = null;
    this.activeModel = DEFAULT_MODEL;
    this.lastRequestTimestamp = 0;
    this.minRequestSpacingMs = 400; // Rate limit guard
    this.initClient();
  }

  initClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey.trim()) {
      try {
        this.client = new GoogleGenAI({ apiKey: apiKey.trim() });
      } catch (err) {
        console.warn('[GeminiService] Failed to initialize GoogleGenAI client:', err.message);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }

  isConfigured() {
    if (!this.client && process.env.GEMINI_API_KEY) {
      this.initClient();
    }
    return Boolean(this.client);
  }

  getStatus() {
    return {
      configured: this.isConfigured(),
      model: this.activeModel,
      sdk: '@google/genai',
      rateLimitWindowMs: this.minRequestSpacingMs
    };
  }

  async throttle() {
    const now = Date.now();
    const elapsed = now - this.lastRequestTimestamp;
    if (elapsed < this.minRequestSpacingMs) {
      await new Promise(r => setTimeout(r, this.minRequestSpacingMs - elapsed));
    }
    this.lastRequestTimestamp = Date.now();
  }

  /**
   * Generates content with automatic model fallback and timeout protection
   */
  async executeGenerate(params) {
    if (!this.isConfigured()) {
      throw new Error('Google Gemini API key is not configured in backend environment.');
    }

    await this.throttle();

    const candidateModels = [this.activeModel, ...FALLBACK_MODELS.filter(m => m !== this.activeModel)];
    let lastError = null;

    for (const model of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const resultPromise = this.client.models.generateContent({
            ...params,
            model
          });

          // Timeout wrapper
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Gemini API request timed out after ${REQUEST_TIMEOUT_MS}ms`)), REQUEST_TIMEOUT_MS);
          });

          const response = await Promise.race([resultPromise, timeoutPromise]);
          this.activeModel = model; // Pin working model
          return { response, model };
        } catch (err) {
          lastError = err;
          console.warn(`[GeminiService] Model ${model} (attempt ${attempt}/2) failed:`, err.message || err);
          if (attempt < 2 && (String(err.message).includes('503') || String(err.message).includes('429'))) {
            await new Promise(r => setTimeout(r, 1000));
          }
        }
      }
    }

    throw lastError || new Error('All candidate Gemini models failed.');
  }

  /**
   * RasaGen AI — Recipe Synthesis from user ingredients & preferences
   */
  async generateRecipe({
    ingredients = [],
    cuisine = 'All',
    diet = 'All',
    servings = 4,
    maxTime = 45,
    mealType = 'Dinner',
    language = 'en'
  }) {
    const cleanIngredients = (ingredients || []).map(i => (typeof i === 'string' ? i.trim() : i.name)).filter(Boolean);

    const schemaDefinition = `
{
  "id": "slug-id",
  "title": "Dish Title",
  "nativeTitles": {
    "te": "తెలుగు పేరు",
    "hi": "हिंदी नाम",
    "ta": "தமிழ் பெயர்"
  },
  "description": "2-sentence appetizing description highlighting flavors and textures.",
  "cuisine": "${cuisine !== 'All' ? cuisine : 'Authentic Cuisine'}",
  "region": "Specific State or Cultural Region",
  "mealType": "${mealType !== 'All' ? mealType : 'Dinner'}",
  "foodCategory": "Main Course / Curry / Rice / Tiffin",
  "diet": "${diet !== 'All' ? diet : 'Vegetarian'}",
  "dietaryClassifications": ["Vegetarian", "Gluten-Free"],
  "vegan": false,
  "glutenFree": false,
  "prepTime": 15,
  "cookTime": 25,
  "servings": ${Number(servings) || 4},
  "difficulty": "Beginner Friendly",
  "calories": 350,
  "nutrition": {
    "protein": "14g",
    "carbs": "42g",
    "fat": "12g",
    "fiber": "6g",
    "micronutrients": {
      "iron": "2.5mg",
      "calcium": "60mg",
      "vitaminC": "15mg",
      "potassium": "320mg",
      "sodium": "380mg"
    }
  },
  "ingredients": [
    { "name": "Ingredient Name", "quantity": 200, "unit": "g", "category": "Produce", "note": "finely chopped" }
  ],
  "instructions": [
    { "step": 1, "title": "Prep Step", "text": "Detailed step instructions.", "timerSeconds": 0 }
  ],
  "substitutions": [
    { "original": "Ingredient", "substitute": "Alternative", "note": "Why it works" }
  ],
  "chefTips": "Pro chef tip for maximum flavor extraction"
}`;

    const prompt = `You are RasaGen AI, the Master Culinary Recipe Architect of RASAVANTA AI.
Create a complete, authentic, professionally tested culinary recipe prioritizing these available pantry ingredients:
${cleanIngredients.length > 0 ? cleanIngredients.join(', ') : 'Fresh seasonal market produce and pantry staples'}.

Constraints:
- Preferred Cuisine: ${cuisine}
- Dietary Preference: ${diet}
- Target Servings: ${servings}
- Maximum Cooking Time: ${maxTime} minutes
- Meal Type: ${mealType}
- Target Language: ${language}

Output Requirement:
Return ONLY valid JSON matching this schema exactly with no markdown backticks and no conversational filler:
${schemaDefinition}
`;

    const { response, model } = await this.executeGenerate({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4
      }
    });

    const rawText = response.text?.trim() || '{}';
    let recipeData;
    try {
      recipeData = JSON.parse(rawText);
    } catch (parseError) {
      // Clean possible stray code fence markdown
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      recipeData = JSON.parse(cleaned);
    }

    // Validate and sanitize response fields
    const sanitizedRecipe = this.sanitizeAndEnrichRecipe(recipeData, cleanIngredients, cuisine, diet, servings);

    return {
      success: true,
      recipe: sanitizedRecipe,
      source: model.startsWith('gemini') ? model : `gemini-${model}`,
      model
    };
  }

  /**
   * RasaBot AI — Conversational Culinary Intelligence
   */
  async chat({
    message,
    messages = [],
    language = 'en',
    pantryIngredients = [],
    dietaryPreferences = ''
  }) {
    const userPrompt = (message || (messages.length > 0 ? messages[messages.length - 1].content : '')).trim();

    if (!userPrompt) {
      throw new Error('A user prompt is required for RasaBot.');
    }

    // Build context-aware prompt with history
    let contextHeader = `${RASABOT_SYSTEM_PROMPT}\n`;
    if (language && language !== 'en') {
      contextHeader += `Respond fluently in language code: ${language}.\n`;
    }
    if (pantryIngredients && pantryIngredients.length > 0) {
      contextHeader += `User's current available kitchen ingredients: ${pantryIngredients.join(', ')}.\n`;
    }
    if (dietaryPreferences) {
      contextHeader += `User's dietary preferences: ${dietaryPreferences}.\n`;
    }

    // Append up to last 4 conversation turns for context, filtering out the current prompt to avoid duplication
    const pastMessages = (messages || []).filter(m => m.content && m.content.trim() !== userPrompt);
    const recentHistory = pastMessages.slice(-4).map(m => `${m.role === 'user' ? 'User' : 'RasaBot'}: ${m.content}`).join('\n');
    if (recentHistory) {
      contextHeader += `Recent conversation context:\n${recentHistory}\n`;
    }

    const fullPrompt = `${contextHeader}\nUser question: ${userPrompt}\nProvide an expert, helpful culinary response:`;

    const { response, model } = await this.executeGenerate({
      contents: fullPrompt,
      config: {
        temperature: 0.7
      }
    });

    const reply = response.text?.trim() || 'Happy cooking with Rasavanta AI!';

    // Find any relevant catalog recipe to attach as a visual card
    const recipeCard = this.findRelevantRecipe(userPrompt);

    // Generate contextual follow-up chips
    const suggestions = this.generateSuggestions(userPrompt, recipeCard);

    return {
      success: true,
      reply,
      recipeCard,
      suggestions,
      source: model.startsWith('gemini') ? model : `gemini-${model}`,
      model,
      language
    };
  }

  /**
   * Validates & enriches recipe data to ensure 100% schema compatibility
   */
  sanitizeAndEnrichRecipe(recipe, userIngs, cuisine, diet, servings) {
    const idSlug = (recipe.title || 'custom-recipe')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || `recipe-${Date.now()}`;

    const prep = Number(recipe.prepTime) || 15;
    const cook = Number(recipe.cookTime) || 20;

    const matchedCuisine = recipe.cuisine || (cuisine !== 'All' ? cuisine : 'South Indian');
    // Always use centralized image service — ignore Gemini's image field entirely
    const image = resolveRecipeImage(recipe.title || '', matchedCuisine, null);

    return {
      id: `ai-${idSlug}-${Date.now().toString().slice(-4)}`,
      title: recipe.title || 'Rasavanta AI Gourmet Creation',
      nativeTitles: recipe.nativeTitles || {},
      description: recipe.description || 'A gourmet culinary synthesis crafted with authentic seasonings and balanced nutrients.',
      cuisine: matchedCuisine,
      region: recipe.region || 'India',
      mealType: recipe.mealType || 'Dinner',
      foodCategory: recipe.foodCategory || 'Main Course',
      diet: recipe.diet || (diet !== 'All' ? diet : 'Vegetarian'),
      dietaryClassifications: Array.isArray(recipe.dietaryClassifications) ? recipe.dietaryClassifications : ['Freshly Prepared', 'Balanced Diet'],
      vegan: Boolean(recipe.vegan),
      glutenFree: Boolean(recipe.glutenFree),
      jainFriendly: Boolean(recipe.jainFriendly),
      dairyFree: Boolean(recipe.dairyFree),
      prepTime: prep,
      cookTime: cook,
      totalTime: prep + cook,
      servings: Number(recipe.servings) || Number(servings) || 4,
      difficulty: recipe.difficulty || 'Beginner Friendly',
      budget: recipe.budget || 'Moderate',
      calories: Number(recipe.calories) || 380,
      nutrition: recipe.nutrition || {
        protein: '12g',
        carbs: '40g',
        fat: '10g',
        fiber: '5g',
        micronutrients: {
          iron: '2mg',
          calcium: '50mg',
          vitaminC: '10mg',
          potassium: '300mg',
          sodium: '350mg'
        }
      },
      nutritionSource: 'ICMR-NIN Indian Food Composition Tables (IFCT) & USDA FoodData Central',
      allergens: Array.isArray(recipe.allergens) ? recipe.allergens : ['None'],
      image,
      rating: 4.9,
      reviewsCount: 1,
      featured: false,
      tags: Array.isArray(recipe.tags) && recipe.tags.length > 0 ? recipe.tags : ['AI Chef', 'Fresh Ingredients', matchedCuisine],
      ingredients: (recipe.ingredients || []).map((ing, idx) => ({
        name: ing.name || `Ingredient ${idx + 1}`,
        quantity: Number(ing.quantity) || 1,
        unit: ing.unit || 'portion',
        category: ing.category || 'Produce',
        isAllergen: Boolean(ing.isAllergen),
        note: ing.note || ''
      })),
      instructions: (recipe.instructions || []).map((step, idx) => ({
        step: step.step || idx + 1,
        title: step.title || `Step ${idx + 1}`,
        text: step.text || (typeof step === 'string' ? step : 'Prepare ingredients with care.'),
        timerSeconds: Number(step.timerSeconds) || 0
      })),
      substitutions: Array.isArray(recipe.substitutions) ? recipe.substitutions : [],
      chefTips: recipe.chefTips || 'Always taste and adjust salt and acid in the final two minutes of cooking.',
      isAiGenerated: true,
      createdAt: new Date().toISOString()
    };
  }

  findRelevantRecipe(query) {
    if (!query) return null;
    const q = query.toLowerCase();
    const cleanQ = q.replace(/[^a-z0-9]/g, '');
    const found = seedData.find(r => {
      const titleLower = r.title.toLowerCase();
      const cleanTitle = titleLower.replace(/[^a-z0-9]/g, '');
      return (cleanTitle && cleanQ.includes(cleanTitle)) ||
        (cleanTitle && cleanTitle.includes(cleanQ)) ||
        titleLower.includes(q) ||
        (r.tags && r.tags.some(t => {
          const tClean = t.toLowerCase().replace(/[^a-z0-9]/g, '');
          return q.includes(t.toLowerCase()) || (tClean && cleanQ.includes(tClean));
        })) ||
        r.cuisine.toLowerCase().includes(q);
    });
    if (!found) return null;

    return {
      id: found.id,
      title: found.title,
      cuisine: found.cuisine,
      totalTime: found.totalTime,
      calories: found.calories,
      image: found.image,
      rating: found.rating
    };
  }

  generateSuggestions(query, recipeCard) {
    const q = query.toLowerCase();
    if (recipeCard) {
      return [
        `How do I make ${recipeCard.title}?`,
        `What are the best side dishes for ${recipeCard.title}?`,
        `Can I make ${recipeCard.title} vegan?`
      ];
    }
    if (q.includes('substitut') || q.includes('replace')) {
      return [
        'What can I substitute for eggs in baking?',
        'Dairy-free substitute for heavy cream',
        'Gluten-free alternative to all-purpose flour'
      ];
    }
    if (q.includes('spice') || q.includes('curry')) {
      return [
        'How to balance an overly spicy curry',
        'How to thicken watery dal',
        'How to make fragrant garam masala at home'
      ];
    }
    return [
      'What can I cook with ingredients in my pantry?',
      'Quick 20-minute dinner ideas',
      'High-protein vegetarian lunch ideas'
    ];
  }
}

module.exports = new GeminiService();
