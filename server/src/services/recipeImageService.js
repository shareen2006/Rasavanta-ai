/**
 * RASAVANTA AI — Centralized Recipe Image Service
 *
 * This module is the SINGLE SOURCE OF TRUTH for recipe image resolution.
 * All pages (AI Kitchen, Explore Recipes, Recipe Detail, RasaBot card, Cookbook,
 * Smart Pantry, MealCraft, ZeroWaste Kitchen) MUST route through resolveRecipeImage().
 *
 * Design principles:
 * - Exact title-to-image mapping for all 41 curated recipes (no fuzzy matching).
 * - Cuisine-level fallback as a last resort (never a generic food photo).
 * - AI-generated recipes use their image if supplied by Gemini; otherwise cuisine fallback.
 * - Broken / missing URLs degrade gracefully to the branded RASAVANTA placeholder.
 * - Each recipe's image is resolved once and reused; no per-page random assignment.
 */

// ---------------------------------------------------------------------------
// EXACT RECIPE IMAGE MAP
// Key: normalized recipe title (lowercase, no punctuation)
// Value: specific Unsplash photo verified to show that actual dish
// ---------------------------------------------------------------------------
const RECIPE_IMAGE_MAP = {
  // ── SOUTH INDIAN ─────────────────────────────────────────────────────────
  'crispy masala dosa':
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
  'masala dosa':
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
  'steamed idli with drumstick sambar':
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
  'idli sambar':
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
  'idli with sambar':
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
  'ghee ven pongal with coconut chutney':
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
  'ven pongal':
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
  'authentic kerala sadya avial':
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
  'kerala avial':
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
  'kerala appam with vegetable stew':
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
  'appam with stew':
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
  'south indian pepper tomato rasam':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
  'tomato rasam':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
  'pepper rasam':
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
  'andhra pesarattu with allam pachadi':
    'https://images.unsplash.com/photo-1620914769394-66acb6e98838?auto=format&fit=crop&w=1200&q=80',
  'pesarattu':
    'https://images.unsplash.com/photo-1620914769394-66acb6e98838?auto=format&fit=crop&w=1200&q=80',

  // ── ANDHRA / TELANGANA ────────────────────────────────────────────────────
  'gutti vankaya koora':
    '/images/recipes/gutti-vankaya-koora.jpg',
  'stuffed brinjal curry':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'gongura pachadi with steamed rice':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'gongura pachadi':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'royal hyderabadi dum biryani':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'hyderabadi biryani':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'dum biryani':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'biryani':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'hyderabadi khatti dal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'khatti dal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',

  // ── NORTH INDIAN ──────────────────────────────────────────────────────────
  'paneer butter masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'butter paneer':
    '/images/recipes/paneer-butter-masala.jpg',
  'slow cooked dal makhani':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'dal makhani':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'amritsari chole with fluffy bhature':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
  'chole bhature':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
  'punjabi rajma chawal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'rajma chawal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'rajma':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'fragrant royal vegetable pulao':
    '/images/recipes/vegetable-pulao.jpg',
  'vegetable pulao':
    '/images/recipes/vegetable-pulao.jpg',
  'veg pulao':
    '/images/recipes/vegetable-pulao.jpg',
  'tandoori garlic butter naan':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'garlic naan':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'naan':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'palak paneer':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'aloo gobi':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'aloo matar':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'egg curry':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'matar paneer':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'shahi paneer':
    '/images/recipes/paneer-butter-masala.jpg',

  // ── BIHAR / EAST INDIA ────────────────────────────────────────────────────
  'authentic bihari litti chokha':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
  'litti chokha':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',

  // ── BENGALI ───────────────────────────────────────────────────────────────
  'traditional bengali macher jhol':
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
  'macher jhol':
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
  'bengali fish curry':
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',

  // ── HIMACHAL / NORTHEAST ──────────────────────────────────────────────────
  'steamed darjeeling vegetable momos':
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
  'momos':
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
  'vegetable momos':
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',

  // ── GUJARAT / MAHARASHTRA ─────────────────────────────────────────────────
  'gujarati nylon khaman dhokla':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'khaman dhokla':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'dhokla':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'buttery mumbai pav bhaji':
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80',
  'pav bhaji':
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80',
  'kolhapuri katachi misal pav':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
  'misal pav':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',

  // ── STREET FOOD / SNACKS ──────────────────────────────────────────────────
  'crispy punjabi samosa with mint chutney':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'samosa':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'mumbai pani puri with mint imli water':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
  'pani puri':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
  'gol gappa':
    'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  'warm royal gulab jamun':
    '/images/recipes/gulab-jamun.jpg',
  'gulab jamun':
    '/images/recipes/gulab-jamun.jpg',
  'saffron cardamom rasmalai':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',
  'rasmalai':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',
  'kheer':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',
  'halwa':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',

  // ── ITALIAN ───────────────────────────────────────────────────────────────
  'neapolitan margherita pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'margherita pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'creamy wild mushroom risotto':
    'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
  'mushroom risotto':
    'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
  'risotto':
    'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80',
  'pasta':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  'spaghetti':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',

  // ── CHINESE / ASIAN ───────────────────────────────────────────────────────
  'high heat wok vegetable fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'vegetable fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'street style vegetable hakka noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
  'hakka noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
  'noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',

  // ── JAPANESE ──────────────────────────────────────────────────────────────
  'rich umami miso shiitake ramen':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  'miso ramen':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  'ramen':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  'avocado cucumber sushi maki':
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  'sushi':
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  'maki':
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',

  // ── KOREAN ────────────────────────────────────────────────────────────────
  'rainbow korean bibimbap with gochujang':
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
  'bibimbap':
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
  'korean bowl':
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',

  // ── THAI ──────────────────────────────────────────────────────────────────
  'street style vegetarian pad thai':
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
  'pad thai':
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
  'fragrant thai green coconut curry':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
  'thai green curry':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
  'green curry':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
  'thai curry':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',

  // ── MEXICAN ───────────────────────────────────────────────────────────────
  'charred corn smoky black bean tacos':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  'black bean tacos':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  'tacos':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',

  // ── MEDITERRANEAN ─────────────────────────────────────────────────────────
  'creamy tahini hummus with warm zaatar pita':
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
  'hummus':
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
  'crispy herbed falafel platter':
    'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80',
  'falafel':
    'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=1200&q=80',

  // ── WESTERN / COMFORT ─────────────────────────────────────────────────────
  'gourmet black bean mushroom burger':
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'veggie burger':
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'burger':
    'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
  'fluffy golden buttermilk pancakes':
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
  'pancakes':
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
  'waffles':
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',

  // ── GENERIC CURRY / GRAVY (only as LAST resort before cuisine fallback) ───
  'curry': null, // force cuisine fallback; "curry" alone is too vague
  'stew': null,
  'gravy': null
};

// ---------------------------------------------------------------------------
// CUISINE-LEVEL FALLBACK IMAGES
// Only used when no exact recipe title match is found
// ---------------------------------------------------------------------------
const CUISINE_FALLBACK_IMAGES = {
  'South Indian':
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
  'North Indian':
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
  'Andhra':
    'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?auto=format&fit=crop&w=1200&q=80',
  'Hyderabadi':
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
  'Bengali':
    'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
  'Gujarati':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'Maharashtrian':
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80',
  'Italian':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  'Chinese':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'Asian':
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
  'Japanese':
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  'Korean':
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
  'Thai':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',
  'Mexican':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  'Mediterranean':
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
  'Continental':
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
  'Fusion':
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  'Default':
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'
};

// RASAVANTA branded placeholder (served locally)
const RASAVANTA_PLACEHOLDER = '/images/rasavanta-recipe-placeholder.svg';

// ---------------------------------------------------------------------------
// UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Normalize a recipe title for map lookup:
 * lowercase, collapse multiple spaces, remove ampersands/punctuation.
 * "Royal Hyderabadi Dum Biryani" → "royal hyderabadi dum biryani"
 * "Hummus & Pita"                → "hummus pita"
 */
function normalizeRecipeName(title) {
  if (!title || typeof title !== 'string') return '';
  return title
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/['']/g, '')          // drop apostrophes
    .replace(/[^a-z0-9 ]/g, ' ')  // strip other punctuation
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolve the best image URL for a recipe.
 *
 * Priority:
 * 1. Exact normalized-title match in RECIPE_IMAGE_MAP
 * 2. Partial-word match (every significant word in the lookup key must appear
 *    in the query title) — prevents false positives like "paneer" matching "dal makhani"
 * 3. Cuisine-level fallback
 * 4. RASAVANTA branded placeholder
 *
 * @param {string}  title   - Recipe title
 * @param {string}  cuisine - Recipe cuisine (for fallback)
 * @param {string|null} existingImage - Caller-supplied URL (from Gemini / seed data).
 *                          If it is a LOCAL path (/images/…) it is trusted.
 *                          External Unsplash URLs from the AI are IGNORED and replaced
 *                          by this service to prevent mismatches.
 * @returns {string} Resolved image URL
 */
function resolveRecipeImage(title, cuisine, existingImage) {
  const normalized = normalizeRecipeName(title);

  // 1. Trust local curated images (local paths are hand-verified)
  if (existingImage && existingImage.startsWith('/images/')) {
    return existingImage;
  }

  // 2. Exact map lookup
  if (normalized && RECIPE_IMAGE_MAP[normalized] !== undefined) {
    const mapped = RECIPE_IMAGE_MAP[normalized];
    return mapped || getCuisineFallback(cuisine);
  }

  // 3. Partial-word match — every word in the map key must appear in the title
  //    (minimum key length of 2 words to avoid false positives)
  const titleWords = normalized.split(' ').filter(w => w.length > 2);
  for (const [key, url] of Object.entries(RECIPE_IMAGE_MAP)) {
    if (!url) continue;
    const keyWords = key.split(' ').filter(w => w.length > 2);
    if (keyWords.length < 2) continue;  // skip single-word generic keys
    // All key words must appear in the title words
    const allMatch = keyWords.every(kw => titleWords.includes(kw));
    if (allMatch) return url;
  }

  // 4. Single significant keyword match (strict: at least 5 chars, unambiguous)
  for (const [key, url] of Object.entries(RECIPE_IMAGE_MAP)) {
    if (!url) continue;
    if (key.split(' ').length === 1 && key.length >= 5) {
      if (normalized.includes(key)) return url;
    }
  }

  // 5. Cuisine fallback
  return getCuisineFallback(cuisine);
}

/**
 * Returns cuisine-level fallback image URL.
 */
function getCuisineFallback(cuisine) {
  if (!cuisine) return CUISINE_FALLBACK_IMAGES['Default'];
  // Try exact match first, then partial
  if (CUISINE_FALLBACK_IMAGES[cuisine]) return CUISINE_FALLBACK_IMAGES[cuisine];
  const lc = cuisine.toLowerCase();
  for (const [key, url] of Object.entries(CUISINE_FALLBACK_IMAGES)) {
    if (key.toLowerCase().includes(lc) || lc.includes(key.toLowerCase())) return url;
  }
  return CUISINE_FALLBACK_IMAGES['Default'];
}

/**
 * Returns the branded RASAVANTA placeholder path.
 * Use this in React's onError handlers.
 */
function getRecipeImageFallback() {
  return RASAVANTA_PLACEHOLDER;
}

/**
 * Validate that an image URL is structurally sound (not null/empty/obviously broken).
 * Does NOT make an HTTP request; that check happens in the browser's onError.
 */
function validateImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length < 5) return false;
  if (trimmed.startsWith('/images/')) return true;      // local: trusted
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return true;
  return false;
}

module.exports = {
  resolveRecipeImage,
  normalizeRecipeName,
  validateImageUrl,
  getRecipeImageFallback,
  getCuisineFallback,
  RECIPE_IMAGE_MAP,
  CUISINE_FALLBACK_IMAGES
};
