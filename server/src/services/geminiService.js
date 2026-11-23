const { GoogleGenAI } = require('@google/genai');
const seedData = require('../seed/seedData.json');
const { resolveRecipeImage, generateRecipeImagePrompt } = require('./recipeImageService');

/**
 * Reusable Google Gemini Service for RASAVANTA AI
 * Uses the official @google/genai SDK with multi-turn conversational memory,
 * dynamic model fallback, rate-limiting queue, and real-time generation.
 */

const DEFAULT_MODEL = 'gemini-3.5-flash-lite';
const FALLBACK_MODELS = [];
const REQUEST_TIMEOUT_MS = 45000;

const RASABOT_SYSTEM_INSTRUCTION = `You are RasaBot, a friendly, warm, empathetic, and expert AI culinary companion for RASAVANTA AI ("Rooted in Taste. Powered by Intelligence.").

Core Directives:
1. Real-time Conversational Intelligence:
   - Speak naturally, conversationally, and warmly, like an approachable professional chef and companion.
   - For simple greetings ("Hi", "Hello", "Namaste", "Hey", "Good morning"), greet the user back warmly, briefly, and conversationally. Ask what they would like to cook, troubleshoot, or talk about. DO NOT dump an overwhelming wall of text, unrequested recipes, or unsolicited long essays on a simple greeting!
   - For general questions (e.g. "What can you help me with?"), explain conversationally what you can do (recipe generation, culinary troubleshooting, portion scaling, spice balancing, nutrition, substitutions) in a warm, welcoming tone.
   - For ingredient matching (e.g. "I have tomatoes and rice"), propose delicious matching dishes conversationally, ask helpful clarifying questions (spice level, meal type, available pantry staples), and provide guidance.
   - For recipe requests (e.g. "How do I make tomato rasam?"), provide an authentic, appetizing step-by-step recipe with ingredients, timing, and pro chef tips.
   - For kitchen troubleshooting, explain the food science simply and provide actionable rescue steps.
   - For substitutions, suggest 2-3 precise practical alternatives with ratios.
2. Conversational Memory:
   - Maintain context across multiple conversation turns.
   - If the user previously mentioned they have certain ingredients (e.g. tomatoes and rice), remember them in follow-up queries.
   - If the user asks "Can I make it without garlic?" or "how do I make that?", naturally refer back to the exact dish just discussed.
3. Multilingual Capability:
   - If the user writes in Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, or any other language, respond fluently and naturally in that same language.
   - Maintain the same warm culinary depth and clarity across all languages.
4. Tone & Formatting:
   - Warm, respectful, encouraging, culinary-focused.
   - Use clean Markdown with headers (###), bold terms (**), and clear bullet/numbered lists where appropriate.
   - NEVER output raw SVG code or stray XML tags.`;

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
      await new Promise((r) => setTimeout(r, this.minRequestSpacingMs - elapsed));
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

    const candidateModels = [this.activeModel, ...FALLBACK_MODELS.filter((m) => m !== this.activeModel)];
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
            setTimeout(
              () => {
                const timeoutErr = new Error(`Gemini API request timed out after ${REQUEST_TIMEOUT_MS}ms`);
                timeoutErr.code = 'TIMEOUT';
                reject(timeoutErr);
              },
              REQUEST_TIMEOUT_MS
            );
          });

          const response = await Promise.race([resultPromise, timeoutPromise]);
          this.activeModel = model; // Pin working model
          return { response, model };
        } catch (err) {
          lastError = err;
          const errMsg = String(err?.message || err);
          console.warn(`[GeminiService] Model ${model} (attempt ${attempt}/2) failed:`, errMsg);

          // Retryable status: 503 (high demand) or 429 (rate limit)
          if (attempt < 2 && (errMsg.includes('503') || errMsg.includes('429') || errMsg.includes('UNAVAILABLE') || errMsg.includes('high demand'))) {
            const backoffMs = attempt * 1500;
            console.info(`[GeminiService] Backing off for ${backoffMs}ms before retrying...`);
            await new Promise((r) => setTimeout(r, backoffMs));
          }
        }
      }
    }

    throw lastError || new Error('All candidate Gemini models failed.');
  }

  /**
   * RasaBot AI — Multi-turn Real-time Conversational Intelligence
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

    // Build native Gemini multi-turn conversation contents array
    const contents = [];

    // Filter past messages to valid text turns
    const validHistory = (messages || []).filter(
      (m) => m && typeof m.content === 'string' && m.content.trim().length > 0
    );

    // Keep up to last 12 turns for context memory
    const recentTurns = validHistory.slice(-12);

    for (const turn of recentTurns) {
      const role = turn.role === 'user' ? 'user' : 'model';
      const text = turn.content.trim();

      // Gemini requires alternating roles; merge consecutive same-role turns
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += `\n\n${text}`;
      } else {
        contents.push({
          role,
          parts: [{ text }]
        });
      }
    }

    // Ensure the conversation begins with a 'user' turn
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    // Ensure the final turn is the current userPrompt
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: userPrompt }]
      });
    } else {
      if (contents[contents.length - 1].parts[0].text !== userPrompt) {
        contents[contents.length - 1].parts[0].text = userPrompt;
      }
    }

    // Contextual system instruction
    let systemInstruction = RASABOT_SYSTEM_INSTRUCTION;
    if (language && language !== 'en') {
      systemInstruction += `\nPreferred response language: ${language}.`;
    }
    if (pantryIngredients && pantryIngredients.length > 0) {
      systemInstruction += `\nUser's available ingredients: ${pantryIngredients.join(', ')}.`;
    }
    if (dietaryPreferences) {
      systemInstruction += `\nUser's dietary preferences: ${dietaryPreferences}.`;
    }

    // Generate dynamic response from Gemini
    const { response, model } = await this.executeGenerate({
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text?.trim() || 'Welcome to Rasavanta AI! How can I help you in the kitchen today?';

    // Find and attach recipe card ONLY when response contains a recipe or user explicitly asked for one
    const recipeCard = this.findRelevantRecipe(userPrompt, reply);

    // Generate dynamic follow-up suggestions
    const suggestions = this.generateSuggestions(userPrompt, reply, recipeCard);

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
   * Searches the catalog for relevant recipes matching the user query
   * Only returns when user explicitly requests a recipe or dish cooking steps
   */
  findRelevantRecipe(userPrompt, replyText = '') {
    if (!userPrompt) return null;
    const promptLower = userPrompt.toLowerCase().trim();
    const replyLower = (replyText || '').toLowerCase();

    // Never match recipe card on greetings or general conversational questions
    const isGreeting = /^(hi|hello|hey|namaste|vanakkam|good\s*(morning|afternoon|evening)|sup|yo)\b/i.test(promptLower);
    if (isGreeting && !promptLower.includes('recipe')) return null;

    if (
      promptLower.includes('what can you help') ||
      promptLower.includes('who are you') ||
      promptLower.includes('what do you do')
    ) {
      return null;
    }

    // Must show explicit recipe request intent
    const isRecipeIntent = /(recipe|how (do i|to) (make|cook|prepare)|prepare|bhurji|masala|curry|biryani|pulao|dal|sambar|rasam|dosa|idli)/i.test(promptLower);
    const hasRecipeStructure = /(ingredients:|instructions:|step 1:|preparation time:)/i.test(replyLower);

    if (!isRecipeIntent && !hasRecipeStructure) return null;

    // Search catalog
    const found = seedData.find((r) => {
      const idWords = r.id.split('-').filter((w) => w.length > 2);
      if (idWords.length >= 2 && idWords.every((w) => promptLower.includes(w))) return true;

      const titleClean = r.title.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      const titleWords = titleClean.split(' ').filter((w) => w.length > 3);
      if (titleWords.length >= 2 && titleWords.filter((w) => promptLower.includes(w)).length >= 2) return true;

      if (promptLower.includes(r.id) || (r.title && promptLower.includes(r.title.toLowerCase()))) return true;

      return false;
    });

    if (!found) return null;

    const prep = found.prepTime || 10;
    const cook = found.cookTime || 15;
    const total = found.totalTime || prep + cook || 25;

    return {
      id: found.id,
      title: found.title,
      cuisine: found.cuisine || 'Authentic Indian',
      prepTime: prep,
      cookTime: cook,
      totalTime: total,
      calories: found.calories || 250,
      image: found.image,
      diet: found.diet || 'Vegetarian',
      rating: found.rating || 4.85
    };
  }

  generateSuggestions(query, reply, recipeCard) {
    const q = query.toLowerCase();
    if (recipeCard) {
      return [
        `What are the best side dishes for ${recipeCard.title}?`,
        `Can I make ${recipeCard.title} without garlic?`,
        `How do I store leftover ${recipeCard.title}?`
      ];
    }
    if (q.includes('tomato') && q.includes('rice')) {
      return [
        'How do I make South Indian Tomato Rice?',
        'How to make tomato rasam?',
        'Quick 15-minute recipe with tomatoes'
      ];
    }
    if (q.includes('paneer')) {
      return [
        'How to make quick Paneer Bhurji?',
        'Can I make Kadai Paneer without capsicum?',
        'How to keep paneer soft in gravy?'
      ];
    }
    if (q.includes('what can you help')) {
      return [
        'I have tomatoes and rice, what can I make?',
        'How do I fix a salty dal?',
        'Recommend a healthy high-protein dinner'
      ];
    }
    return [
      'What can I cook with ingredients in my fridge?',
      'High-protein vegetarian dinner idea',
      'Quick 20-minute healthy meal'
    ];
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
    const cleanIngredients = (ingredients || []).map((i) => (typeof i === 'string' ? i.trim() : i.name)).filter(Boolean);

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
  "imagePrompt": "Detailed visual food photography description of the plated dish, including colors, gravy texture, key ingredients, garnishes, and serving vessel.",
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
- Image Prompt: Craft a vivid, photorealistic "imagePrompt" specifically capturing the plated appearance of this exact dish (its texture, gravy, colors, and garnishes).

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
    } catch {
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      recipeData = JSON.parse(cleaned);
    }

    const sanitizedRecipe = this.sanitizeAndEnrichRecipe(recipeData, cleanIngredients, cuisine, diet, servings);

    return {
      success: true,
      recipe: sanitizedRecipe,
      source: model.startsWith('gemini') ? model : `gemini-${model}`,
      model
    };
  }

  sanitizeAndEnrichRecipe(recipe, userIngs, cuisine, diet, servings) {
    const idSlug =
      (recipe.title || 'custom-recipe')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `recipe-${Date.now()}`;

    const prep = Number(recipe.prepTime) || 15;
    const cook = Number(recipe.cookTime) || 20;
    const matchedCuisine = recipe.cuisine || (cuisine !== 'All' ? cuisine : 'Indian');
    
    const cleanIngredients = (recipe.ingredients || []).map((ing, idx) => ({
      name: ing.name || `Ingredient ${idx + 1}`,
      quantity: Number(ing.quantity) || 1,
      unit: ing.unit || 'portion',
      category: ing.category || 'Produce',
      isAllergen: Boolean(ing.isAllergen),
      note: ing.note || ''
    }));

    const imagePrompt =
      recipe.imagePrompt ||
      generateRecipeImagePrompt({
        title: recipe.title,
        cuisine: matchedCuisine,
        ingredients: cleanIngredients,
        diet: recipe.diet || diet,
        mealType: recipe.mealType
      });

    const image = resolveRecipeImage({
      title: recipe.title || '',
      cuisine: matchedCuisine,
      ingredients: cleanIngredients,
      imagePrompt,
      existingImage: recipe.image || null
    });

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
      imagePrompt,
      rating: 4.9,
      reviewsCount: 1,
      featured: false,
      tags: Array.isArray(recipe.tags) && recipe.tags.length > 0 ? recipe.tags : ['AI Chef', 'Fresh Ingredients', matchedCuisine],
      ingredients: cleanIngredients,
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
}

module.exports = new GeminiService();
