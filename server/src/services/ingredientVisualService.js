/**
 * RASAVANTA AI — Ingredient & Equipment Visual Service
 *
 * Provides verified high-resolution food photography and culinary metadata
 * for all recipe ingredients and kitchen equipment.
 */

// Verified high-resolution food photography for ingredients
// Curated clean food photography from Unsplash CDN
const INGREDIENT_IMAGE_MAP = {
  // ── DAIRY & CHEESE ────────────────────────────────────────────────────────
  'paneer': {
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Main protein base that absorbs aromatic gravy while retaining soft, melt-in-mouth texture.'
  },
  'cottage cheese': {
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Provides tender texture and rich dairy protein to the dish.'
  },
  'butter': {
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Adds silky mouthfeel, glossiness, and rich buttery sweetness to the gravy.'
  },
  'ghee': {
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Traditional clarified butter for aromatic tempering and nutty depth.'
  },
  'cream': {
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Tempers spice heat and produces a velvety, luxurious sauce consistency.'
  },
  'heavy cream': {
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Creates a rich restaurant-style glossy finish.'
  },
  'curd': {
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Adds tangy lactic acidity and tenderizes proteins during marination.'
  },
  'yogurt': {
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Lends pleasant tartness and smooth body to simmered gravies.'
  },
  'milk': {
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    defaultPurpose: 'Lightens sauce density and adds subtle natural sweetness.'
  },

  // ── PRODUCE & VEGETABLES ──────────────────────────────────────────────────
  'tomato': {
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Core umami acid foundation; releases sweet-tart juices when cooked down.'
  },
  'tomatoes': {
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Builds vibrant color, thickness, and balanced tartness in masala base.'
  },
  'tomato puree': {
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Concentrated tomato reduction providing deep red color and thick body.'
  },
  'onion': {
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Caramelizes during bhunao to provide rich sweetness, body, and aroma.'
  },
  'onions': {
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Forms the foundational aromatic base of Indian curries and sautés.'
  },
  'ginger': {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Pungent, zesty warmth that aids digestion and sharpens complex spices.'
  },
  'garlic': {
    image: 'https://images.unsplash.com/photo-1615477039956-6512eb2292f3?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Deep savory allium aroma that blooms when toasted in warm oil.'
  },
  'ginger garlic paste': {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Classic subcontinental aromatic duo for deep foundational seasoning.'
  },
  'green chili': {
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Provides crisp, fresh herbal heat and lively capsaicin punch.'
  },
  'green chilies': {
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Imparts bright, sharp piquancy without overpowering delicate notes.'
  },
  'coriander': {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Finishing garnish providing citrusy, fresh herbaceous aromatics.'
  },
  'cilantro': {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Bright green garnish lifting heavier braised and stewed flavors.'
  },
  'mint': {
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Cooling menthol aromatics essential for authentic biryani and chutneys.'
  },
  'curry leaves': {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Signature South Indian tempering herb releasing nutty, citrus fragrance.'
  },
  'potato': {
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Starchy comfort base; absorbs surrounding spices and thickens gravies.'
  },
  'potatoes': {
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Classic heart of masala dosa filling and homestyle comforting curries.'
  },
  'mushroom': {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Rich umami-packed spongy texture that drinks in pan spices and broth.'
  },
  'mushrooms': {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Earthiness and meaty bite in vegetarian culinary creations.'
  },
  'green peas': {
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Adds pop of sweet flavor and vibrant emerald color contrast.'
  },
  'peas': {
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Sweet vegetal accents balancing rich spiced gravies.'
  },
  'carrots': {
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Delicate crunch and natural beta-carotene sweetness.'
  },
  'bell pepper': {
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Smoky sweet crunch characteristic of wok frying and kadai dishes.'
  },
  'capsicum': {
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Tender-crisp texture and vibrant pop in kadai preparations.'
  },
  'cauliflower': {
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Floret structure holds spices beautifully in dry sabzis and biryanis.'
  },
  'spinach': {
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Silky iron-rich green base for vibrant palak preparations.'
  },
  'lemon': {
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    defaultPurpose: 'Bright citrus finishing acid that wakes up rich fatty gravies.'
  },

  // ── PROTEINS & POULTRY ────────────────────────────────────────────────────
  'chicken': {
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    defaultPurpose: 'Lean, succulent poultry that marinates deeply and simmers tender.'
  },
  'chicken breast': {
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    defaultPurpose: 'Tender white meat pieces cooked gently to retain juiciness.'
  },
  'chicken thigh': {
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    defaultPurpose: 'Rich dark meat that stays exceptionally moist during slow simmering.'
  },
  'egg': {
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    defaultPurpose: 'Protein staple offering velvety yolk richness and firm whites.'
  },

  // ── GRAINS, BATTERS & RICE ────────────────────────────────────────────────
  'basmati rice': {
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    category: 'Grains',
    defaultPurpose: 'Slender, extra-long grain rice prized for floral pandan aroma.'
  },
  'rice': {
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    category: 'Grains',
    defaultPurpose: 'Fluffy neutral foundation carrying delicate curries and broths.'
  },
  'dosa batter': {
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    category: 'Pantry',
    defaultPurpose: 'Naturally fermented rice and black gram batter creating crisp lacy crepes.'
  },
  'idli batter': {
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    category: 'Pantry',
    defaultPurpose: 'Aerated fermented batter yielding cloud-soft steamed cakes.'
  },

  // ── LENTILS & PULSES ──────────────────────────────────────────────────────
  'toor dal': {
    image: 'https://images.unsplash.com/photo-1585996746820-2521ca29b719?auto=format&fit=crop&w=600&q=80',
    category: 'Lentils',
    defaultPurpose: 'Split yellow pigeon peas forming the creamy, comforting base of sambar.'
  },
  'moong dal': {
    image: 'https://images.unsplash.com/photo-1585996746820-2521ca29b719?auto=format&fit=crop&w=600&q=80',
    category: 'Lentils',
    defaultPurpose: 'Easy-to-digest yellow lentils creating light, comforting dal preparations.'
  },
  'chickpeas': {
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=80',
    category: 'Lentils',
    defaultPurpose: 'Nutty, hearty legumes simmered in dark whole-spice gravy.'
  },

  // ── WHOLE & GROUND SPICES ─────────────────────────────────────────────────
  'cumin seeds': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Crackles in hot oil to release warm, earthy, nutty terpenes.'
  },
  'mustard seeds': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Pops rhythmically in oil, dispensing sharp pungent warmth.'
  },
  'turmeric': {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Provides golden glow, earthy warmth, and powerful antioxidant curcumin.'
  },
  'red chili powder': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Lends deep crimson hue and warming, lingering chili heat.'
  },
  'kashmiri mirch': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Mild heat powerhouse giving gravies an irresistible bright red glow.'
  },
  'garam masala': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Aromatic crescendo of roasted cloves, cardamom, cinnamon and mace.'
  },
  'coriander powder': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Binds masala together with subtle woodsy citrus sweetness.'
  },
  'kasuri methi': {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Sun-dried fenugreek leaves crushed on top for signature aroma.'
  },
  'saffron': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Royalty thread imparting royal golden tint and honey-hay fragrance.'
  },
  'oil': {
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    category: 'Oils',
    defaultPurpose: 'Cooking medium carrying fat-soluble spices into deep flavor integration.'
  },
  'cooking oil': {
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    category: 'Oils',
    defaultPurpose: 'Transfers high heat evenly to sauté aromatics and bloom spices.'
  },
  'salt': {
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    defaultPurpose: 'Essential mineral catalyst that draws out juices and elevates flavors.'
  }
};

// Verified realistic culinary equipment photographs
const EQUIPMENT_IMAGE_MAP = {
  'kadhai': {
    name: 'Heavy-Bottom Kadhai / Deep Wok',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Deep curved bowl shape enables even heat distribution, continuous stirring, and sauce reduction.'
  },
  'pan': {
    name: 'Cast-Iron Skillet / Saute Pan',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Excellent heat retention for shallow frying, searing, and delicate simmering.'
  },
  'tawa': {
    name: 'Cast-Iron Flat Tawa / Griddle',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Even flat surface essential for spreading paper-thin crispy dosas and roasting rotis.'
  },
  'knife': {
    name: "Chef's Santoku Knife",
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
    purpose: 'Precision blade for clean, uniform slicing of herbs, aromatics, and paneer cubes.'
  },
  'cutting board': {
    name: 'Hardwood Culinary Cutting Board',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    purpose: 'Stable knife-friendly prep surface ensuring safe and hygienic ingredient prep.'
  },
  'spatula': {
    name: 'Culinary Wooden Spatula & Turner',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    purpose: 'Gentle scraping and folding tool that keeps soft ingredients like paneer whole.'
  },
  'ladle': {
    name: 'Stainless Steel Deep Ladle',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Ideal for pouring batter, stirring stews, and serving rich simmering gravies.'
  },
  'pot': {
    name: 'Heavy Stainless Steel Saucepot / Handi',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Deep cylindrical pot for slow-braising curries, cooking rice, and simmering dals.'
  },
  'steamer': {
    name: 'Multi-Tier Idli Steamer Stand',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    purpose: 'Traps pressurized moist steam to gently cook fluffy cloud-like idlis.'
  },
  'blender': {
    name: 'High-Power Mixer Grinder',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    purpose: 'Pulverizes tough whole spices, coconuts, and tomatoes into satin-smooth purees.'
  }
};

/**
 * Resolve ingredient visual and culinary purpose
 */
function resolveIngredientVisual(ingredientName) {
  if (!ingredientName || typeof ingredientName !== 'string') {
    return {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      category: 'Pantry',
      purpose: 'Key culinary component adding nutritional balance and taste.'
    };
  }

  const clean = ingredientName.toLowerCase().trim();

  // 1. Exact match
  if (INGREDIENT_IMAGE_MAP[clean]) {
    const item = INGREDIENT_IMAGE_MAP[clean];
    return { ...item, purpose: item.purpose || item.defaultPurpose };
  }

  // 2. Keyword substring match
  for (const [key, meta] of Object.entries(INGREDIENT_IMAGE_MAP)) {
    if (clean.includes(key) || key.includes(clean)) {
      return { ...meta, purpose: meta.purpose || meta.defaultPurpose };
    }
  }

  // 3. Fallback based on typical categories
  if (clean.includes('spice') || clean.includes('powder') || clean.includes('masala')) {
    return {
      image: INGREDIENT_IMAGE_MAP['garam masala'].image,
      category: 'Spices',
      purpose: 'Aromatic seasoning enhancing the depth and complexity of the sauce.'
    };
  }

  if (clean.includes('dal') || clean.includes('lentil') || clean.includes('bean')) {
    return {
      image: INGREDIENT_IMAGE_MAP['toor dal'].image,
      category: 'Lentils',
      purpose: 'Plant protein providing creamy body and wholesome nourishment.'
    };
  }

  if (clean.includes('leaf') || clean.includes('herb') || clean.includes('green')) {
    return {
      image: INGREDIENT_IMAGE_MAP['coriander'].image,
      category: 'Produce',
      purpose: 'Adds vibrant aroma, fresh color, and digestive balance.'
    };
  }

  // Generic fallback
  return {
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Crucial ingredient harmonizing flavors and nutritional equilibrium.'
  };
}

/**
 * Determine required cooking equipment based on recipe attributes
 */
function resolveRecipeEquipment(recipe = {}) {
  const title = (recipe.title || '').toLowerCase();
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions.map(s => (typeof s === 'string' ? s : s.text || '')).join(' ').toLowerCase()
    : '';

  const equipmentList = [
    { ...EQUIPMENT_IMAGE_MAP['knife'] },
    { ...EQUIPMENT_IMAGE_MAP['cutting board'] }
  ];

  if (title.includes('dosa') || title.includes('roti') || title.includes('paratha')) {
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['tawa'] });
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['spatula'] });
  } else if (title.includes('idli')) {
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['steamer'] });
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['pot'] });
  } else if (title.includes('biryani') || title.includes('pulao') || instructions.includes('dum')) {
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['pot'] });
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['ladle'] });
  } else {
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['kadhai'] });
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['spatula'] });
  }

  if (instructions.includes('blend') || instructions.includes('puree') || instructions.includes('grind') || instructions.includes('paste')) {
    equipmentList.push({ ...EQUIPMENT_IMAGE_MAP['blender'] });
  }

  return equipmentList;
}

/**
 * Enrich recipe object with full ingredient photographs and equipment data
 */
function enrichRecipeVisuals(recipe = {}) {
  if (!recipe) return recipe;

  // Enrich ingredients with images and purpose
  const enrichedIngredients = (recipe.ingredients || []).map((ing, idx) => {
    const rawName = typeof ing === 'string' ? ing : (ing.name || `Ingredient ${idx + 1}`);
    const visual = resolveIngredientVisual(rawName);

    return {
      ...(typeof ing === 'object' ? ing : {}),
      name: rawName,
      quantity: typeof ing === 'object' && ing.quantity ? ing.quantity : 1,
      unit: typeof ing === 'object' && ing.unit ? ing.unit : 'portion',
      category: typeof ing === 'object' && ing.category ? ing.category : visual.category,
      purpose: (typeof ing === 'object' && ing.purpose) ? ing.purpose : visual.defaultPurpose,
      image: visual.image,
      isAvailable: true // User interactive checklist state
    };
  });

  // Enrich equipment
  const equipment = (Array.isArray(recipe.equipment) && recipe.equipment.length > 0)
    ? recipe.equipment.map(eq => {
        const key = Object.keys(EQUIPMENT_IMAGE_MAP).find(k => eq.name?.toLowerCase().includes(k)) || 'pan';
        return {
          ...eq,
          image: EQUIPMENT_IMAGE_MAP[key]?.image || EQUIPMENT_IMAGE_MAP['pan'].image
        };
      })
    : resolveRecipeEquipment(recipe);

  return {
    ...recipe,
    ingredients: enrichedIngredients,
    equipment
  };
}

module.exports = {
  INGREDIENT_IMAGE_MAP,
  EQUIPMENT_IMAGE_MAP,
  resolveIngredientVisual,
  resolveRecipeEquipment,
  enrichRecipeVisuals
};
