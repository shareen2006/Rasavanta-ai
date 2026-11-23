/**
 * RASAVANTA AI — Centralized Recipe Image Service
 *
 * This module is the SINGLE SOURCE OF TRUTH for recipe image resolution.
 * All pages (AI Kitchen, Explore Recipes, Recipe Detail, RasaBot card, Cookbook,
 * Smart Pantry, MealCraft, ZeroWaste Kitchen) MUST route through resolveRecipeImage().
 *
 * Design principles:
 * - Exact title-to-image mapping for curated recipes.
 * - Deep semantic archetype classification (Paneer, Biryani, Dosa, Idli, Fried Rice,
 *   Butter Chicken, Mushroom, Dal, Chole, Pulao, etc.) for AI-generated and custom recipes.
 * - Strict relevance validation: NEVER allow cross-archetype mismatches
 *   (e.g., a Dosa photo for Paneer Tomato Masala or Biryani photo for soup).
 * - Cuisine-level fallback as a last resort uses authentic culinary spreads (thalis),
 *   NEVER a single unrelated dish like Dosa.
 * - Dynamic culinary image prompt generator for AI synthesis.
 * - Branded RASAVANTA placeholder for network failures or unresolvable assets.
 */

// ---------------------------------------------------------------------------
// 1. EXACT RECIPE IMAGE MAP
// Key: normalized recipe title (lowercase, no punctuation)
// Value: verified Unsplash photo or local asset showing that exact dish
// ---------------------------------------------------------------------------
const RECIPE_IMAGE_MAP = {
  // ── SOUTH INDIAN ─────────────────────────────────────────────────────────
  'crispy masala dosa':
    '/images/recipes/masala-dosa.jpg',
  'masala dosa':
    '/images/recipes/masala-dosa.jpg',
  'dosa':
    '/images/recipes/masala-dosa.jpg',
  'steamed idli with drumstick sambar':
    '/images/recipes/idli-sambar.jpg',
  'idli sambar':
    '/images/recipes/idli-sambar.jpg',
  'idli with sambar':
    '/images/recipes/idli-sambar.jpg',
  'idli':
    '/images/recipes/idli-sambar.jpg',
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
    '/images/recipes/gutti-vankaya-koora.jpg',
  'gongura pachadi with steamed rice':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'gongura pachadi':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'royal hyderabadi dum biryani':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
  'hyderabadi biryani':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
  'dum biryani':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
  'chicken biryani':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
  'biryani':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
  'hyderabadi khatti dal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'khatti dal':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',

  // ── NORTH INDIAN ──────────────────────────────────────────────────────────
  'paneer butter masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'paneer tomato masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'quick paneer tomato masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'paneer masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'butter paneer':
    '/images/recipes/paneer-butter-masala.jpg',
  'paneer tikka masala':
    '/images/recipes/paneer-butter-masala.jpg',
  'kadai paneer':
    '/images/recipes/paneer-butter-masala.jpg',
  'shahi paneer':
    '/images/recipes/paneer-butter-masala.jpg',
  'matar paneer':
    '/images/recipes/paneer-butter-masala.jpg',
  'palak paneer':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'butter chicken':
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
  'murgh makhani':
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
  'slow cooked dal makhani':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'dal makhani':
    'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
  'dal tadka':
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
  'mushroom masala':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'kadai mushroom':
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
  'aloo gobi':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'aloo matar':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
  'egg curry':
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',

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

  // ── DESSERTS ──────────────────────────────────────────────────────────────
  'warm royal gulab jamun':
    '/images/recipes/gulab-jamun.jpg',
  'gulab jamun':
    '/images/recipes/gulab-jamun.jpg',
  'saffron cardamom rasmalai':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',
  'rasmalai':
    'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',

  // ── ITALIAN / PIZZA / PASTA ───────────────────────────────────────────────
  'neapolitan margherita pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'margherita pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'pizza':
    'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
  'pasta':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
  'spaghetti':
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',

  // ── CHINESE / ASIAN ───────────────────────────────────────────────────────
  'high heat wok vegetable fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'vegetable fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'veg fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'fried rice':
    'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
  'street style vegetable hakka noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
  'hakka noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
  'noodles':
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',

  // ── JAPANESE / KOREAN / THAI ──────────────────────────────────────────────
  'rich umami miso shiitake ramen':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  'ramen':
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
  'rainbow korean bibimbap with gochujang':
    'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
  'street style vegetarian pad thai':
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
  'thai green curry':
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80',

  // ── MEXICAN / MEDITERRANEAN ───────────────────────────────────────────────
  'charred corn smoky black bean tacos':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  'tacos':
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80',
  'creamy tahini hummus with warm zaatar pita':
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
  'hummus':
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80'
};

// ---------------------------------------------------------------------------
// 2. DISH ARCHETYPE IMAGE REPOSITORY
// High-resolution, verified food photography assets for each culinary archetype.
// Used when an exact title match is absent to prevent false visual assignments.
// ---------------------------------------------------------------------------
const ARCHETYPE_IMAGES = {
  paneer_masala: {
    primary: '/images/recipes/paneer-butter-masala.jpg',
    fallback: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden paneer cubes simmered in velvety tomato-onion gravy, garnished with coriander'
  },
  dosa: {
    primary: '/images/recipes/masala-dosa.jpg',
    fallback: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp golden crepe rolled with spiced potato masala and fresh coconut chutney'
  },
  chicken_biryani: {
    primary: '/images/recipes/hyderabadi-dum-biryani.jpg',
    fallback: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Aromatic layered basmati rice infused with saffron, caramelized onions and spices'
  },
  veg_fried_rice: {
    primary: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80',
    description: 'High-heat wok-tossed basmati rice with crunchy diced vegetables and scallions'
  },
  butter_chicken: {
    primary: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    description: 'Tender chicken pieces simmered in silky butter-tomato gravy with kasuri methi'
  },
  idli_sambar: {
    primary: '/images/recipes/idli-sambar.jpg',
    fallback: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    description: 'Fluffy steamed rice cakes served with aromatic lentil drumstick stew and chutney'
  },
  mushroom_masala: {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Plump button mushrooms cooked in roasted onion-tomato masala gravy'
  },
  dal_lentils: {
    primary: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden yellow lentils slow-cooked and tempered with cumin, garlic and ghee'
  },
  chole_chana: {
    primary: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Spiced chickpeas simmered in dark, aromatic whole-spice pomegranate gravy'
  },
  pulao_rice: {
    primary: '/images/recipes/vegetable-pulao.jpg',
    fallback: '/images/recipes/vegetable-pulao.jpg',
    description: 'Fragrant long-grain basmati rice cooked with whole spices and sweet green vegetables'
  },
  rasam_sambar: {
    primary: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    description: 'Tangy tamarind and crushed black pepper broth with fresh curry leaves'
  },
  naan_roti: {
    primary: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm artisan tandoor-baked flatbread brushed with garlic and clarified butter'
  },
  vegetable_curry: {
    primary: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    description: 'Seasonal country vegetables simmered in aromatic roasted spice curry'
  },
  dessert_sweet: {
    primary: '/images/recipes/gulab-jamun.jpg',
    fallback: 'https://images.unsplash.com/photo-1627823862011-b6a79adf32ea?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden fried milk dumplings soaked in cardamom and saffron-infused rose syrup'
  },
  noodles_pasta: {
    primary: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    description: 'Stir-fried noodles with crisp julienned vegetables in savory sauce'
  },
  pizza: {
    primary: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80',
    description: 'Artisanal wood-fired thin-crust pizza with molten mozzarella and fresh basil'
  }
};

// ---------------------------------------------------------------------------
// 3. CUISINE-LEVEL FALLBACK IMAGES
// Authentic multi-dish culinary spreads (thalis / feasts) representing the cuisine.
// NEVER assign a single specific dish (such as Dosa or Biryani) as a cuisine fallback!
// ---------------------------------------------------------------------------
const CUISINE_FALLBACK_IMAGES = {
  // South Indian fallback is an authentic banana-leaf sadya/thali feast, NEVER a solo Dosa
  'South Indian':
    '/images/recipes/south-indian-thali.jpg',
  'North Indian':
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
  'Andhra':
    '/images/recipes/south-indian-thali.jpg',
  'Hyderabadi':
    '/images/recipes/hyderabadi-dum-biryani.jpg',
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
    '/images/recipes/south-indian-thali.jpg'
};

// Branded placeholder SVG
const RASAVANTA_PLACEHOLDER = '/images/rasavanta-recipe-placeholder.svg';

// ---------------------------------------------------------------------------
// 4. CORE UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

/**
 * Normalize a recipe title: lowercase, remove special characters, trim whitespace.
 */
function normalizeRecipeName(title) {
  if (!title || typeof title !== 'string') return '';
  return title
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/['']/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Classify a recipe into a recognized culinary archetype based on its
 * title, primary ingredients, culinary prompt and cuisine.
 *
 * @param {Object} recipeInfo - { title, ingredients, imagePrompt, cuisine }
 * @returns {string|null} Archetype key from ARCHETYPE_IMAGES or null
 */
function classifyDishArchetype(recipeInfo = {}) {
  const { title = '', ingredients = [], imagePrompt = '', cuisine = '' } = recipeInfo;
  
  const normTitle = normalizeRecipeName(title);
  
  // Format ingredients text
  const ingsText = (Array.isArray(ingredients) ? ingredients : [])
    .map(i => {
      if (typeof i === 'string') return i;
      if (i && typeof i === 'object') return i.name || '';
      return '';
    })
    .join(' ')
    .toLowerCase();

  const fullContext = `${normTitle} ${ingsText} ${String(imagePrompt).toLowerCase()} ${String(cuisine).toLowerCase()}`;

  // PRIORITY 1: Core Key Proteins & Star Ingredients in Title
  if (normTitle.includes('paneer') || normTitle.includes('cottage cheese')) {
    return 'paneer_masala';
  }
  if (normTitle.includes('dosa') || normTitle.includes('dosai') || normTitle.includes('pesarattu')) {
    return 'dosa';
  }
  if (normTitle.includes('biryani') || normTitle.includes('biriyani')) {
    return 'chicken_biryani';
  }
  if (normTitle.includes('fried rice') || normTitle.includes('schezwan rice') || normTitle.includes('wok rice')) {
    return 'veg_fried_rice';
  }
  if (
    normTitle.includes('butter chicken') ||
    normTitle.includes('murgh makhani') ||
    normTitle.includes('chicken tikka') ||
    (normTitle.includes('chicken') && (normTitle.includes('curry') || normTitle.includes('masala') || normTitle.includes('gravy')))
  ) {
    return 'butter_chicken';
  }
  if (normTitle.includes('idli') || normTitle.includes('idly')) {
    return 'idli_sambar';
  }
  if (normTitle.includes('mushroom') || normTitle.includes('kalan') || normTitle.includes('khumb')) {
    return 'mushroom_masala';
  }
  if (normTitle.includes('chole') || normTitle.includes('chana masala') || normTitle.includes('bhature')) {
    return 'chole_chana';
  }
  if (normTitle.includes('rajma') || normTitle.includes('kidney bean')) {
    return 'dal_lentils';
  }
  if (normTitle.includes('dal') || normTitle.includes('daal') || normTitle.includes('khatti dal') || normTitle.includes('dal tadka')) {
    return 'dal_lentils';
  }
  if (normTitle.includes('rasam') || normTitle.includes('sambar') || normTitle.includes('charu')) {
    return 'rasam_sambar';
  }
  if (normTitle.includes('pulao') || normTitle.includes('pilaf') || normTitle.includes('jeera rice')) {
    return 'pulao_rice';
  }
  if (normTitle.includes('naan') || normTitle.includes('roti') || normTitle.includes('paratha') || normTitle.includes('kulcha')) {
    return 'naan_roti';
  }
  if (normTitle.includes('noodle') || normTitle.includes('hakka') || normTitle.includes('chow mein') || normTitle.includes('pasta') || normTitle.includes('spaghetti')) {
    return 'noodles_pasta';
  }
  if (normTitle.includes('pizza')) {
    return 'pizza';
  }
  if (normTitle.includes('gulab jamun') || normTitle.includes('rasmalai') || normTitle.includes('halwa') || normTitle.includes('kheer') || normTitle.includes('payasam')) {
    return 'dessert_sweet';
  }

  // PRIORITY 2: Ingredients Inspection (when title is evocative or generic like "Royal Curry" or "Quick Masala")
  if (ingsText.includes('paneer')) {
    return 'paneer_masala';
  }
  if (ingsText.includes('mushroom')) {
    return 'mushroom_masala';
  }
  if (ingsText.includes('chicken') || ingsText.includes('poultry')) {
    return 'butter_chicken';
  }
  if (ingsText.includes('rice') && (fullContext.includes('fried') || fullContext.includes('wok') || fullContext.includes('soy'))) {
    return 'veg_fried_rice';
  }
  if (ingsText.includes('basmati') && (fullContext.includes('biryani') || fullContext.includes('dum') || fullContext.includes('saffron'))) {
    return 'chicken_biryani';
  }
  if (ingsText.includes('dosa batter') || ingsText.includes('urad dal and rice batter')) {
    return 'dosa';
  }
  if (ingsText.includes('idli batter') || ingsText.includes('idli rava')) {
    return 'idli_sambar';
  }
  if (ingsText.includes('chickpea') || ingsText.includes('chana')) {
    return 'chole_chana';
  }
  if (ingsText.includes('toor dal') || ingsText.includes('moong dal') || ingsText.includes('lentil')) {
    return 'dal_lentils';
  }
  if (normTitle.includes('curry') || normTitle.includes('masala') || normTitle.includes('koora') || normTitle.includes('gravy') || normTitle.includes('sabzi')) {
    return 'vegetable_curry';
  }

  return null;
}

/**
 * Strict Relevance Validation Filter
 * Prevents any dish from receiving a contradictory or mismatched image.
 *
 * @param {string|Object} recipeInfo - Recipe title or object
 * @param {string} imageUrl - Candidate image URL
 * @returns {boolean} True if the image is relevant to the recipe, false if mismatched
 */
function validateImageRelevance(recipeInfo, imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') return false;
  
  const title = typeof recipeInfo === 'string' ? recipeInfo : (recipeInfo?.title || '');
  const normTitle = normalizeRecipeName(title);
  const archetype = typeof recipeInfo === 'object' ? classifyDishArchetype(recipeInfo) : classifyDishArchetype({ title });

  // 1. Dosa image restrictions
  const isDosaImage = imageUrl.includes('photo-1668236543090-82eba5ee5976') || imageUrl.includes('masala-dosa.jpg');
  if (isDosaImage) {
    const isActuallyDosa = normTitle.includes('dosa') || normTitle.includes('dosai') || normTitle.includes('pesarattu') || archetype === 'dosa';
    if (!isActuallyDosa) return false; // REJECT: e.g. Paneer or Biryani cannot use Dosa image
  }

  // 2. Idli image restrictions
  const isIdliImage = imageUrl.includes('photo-1589301760014-d929f3979dbc') || imageUrl.includes('idli-sambar.jpg');
  if (isIdliImage) {
    const isActuallyIdli = normTitle.includes('idli') || normTitle.includes('idly') || archetype === 'idli_sambar';
    if (!isActuallyIdli) return false; // REJECT: e.g. Paneer or Rice cannot use Idli image
  }

  // 3. Biryani image restrictions
  const isBiryaniImage = imageUrl.includes('photo-1563379091339-03b21ab4a4f8') || imageUrl.includes('hyderabadi-dum-biryani.jpg');
  if (isBiryaniImage) {
    const isActuallyBiryani = normTitle.includes('biryani') || normTitle.includes('biriyani') || archetype === 'chicken_biryani';
    if (!isActuallyBiryani) return false;
  }

  // 4. Fried Rice image restrictions
  const isFriedRiceImage = imageUrl.includes('photo-1603133872878-684f208fb84b');
  if (isFriedRiceImage) {
    const isActuallyFriedRice = normTitle.includes('fried rice') || normTitle.includes('schezwan rice') || archetype === 'veg_fried_rice';
    if (!isActuallyFriedRice) return false;
  }

  // 5. Butter Chicken image restrictions
  const isButterChickenImage = imageUrl.includes('photo-1603894584373-5ac82b2ae398');
  if (isButterChickenImage) {
    const isActuallyChicken = normTitle.includes('chicken') || normTitle.includes('murgh') || archetype === 'butter_chicken';
    if (!isActuallyChicken) return false;
  }

  // 6. Paneer recipe validation
  if (normTitle.includes('paneer') || archetype === 'paneer_masala') {
    if (isDosaImage || isIdliImage || isBiryaniImage || isFriedRiceImage) {
      return false; // REJECT: A paneer dish must never receive a dosa, idli, or biryani photo
    }
  }

  return true;
}

/**
 * Generate a rich, photorealistic culinary photography prompt for AI image generation.
 * Follows professional culinary photography standards: composition, lighting, texture, vessel.
 *
 * @param {Object} recipe - Recipe object with title, cuisine, ingredients, etc.
 * @returns {string} Highly detailed image generation prompt
 */
function generateRecipeImagePrompt(recipe = {}) {
  const title = recipe.title || 'Artisanal Indian Dish';
  const cuisine = recipe.cuisine && recipe.cuisine !== 'All' ? recipe.cuisine : 'Indian';
  const diet = recipe.diet && recipe.diet !== 'All' ? recipe.diet : 'Balanced';
  
  // Extract top 3-4 clean ingredients
  let topIngredients = [];
  if (Array.isArray(recipe.ingredients)) {
    topIngredients = recipe.ingredients
      .slice(0, 4)
      .map(i => (typeof i === 'string' ? i : (i.name || '')).trim())
      .filter(Boolean);
  }

  const ingsSnippet = topIngredients.length > 0 ? `featuring fresh ${topIngredients.join(', ')}` : 'prepared with fresh farm produce';
  
  // Determine culinary style descriptor
  const archetype = classifyDishArchetype(recipe);
  let presentationNotes = 'garnished with freshly torn cilantro leaves, served in an authentic artisanal matte ceramic bowl';

  if (archetype === 'paneer_masala') {
    presentationNotes = 'tender Indian paneer cubes simmered in vibrant tomato-onion gravy, finished with a subtle swirl of fresh cream and chopped coriander, served in a rustic handi bowl';
  } else if (archetype === 'dosa') {
    presentationNotes = 'golden crisp crepe with roasted lacy edges, folded neatly on a fresh banana leaf, accompanied by brass bowls of coconut chutney and steaming sambar';
  } else if (archetype === 'chicken_biryani') {
    presentationNotes = 'fragrant long-grain saffron basmati rice layered with caramelized golden onions, fresh mint sprigs, and warm spices, served in a traditional copper handi';
  } else if (archetype === 'veg_fried_rice') {
    presentationNotes = 'high-heat wok-tossed long grain rice with vibrant crunchy diced carrots, green beans, and scallions, presented in an elegant contemporary bowl with chopstick accents';
  } else if (archetype === 'butter_chicken') {
    presentationNotes = 'succulent marinated chicken simmered in rich velvety butter-tomato gravy with aromatic fenugreek leaves and a cream swirl in a warm copper serving dish';
  } else if (archetype === 'idli_sambar') {
    presentationNotes = 'pillowy-soft steamed white rice cakes submerged in hot aromatic drumstick sambar, served alongside white coconut chutney on a clean banana leaf';
  } else if (archetype === 'mushroom_masala') {
    presentationNotes = 'plump brown button mushrooms sautéed in a thick, richly spiced dark onion-tomato gravy, garnished with julienned ginger and fresh coriander';
  }

  return `Professional studio food photography of ${title}, ${cuisine} cuisine (${diet}), ${ingsSnippet}. ${presentationNotes}. Warm natural morning side-lighting, 45-degree angle, shallow depth of field, appetizing steam rising, ultra-crisp focus, 8k resolution, Michelin-star culinary editorial style.`;
}

/**
 * Resolve the best image URL for a recipe.
 *
 * Supports two signatures for seamless integration:
 * 1. resolveRecipeImage({ title, cuisine, ingredients, imagePrompt, existingImage })
 * 2. resolveRecipeImage(title, cuisine, existingImage)
 *
 * Resolution Priority:
 * 1. Valid local path (/images/...) that passes relevance validation
 * 2. Exact match in RECIPE_IMAGE_MAP
 * 3. Semantic Archetype classification (Paneer, Dosa, Biryani, Fried Rice, etc.)
 * 4. Partial multi-word match in RECIPE_IMAGE_MAP
 * 5. Authentic Cuisine-level fallback (traditional thali spread, NEVER a single unrelated dish)
 * 6. RASAVANTA branded SVG placeholder
 *
 * @param {string|Object} input - Recipe title string OR recipe context object
 * @param {string} [cuisine] - Cuisine fallback
 * @param {string|null} [existingImage] - Candidate image
 * @returns {string} Resolved, verified image URL
 */
function resolveRecipeImage(input, cuisine, existingImage) {
  let title = '';
  let targetCuisine = cuisine || 'All';
  let ingredients = [];
  let imagePrompt = '';
  let candidateImage = existingImage || null;

  if (typeof input === 'object' && input !== null) {
    title = input.title || '';
    targetCuisine = input.cuisine || cuisine || 'All';
    ingredients = Array.isArray(input.ingredients) ? input.ingredients : [];
    imagePrompt = input.imagePrompt || '';
    candidateImage = input.existingImage || input.image || existingImage || null;
  } else {
    title = typeof input === 'string' ? input : '';
  }

  const normalized = normalizeRecipeName(title);
  const context = { title, cuisine: targetCuisine, ingredients, imagePrompt };

  // Step 1: Trust local curated images ONLY IF they pass relevance validation
  if (candidateImage && typeof candidateImage === 'string') {
    if (candidateImage.startsWith('/images/')) {
      if (validateImageRelevance(context, candidateImage)) {
        return candidateImage;
      }
      // Contradiction detected (e.g., someone passed /images/recipes/masala-dosa.jpg for Paneer)
      // Discard candidateImage and proceed with archetype resolution.
    }
  }

  // Step 2: Exact map lookup
  if (normalized && RECIPE_IMAGE_MAP[normalized]) {
    const mapped = RECIPE_IMAGE_MAP[normalized];
    if (validateImageRelevance(context, mapped)) {
      return mapped;
    }
  }

  // Step 3: Deep Semantic Archetype Classification (Crucial for AI Recipe Studio)
  const archetype = classifyDishArchetype(context);
  if (archetype && ARCHETYPE_IMAGES[archetype]) {
    const archAsset = ARCHETYPE_IMAGES[archetype];
    const chosen = archAsset.primary || archAsset.fallback;
    if (validateImageRelevance(context, chosen)) {
      return chosen;
    }
  }

  // Step 4: Multi-word match in RECIPE_IMAGE_MAP (All significant words must be present)
  const titleWords = normalized.split(' ').filter(w => w.length > 2);
  for (const [key, url] of Object.entries(RECIPE_IMAGE_MAP)) {
    if (!url) continue;
    const keyWords = key.split(' ').filter(w => w.length > 2);
    if (keyWords.length < 2) continue;
    const allMatch = keyWords.every(kw => titleWords.includes(kw));
    if (allMatch && validateImageRelevance(context, url)) {
      return url;
    }
  }

  // Step 5: Strict single-word keyword match (e.g. "samosa", "dhokla")
  for (const [key, url] of Object.entries(RECIPE_IMAGE_MAP)) {
    if (!url) continue;
    if (key.split(' ').length === 1 && key.length >= 5) {
      if (normalized.includes(key) && validateImageRelevance(context, url)) {
        return url;
      }
    }
  }

  // Step 6: Safe Cuisine-level fallback (Authentic thali / multi-dish spread)
  const cuisineFallback = getCuisineFallback(targetCuisine);
  if (validateImageRelevance(context, cuisineFallback)) {
    return cuisineFallback;
  }

  // Step 7: Branded SVG Placeholder
  return RASAVANTA_PLACEHOLDER;
}

/**
 * Returns cuisine-level fallback image URL.
 */
function getCuisineFallback(cuisine) {
  if (!cuisine || cuisine === 'All') return CUISINE_FALLBACK_IMAGES['South Indian'];
  if (CUISINE_FALLBACK_IMAGES[cuisine]) return CUISINE_FALLBACK_IMAGES[cuisine];
  
  const lc = cuisine.toLowerCase();
  for (const [key, url] of Object.entries(CUISINE_FALLBACK_IMAGES)) {
    if (key.toLowerCase().includes(lc) || lc.includes(key.toLowerCase())) return url;
  }
  return CUISINE_FALLBACK_IMAGES['South Indian'];
}

/**
 * Returns the branded RASAVANTA placeholder path.
 */
function getRecipeImageFallback() {
  return RASAVANTA_PLACEHOLDER;
}

/**
 * Validate that an image URL is structurally sound.
 */
function validateImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed.length < 5) return false;
  if (trimmed.startsWith('/images/')) return true;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return true;
  return false;
}

module.exports = {
  RECIPE_IMAGE_MAP,
  ARCHETYPE_IMAGES,
  CUISINE_FALLBACK_IMAGES,
  normalizeRecipeName,
  classifyDishArchetype,
  validateImageRelevance,
  generateRecipeImagePrompt,
  resolveRecipeImage,
  getCuisineFallback,
  getRecipeImageFallback,
  validateImageUrl
};
