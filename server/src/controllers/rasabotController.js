const Recipe = require('../models/Recipe');
const recipesData = require('../seed/seedData.json');
const geminiService = require('../services/geminiService');

/**
 * Controller for RasaBot AI Text and Voice Chat
 * Uses the official Google Gemini SDK via GeminiService for real conversational intelligence,
 * with graceful fallback to local culinary intelligence when offline or unconfigured.
 */

exports.chat = async (req, res) => {
  try {
    const { 
      message, 
      messages = [], 
      language = 'en', 
      dietaryPreferences, 
      pantryIngredients = [] 
    } = req.body;

    const userPrompt = (message || (messages.length > 0 ? messages[messages.length - 1].content : '') || '').trim();

    if (!userPrompt) {
      return res.status(400).json({
        success: false,
        message: 'A message prompt is required.'
      });
    }

    // 1. If Gemini service is configured, use official @google/genai SDK
    if (geminiService.isConfigured()) {
      try {
        const geminiChatResult = await geminiService.chat({
          message: userPrompt,
          messages,
          language,
          pantryIngredients,
          dietaryPreferences
        });

        return res.status(200).json(geminiChatResult);
      } catch (geminiError) {
        console.warn('[Gemini Chat Warning]:', geminiError.message);
        if (req.query.strict === 'true' || req.body.strict === true) {
          return res.status(502).json({
            success: false,
            message: 'Failed to process chat with Gemini AI.',
            error: geminiError.message
          });
        }
      }
    }

    // 2. Intelligent Culinary Fallback Engine (when Gemini is unconfigured or offline)
    const fallbackResponse = generateCulinaryFallback(userPrompt, language);

    return res.status(200).json({
      success: true,
      reply: fallbackResponse.text,
      recipeCard: fallbackResponse.recipeCard,
      suggestions: fallbackResponse.suggestions,
      source: 'rasavanta-culinary-fallback',
      language
    });

  } catch (error) {
    console.error('RasaBot Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process conversation',
      error: error.message
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const status = geminiService.getStatus();
    return res.status(200).json({
      success: true,
      gemini: status
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * Searches the catalog for relevant recipes matching the user query
 */
function findRelevantRecipe(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  const cleanQ = q.replace(/[^a-z0-9]/g, '');

  const found = recipesData.find((r) => {
    const titleLower = r.title.toLowerCase();
    const cleanTitle = titleLower.replace(/[^a-z0-9]/g, '');
    return (cleanTitle && cleanQ.includes(cleanTitle)) ||
      (cleanTitle && cleanTitle.includes(cleanQ)) ||
      titleLower.includes(q) ||
      q.includes(titleLower) ||
      r.cuisine.toLowerCase().includes(q) ||
      (r.tags && r.tags.some(t => {
        const tClean = t.toLowerCase().replace(/[^a-z0-9]/g, '');
        return q.includes(t.toLowerCase()) || (tClean && cleanQ.includes(tClean));
      })) ||
      (r.ingredients && r.ingredients.some(i => {
        const name = (typeof i === 'string' ? i : i.name).toLowerCase();
        const cleanName = name.replace(/[^a-z0-9]/g, '');
        return cleanQ.includes(cleanName) || name.includes(q);
      }));
  });

  return found ? {
    id: found.id,
    title: found.title,
    cuisine: found.cuisine,
    image: found.image,
    prepTime: found.prepTime,
    cookTime: found.cookTime,
    calories: found.calories,
    diet: found.diet
  } : null;
}

/**
 * High-fidelity local culinary synthesis engine
 */
function generateCulinaryFallback(prompt, language) {
  const lower = prompt.toLowerCase();
  const clean = lower.replace(/[^a-z0-9]/g, '');

  // A. Recipe / Dish discovery
  const recipeMatch = findRelevantRecipe(lower);
  if (recipeMatch) {
    return {
      text: `Here is a curated chef recipe for **${recipeMatch.title}** from our culinary library. It is an authentic **${recipeMatch.cuisine}** specialty taking approximately **${(recipeMatch.prepTime || 0) + (recipeMatch.cookTime || 0)} minutes** with **${recipeMatch.calories} kcal** per serving.\n\n**Quick Overview:** Perfectly spiced with traditional aromatics and balanced textures.\n\nYou can click **View Full Recipe** below to see scaled ingredients, step timers, and full NutriSense™ nutritional data.`,
      recipeCard: recipeMatch,
      suggestions: [
        `Can I make ${recipeMatch.title} without cream?`,
        `How much paneer is required for four people?`,
        `Why did my tomato gravy taste sour?`
      ]
    };
  }

  // B. Sour tomato gravy troubleshooting
  if (lower.includes('sour') || lower.includes('tangy') || lower.includes('acidic')) {
    return {
      text: `### Why Tomato Gravy Tastes Sour & How to Fix It\n\n**Root Food Science Cause:**\nOverly sour tomato gravy is typically caused by cooking raw hybrid tomatoes too fast, using high-acid tomato varieties without balancing their natural citric and malic acids, or skipping a natural counter-balancing element.\n\n**Actionable Solutions:**\n1. **Add a Pinch of Sweetener:** Stir in 1/2 teaspoon of jaggery, raw honey, or sugar. This chemically softens harsh acidity without making the dish sweet.\n2. **Incorporate Fat or Dairy:** Stir in 2–3 tablespoons of fresh heavy cream, cashew paste, or unsalted butter. Dairy and nut fats coat the palate and mute sharp acid notes.\n3. **Alkaline Neutralizer (Baking Soda):** Add a tiny pinch (1/8 teaspoon) of baking soda. You will see gentle fizzing as it directly neutralizes the acid.\n4. **Simmer Longer with Ghee:** Simmer uncovered on low heat for 8–10 minutes with 1 tsp ghee so the tomato sugars naturally caramelize.`,
      suggestions: [
        "How to balance an overly spicy curry?",
        "Can I make paneer butter masala without cream?",
        "How much paneer is required for four people?"
      ]
    };
  }

  // C. Portions / Quantities
  if (lower.includes('how much') || lower.includes('quantity') || clean.includes('fourpeople') || clean.includes('4people') || lower.includes('servings')) {
    return {
      text: `### Portion Guidelines: Paneer for 4 People\n\nWhen preparing a main-course curry like **Paneer Butter Masala** for **4 adults**:\n\n- **Recommended Quantity:** **300g to 400g of fresh paneer** (approx. 75g–100g per person).\n- **Cut:** Uniform 1-inch (2.5 cm) cubes.\n- **Gravy Balance:** Use 4 medium ripe tomatoes (approx. 400g), 1 medium onion (optional), 15–18 soaked cashew nuts, 2 tbsp butter, and 2 tbsp fresh cream.\n\n**Pro Chef Tip:** Soak the paneer cubes in lukewarm salted water for 10 minutes before sliding them into the simmering gravy. This guarantees they stay pillowy soft!`,
      suggestions: [
        "Can I make it without cream?",
        "Why did my tomato gravy taste sour?",
        "How to make restaurant-style Paneer Butter Masala"
      ]
    };
  }

  // D. Without cream query
  if (lower.includes('without cream') || lower.includes('no cream')) {
    return {
      text: `### How to Make Rich Gravy Without Heavy Cream\n\nYes! You can achieve rich, velvety gravy without heavy cream using these chef-tested alternatives:\n\n1. **Soaked Cashew or Almond Puree:** Soak 15 cashews in warm water for 15 minutes and blend into a silk-smooth paste with 3 tablespoons of water or milk.\n2. **Whisked Curd (Yogurt) with Besan:** Whisk 3 tablespoons of fresh curd with 1/2 teaspoon of gram flour (besan) to prevent splitting. Lower the flame and stir constantly.\n3. **Thick Coconut Milk:** Adds a subtle natural sweetness and velvety body, perfect for a lactose-free or vegan adaptation.\n4. **Pureed Paneer Slurry:** Crumble 30g of fresh paneer with 3 tbsp warm milk in a blender into a smooth puree and fold it in during the final 3 minutes of simmering.`,
      suggestions: [
        "How much paneer is required for four people?",
        "Why did my tomato gravy taste sour?",
        "How to make restaurant-style Paneer Butter Masala"
      ]
    };
  }

  // E. Troubleshooting: Too salty
  if (lower.includes('salty') || lower.includes('too much salt')) {
    return {
      text: `### How to Fix an Oversalted Curry or Gravy\n\n1. **Raw Potato Technique:** Peel and halve a raw potato and drop it into the simmering curry for 10–12 minutes. The potato starch absorbs excess salt without altering flavor. Remove before serving.\n2. **Dairy or Coconut Balance:** Stir in 2–3 tablespoons of fresh cream, thick unsweetened curd (yogurt), or coconut milk to mellow the salinity.\n3. **Acid Counterbalance:** Squeeze fresh lemon juice or add a pinch of raw jaggery. Acid and sweetness naturally cut through harsh saltiness.\n4. **Dilute with Broth or Roasted Besan:** Add a splash of warm water or sauté 1 tbsp gram flour (besan) in ghee and whisk it in to build body.`,
      suggestions: ["How to fix curds splitting in gravy?", "My curry is too spicy, what to do?"]
    };
  }

  // F. Troubleshooting: Too spicy / fiery
  if (lower.includes('spicy') || lower.includes('too hot') || lower.includes('chillies')) {
    return {
      text: `### How to Temper Excess Heat & Chillies\n\n- **Fat Soluble Neutralizers:** Capsaicin dissolves in fat. Swirl in pure desi ghee, butter, fresh malai, or coconut cream.\n- **Sweet Contrast:** Add 1/2 teaspoon of jaggery or honey to round off sharp chili notes.\n- **Acidic Balance:** Lemon juice, lime juice, or chopped vine tomatoes help soften aggressive capsaicin heat.\n- **Serve with Raita:** Pair the dish with chilled cucumber or pomegranate mint raita.`,
      suggestions: ["How to store coriander fresh?", "Best substitute for tamarind?"]
    };
  }

  // G. Ingredient Substitutions
  if (lower.includes('substitute') || lower.includes('replace') || lower.includes('instead of')) {
    if (lower.includes('tamarind')) {
      return {
        text: `### Best Substitutes for Tamarind:\n\n- **Raw Mango Powder (Amchur):** 1 tsp amchur = 1 tbsp tamarind extract. Excellent for rasams, dals, and stuffed curries.\n- **Kokum:** 2–3 soaked kokum petals impart a gentle fruity tartness (especially in Maharashtrian and Goan dishes).\n- **Lemon Juice + Pinch of Jaggery:** Squeeze fresh lemon off the heat with a tiny pinch of raw sugar to mimic tamarind's complex sour-sweet profile.`,
        suggestions: ["Substitute for paneer?", "Substitute for curd/yogurt?"]
      };
    }
    if (lower.includes('paneer')) {
      return {
        text: `### Best Substitutes for Paneer:\n\n- **Organic Firm Tofu:** Pressed and lightly pan-seared with salt and turmeric, tofu mimics paneer's texture while being 100% plant-based and lower in saturated fat.\n- **Halloumi or Queso Blanco:** Great firm cheeses that hold their shape under high heat.\n- **Baby Potatoes / Mushrooms:** For rich gravies like Makhani or Korma, button mushrooms and roasted baby potatoes absorb masala brilliantly.`,
        suggestions: ["How to make homemade paneer?", "Nutritional difference between tofu and paneer?"]
      };
    }
    return {
      text: `I can provide precision substitutions for spices, thickeners, dairy, and grains. Which specific ingredient would you like to swap, and are you targeting a **vegan**, **gluten-free**, **Jain**, or **low-calorie** option?`,
      suggestions: ["Substitute for butter in baking?", "Substitute for cashew paste in gravies?", "Substitute for garlic?"]
    };
  }

  // H. Kitchen Storage Advice
  if (lower.includes('store') || lower.includes('preserve') || lower.includes('freeze')) {
    return {
      text: `### Kitchen Storage Wisdom:\n\n- **Fresh Coriander & Mint:** Trim lower root stems, place upright in a glass with 1 inch of water covered loosely with a clean cotton bag in the fridge door. Keeps vibrant for up to 14 days.\n- **Ginger-Garlic Paste:** Add 1 teaspoon of hot oil and a pinch of turmeric while grinding. Store in a sterilized glass jar for 3–4 weeks without color oxidation.\n- **Idli/Dosa Batter:** After optimal fermentation, immediately move the batter to the refrigerator's coldest zone to prevent over-souring.`,
      suggestions: ["How long does cooked dal last?", "Best way to freeze biryani?"]
    };
  }

  // I. Cooking / Recipe general query
  if (lower.includes('how to') || lower.includes('recipe') || lower.includes('cook') || lower.includes('make')) {
    return {
      text: `### Culinary Guidance\n\nTo make this dish authentic and delicious:\n1. **Aromatics & Spices:** Bloom whole spices (cumin, cardamom, cloves) in warm ghee or oil until fragrant.\n2. **Base Gravy:** Sauté onions till golden, add ginger-garlic paste, and cook until the raw aroma dissipates. Fold in pureed ripe tomatoes with turmeric, coriander, and kashmiri red chilli powder until oil separates.\n3. **Simmer & Rest:** Add your protein or vegetables, simmer gently so flavors penetrate, and finish with crushed kasuri methi and fresh coriander.`,
      suggestions: [
        "How to balance an overly spicy curry?",
        "How to fix curry that is too sour?",
        "What can I cook with ingredients in my pantry?"
      ]
    };
  }

  // Default Conversational Response
  return {
    text: `Hello! I am **RasaBot**, your culinary intelligence companion at RASAVANTA AI.\n\nI can help you with:\n- **Recipe Discovery:** Tell me what ingredients you have in your kitchen or your favorite cuisine.\n- **Technique & Steps:** Cooking tips, temperature calibration, and timing.\n- **NutriSense™ Clarity:** Macronutrient breakdown, Ayurvedic rasas, and healthy swaps.\n- **Troubleshooting:** Rescuing oversalted curries, balancing spices, and storing pantry goods.\n\nWhat are you cooking or planning today?`,
    suggestions: [
      "What can I cook with paneer & tomatoes?",
      "High-protein South Indian dinner idea",
      "How to fix an oversalted curry?",
      "Low-calorie dessert under 150 kcal"
    ]
  };
}
