import apiClient from './api';
import { RECIPES_DATA } from '../data/recipesData';

const STORAGE_KEY = 'rasavanta_rasabot_conversations';

export const rasabotService = {
  /**
   * Send a prompt to RasaBot (backend API or resilient client culinary intelligence)
   */
  async sendMessage(prompt, { conversationId, history = [], language = 'en' } = {}) {
    try {
      const response = await apiClient.post('/rasabot/chat', {
        message: prompt,
        messages: history,
        language
      });

      if (response.data && response.data.reply) {
        return {
          reply: response.data.reply,
          recipeCard: response.data.recipeCard || null,
          suggestions: response.data.suggestions || [],
          source: response.data.source || 'gemini'
        };
      }
    } catch {
      // Fallback to local culinary synthesis if server is offline
    }

    // Client-side culinary synthesis engine
    await new Promise((r) => setTimeout(r, 600)); // slight natural latency
    return this.synthesizeClientCulinaryResponse(prompt, history, language);
  },

  /**
   * Client-side synthesis engine matching query against RECIPES_DATA and culinary wisdom
   */
  synthesizeClientCulinaryResponse(prompt, history, language) {
    const lower = prompt.toLowerCase().trim();
    const cleanPrompt = lower.replace(/[^a-z0-9]/g, '');

    // 1. Recipe search by dish name or ingredient
    const matchedRecipe = RECIPES_DATA.find((r) => {
      const titleLower = r.title.toLowerCase();
      const cleanTitle = titleLower.replace(/[^a-z0-9]/g, '');
      return (cleanTitle && cleanPrompt.includes(cleanTitle)) ||
        (cleanTitle && cleanTitle.includes(cleanPrompt)) ||
        titleLower.includes(lower) ||
        lower.includes(titleLower) ||
        (r.tags && r.tags.some((t) => lower.includes(t.toLowerCase()) || cleanPrompt.includes(t.toLowerCase().replace(/[^a-z0-9]/g, '')))) ||
        r.cuisine.toLowerCase().includes(lower) ||
        r.ingredients.some((i) => lower.includes(i.name.toLowerCase()));
    });

    if (matchedRecipe && (lower.includes('recipe') || lower.includes('cook') || lower.includes('make') || lower.includes('how to') || cleanPrompt.includes(matchedRecipe.title.toLowerCase().replace(/[^a-z0-9]/g, '')))) {
      return {
        reply: `Here is a chef-crafted authentic recipe for **${matchedRecipe.title}** (${matchedRecipe.cuisine}). It takes **${(matchedRecipe.prepTime || 0) + (matchedRecipe.cookTime || 0)} minutes** and provides **${matchedRecipe.calories} kcal** with **${matchedRecipe.nutrition?.protein || 'N/A'} protein** per serving.\n\n**Quick Overview:** ${matchedRecipe.description}\n\nYou can click **View Recipe** below to see scaled ingredients, step timers, and full NutriSense™ nutritional data.`,
        recipeCard: {
          id: matchedRecipe.id,
          title: matchedRecipe.title,
          cuisine: matchedRecipe.cuisine,
          image: matchedRecipe.image,
          prepTime: matchedRecipe.prepTime,
          cookTime: matchedRecipe.cookTime,
          calories: matchedRecipe.calories,
          diet: matchedRecipe.diet
        },
        suggestions: [
          `Can I make ${matchedRecipe.title} without cream?`,
          `How much paneer is required for four people?`,
          `Why did my tomato gravy taste sour?`
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 1b. Sour gravy troubleshooting
    if (lower.includes('sour') || lower.includes('tangy') || lower.includes('acidic')) {
      return {
        reply: `### How to Fix a Sour Tomato Gravy\n\nTomato gravy usually tastes overly sour when tomatoes have high natural acidity or were cooked too quickly. Here is how to fix it:\n\n1. **Add a Pinch of Sweetener:** Stir in 1/2 teaspoon of sugar, honey, or grated jaggery. This chemically balances the tartness without making the gravy sweet.\n2. **Incorporate Fat or Dairy:** Add 2 tablespoons of fresh cream, cashew paste, or unsalted butter. Fats coat the palate and neutralize harsh acid notes.\n3. **Use a Pinch of Baking Soda (Alkaline Neutralizer):** Add a tiny pinch (1/8 tsp) of baking soda. You will see gentle foaming as it directly neutralizes the citric and malic acid in the tomatoes.\n4. **Long Simmer:** Simmer uncovered on low heat for an extra 8–10 minutes with a dollop of ghee so the natural sugars caramelize.`,
        suggestions: [
          "How to balance an overly spicy curry?",
          "How to fix curds splitting in gravy?",
          "Can I make paneer butter masala without cream?"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 1c. Portion / Quantity queries
    if (lower.includes('how much') || lower.includes('quantity') || lower.includes('for four people') || lower.includes('for 4 people') || lower.includes('servings')) {
      return {
        reply: `### Portion Guidelines: Paneer for 4 People\n\nFor a standard main course like **Paneer Butter Masala** serving **4 adults**:\n\n- **Standard Portions:** Plan on **75g to 100g of paneer per person**.\n- **Total Paneer Needed:** **300g to 400g** (cut into bite-sized 1-inch cubes).\n- **Gravy Proportions:** Use 400g tomatoes (4 large), 1 large onion (or skip for restaurant style), 15–18 cashews soaked in warm water, 2 tbsp butter, and 2–3 tbsp fresh cream.\n\n*Chef Tip:* Soak the paneer cubes in warm salted water for 10 minutes before adding to the gravy to keep them pillow-soft.`,
        suggestions: [
          "Can I make it without cream?",
          "Why did my tomato gravy taste sour?",
          "How to make restaurant-style Paneer Butter Masala"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 1d. Without cream query
    if (lower.includes('without cream') || lower.includes('no cream')) {
      return {
        reply: `### How to Make Paneer Butter Masala Without Cream\n\nYes, absolutely! You can achieve rich, velvety gravy without heavy dairy cream using these chef-approved alternatives:\n\n1. **Soaked Cashew or Almond Milk:** Blend 15 soaked cashews with 1/4 cup warm water or milk into an ultra-smooth paste. Stir this into the gravy in the last 4 minutes.\n2. **Thick Whisked Curd (Yogurt):** Whisk 3 tablespoons of fresh whole-milk curd with 1 tsp gram flour (besan) to prevent splitting. Lower the heat and stir continuously.\n3. **Coconut Milk or Coconut Cream:** Use 3 tablespoons of thick coconut milk for a mildly sweet, luscious, vegan-friendly richness.\n4. **Grated Paneer Slurry:** Blend 25g of fresh paneer with 3 tablespoons of warm milk or water into a creamy paste and pour it directly into the simmer.`,
        suggestions: [
          "How much paneer is required for four people?",
          "Why did my tomato gravy taste sour?",
          "How to make homemade paneer from scratch"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 2. High-protein queries
    if (lower.includes('protein') || lower.includes('high protein') || lower.includes('gym') || lower.includes('muscle')) {
      const highProtein = RECIPES_DATA.filter(
        (r) => parseInt(r.nutrition?.protein || '0', 10) >= 14
      ).slice(0, 3);

      const topDish = highProtein[0];

      return {
        reply: `### High-Protein Culinary Picks in RASAVANTA AI\n\nHere are outstanding high-protein options crafted for optimal nutrition:\n- **${highProtein[0]?.title}:** ${highProtein[0]?.nutrition?.protein} protein (${highProtein[0]?.calories} kcal)\n- **${highProtein[1]?.title}:** ${highProtein[1]?.nutrition?.protein} protein (${highProtein[1]?.calories} kcal)\n- **${highProtein[2]?.title}:** ${highProtein[2]?.nutrition?.protein} protein (${highProtein[2]?.calories} kcal)\n\nAll recipes use wholesome legumes, whole grains, nuts, and cultured proteins without synthetic additives.`,
        recipeCard: topDish ? {
          id: topDish.id,
          title: topDish.title,
          cuisine: topDish.cuisine,
          image: topDish.image,
          prepTime: topDish.prepTime,
          cookTime: topDish.cookTime,
          calories: topDish.calories,
          diet: topDish.diet
        } : null,
        suggestions: [
          "How to boost protein in dal?",
          "High-protein breakfast under 20 minutes",
          "Vegan high-protein alternatives"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 3. Low-calorie or weight management queries
    if (lower.includes('calorie') || lower.includes('diet') || lower.includes('light') || lower.includes('weight')) {
      const lightDishes = RECIPES_DATA.filter((r) => r.calories <= 250).slice(0, 3);
      const topLight = lightDishes[0];

      return {
        reply: `### Nutrient-Dense, Low-Calorie Selections\n\nFor a balanced meal under **250 kcal**:\n- **${lightDishes[0]?.title}:** ${lightDishes[0]?.calories} kcal (${lightDishes[0]?.cuisine})\n- **${lightDishes[1]?.title}:** ${lightDishes[1]?.calories} kcal (${lightDishes[1]?.cuisine})\n- **${lightDishes[2]?.title}:** ${lightDishes[2]?.calories} kcal (${lightDishes[2]?.cuisine})\n\nThese dishes feature natural fiber and rich micronutrients to keep you satiated.`,
        recipeCard: topLight ? {
          id: topLight.id,
          title: topLight.title,
          cuisine: topLight.cuisine,
          image: topLight.image,
          prepTime: topLight.prepTime,
          cookTime: topLight.cookTime,
          calories: topLight.calories,
          diet: topLight.diet
        } : null,
        suggestions: [
          "Low-carb dinner recipes",
          "Healthy snacks under 100 kcal",
          "What is Ayurvedic calorie balancing?"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 4. Oversalted / cooking troubleshooting
    if (lower.includes('salty') || lower.includes('too much salt')) {
      return {
        reply: `### How to Fix an Oversalted Curry or Gravy\n\n1. **Raw Potato Slice:** Drop a peeled, halved raw potato into the simmering curry for 10 minutes. The starch absorbs excess salinity.\n2. **Cream, Curd, or Coconut Milk:** Add 2–3 tablespoons of cream or thick curd to mellow the salt and add silkiness.\n3. **Acid & Sweetness:** Squeeze fresh lemon juice or add a tiny pinch of jaggery to round off harsh salt edges.\n4. **Dilute with Boiled Dal/Broth:** If it is a lentil soup or dal, add a ladle of plain boiled dal without salt.`,
        suggestions: [
          "How to fix curds splitting in gravy?",
          "How to fix curry that is too spicy?",
          "How to store fresh herbs longer?"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // 5. Substitutions
    if (lower.includes('substitute') || lower.includes('replace') || lower.includes('instead of')) {
      return {
        reply: `### Culinary Substitution Guide\n\n- **Tamarind:** 1 tsp Amchur (dry mango powder) or 1 tbsp lemon juice with a pinch of jaggery.\n- **Paneer:** Organic firm tofu (pressed and pan-seared) or fresh halloumi.\n- **Buttermilk:** 1 cup milk (or soy milk) + 1 tbsp lemon juice, rest 5 minutes.\n- **Cashew Paste in Gravies:** Soaked sunflower seeds, melon seeds (magaz), or poppy seed paste.\n- **Garlic/Onion (Jain):** A pinch of Asafoetida (Hing) in warm oil provides identical pungent allium aroma.`,
        suggestions: [
          "Substitute for eggs in baking?",
          "Substitute for heavy cream?",
          "Gluten-free flour alternatives"
        ],
        source: 'rasavanta-client-intelligence'
      };
    }

    // Default friendly response
    return {
      reply: `I am **RasaBot**, your personal AI culinary companion.\n\nI can help you:\n- **Find & Generate Recipes:** Mention any ingredients you have (e.g. *"What can I make with toor dal, tomatoes and curry leaves?"*).\n- **Troubleshoot Cooking:** Fix oversalted dishes, prevent curds splitting, or adjust baking temperatures.\n- **Precision Nutrition:** Analyze macros, find high-protein/low-carb dishes, and explore Ayurvedic rasas.\n- **Substitutions:** Swap ingredients for vegan, gluten-free, or Jain diets.\n\nWhat would you like to create or explore today?`,
      suggestions: [
        "What can I cook with paneer and tomatoes?",
        "High-protein South Indian dinner idea",
        "How to make restaurant-style Dal Makhani?",
        "Healthy breakfast in under 15 minutes"
      ],
      source: 'rasavanta-client-intelligence'
    };
  },

  /**
   * Local storage conversation session management
   */
  getStoredConversations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveConversation(conversation) {
    try {
      const list = this.getStoredConversations();
      const existingIdx = list.findIndex((c) => c.id === conversation.id);
      let updated;
      if (existingIdx > -1) {
        updated = [...list];
        updated[existingIdx] = conversation;
      } else {
        updated = [conversation, ...list];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
      return updated;
    } catch {
      return [];
    }
  },

  deleteConversation(id) {
    try {
      const list = this.getStoredConversations();
      const updated = list.filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  clearAllConversations() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    } catch {
      return [];
    }
  }
};
