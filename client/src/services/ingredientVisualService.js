/**
 * RASAVANTA AI — Client Ingredient & Equipment Visual Service
 *
 * Provides realistic food photography, culinary descriptions,
 * substitutions, and cooking utensil details.
 */

export const INGREDIENT_VISUALS = {
  // Dairy
  paneer: {
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Main protein base that absorbs aromatic gravy while retaining soft, melt-in-mouth texture.',
    substitution: 'Extra-firm tofu, halloumi, or fresh pressed chenna.'
  },
  'cottage cheese': {
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Tender protein source lending mild richness.',
    substitution: 'Tofu or paneer.'
  },
  butter: {
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Adds silky mouthfeel, glossiness, and rich buttery sweetness to the gravy.',
    substitution: 'Desi ghee or cashew cream for dairy-free.'
  },
  ghee: {
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Clarified butter for rich nutty aroma and high smoke point tempering.',
    substitution: 'Cold-pressed mustard oil or neutral coconut oil.'
  },
  cream: {
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Tempers spice heat and produces a velvety, luxurious sauce consistency.',
    substitution: 'Blended soaked cashew paste or full-fat coconut cream.'
  },
  curd: {
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Adds tangy lactic acidity and tenderizes proteins.',
    substitution: 'Greek yogurt or whipped silken tofu with lemon.'
  },
  yogurt: {
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    purpose: 'Creates a thick, pleasantly tart marinade or curry base.',
    substitution: 'Thick curd or plant-based coconut yogurt.'
  },

  // Produce
  tomato: {
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Core umami acid foundation; releases sweet-tart juices when cooked down.',
    substitution: 'Canned crushed tomatoes or tamarind pulp with a pinch of jaggery.'
  },
  tomatoes: {
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Builds vibrant color, natural pectin thickness, and tartness in gravy.',
    substitution: 'Pureed plum tomatoes or passata.'
  },
  onion: {
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Caramelizes during bhunao to provide rich sweetness, body, and aroma.',
    substitution: 'Shallots, leeks, or hing (asafoetida) for Jain diet.'
  },
  onions: {
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Foundational aromatic base of curries and stir-fries.',
    substitution: 'Shallots or pureed cabbage with hing.'
  },
  ginger: {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Pungent, zesty warmth that aids digestion and sharpens complex spices.',
    substitution: 'Dried ground sonth (ginger powder) or galangal.'
  },
  garlic: {
    image: 'https://images.unsplash.com/photo-1615477039956-6512eb2292f3?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Deep savory allium aroma that blooms when toasted in warm oil.',
    substitution: 'Garlic chives or a pinch of asafoetida.'
  },
  'green chili': {
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Provides crisp, fresh herbal heat and lively capsaicin punch.',
    substitution: 'Serrano pepper, jalapeño, or freshly cracked black pepper.'
  },
  coriander: {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Finishing garnish providing citrusy, fresh herbaceous aromatics.',
    substitution: 'Fresh mint leaves or microgreens.'
  },
  mint: {
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Cooling menthol aromatics essential for authentic biryani and raitas.',
    substitution: 'Fresh coriander or basil.'
  },
  'curry leaves': {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Signature South Indian tempering herb releasing nutty, citrus fragrance.',
    substitution: 'Kaffir lime leaves or pinch of lemon zest.'
  },
  potato: {
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Starchy comfort base; absorbs surrounding spices and thickens gravies.',
    substitution: 'Sweet potatoes, raw banana (arbi), or butternut squash.'
  },
  mushroom: {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Rich umami-packed spongy texture that drinks in pan spices and broth.',
    substitution: 'Portobello, cremini, or marinated soya chunks.'
  },
  'green peas': {
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Adds pop of sweet flavor and vibrant emerald color contrast.',
    substitution: 'Edamame or sweet corn kernels.'
  },
  carrots: {
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Delicate crunch and natural beta-carotene sweetness.',
    substitution: 'Red bell pepper or parsnips.'
  },

  // Proteins
  chicken: {
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    purpose: 'Lean, succulent poultry that marinates deeply and simmers tender.',
    substitution: 'Soya chaap, firm tofu, or jackfruit for vegetarian.'
  },
  egg: {
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80',
    category: 'Protein',
    purpose: 'Protein staple offering velvety yolk richness and firm whites.',
    substitution: 'Paneer cubes or pressed tofu.'
  },

  // Grains & Rice
  'basmati rice': {
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    category: 'Grains',
    purpose: 'Slender, extra-long grain rice prized for floral pandan aroma.',
    substitution: 'Jasmine rice, sona masoori, or quinoa.'
  },
  'dosa batter': {
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    category: 'Pantry',
    purpose: 'Fermented rice-dal batter forming thin, crispy golden crepes.',
    substitution: 'Instant rava batter or oats-dal batter.'
  },

  // Spices & Oils
  'cumin seeds': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Crackles in hot oil to release warm, earthy, nutty terpenes.',
    substitution: 'Ground cumin or caraway seeds.'
  },
  'mustard seeds': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Pops rhythmically in oil, dispensing sharp pungent warmth.',
    substitution: 'Panch phoron or cumin seeds.'
  },
  turmeric: {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Provides golden glow, earthy warmth, and powerful antioxidant curcumin.',
    substitution: 'Fresh grated turmeric root or saffron.'
  },
  'red chili powder': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Lends deep crimson hue and warming, lingering chili heat.',
    substitution: 'Paprika (mild) or cayenne pepper (hot).'
  },
  'garam masala': {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Aromatic crescendo of roasted cloves, cardamom, cinnamon and mace.',
    substitution: 'Kitchen King masala or curry powder.'
  },
  'kasuri methi': {
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Sun-dried fenugreek leaves crushed on top for restaurant aroma.',
    substitution: 'Celery leaves or pinch of mustard powder.'
  },
  oil: {
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    category: 'Oils',
    purpose: 'Cooking medium carrying fat-soluble spices into deep flavor integration.',
    substitution: 'Cold-pressed sunflower oil, coconut oil, or ghee.'
  },
  salt: {
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=600&q=80',
    category: 'Spices',
    purpose: 'Essential mineral catalyst that draws out juices and elevates flavors.',
    substitution: 'Himalayan pink salt or sea salt flakes.'
  }
};

export const EQUIPMENT_VISUALS = {
  kadhai: {
    name: 'Heavy-Bottom Kadhai / Wok',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Curved bowl design allows heat to concentrate at base, perfect for bhunao and simmering.'
  },
  pan: {
    name: 'Cast-Iron Saute Pan',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Wide cooking surface for even caramelization and shallow frying.'
  },
  tawa: {
    name: 'Cast-Iron Flat Tawa',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Flat seasoned griddle essential for crispy golden dosas and rotis.'
  },
  knife: {
    name: "Chef's Prep Knife",
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
    purpose: 'High-carbon stainless steel blade for uniform dicing and chiffonade cutting.'
  },
  'cutting board': {
    name: 'Hardwood Cutting Board',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    purpose: 'Stable knife-friendly prep surface protecting knives and workspace.'
  },
  spatula: {
    name: 'Culinary Wooden Spatula',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    purpose: 'Heat-resistant wooden edge that scrapes pan base without scratching or breaking paneer.'
  },
  ladle: {
    name: 'Deep Stainless Steel Ladle',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Deep bowl ladle for batter spreading, basting, and serving boiling gravies.'
  },
  pot: {
    name: 'Heavy Stainless Saucepot',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    purpose: 'Deep pot holding heat steadily for slow dum cooking and rice boiling.'
  },
  steamer: {
    name: 'Idli Steamer Stand',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    purpose: 'Multi-plate steam cooker for delicate, fluffy rice cakes.'
  },
  blender: {
    name: 'Mixer Grinder',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80',
    purpose: 'High-RPM motorized jars for silky gravies and smooth chutneys.'
  }
};

/**
 * Client helper to resolve ingredient visual metadata
 */
export function getIngredientMetadata(name) {
  if (!name) {
    return {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      category: 'Pantry',
      purpose: 'Wholesome culinary component adding balanced flavor.',
      substitution: 'Common kitchen staples in the same food group.'
    };
  }

  const clean = name.toLowerCase().trim();
  if (INGREDIENT_VISUALS[clean]) return INGREDIENT_VISUALS[clean];

  for (const [key, val] of Object.entries(INGREDIENT_VISUALS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }

  return {
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    purpose: 'Enhances body, texture and natural aroma.',
    substitution: 'Seasoned vegetables or pantry equivalents.'
  };
}
