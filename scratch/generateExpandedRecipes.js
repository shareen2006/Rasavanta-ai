// Script to assemble and export the complete expanded culinary catalog for RASAVANTA AI
const fs = require('fs');
const path = require('path');

const RECIPES = [
  // =========================================================================
  // 1. SOUTH INDIAN CLASSICS
  // =========================================================================
  {
    id: "masala-dosa",
    title: "Crispy Masala Dosa",
    nativeTitles: {
      te: "మసాలా దోశ",
      hi: "मसाला डोसा",
      ta: "மசாலா தோசை",
      kn: "ಮಸಾಲೆ ದೋಸೆ",
      ml: "മസാല ദോശ",
      bn: "মশলা দোসা",
      gu: "મસાલા ઢોંસા",
      mr: "मसाला डोसा"
    },
    description: "Golden, paper-thin fermented rice-lentil crepe brushed with pure spiced ghee, filled with a fragrant tempered turmeric potato mash, served alongside piping hot drumstick sambar and fresh coconut chutney.",
    cuisine: "South Indian",
    region: "Karnataka & Tamil Nadu",
    mealType: "Breakfast",
    foodCategory: "Crepes & Pancakes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Balanced Diet"],
    vegan: false, // contains optional ghee on top
    glutenFree: true,
    jainFriendly: false, // contains potatoes and onions
    dairyFree: false,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 320,
    nutrition: {
      protein: "7g",
      carbs: "52g",
      fat: "9g",
      fiber: "5g",
      micronutrients: {
        iron: "2.1mg",
        calcium: "45mg",
        vitaminC: "14mg",
        potassium: "380mg",
        sodium: "410mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 684,
    featured: true,
    tags: ["South Indian", "Breakfast Favorite", "Gluten-Free", "Street Legend", "Crispy Crepe"],
    ingredients: [
      { name: "Fermented Dosa Batter", quantity: 500, unit: "ml", category: "Batter" },
      { name: "Potatoes (Boiled & Cubed)", quantity: 400, unit: "g", category: "Vegetables" },
      { name: "Onions (Sliced Thin)", quantity: 2, unit: "medium", category: "Vegetables" },
      { name: "Green Chillies (Slit)", quantity: 3, unit: "pieces", category: "Vegetables" },
      { name: "Mustard Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Urad Dal & Chana Dal", quantity: 1, unit: "tsp", category: "Lentils" },
      { name: "Curry Leaves", quantity: 12, unit: "leaves", category: "Herbs" },
      { name: "Turmeric Powder", quantity: 0.5, unit: "tsp", category: "Spices" },
      { name: "Pure Ghee / Sesame Oil", quantity: 2, unit: "tbsp", category: "Oils & Ghee" },
      { name: "Rock Salt", quantity: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prepare the Potato Masala Filling",
        text: "Heat oil in a pan, crackle mustard seeds, chana dal, urad dal, curry leaves, and green chillies. Sauté sliced onions until translucent. Stir in turmeric and boiled crushed potatoes with salt and 3 tbsp water to make a soft, spreadable filling.",
        timerSeconds: 360
      },
      {
        step: 2,
        title: "Heat and Season the Cast Iron Tawa",
        text: "Warm a seasoned cast-iron tawa until water droplets sizzle instantly. Wipe lightly with an oiled onion half to ensure a naturally non-stick surface.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Spread and Roast the Crepe",
        text: "Pour a ladleful of fermented batter in the center and spread outward in concentric circles. Drizzle ghee around the edges and roast on medium flame until golden brown and crispy.",
        timerSeconds: 180
      },
      {
        step: 4,
        title: "Encase Potato Filling and Fold",
        text: "Place 3 tablespoons of hot potato masala in the center, fold into a neat golden cylinder or triangle, and slide onto a warm plate.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Pure Ghee", substitute: "Cold-Pressed Sesame or Coconut Oil", note: "Makes the dish 100% vegan without losing authenticity." },
      { original: "Potatoes", substitute: "Boiled Raw Banana (Aratikaya)", note: "Perfect for Jain culinary preferences." }
    ]
  },
  {
    id: "idli-sambar",
    title: "Steamed Idli with Drumstick Sambar",
    nativeTitles: {
      te: "ఇడ్లీ సాంబార్",
      hi: "इडली और सहजन सांभर",
      ta: "இட்லி சாம்பார்",
      kn: "ಇಡ್ಲಿ ಸಾಂಬಾರ್",
      ml: "ഇഡ്ഡലി സാമ്പാർ",
      bn: "ইডলি সাম্বার",
      gu: "ઇડલી સાંભાર",
      mr: "इडली सांबार"
    },
    description: "Cloud-soft, naturally fermented steamed rice-lentil cakes soaked in a fragrant, tangy toor dal broth brimming with fresh drumsticks, shallots, tamarind, and freshly ground roasted spices.",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    mealType: "Breakfast",
    foodCategory: "Steamed Delicacies",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 240,
    nutrition: {
      protein: "9g",
      carbs: "46g",
      fat: "2g",
      fiber: "6g",
      micronutrients: {
        iron: "2.8mg",
        calcium: "52mg",
        vitaminC: "18mg",
        potassium: "410mg",
        sodium: "360mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 540,
    featured: true,
    tags: ["South Indian", "Steamed", "Probiotic Fermented", "Healthy Breakfast", "High-Fiber"],
    ingredients: [
      { name: "Fermented Idli Batter", quantity: 600, unit: "ml", category: "Batter" },
      { name: "Toor Dal (Pigeon Pea)", quantity: 150, unit: "g", category: "Lentils" },
      { name: "Drumsticks (Cut in 2-inch Batons)", quantity: 2, unit: "pieces", category: "Vegetables" },
      { name: "Small Shallots (Sambar Onions)", quantity: 12, unit: "pieces", category: "Vegetables" },
      { name: "Tamarind Extract", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Sambar Powder (Freshly Roasted)", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Mustard Seeds & Fenugreek", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Fresh Curry Leaves & Coriander", quantity: 15, unit: "leaves", category: "Herbs" }
    ],
    instructions: [
      {
        step: 1,
        title: "Steam the Idlis",
        text: "Lightly grease idli plates with sesame oil. Pour fermented batter into the indentations and steam in an idli pot on high flame for 10-12 minutes until fluffy and non-sticky.",
        timerSeconds: 720
      },
      {
        step: 2,
        title: "Cook Lentils & Drumsticks",
        text: "Pressure cook toor dal with turmeric until mashable. In a separate pot, cook drumsticks and shallots in tamarind water seasoned with sambar powder and sea salt.",
        timerSeconds: 600
      },
      {
        step: 3,
        title: "Infuse Sambar Tempering",
        text: "Combine cooked dal with the drumstick vegetable broth. Finish with crackling mustard seeds, fenugreek, dried chillies, and curry leaves in warm sesame oil.",
        timerSeconds: 300
      }
    ],
    substitutions: [
      { original: "Drumsticks", substitute: "Bottle Gourd or Pumpkin", note: "Lends a luscious mild sweetness." }
    ]
  },
  {
    id: "ven-pongal",
    title: "Ghee Ven Pongal with Coconut Chutney",
    nativeTitles: {
      te: "నెయ్యి వెన్ పొంగల్",
      hi: "घी वेन पोंगल",
      ta: "நெய் வெண் பொங்கல்",
      kn: "ತುಪ್ಪದ ಖಾರಾ ಪೊಂಗಲ್",
      ml: "നെയ്യ് വെൺ പൊങ്കൽ",
      bn: "ঘি ভেন পোঙ্গল",
      gu: "ઘી વેન પોંગલ",
      mr: "तूप व्हेन पोंगल"
    },
    description: "Heavenly South Indian comfort porridge cooked from fragrant raw rice and roasted moong lentils, tempered in pure cow's ghee with golden cashews, cracked black peppercorns, cumin, and fresh ginger.",
    cuisine: "South Indian",
    region: "Tamil Nadu",
    mealType: "Breakfast",
    foodCategory: "Rice Dishes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "High-Protein", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 340,
    nutrition: {
      protein: "9g",
      carbs: "54g",
      fat: "10g",
      fiber: "4g",
      micronutrients: {
        iron: "2.3mg",
        calcium: "48mg",
        vitaminC: "3mg",
        potassium: "290mg",
        sodium: "320mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy", "Tree Nuts"],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    rating: 4.88,
    reviewsCount: 312,
    featured: false,
    tags: ["South Indian", "Comfort Food", "Ghee Rich", "Temple Classic", "Gluten-Free"],
    ingredients: [
      { name: "Raw Rice (Sona Masoori)", quantity: 200, unit: "g", category: "Grains" },
      { name: "Yellow Moong Dal", quantity: 80, unit: "g", category: "Lentils" },
      { name: "Pure Desi Ghee", quantity: 3, unit: "tbsp", category: "Oils & Ghee" },
      { name: "Whole Cashew Nuts", quantity: 15, unit: "pieces", category: "Nuts" },
      { name: "Black Peppercorns", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Finely Minced Ginger", quantity: 1, unit: "tbsp", category: "Herbs" },
      { name: "Curry Leaves", quantity: 10, unit: "leaves", category: "Herbs" },
      { name: "Hing (Asafoetida)", quantity: 0.25, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Roast and Simmer Lentils with Rice",
        text: "Dry roast yellow moong dal until aromatic. Rinse together with rice. Pressure cook with 4 cups of water and salt for 4 whistles until wonderfully soft and creamy.",
        timerSeconds: 700
      },
      {
        step: 2,
        title: "Sauté Ghee Tempering",
        text: "In a tadka pan, heat pure ghee. Fry cashews until golden amber. Add lightly crushed black peppercorns, cumin seeds, ginger, curry leaves, and hing until fragrant.",
        timerSeconds: 240
      },
      {
        step: 3,
        title: "Fold and Serve Hot",
        text: "Pour the sizzling ghee tempering directly into the cooked rice-dal mash. Fold gently and serve immediately with fresh coconut chutney.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Pure Desi Ghee", substitute: "Cold-Pressed Coconut Oil", note: "Authentic Kerala variation that is 100% plant-based." }
    ]
  },
  {
    id: "authentic-kerala-avial",
    title: "Authentic Kerala Sadya Avial",
    nativeTitles: {
      te: "కేరళ సద్య అవియల్",
      hi: "केरल साद्या अवियल",
      ta: "கேரளா சத்யா அவியல்",
      kn: "ಕೇರಳ ಸದ್ಯ ಅವಿಯಲ್",
      ml: "കേരള സദ്യ അവിയൽ",
      bn: "কেরালা সাদ্যা অবিয়াল",
      gu: "કેરળ સાદ્યા અવિયલ",
      mr: "केरळ साद्या अवियल"
    },
    description: "The crown jewel of Kerala's harvest feast: a medley of crisp native vegetables gently cooked in aromatic turmeric water, folded in freshly ground raw coconut and green chillies, finished with curd and virgin coconut oil.",
    cuisine: "South Indian",
    region: "Kerala",
    mealType: "Side Dishes",
    foodCategory: "Vegetable Medley",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: false, // contains curd, easily subbed
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 25,
    cookTime: 20,
    totalTime: 45,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 210,
    nutrition: {
      protein: "4g",
      carbs: "18g",
      fat: "14g",
      fiber: "7g",
      micronutrients: {
        iron: "1.9mg",
        calcium: "62mg",
        vitaminC: "24mg",
        potassium: "450mg",
        sodium: "220mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.91,
    reviewsCount: 275,
    featured: false,
    tags: ["Kerala Sadya", "Traditional", "Coconut Rich", "Gluten-Free", "Festive Favorite"],
    ingredients: [
      { name: "Mixed Native Vegetables (Yam, Raw Banana, Drumstick, Carrots, Beans)", quantity: 500, unit: "g", category: "Vegetables" },
      { name: "Freshly Grated Coconut", quantity: 150, unit: "g", category: "Pantry" },
      { name: "Green Chillies", quantity: 4, unit: "pieces", category: "Vegetables" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Sour Curd (Yogurt)", quantity: 3, unit: "tbsp", category: "Dairy" },
      { name: "Turmeric Powder", quantity: 0.5, unit: "tsp", category: "Spices" },
      { name: "Virgin Coconut Oil", quantity: 2, unit: "tbsp", category: "Oils" },
      { name: "Fresh Curry Leaves", quantity: 2, unit: "sprigs", category: "Herbs" }
    ],
    instructions: [
      {
        step: 1,
        title: "Batons Vegetable Preparation",
        text: "Chop all vegetables into uniform 2-inch long batons. Cook in 0.5 cup water with turmeric and sea salt until tender but crisp with a gentle bite.",
        timerSeconds: 480
      },
      {
        step: 2,
        title: "Coarse Coconut Paste",
        text: "Crush freshly grated coconut with green chillies and cumin seeds without adding water to form a coarse, fluffy paste.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Fold, Simmer and Temper",
        text: "Gently stir the coconut crush and sour curd into the cooked vegetables. Turn off heat immediately, drizzle with raw virgin coconut oil, and scatter fresh bruised curry leaves.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Sour Curd", substitute: "Raw Mango Slices or Tamarind", note: "Authentic vegan Sadya variation." }
    ]
  },
  {
    id: "kerala-appam-stew",
    title: "Kerala Appam with Vegetable Stew",
    nativeTitles: {
      te: "కేరళ అప్పం వెజిటబుల్ ఇష్టు",
      hi: "केरल अप्पम और वेज स्टू",
      ta: "கேரளா ஆப்பம் வெஜிடபிள் ஸ்டூ",
      kn: "ಕೇರಳ ಆಪ್ಪಂ ವೆಜಿಟೇಬಲ್ ಸ್ಟ್ಯೂ",
      ml: "കേരള അപ്പം വെജിറ്റബിൾ സ്റ്റൂ",
      bn: "কেরালা অপ্পাম সবজি স্টু",
      gu: "કેરળ અપ્પમ વેજ સ્ટ્યૂ",
      mr: "केरळ अप्पम व्हेजिटेबल स्ट्यू"
    },
    description: "Lacy, bowl-shaped fermented rice-coconut crepes with a soft, pillowy center, served with a mild, delicately spiced coconut milk stew simmered with carrots, potatoes, green peas, whole cinnamon, and cloves.",
    cuisine: "South Indian",
    region: "Kerala",
    mealType: "Breakfast",
    foodCategory: "Crepes & Stews",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 290,
    nutrition: {
      protein: "5g",
      carbs: "44g",
      fat: "11g",
      fiber: "5g",
      micronutrients: {
        iron: "2.0mg",
        calcium: "40mg",
        vitaminC: "15mg",
        potassium: "340mg",
        sodium: "280mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 389,
    featured: false,
    tags: ["Kerala", "Lacy Appam", "Coconut Stew", "Gluten-Free", "Breakfast Classic"],
    ingredients: [
      { name: "Fermented Appam Batter", quantity: 500, unit: "ml", category: "Batter" },
      { name: "Potatoes & Carrots (Diced)", quantity: 250, unit: "g", category: "Vegetables" },
      { name: "Green Peas", quantity: 100, unit: "g", category: "Vegetables" },
      { name: "Thin Coconut Milk (Second Extract)", quantity: 300, unit: "ml", category: "Pantry" },
      { name: "Thick Coconut Milk (First Extract)", quantity: 150, unit: "ml", category: "Pantry" },
      { name: "Whole Spices (Cardamom, Cloves, Cinnamon)", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Slit Green Chillies & Ginger", quantity: 1.5, unit: "tbsp", category: "Herbs" },
      { name: "Coconut Oil", quantity: 1.5, unit: "tbsp", category: "Oils" }
    ],
    instructions: [
      {
        step: 1,
        title: "Simmer Vegetables in Thin Coconut Milk",
        text: "Sauté whole spices, ginger, and green chillies in coconut oil. Add vegetables and thin coconut milk. Cook covered until vegetables are soft.",
        timerSeconds: 480
      },
      {
        step: 2,
        title: "Finish Stew with Thick Coconut Milk",
        text: "Pour in thick coconut milk on low heat. Warm through without bringing to a boil to prevent curdling. Sprinkle crushed black pepper.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Swirl Appam in Appachatti",
        text: "Pour a ladle of batter into a hot curved appachatti pan, swirl around to form lacy edges and a thick center. Cover and steam for 2 minutes.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Coconut Milk", substitute: "Almond or Oat Milk", note: "Lighter non-traditional alternative." }
    ]
  },
  {
    id: "tomato-rasam",
    title: "South Indian Pepper Tomato Rasam",
    nativeTitles: {
      te: "మిరియాల టమాటో రసం",
      hi: "टमाटर काली मिर्च रसम",
      ta: "தக்காளி மிளகு ரசம்",
      kn: "ಟೊಮೆಟೊ ಮೆಣಸಿನ ಸಾರು",
      ml: "തക്കാളി കുരുമുളക് രസം",
      bn: "টমেটো গোলমরিচ রসম",
      gu: "ટામેટા મરી રસમ",
      mr: "टोमॅटो मिरी रसम"
    },
    description: "An invigorating Ayurvedic digestive broth prepared from ripe vine tomatoes, crushed black peppercorns, roasted cumin, garlic, and fresh tamarind, tempered with mustard seeds and curry leaves.",
    cuisine: "South Indian",
    region: "Tamil Nadu & Andhra",
    mealType: "Soups",
    foodCategory: "Broths & Rasams",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 75,
    nutrition: {
      protein: "2g",
      carbs: "11g",
      fat: "2.5g",
      fiber: "2g",
      micronutrients: {
        iron: "1.4mg",
        calcium: "35mg",
        vitaminC: "22mg",
        potassium: "320mg",
        sodium: "290mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.87,
    reviewsCount: 195,
    featured: false,
    tags: ["Immunity Booster", "Ayurvedic", "Digestive", "Gluten-Free", "Low-Calorie"],
    ingredients: [
      { name: "Ripe Red Tomatoes (Crushed)", quantity: 4, unit: "medium", category: "Vegetables" },
      { name: "Tamarind Extract", quantity: 1, unit: "tbsp", category: "Condiments" },
      { name: "Black Peppercorns & Cumin (Pounded)", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Garlic Cloves (Crushed)", quantity: 6, unit: "cloves", category: "Vegetables" },
      { name: "Mustard Seeds", quantity: 0.5, unit: "tsp", category: "Spices" },
      { name: "Ghee or Sesame Oil", quantity: 1, unit: "tsp", category: "Oils & Ghee" },
      { name: "Curry Leaves & Coriander Stems", quantity: 15, unit: "leaves", category: "Herbs" }
    ],
    instructions: [
      {
        step: 1,
        title: "Simmer Tomatoes and Tamarind Broth",
        text: "Crush ripe tomatoes by hand into 3 cups of water with tamarind, turmeric, and sea salt. Simmer on medium flame for 8 minutes until raw aroma subsides.",
        timerSeconds: 480
      },
      {
        step: 2,
        title: "Add Freshly Pounded Aromatics",
        text: "Add freshly pounded black pepper, cumin seeds, crushed garlic, and curry leaves. Bring to a gentle frothy boil and turn off the flame immediately.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Infuse Sizzling Tempering",
        text: "Crackle mustard seeds and a dried red chilli in hot ghee or sesame oil. Pour over the hot rasam and garnish with fresh coriander.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Garlic", substitute: "Hing (Asafoetida)", note: "Ideal for Jain dietary adherence." }
    ]
  },

  // =========================================================================
  // 2. ANDHRA & TELANGANA DELICACIES
  // =========================================================================
  {
    id: "gutti-vankaya-koora",
    title: "Gutti Vankaya Koora",
    nativeTitles: {
      te: "గుత్తి వంకాయ కూర",
      hi: "गुत्ती वंकाया (भरवां बैंगन करी)",
      ta: "குத்தி வங்காயா கூரா",
      kn: "ಗುತ್ತಿ ವಂಕಾಯ ಕೂರ",
      ml: "ഗുത്തി വങ്കായ കൂറ",
      bn: "গুট্টি বাঙ্কায়া কুরা",
      gu: "ગુત્તી વંકાયા કૂરા",
      mr: "गुत्ती वंकाया कुरा"
    },
    description: "An iconic Andhra and Telangana delicacy featuring tender baby brinjals stuffed with a slow-roasted blend of roasted peanuts, sesame seeds, desiccated coconut, coriander seeds, and aromatic spices cooked in a rich, tangy tamarind gravy.",
    cuisine: "Andhra",
    region: "Andhra Pradesh & Telangana",
    mealType: "Main Course",
    foodCategory: "Stuffed Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 35,
    totalTime: 55,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 280,
    nutrition: {
      protein: "7g",
      carbs: "24g",
      fat: "18g",
      fiber: "8g",
      micronutrients: {
        iron: "2.4mg",
        calcium: "85mg",
        vitaminC: "12mg",
        potassium: "460mg",
        sodium: "340mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Peanuts", "Sesame"],
    image: "/images/recipes/gutti-vankaya-koora.jpg",
    rating: 4.92,
    reviewsCount: 342,
    featured: true,
    tags: ["Andhra Special", "Tangy & Spicy", "Nut-Rich Gravy", "Festive Classic", "Gluten-Free"],
    ingredients: [
      { name: "Baby Brinjals (Eggplants)", quantity: 500, unit: "g", category: "Vegetables" },
      { name: "Roasted Peanuts", quantity: 3, unit: "tbsp", category: "Nuts" },
      { name: "White Sesame Seeds", quantity: 2, unit: "tbsp", category: "Seeds" },
      { name: "Desiccated Coconut", quantity: 2, unit: "tbsp", category: "Pantry" },
      { name: "Coriander Seeds", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Tamarind Pulp", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Onions (Finely Chopped)", quantity: 2, unit: "medium", category: "Vegetables" },
      { name: "Ginger Garlic Paste", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "Guntur Red Chilli Powder", quantity: 1.5, unit: "tsp", category: "Spices" },
      { name: "Turmeric Powder", quantity: 0.5, unit: "tsp", category: "Spices" },
      { name: "Mustard Oil or Sesame Oil", quantity: 3, unit: "tbsp", category: "Oils" },
      { name: "Curry Leaves", quantity: 10, unit: "leaves", category: "Herbs" },
      { name: "Salt", quantity: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Dry Roast Masala Ingredients",
        text: "In a heavy-bottom pan over medium heat, gently dry-roast coriander seeds, cumin seeds, roasted peanuts, white sesame seeds, and desiccated coconut until fragrant. Cool and grind with ginger-garlic paste into a coarse masala paste.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Slit and Stuff the Brinjals",
        text: "Make a deep plus '+' incision in each baby brinjal from the base toward the stalk. Generously pack with 70% of the ground masala paste.",
        timerSeconds: 360
      },
      {
        step: 3,
        title: "Pan Sear the Stuffed Brinjals",
        text: "Heat oil in a pan, crackle mustard seeds and curry leaves. Add stuffed brinjals and sear on medium-low for 8 minutes until skins are glossy.",
        timerSeconds: 480
      },
      {
        step: 4,
        title: "Simmer Gravy to Perfection",
        text: "Pour in remaining masala, tamarind pulp, and 1.5 cups warm water. Cover and slow simmer for 15 minutes until oil separates.",
        timerSeconds: 900
      }
    ],
    substitutions: [
      { original: "Roasted Peanuts", substitute: "Cashews or Sunflower Seeds", note: "Velvety nut-free alternative." }
    ]
  },
  {
    id: "hyderabadi-dum-biryani",
    title: "Royal Hyderabadi Dum Biryani",
    nativeTitles: {
      te: "హైదరాబాదీ దమ్ బిర్యానీ",
      hi: "शाही हैदराबादी दम बिरयानी",
      ta: "ஹைதராபாதி தம் பிரியாணி",
      kn: "ಹೈದರಾಬಾದಿ ದಮ್ ಬಿರಿಯಾನಿ",
      ml: "ഹൈദരാബാദി ദം ബിരിയാണി",
      bn: "হায়দ্রাবাদি দম বিরিয়ানি",
      gu: "હૈદરાબાદી દમ બિરયાની",
      mr: "हैदराबादी दम बिर्याणी"
    },
    description: "The Nizami masterpiece: long-grain aged basmati rice layered with aromatic marinated spiced vegetables, caramelized onions (birista), fresh mint, and Kashmiri saffron-infused milk, slow-cooked in a dough-sealed handi.",
    cuisine: "Hyderabadi",
    region: "Telangana",
    mealType: "Main Course",
    foodCategory: "Rice Dishes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 30,
    cookTime: 45,
    totalTime: 75,
    servings: 6,
    difficulty: "Advanced",
    budget: "Premium",
    calories: 460,
    nutrition: {
      protein: "12g",
      carbs: "68g",
      fat: "16g",
      fiber: "6g",
      micronutrients: {
        iron: "3.2mg",
        calcium: "110mg",
        vitaminC: "14mg",
        potassium: "490mg",
        sodium: "520mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.98,
    reviewsCount: 940,
    featured: true,
    tags: ["Royal Nizami", "Slow Cooked Dum", "Aromatic Saffron", "Celebration Feast", "Gluten-Free"],
    ingredients: [
      { name: "Aged Basmati Rice", quantity: 400, unit: "g", category: "Grains" },
      { name: "Mixed Vegetables (Carrot, Beans, Cauliflower, Potatoes)", quantity: 350, unit: "g", category: "Vegetables" },
      { name: "Thick Greek Yogurt / Hung Curd", quantity: 200, unit: "g", category: "Dairy" },
      { name: "Birista (Crispy Fried Golden Onions)", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Fresh Mint & Coriander Leaves", quantity: 1, unit: "cup", category: "Herbs" },
      { name: "Kashmiri Saffron soaked in Warm Milk", quantity: 50, unit: "ml", category: "Dairy" },
      { name: "Royal Shahi Garam Masala", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Pure Cow Ghee", quantity: 3, unit: "tbsp", category: "Oils & Ghee" },
      { name: "Whole Spices (Star Anise, Mace, Black Cardamom)", quantity: 1, unit: "tbsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Marinate the Vegetables",
        text: "Toss cut vegetables with curd, ginger-garlic paste, shahi garam masala, red chilli powder, turmeric, chopped mint, coriander, and half of the fried onions. Marinate for 30 minutes.",
        timerSeconds: 900
      },
      {
        step: 2,
        title: "Parboil Aged Basmati Rice",
        text: "Boil soaked basmati rice in salted water infused with whole spices until 70% cooked (firm to the bite). Drain immediately.",
        timerSeconds: 420
      },
      {
        step: 3,
        title: "Assemble and Layer the Handi",
        text: "In a heavy-bottomed pot, spread the marinated vegetable base. Layer parboiled rice on top. Scatter remaining fried onions, fresh mint, saffron milk, and dollops of ghee.",
        timerSeconds: 300
      },
      {
        step: 4,
        title: "Slow Cook on Dum",
        text: "Seal lid with wheat dough or tight foil. Cook on low heat over a flat tawa for 25 minutes to lock in the steam and aromatics.",
        timerSeconds: 1500
      }
    ],
    substitutions: [
      { original: "Mixed Vegetables", substitute: "Marinated Soya Chunks or Paneer", note: "Substantially boosts protein content." }
    ]
  },
  {
    id: "hyderabadi-khatti-dal",
    title: "Hyderabadi Khatti Dal",
    nativeTitles: {
      te: "హైదరాబాదీ ఖట్టీ దాల్",
      hi: "हैदराबादी खट्टी दाल",
      ta: "ஹைதராபாதி கத்தி தால்",
      kn: "ಹೈದರಾಬಾದಿ ಖಟ್ಟಿ ದಾಲ್",
      ml: "ഹൈദരാബാദി ഖട്ടി ദാൽ",
      bn: "হায়দ্রাবাদি খাট্টি ডাল",
      gu: "હૈદરાબાદી ખટ્ટી દાળ",
      mr: "हैदराबादी खट्टी डाळ"
    },
    description: "The soul of everyday Hyderabadi cooking: yellow toor dal slow-cooked with fresh juicy tomatoes, garlic, and tangy tamarind, finished with a sizzling tempering of cumin, dried red chillies, and fresh curry leaves.",
    cuisine: "Hyderabadi",
    region: "Telangana",
    mealType: "Main Course",
    foodCategory: "Lentil Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 195,
    nutrition: {
      protein: "9g",
      carbs: "30g",
      fat: "4.5g",
      fiber: "7g",
      micronutrients: {
        iron: "2.6mg",
        calcium: "42mg",
        vitaminC: "16mg",
        potassium: "390mg",
        sodium: "310mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.89,
    reviewsCount: 220,
    featured: false,
    tags: ["Hyderabadi", "Tangy Dal", "High Protein", "Comfort Food", "Gluten-Free"],
    ingredients: [
      { name: "Toor Dal (Split Pigeon Peas)", quantity: 200, unit: "g", category: "Lentils" },
      { name: "Country Tomatoes (Chopped)", quantity: 3, unit: "medium", category: "Vegetables" },
      { name: "Tamarind Pulp", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Garlic Cloves (Crushed)", quantity: 6, unit: "cloves", category: "Vegetables" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Mustard Seeds", quantity: 0.5, unit: "tsp", category: "Spices" },
      { name: "Dry Red Chillies", quantity: 3, unit: "pieces", category: "Spices" },
      { name: "Curry Leaves & Fresh Coriander", quantity: 15, unit: "leaves", category: "Herbs" }
    ],
    instructions: [
      {
        step: 1,
        title: "Pressure Cook Dal and Tomatoes",
        text: "Cook toor dal with chopped tomatoes, turmeric, green chillies, and garlic in 3 cups water until soft and easily mashable.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Whisk in Tamarind Gravy",
        text: "Whisk cooked dal into a smooth gravy. Stir in thick tamarind extract, salt, and simmer for 6 minutes until sour flavours harmonize.",
        timerSeconds: 360
      },
      {
        step: 3,
        title: "Tadka Tempering",
        text: "Heat oil, crackle mustard seeds, cumin, dried chillies, and curry leaves. Pour over the dal and cover immediately.",
        timerSeconds: 180
      }
    ],
    substitutions: [
      { original: "Tamarind", substitute: "Raw Mango Slices", note: "Creates classic Mamidikaya Pappu flavor." }
    ]
  },
  {
    id: "andhra-pesarattu",
    title: "Andhra Pesarattu with Allam Pachadi",
    nativeTitles: {
      te: "ఆంధ్ర పెసరట్టు అల్లం పచ్చడి",
      hi: "आंध्रा पेसरट्टू और अदरक की चटनी",
      ta: "ஆந்திரா பெசரட்டு இஞ்சி சட்னி",
      kn: "ಆಂಧ್ರ ಪೆಸರಟ್ಟು ಶುಂಠಿ ಚಟ್ನಿ",
      ml: "ആന്ധ്ര പെസരട്ടു ഇഞ്ചി ചട്ണി",
      bn: "অন্ধ্র পেসারাত্তু আদা চাটনি",
      gu: "આંધ્ર પેસરટ્ટુ આદુ ચટણી",
      mr: "आंध्र पेसरट्टू आले चटणी"
    },
    description: "Nutritious whole green moong bean crepes ground fresh with ginger and green chillies, griddled crisp with golden onions, served with traditional sweet and tangy Andhra allam (ginger) pachadi.",
    cuisine: "Andhra",
    region: "Andhra Pradesh",
    mealType: "Breakfast",
    foodCategory: "Lentil Crepes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "High-Protein", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 270,
    nutrition: {
      protein: "14g",
      carbs: "42g",
      fat: "5g",
      fiber: "9g",
      micronutrients: {
        iron: "3.5mg",
        calcium: "65mg",
        vitaminC: "8mg",
        potassium: "510mg",
        sodium: "280mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80",
    rating: 4.94,
    reviewsCount: 310,
    featured: false,
    tags: ["High Protein", "Whole Moong", "No Fermentation", "Andhra Breakfast", "Gluten-Free"],
    ingredients: [
      { name: "Whole Green Moong Dal (Soaked)", quantity: 300, unit: "g", category: "Lentils" },
      { name: "Fresh Ginger & Green Chillies", quantity: 2, unit: "tbsp", category: "Herbs" },
      { name: "Cumin Seeds", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Finely Chopped Red Onions", quantity: 1, unit: "cup", category: "Vegetables" },
      { name: "Sesame Oil", quantity: 2, unit: "tbsp", category: "Oils" },
      { name: "Rock Salt", quantity: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Grind Batter Fresh",
        text: "Grind soaked green gram with fresh ginger, green chillies, cumin seeds, and salt into a smooth pourable batter without requiring fermentation.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Griddle and Top with Onions",
        text: "Pour a ladle of batter onto a hot cast-iron skillet, spread thinly. Press chopped onions and cumin on top, drizzle sesame oil, and roast until crispy.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Raw Moong", substitute: "Yellow Moong Dal", note: "Yields a lighter yellow crepe." }
    ]
  },
  {
    id: "gongura-pachadi-rice",
    title: "Gongura Pachadi with Steamed Rice",
    nativeTitles: {
      te: "గోంగూర పచ్చడి అన్నం",
      hi: "गोंगुरा चटनी और चावल",
      ta: "கோங்குரா துவையல் சாதம்",
      kn: "ಗೊಂಗೂರ ಚಟ್ನಿ ಅನ್ನ",
      ml: "ഗോങ്കുര ചട്ണി ചോറ്",
      bn: "গোঙ্গুরা চাটনি ভাত",
      gu: "ગોંગુરા ચટણી ભાત",
      mr: "गोंगुरा चटणी भात"
    },
    description: "The tangy pride of Andhra: sour sorrel leaves (gongura) braised with fiery Guntur dry red chillies, garlic, and coriander seeds, stone-ground into a rich pickle and served with piping hot rice and melted ghee.",
    cuisine: "Andhra",
    region: "Andhra Pradesh",
    mealType: "Lunch",
    foodCategory: "Traditional Relishes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "Plant-Based", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 290,
    nutrition: {
      protein: "5g",
      carbs: "48g",
      fat: "9g",
      fiber: "4g",
      micronutrients: {
        iron: "4.2mg",
        calcium: "90mg",
        vitaminC: "28mg",
        potassium: "310mg",
        sodium: "380mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 260,
    featured: false,
    tags: ["Sorrel Leaves", "Tangy & Fiery", "Iron Rich", "Andhra Heritage", "Gluten-Free"],
    ingredients: [
      { name: "Fresh Red Sorrel Leaves (Gongura)", quantity: 300, unit: "g", category: "Greens" },
      { name: "Guntur Dry Red Chillies", quantity: 8, unit: "pieces", category: "Spices" },
      { name: "Garlic Cloves", quantity: 8, unit: "cloves", category: "Vegetables" },
      { name: "Coriander & Fenugreek Seeds", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Mustard Oil / Sesame Oil", quantity: 3, unit: "tbsp", category: "Oils" },
      { name: "Pure Ghee for serving", quantity: 2, unit: "tbsp", category: "Oils & Ghee" }
    ],
    instructions: [
      {
        step: 1,
        title: "Wilt Sorrel Leaves",
        text: "Wash gongura leaves thoroughly. Sauté in 1 tsp oil on medium-low flame until completely wilted and dark green.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Roast Spices and Grind",
        text: "Roast coriander seeds, fenugreek, and red chillies. Grind with garlic and salt, then pulse with the wilted gongura leaves into a rustic pachadi.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Sorrel Leaves", substitute: "Spinach with Lemon Juice & Amchur", note: "When fresh gongura is unavailable." }
    ]
  },

  // =========================================================================
  // 3. NORTH INDIAN ESSENTIALS
  // =========================================================================
  {
    id: "paneer-butter-masala",
    title: "Paneer Butter Masala",
    nativeTitles: {
      te: "పనీర్ బటర్ మసాలా",
      hi: "पनीर बटर मसाला",
      ta: "பன்னீர் பட்டர் மசாலா",
      kn: "ಪನೀರ್ ಬಟರ್ ಮಸಾಲಾ",
      ml: "പനീർ ബട്ടർ മസാല",
      bn: "পনির বাটার মশলা",
      gu: "પનીર બટર મસાલા",
      mr: "पनीर बटर मसाला"
    },
    description: "Velvety smooth North Indian restaurant classic featuring tender malai paneer cubes simmered in a slow-reduced roasted tomato, butter, and cashew nut makhani gravy perfumed with aromatic kasuri methi.",
    cuisine: "North Indian",
    region: "Punjab",
    mealType: "Main Course",
    foodCategory: "Makhani Gravies",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "High-Protein", "Keto-Friendly", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Moderate",
    calories: 380,
    nutrition: {
      protein: "14g",
      carbs: "18g",
      fat: "28g",
      fiber: "4g",
      micronutrients: {
        iron: "1.8mg",
        calcium: "280mg",
        vitaminC: "12mg",
        potassium: "340mg",
        sodium: "410mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy", "Tree Nuts"],
    image: "/images/recipes/paneer-butter-masala.jpg",
    rating: 4.95,
    reviewsCount: 820,
    featured: true,
    tags: ["North Indian", "Creamy Makhani", "High Protein", "Restaurant Classic", "Gluten-Free"],
    ingredients: [
      { name: "Fresh Malai Paneer (Cottage Cheese)", quantity: 300, unit: "g", category: "Dairy" },
      { name: "Ripe Red Tomatoes", quantity: 5, unit: "medium", category: "Vegetables" },
      { name: "Cashew Nuts", quantity: 15, unit: "pieces", category: "Nuts" },
      { name: "Fresh Cream", quantity: 3, unit: "tbsp", category: "Dairy" },
      { name: "White Butter (Makhan)", quantity: 2, unit: "tbsp", category: "Dairy" },
      { name: "Ginger Garlic Paste", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "Kashmiri Red Chilli Powder", quantity: 1.5, unit: "tsp", category: "Spices" },
      { name: "Kasuri Methi (Crushed)", quantity: 1, unit: "tbsp", category: "Herbs" },
      { name: "Garam Masala", quantity: 0.5, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Simmer and Puree the Makhani Base",
        text: "Boil chopped tomatoes with whole cashews, ginger-garlic paste, and Kashmiri red chilli in 1 cup water for 15 minutes. Blend into a satin-smooth puree and strain through a fine sieve.",
        timerSeconds: 900
      },
      {
        step: 2,
        title: "Cook Gravy in Butter",
        text: "Melt butter in a pan, pour in strained tomato-cashew puree. Simmer on low heat until glossy and fragrant, seasoning with salt and a pinch of raw sugar.",
        timerSeconds: 480
      },
      {
        step: 3,
        title: "Fold Paneer and Cream",
        text: "Add soft paneer cubes, fresh cream, garam masala, and roasted kasuri methi. Simmer for 3 minutes before turning off the heat.",
        timerSeconds: 180
      }
    ],
    substitutions: [
      { original: "Malai Paneer", substitute: "Firm Organic Tofu", note: "Rich plant-based protein replacement." },
      { original: "Fresh Cream", substitute: "Cashew Milk", note: "Creates an exquisite dairy-free gravy." }
    ]
  },
  {
    id: "dal-makhani",
    title: "Slow-Cooked Dal Makhani",
    nativeTitles: {
      te: "దాల్ మఖనీ",
      hi: "दाल मखनी",
      ta: "தால் மக்கனி",
      kn: "ದಾಲ್ ಮಖನಿ",
      ml: "ദാൽ മഖനി",
      bn: "ডাল মাখনি",
      gu: "દાળ મખની",
      mr: "दाल मखनी"
    },
    description: "The pride of Punjab: whole black urad lentils and red kidney beans simmered overnight over slow embers, infused with rich butter, sweet cream, pureed tomatoes, and subtle smoky spices.",
    cuisine: "North Indian",
    region: "Punjab & Delhi",
    mealType: "Main Course",
    foodCategory: "Lentil Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "High-Protein", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 20,
    cookTime: 60,
    totalTime: 80,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 340,
    nutrition: {
      protein: "14g",
      carbs: "44g",
      fat: "12g",
      fiber: "11g",
      micronutrients: {
        iron: "3.8mg",
        calcium: "140mg",
        vitaminC: "8mg",
        potassium: "560mg",
        sodium: "390mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.97,
    reviewsCount: 780,
    featured: false,
    tags: ["Punjabi Feast", "Slow Cooked", "High Fiber", "High Protein", "Gluten-Free"],
    ingredients: [
      { name: "Whole Black Urad Dal (Soaked Overnight)", quantity: 200, unit: "g", category: "Lentils" },
      { name: "Rajma (Red Kidney Beans)", quantity: 50, unit: "g", category: "Lentils" },
      { name: "Tomato Puree (Fresh)", quantity: 1.5, unit: "cups", category: "Vegetables" },
      { name: "Butter (Makhan)", quantity: 3, unit: "tbsp", category: "Dairy" },
      { name: "Fresh Cream", quantity: 3, unit: "tbsp", category: "Dairy" },
      { name: "Kashmiri Chilli Powder", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Kasuri Methi & Garam Masala", quantity: 1, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Pressure Cook the Lentils",
        text: "Pressure cook soaked black lentils and kidney beans with salt and Kashmiri chilli for 30 minutes until meltingly soft.",
        timerSeconds: 1800
      },
      {
        step: 2,
        title: "Slow Simmer with Tomato and Butter",
        text: "Mash lentils lightly against the sides of the pot. Stir in fresh tomato puree and butter. Simmer on lowest heat for 45 minutes, stirring periodically.",
        timerSeconds: 2700
      },
      {
        step: 3,
        title: "Finish with Cream and Kasuri Methi",
        text: "Stir in fresh cream, garam masala, and crushed fenugreek leaves. Serve piping hot with garlic naan.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Butter & Cream", substitute: "Coconut Cream & Vegan Butter", note: "Creates an exceptional plant-based version." }
    ]
  },
  {
    id: "amritsari-chole-bhature",
    title: "Amritsari Chole with Fluffy Bhature",
    nativeTitles: {
      te: "అమృతసర్ ఛోలే భటూరే",
      hi: "अमृतसरी छोले भटूरे",
      ta: "அமிர்தசரஸ் சோலே பட்டூரா",
      kn: "ಅಮೃತಸರ್ ಚೋಲೆ ಭಟೂರೆ",
      ml: "അമൃത്സർ ചോലെ ഭട്ടൂര",
      bn: "অমৃতসরি ছোলে ভাটুরে",
      gu: "અમૃતસરી છોલે ભટૂરે",
      mr: "अमृतसरी छोले भटुरे"
    },
    description: "Tender white chickpeas steeped in black tea liquor, slow-braised with dried pomegranate seeds (anardana), carom, and roasted Punjabi spices, accompanied by puffed golden bhaturas.",
    cuisine: "North Indian",
    region: "Punjab",
    mealType: "Lunch",
    foodCategory: "Legume Curries & Breads",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "High-Protein", "Plant-Based", "Balanced Diet"],
    vegan: true,
    glutenFree: false, // bhatura has wheat
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 40,
    totalTime: 60,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 450,
    nutrition: {
      protein: "16g",
      carbs: "62g",
      fat: "14g",
      fiber: "12g",
      micronutrients: {
        iron: "4.5mg",
        calcium: "105mg",
        vitaminC: "11mg",
        potassium: "580mg",
        sodium: "460mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 620,
    featured: false,
    tags: ["Punjabi Dhaba", "High Protein", "Spicy Chole", "Street Legend"],
    ingredients: [
      { name: "Kabuli Chana (Chickpeas, Soaked)", quantity: 300, unit: "g", category: "Legumes" },
      { name: "Black Tea Bags (for infusion)", quantity: 2, unit: "bags", category: "Pantry" },
      { name: "Dried Pomegranate Seeds (Anardana)", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Amritsari Chole Masala", quantity: 2, unit: "tbsp", category: "Spices" },
      { name: "Ginger Juliennes & Slit Chillies", quantity: 2, unit: "tbsp", category: "Vegetables" },
      { name: "Mustard Oil / Ghee", quantity: 3, unit: "tbsp", category: "Oils" }
    ],
    instructions: [
      {
        step: 1,
        title: "Boil Chickpeas with Tea Liquor",
        text: "Boil soaked chickpeas with black tea bags, black cardamom, and salt for 6 whistles until deep dark and melt-in-the-mouth soft.",
        timerSeconds: 1200
      },
      {
        step: 2,
        title: "Infuse Roasted Anardana Spice Paste",
        text: "Roast and grind anardana seeds. Cook with onions, ginger-garlic paste, and chole masala. Add boiled chickpeas and simmer for 15 minutes.",
        timerSeconds: 900
      }
    ],
    substitutions: [
      { original: "Anardana Seeds", substitute: "Dry Mango Powder (Amchur)", note: "Delivers similar tart fruity tang." }
    ]
  },
  {
    id: "punjabi-rajma-chawal",
    title: "Punjabi Rajma Chawal",
    nativeTitles: {
      te: "రాజ్మా చావల్",
      hi: "पंजाबी राजमा चावल",
      ta: "பஞ்சாபி ராஜ்மா சாதம்",
      kn: "ರಾಜ್ಮಾ ಚಾವಲ್",
      ml: "പഞ്ചാബി രാജ്മ ചോറ്",
      bn: "পাঞ্জাবি রাজমা চাওয়াল",
      gu: "પંજાબી રાજમા ચાવલ",
      mr: "पंजाबी राजमा चावल"
    },
    description: "The ultimate North Indian homestyle comfort: melting Kashmiri red kidney beans slow-simmered in a rich onion-tomato-ginger gravy, ladled over fluffy steamed fragrant basmati rice.",
    cuisine: "North Indian",
    region: "Punjab & Kashmir",
    mealType: "Lunch",
    foodCategory: "Bean Bowls",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 360,
    nutrition: {
      protein: "15g",
      carbs: "62g",
      fat: "6g",
      fiber: "10g",
      micronutrients: {
        iron: "3.9mg",
        calcium: "85mg",
        vitaminC: "14mg",
        potassium: "520mg",
        sodium: "340mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 512,
    featured: false,
    tags: ["Comfort Food", "High Protein", "High Fiber", "Vegan", "Gluten-Free"],
    ingredients: [
      { name: "Kashmiri Red Rajma (Kidney Beans)", quantity: 250, unit: "g", category: "Legumes" },
      { name: "Onions (Pureed)", quantity: 2, unit: "medium", category: "Vegetables" },
      { name: "Tomatoes (Pureed)", quantity: 3, unit: "medium", category: "Vegetables" },
      { name: "Ginger Garlic Paste", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "Cumin & Coriander Powder", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Steamed Basmati Rice", quantity: 300, unit: "g", category: "Grains" }
    ],
    instructions: [
      {
        step: 1,
        title: "Pressure Cook the Beans",
        text: "Pressure cook soaked kidney beans with whole spices and salt until thoroughly tender.",
        timerSeconds: 900
      },
      {
        step: 2,
        title: "Cook Gravy and Simmer",
        text: "Sauté onion and tomato pastes with spices until oil glistens. Add cooked beans with broth and simmer for 20 minutes.",
        timerSeconds: 1200
      }
    ],
    substitutions: [
      { original: "Kashmiri Rajma", substitute: "Chitra Rajma", note: "Slightly creamier texture." }
    ]
  },
  {
    id: "vegetable-pulao",
    title: "Fragrant Royal Vegetable Pulao",
    nativeTitles: {
      te: "వెజిటబుల్ పులావ్",
      hi: "शाही वेज पुलाव",
      ta: "வெஜிடபிள் புலாவ்",
      kn: "ತರಕಾರಿ ಪುಲಾವ್",
      ml: "വെജിറ്റബിൾ പുലാവ്",
      bn: "সবজি পোলাও",
      gu: "શાહી વેજ પુલાવ",
      mr: "शाही व्हेज पुलाव"
    },
    description: "Aromatic aged long-grain basmati rice gently cooked with tender garden vegetables, fried cashews, sweet green peas, and whole fragrant spices like star anise, cinnamon, and black cardamom.",
    cuisine: "North Indian",
    region: "North India",
    mealType: "Lunch",
    foodCategory: "Rice Dishes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "Plant-Based", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 310,
    nutrition: {
      protein: "7g",
      carbs: "56g",
      fat: "7g",
      fiber: "5g",
      micronutrients: {
        iron: "1.9mg",
        calcium: "45mg",
        vitaminC: "18mg",
        potassium: "320mg",
        sodium: "290mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Tree Nuts"],
    image: "/images/recipes/vegetable-pulao.jpg",
    rating: 4.89,
    reviewsCount: 310,
    featured: true,
    tags: ["One Pot Meal", "Aromatic Spices", "Basmati Classic", "Gluten-Free"],
    ingredients: [
      { name: "Aged Basmati Rice", quantity: 300, unit: "g", category: "Grains" },
      { name: "Carrots, Beans, Peas & Florets", quantity: 200, unit: "g", category: "Vegetables" },
      { name: "Pure Cow Ghee", quantity: 2, unit: "tbsp", category: "Oils & Ghee" },
      { name: "Whole Spices (Cardamom, Cloves, Bay Leaf)", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Cashews", quantity: 10, unit: "pieces", category: "Nuts" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sauté Aromatics in Ghee",
        text: "Heat ghee in a pot, fry cashews, then bloom whole spices, sliced onions, and vegetables.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Steam with Rice",
        text: "Add washed rice, 2 cups warm water, and salt. Cook covered on low heat for 12 minutes until grains are fluffy.",
        timerSeconds: 720
      }
    ],
    substitutions: [
      { original: "Pure Cow Ghee", substitute: "Olive Oil or Coconut Oil", note: "100% plant-based version." }
    ]
  },
  {
    id: "garlic-butter-naan",
    title: "Tandoori Garlic Butter Naan",
    nativeTitles: {
      te: "గార్లిక్ బటర్ నాన్",
      hi: "गार्लिक बटर नान",
      ta: "பூண்டு பட்டர் நான்",
      kn: "ಬೆಳ್ಳುಳ್ಳಿ ಬಟರ್ ನಾನ್",
      ml: "വെളുത്തുള്ളി ബട്ടർ നാൻ",
      bn: "গার্লিক বাটার নান",
      gu: "ગાર્લિક બટર નાન",
      mr: "लसूण बटर नान"
    },
    description: "Pillowy, charred Indian flatbread baked at high heat, brushed generously with melted garlic butter, fresh coriander, and toasted nigella seeds (kalonji).",
    cuisine: "North Indian",
    region: "Punjab",
    mealType: "Breads",
    foodCategory: "Flatbreads",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 40,
    cookTime: 10,
    totalTime: 50,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 260,
    nutrition: {
      protein: "7g",
      carbs: "38g",
      fat: "9g",
      fiber: "2g",
      micronutrients: {
        iron: "1.8mg",
        calcium: "60mg",
        vitaminC: "3mg",
        potassium: "140mg",
        sodium: "320mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    rating: 4.94,
    reviewsCount: 420,
    featured: false,
    tags: ["Tandoor Style", "Garlic Butter", "Soft Flatbread", "Restaurant Favorite"],
    ingredients: [
      { name: "All Purpose Flour (Maida) & Atta", quantity: 300, unit: "g", category: "Grains" },
      { name: "Yogurt & Warm Milk", quantity: 150, unit: "ml", category: "Dairy" },
      { name: "Minced Fresh Garlic", quantity: 3, unit: "tbsp", category: "Vegetables" },
      { name: "Softened Butter", quantity: 3, unit: "tbsp", category: "Dairy" },
      { name: "Kalonji (Nigella Seeds)", quantity: 1, unit: "tsp", category: "Seeds" }
    ],
    instructions: [
      {
        step: 1,
        title: "Knead and Rest Dough",
        text: "Knead flour with yogurt, milk, a pinch of baking powder, and salt into a soft dough. Rest covered for 30 minutes.",
        timerSeconds: 1800
      },
      {
        step: 2,
        title: "Roll and Skillet Bake",
        text: "Roll teardrop shapes, press garlic and nigella on top. Apply water to reverse side, place on hot iron tawa, flip over open flame to char.",
        timerSeconds: 300
      }
    ],
    substitutions: [
      { original: "Maida", substitute: "100% Whole Wheat Atta", note: "Higher fiber Roti style." }
    ]
  },

  // =========================================================================
  // 4. EAST INDIAN & NORTHEAST DELICACIES
  // =========================================================================
  {
    id: "bihari-litti-chokha",
    title: "Authentic Bihari Litti Chokha",
    nativeTitles: {
      te: "బీహారీ లిట్టి చోఖా",
      hi: "पारंपरिक बिहारी लिट्टी चोखा",
      ta: "பீஹாரி லிட்டி சோகா",
      kn: "ಬಿಹಾರಿ ಲಿಟ್ಟಿ ಚೋಖಾ",
      ml: "ബിഹാരി ലിറ്റി ചോഖ",
      bn: "বিহারি লিট্টি চোখা",
      gu: "બિહારી લિટ્ટી ચોખા",
      mr: "बिहारी लिट्टी चोखा"
    },
    description: "The rustic jewel of Bihar: roasted whole wheat dough balls stuffed with spiced sattu (roasted gram flour), carom seeds, and mustard oil, served with smoky fire-roasted brinjal-tomato chokha and ghee.",
    cuisine: "East Indian",
    region: "Bihar",
    mealType: "Lunch",
    foodCategory: "Traditional Breads & Mash",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "High-Protein", "High-Fiber", "Plant-Based", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 25,
    cookTime: 30,
    totalTime: 55,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 380,
    nutrition: {
      protein: "16g",
      carbs: "58g",
      fat: "10g",
      fiber: "12g",
      micronutrients: {
        iron: "4.8mg",
        calcium: "90mg",
        vitaminC: "15mg",
        potassium: "520mg",
        sodium: "340mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 390,
    featured: false,
    tags: ["Bihari Heritage", "Sattu Superfood", "Smoky Chokha", "High Protein", "High Fiber"],
    ingredients: [
      { name: "Whole Wheat Atta", quantity: 300, unit: "g", category: "Grains" },
      { name: "Chana Sattu (Roasted Gram Flour)", quantity: 200, unit: "g", category: "Lentils" },
      { name: "Ajwain (Carom Seeds) & Kalonji", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Mustard Oil", quantity: 2, unit: "tbsp", category: "Oils" },
      { name: "Charred Brinjal & Tomatoes (for Chokha)", quantity: 400, unit: "g", category: "Vegetables" },
      { name: "Pure Cow Ghee", quantity: 3, unit: "tbsp", category: "Oils & Ghee" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prepare Spiced Sattu Stuffing",
        text: "Mix roasted gram flour with ajwain, kalonji, minced garlic, green chillies, lemon juice, salt, and pungent raw mustard oil.",
        timerSeconds: 360
      },
      {
        step: 2,
        title: "Stuff and Bake Littis",
        text: "Roll dough portions into cups, stuff generously with sattu, and pinch close into round spheres. Roast on medium flame or charcoal until charred.",
        timerSeconds: 900
      },
      {
        step: 3,
        title: "Mash Smoky Chokha",
        text: "Peel fire-charred eggplant and tomatoes. Mash together with green chillies, raw mustard oil, garlic, and sea salt.",
        timerSeconds: 300
      }
    ],
    substitutions: [
      { original: "Pure Cow Ghee", substitute: "Warm Mustard Oil", note: "Makes the rustic feast 100% plant-based." }
    ]
  },
  {
    id: "bengali-macher-jhol",
    title: "Traditional Bengali Macher Jhol",
    nativeTitles: {
      te: "బెంగాలీ చేపల పులుసు (మాచేర్ ఝోల్)",
      hi: "बंगाली माछेर झोल",
      ta: "வங்காளி மீன் குழம்பு",
      kn: "ಬೆಂಗಾಲಿ ಮೀನಿನ ಸಾರು",
      ml: "ബംഗാളി മീൻ കറി",
      bn: "ঐতিহ্যবাহী বাঙালি মাছের ঝোল",
      gu: "બંગાળી માછેર ઝોલ",
      mr: "बंगाली माछेर झोल"
    },
    description: "The quintessential Bengali culinary heritage: tender Rohu or Katla fish fillets gently fried in pure mustard oil, slow-stewed in a light golden cumin and panch phoran broth with potatoes and cauliflower florets.",
    cuisine: "East Indian",
    region: "West Bengal",
    mealType: "Main Course",
    foodCategory: "Fish Curries",
    diet: "Pescatarian",
    dietaryClassifications: ["Pescatarian", "Gluten-Free", "Dairy-Free", "High-Protein", "Low-Carb", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 290,
    nutrition: {
      protein: "24g",
      carbs: "18g",
      fat: "14g",
      fiber: "3g",
      micronutrients: {
        iron: "2.8mg",
        calcium: "95mg",
        vitaminC: "14mg",
        potassium: "510mg",
        sodium: "380mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Fish", "Mustard"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.94,
    reviewsCount: 320,
    featured: false,
    tags: ["Bengali Classic", "Panch Phoran", "High Protein", "Mustard Oil", "Pescatarian"],
    ingredients: [
      { name: "Rohu / Katla Fresh Fish Steaks", quantity: 500, unit: "g", category: "Fish" },
      { name: "Potatoes & Cauliflower (Cut lengthwise)", quantity: 200, unit: "g", category: "Vegetables" },
      { name: "Panch Phoran (Five Spices)", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Kacha Mustard Oil", quantity: 3, unit: "tbsp", category: "Oils" },
      { name: "Cumin & Turmeric Paste", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Green Chillies", quantity: 4, unit: "pieces", category: "Vegetables" }
    ],
    instructions: [
      {
        step: 1,
        title: "Season and Shallow Fry Fish",
        text: "Rub fish steaks with turmeric and salt. Shallow fry in smoking mustard oil until light golden and set aside.",
        timerSeconds: 360
      },
      {
        step: 2,
        title: "Simmer Broth with Vegetables",
        text: "In the remaining oil, crackle panch phoran. Sauté potatoes, cauliflower, and cumin paste. Add warm water and simmer.",
        timerSeconds: 600
      },
      {
        step: 3,
        title: "Gently Poach Fish",
        text: "Gently lower the fried fish steaks into the bubbling broth. Simmer for 6 minutes with slit green chillies.",
        timerSeconds: 360
      }
    ],
    substitutions: [
      { original: "Rohu Fish", substitute: "Tofu or Yam (Ool)", note: "Creates authentic vegetarian Bengali Ool-Dharosh jhol." }
    ]
  },
  {
    id: "darjeeling-veg-momos",
    title: "Steamed Darjeeling Vegetable Momos",
    nativeTitles: {
      te: "డార్జిలింగ్ వెజ్ మోమోస్",
      hi: "दार्जिलिंग वेज मोमोज",
      ta: "டார்ஜிலிங் வெஜ் மோமோஸ்",
      kn: "ಡಾರ್ಜಿಲಿಂಗ್ ವೆಜ್ ಮೊಮೊಸ್",
      ml: "ഡാർജിലിംഗ് വെജ് മോമോസ്",
      bn: "দার্জিলিং ভেজ মোমো",
      gu: "દાર્જિલિંગ વેજ મોમોઝ",
      mr: "दार्जिलिंग व्हेज मोमोज"
    },
    description: "Delicate translucent steamed dumplings filled with finely minced garden vegetables, ginger, spring onions, and Himalayan spices, served alongside fiery red mountain chilli-garlic chutney.",
    cuisine: "East Indian",
    region: "Darjeeling & Sikkim",
    mealType: "Snacks",
    foodCategory: "Dumplings",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 30,
    cookTime: 12,
    totalTime: 42,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 220,
    nutrition: {
      protein: "6g",
      carbs: "38g",
      fat: "4g",
      fiber: "5g",
      micronutrients: {
        iron: "1.9mg",
        calcium: "45mg",
        vitaminC: "18mg",
        potassium: "280mg",
        sodium: "340mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 480,
    featured: false,
    tags: ["Himalayan", "Steamed Dumplings", "Mountain Snack", "Fiery Dip"],
    ingredients: [
      { name: "Refined Flour Wrappers", quantity: 200, unit: "g", category: "Grains" },
      { name: "Finely Minced Cabbage & Carrots", quantity: 300, unit: "g", category: "Vegetables" },
      { name: "Spring Onions & Garlic", quantity: 1, unit: "cup", category: "Vegetables" },
      { name: "Fresh Ginger (Minced)", quantity: 1.5, unit: "tbsp", category: "Herbs" },
      { name: "Dark Soy Sauce & Toasted Sesame Oil", quantity: 1, unit: "tbsp", category: "Condiments" }
    ],
    instructions: [
      {
        step: 1,
        title: "Prepare Crunchy Vegetable Filling",
        text: "Squeeze moisture from minced cabbage and carrots. Toss with spring onions, ginger, garlic, salt, pepper, and sesame oil.",
        timerSeconds: 360
      },
      {
        step: 2,
        title: "Pleat and Steam Momos",
        text: "Place spoonful of filling in center of round wrapper. Pleat edges tightly to seal. Steam in a bamboo steamer for 10-12 minutes.",
        timerSeconds: 720
      }
    ],
    substitutions: [
      { original: "Flour Wrappers", substitute: "Rice Paper Wrappers", note: "Gluten-free alternative." }
    ]
  },

  // =========================================================================
  // 5. WEST INDIAN SPECIALTIES
  // =========================================================================
  {
    id: "gujarati-khaman-dhokla",
    title: "Gujarati Nylon Khaman Dhokla",
    nativeTitles: {
      te: "గుజరాతీ ఖమన్ డోక్లా",
      hi: "गुजराती नायलॉन खमन ढोकला",
      ta: "குஜராத்தி கமன் டோக்ளா",
      kn: "ಗುಜರಾತಿ ಖಮನ್ ಧೋಕ್ಲಾ",
      ml: "ഗുജറാത്തി ഖമൻ ദോക്ല",
      bn: "গুজরাটি খামন ধোকলা",
      gu: "ગુજરાતી નાયલોન ખમણ ઢોકળા",
      mr: "गुजराती नायलॉन खमण ढोकळा"
    },
    description: "Feather-light, spongy steamed savory cakes made from spiced gram flour (besan), infused with a sweet and tangy lemon-mustard tempering and sprinkled with fresh coriander and grated coconut.",
    cuisine: "West Indian",
    region: "Gujarat",
    mealType: "Breakfast",
    foodCategory: "Steamed Snacks",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: true,
    dairyFree: true,
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 180,
    nutrition: {
      protein: "8g",
      carbs: "28g",
      fat: "4g",
      fiber: "5g",
      micronutrients: {
        iron: "2.2mg",
        calcium: "45mg",
        vitaminC: "14mg",
        potassium: "310mg",
        sodium: "320mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Mustard"],
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80",
    rating: 4.91,
    reviewsCount: 410,
    featured: false,
    tags: ["Gujarati Special", "Steamed", "Spongy & Juicy", "Gluten-Free", "Jain-Friendly"],
    ingredients: [
      { name: "Besan (Gram Flour)", quantity: 200, unit: "g", category: "Flour" },
      { name: "Lemon Juice & Citric Acid", quantity: 1.5, unit: "tbsp", category: "Condiments" },
      { name: "Fruit Salt (Eno)", quantity: 1, unit: "tsp", category: "Pantry" },
      { name: "Mustard Seeds & Green Chillies", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Raw Sugar & Salt for Tempering Water", quantity: 1.5, unit: "tbsp", category: "Pantry" },
      { name: "Fresh Coriander & Grated Coconut", quantity: 3, unit: "tbsp", category: "Garnish" }
    ],
    instructions: [
      {
        step: 1,
        title: "Whisk and Steam Batter",
        text: "Whisk gram flour with turmeric, salt, lemon juice, and water into a smooth lump-free batter. Stir in fruit salt, pour into greased tray, and steam for 18 minutes.",
        timerSeconds: 1080
      },
      {
        step: 2,
        title: "Pour Sweet & Tangy Tempering",
        text: "Heat oil, splutter mustard seeds and green chillies. Add 0.75 cup water and sugar. Bring to a boil and pour evenly over the warm cubed dhoklas to absorb.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Fruit Salt", substitute: "Baking Soda with Lemon Juice", note: "Classic home leavener." }
    ]
  },
  {
    id: "mumbai-pav-bhaji",
    title: "Buttery Mumbai Pav Bhaji",
    nativeTitles: {
      te: "ముంబై పావ్ భాజీ",
      hi: "मुंबई पाव भाजी",
      ta: "மும்பை பாவ் பாஜி",
      kn: "ಮುಂಬೈ ಪಾವ್ ಭಾಜಿ",
      ml: "മുംബൈ പാവ് ബാജി",
      bn: "মুম্বাই পাভ ভাজি",
      gu: "મુંબઈ પાવ ભાજી",
      mr: "मुंबई बटर पाव भाजी"
    },
    description: "The heartbeat of Mumbai's street cuisine: mashed spiced vegetables simmered on an enormous flat iron tawa with generous slabs of Amul butter, Kashmiri chillies, and pav bhaji masala, served with toasted pav buns.",
    cuisine: "West Indian",
    region: "Maharashtra",
    mealType: "Street Food",
    foodCategory: "Mashed Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 420,
    nutrition: {
      protein: "9g",
      carbs: "58g",
      fat: "18g",
      fiber: "8g",
      micronutrients: {
        iron: "3.2mg",
        calcium: "95mg",
        vitaminC: "32mg",
        potassium: "520mg",
        sodium: "490mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    rating: 4.97,
    reviewsCount: 890,
    featured: false,
    tags: ["Mumbai Street", "Amul Butter", "Comfort Food", "All-Time Favorite"],
    ingredients: [
      { name: "Boiled Potatoes, Peas, Cauliflower & Carrots", quantity: 500, unit: "g", category: "Vegetables" },
      { name: "Capsicum (Finely Minced)", quantity: 1, unit: "cup", category: "Vegetables" },
      { name: "Ripe Tomatoes & Onions", quantity: 4, unit: "medium", category: "Vegetables" },
      { name: "Mumbai Pav Bhaji Masala", quantity: 2, unit: "tbsp", category: "Spices" },
      { name: "Salted Butter", quantity: 4, unit: "tbsp", category: "Dairy" },
      { name: "Soft Ladi Pav Buns", quantity: 8, unit: "pieces", category: "Bakery" }
    ],
    instructions: [
      {
        step: 1,
        title: "Mash Vegetables on Tawa",
        text: "Sauté onions, capsicum, and tomatoes in butter. Add boiled vegetables and vigorously mash using a potato masher until thick and pulpy.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Simmer with Masala and Butter",
        text: "Add pav bhaji masala, Kashmiri red chilli, and water. Simmer on medium-low for 15 minutes, finishing with more butter and lemon juice.",
        timerSeconds: 900
      }
    ],
    substitutions: [
      { original: "Salted Butter", substitute: "Vegan Butter or Coconut Oil", note: "Plant-based street food style." }
    ]
  },
  {
    id: "kolhapuri-misal-pav",
    title: "Kolhapuri Katachi Misal Pav",
    nativeTitles: {
      te: "కొల్హాపురి మిసల్ పావ్",
      hi: "कोल्हापुरी मिसल पाव",
      ta: "கோலாப்பூர் மிசல் பாவ்",
      kn: "ಕೊಲ್ಹಾಪುರಿ ಮಿಸಳ್ ಪಾವ್",
      ml: "കൊൽഹാപുരി മിസൽ പാവ്",
      bn: "কোলহাপুরি মিসল পাভ",
      gu: "કોલ્હાપુરી મિસળ પાવ",
      mr: "कोल्हापुरी झणझणीत मिसळ पाव"
    },
    description: "Fiery sprouted moth bean curry topped with crunchy farsan, minced onions, and coriander, submerged in a spicy red chili 'kat' gravy, accompanied by fresh bread pav and lemon wedges.",
    cuisine: "West Indian",
    region: "Maharashtra",
    mealType: "Breakfast",
    foodCategory: "Spicy Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "High-Protein", "High-Fiber", "Plant-Based", "Balanced Diet"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 380,
    nutrition: {
      protein: "14g",
      carbs: "54g",
      fat: "12g",
      fiber: "9g",
      micronutrients: {
        iron: "3.6mg",
        calcium: "85mg",
        vitaminC: "16mg",
        potassium: "480mg",
        sodium: "490mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 360,
    featured: false,
    tags: ["Kolhapuri Zanzanit", "Sprouted Moong & Matki", "Street Legend", "High Protein"],
    ingredients: [
      { name: "Sprouted Matki (Moth Beans)", quantity: 250, unit: "g", category: "Legumes" },
      { name: "Kanda Lasun Masala (Kolhapuri)", quantity: 2, unit: "tbsp", category: "Spices" },
      { name: "Roasted Dry Coconut & Onion Paste", quantity: 3, unit: "tbsp", category: "Pantry" },
      { name: "Crunchy Farsan / Sev Mix", quantity: 150, unit: "g", category: "Snacks" },
      { name: "Soft Pav Buns", quantity: 8, unit: "pieces", category: "Bakery" }
    ],
    instructions: [
      {
        step: 1,
        title: "Boil Sprouted Beans",
        text: "Parboil sprouted matki with turmeric and salt until tender but holding shape.",
        timerSeconds: 420
      },
      {
        step: 2,
        title: "Cook the Rassa (Kat) Gravy",
        text: "Sauté roasted coconut-onion paste with kanda lasun masala. Add plenty of water and simmer until a fiery red oil layer (tarri) forms on top.",
        timerSeconds: 720
      }
    ],
    substitutions: [
      { original: "Matki", substitute: "Sprouted Green Moong or Chickpeas", note: "Equally high protein and nutritious." }
    ]
  },

  // =========================================================================
  // 6. INDIAN SNACKS & STREET FOOD
  // =========================================================================
  {
    id: "crispy-punjabi-samosa",
    title: "Crispy Punjabi Samosa with Mint Chutney",
    nativeTitles: {
      te: "పంజాబీ సమోసా",
      hi: "कुरकुरा पंजाबी समोसा",
      ta: "பஞ்சாபி சமோசா",
      kn: "ಪಂಜಾಬಿ ಸಮೋಸಾ",
      ml: "പഞ്ചാബി സമോസ",
      bn: "পাঞ্জাবি সিঙাড়া",
      gu: "પંજાબી સમોસા",
      mr: "खुसखुशीत पंजाबी समोसा"
    },
    description: "Flaky, golden pastry crust hand-crimped and stuffed with spiced potatoes, green peas, roasted cumin, pomegranate seeds, and whole coriander, fried to crunchy perfection.",
    cuisine: "Indian Snacks",
    region: "Punjab & All-India",
    mealType: "Snacks",
    foodCategory: "Fried Pastries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 25,
    cookTime: 20,
    totalTime: 45,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 260,
    nutrition: {
      protein: "5g",
      carbs: "32g",
      fat: "13g",
      fiber: "4g",
      micronutrients: {
        iron: "1.8mg",
        calcium: "30mg",
        vitaminC: "12mg",
        potassium: "240mg",
        sodium: "290mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 710,
    featured: false,
    tags: ["Tea Time Favorite", "Crispy Pastry", "Spiced Potatoes", "Street Classic"],
    ingredients: [
      { name: "Maida (Flour) with Ajwain", quantity: 250, unit: "g", category: "Grains" },
      { name: "Boiled Diced Potatoes", quantity: 350, unit: "g", category: "Vegetables" },
      { name: "Green Peas", quantity: 80, unit: "g", category: "Vegetables" },
      { name: "Crushed Coriander Seeds & Cumin", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Cold-Pressed Groundnut Oil for Frying", quantity: 500, unit: "ml", category: "Oils" }
    ],
    instructions: [
      {
        step: 1,
        title: "Knead Stiff Ajwain Dough",
        text: "Rub flour with oil and ajwain until breadcrumb texture. Knead with cold water into a stiff dough and rest for 20 minutes.",
        timerSeconds: 1200
      },
      {
        step: 2,
        title: "Form Cones and Stuff",
        text: "Roll oval discs, cut in half. Form cone shape, stuff with spicy potato mix, brush edges with water, and seal firmly.",
        timerSeconds: 480
      },
      {
        step: 3,
        title: "Slow Fry to Golden Crisp",
        text: "Fry in medium-low oil for 12 minutes so the pastry turns blister-free and exquisitely flaky.",
        timerSeconds: 720
      }
    ],
    substitutions: [
      { original: "Maida", substitute: "Whole Wheat Atta", note: "Yields a heartier wheat samosa." }
    ]
  },
  {
    id: "mumbai-pani-puri",
    title: "Mumbai Pani Puri with Mint & Imli Water",
    nativeTitles: {
      te: "ముంబై పానీ పూరి",
      hi: "मुंबई पानी पूरी / गोलगप्पे",
      ta: "பானி பூரி",
      kn: "ಪಾನಿ ಪುರಿ",
      ml: "പാനി പൂരി",
      bn: "মুম্বাই ফুচকা / পানি পুরি",
      gu: "મુંબઈ પાણી પૂરી",
      mr: "मुंबई पाणी पुरी"
    },
    description: "Crispy hollow semolina puries filled with spiced black chana or warm ragda, immersed in chilled piquant mint-coriander pani and sweet-tangy jaggery-tamarind chutney.",
    cuisine: "Indian Snacks",
    region: "Maharashtra & All-India",
    mealType: "Street Food",
    foodCategory: "Chaat",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "Low-Carb"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 10,
    totalTime: 30,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 190,
    nutrition: {
      protein: "5g",
      carbs: "36g",
      fat: "3.5g",
      fiber: "4g",
      micronutrients: {
        iron: "2.5mg",
        calcium: "40mg",
        vitaminC: "18mg",
        potassium: "280mg",
        sodium: "440mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Gluten"],
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=80",
    rating: 4.99,
    reviewsCount: 980,
    featured: false,
    tags: ["Street Food Champion", "Tangy Mint Water", "Crispy Puris", "Iconic Chaat"],
    ingredients: [
      { name: "Crispy Hollow Puris", quantity: 24, unit: "pieces", category: "Snacks" },
      { name: "Fresh Mint & Coriander Leaves", quantity: 2, unit: "cups", category: "Herbs" },
      { name: "Boiled Spiced Black Chana / Potatoes", quantity: 200, unit: "g", category: "Legumes" },
      { name: "Tamarind & Jaggery Chutney", quantity: 0.5, unit: "cup", category: "Condiments" },
      { name: "Roasted Cumin & Black Salt", quantity: 1, unit: "tbsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Blend the Chilled Teekha Pani",
        text: "Blend fresh mint, coriander, ginger, green chillies, black salt, and roasted cumin with chilled water and ice cubes.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Assemble and Enjoy",
        text: "Crack open top of puri, fill with spiced chana/potato, splash sweet imli chutney, and dunk completely into chilled spicy mint pani.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Semolina Puris", substitute: "Gluten-Free Rice Puris", note: "Allows gluten-sensitive individuals to enjoy." }
    ]
  },

  // =========================================================================
  // 7. INDIAN SWEETS & DESSERTS
  // =========================================================================
  {
    id: "gulab-jamun",
    title: "Warm Royal Gulab Jamun",
    nativeTitles: {
      te: "గులాబ్ జామూన్",
      hi: "शाही गुलाब जामुन",
      ta: "குலாப் ஜாமூன்",
      kn: "ಗುಲಾಬ್ ಜಾಮೂನ್",
      ml: "ഗുലാബ് ജാമുൻ",
      bn: "গোলাপ জামুন",
      gu: "ગુલાબ જાંબુ",
      mr: "शाही गुलाब जामुन"
    },
    description: "Melt-in-the-mouth caramelized mawa (khoya) dumplings gently fried in pure desi ghee, soaked in a fragrant sugar syrup infused with green cardamom pods, rose water, and Kashmiri saffron.",
    cuisine: "Indian Sweets",
    region: "Pan-Indian",
    mealType: "Desserts",
    foodCategory: "Mithai",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: true,
    dairyFree: false,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 6,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 310,
    nutrition: {
      protein: "6g",
      carbs: "46g",
      fat: "12g",
      fiber: "1g",
      micronutrients: {
        iron: "0.8mg",
        calcium: "180mg",
        vitaminC: "1mg",
        potassium: "140mg",
        sodium: "95mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy", "Gluten"],
    image: "/images/recipes/gulab-jamun.jpg",
    rating: 4.96,
    reviewsCount: 840,
    featured: true,
    tags: ["Festive Mithai", "Rose & Cardamom", "Ghee Fried", "Celebration Classic"],
    ingredients: [
      { name: "Fresh Mawa / Khoya (Grated)", quantity: 250, unit: "g", category: "Dairy" },
      { name: "Chenna (Fresh Paneer Crumbled)", quantity: 50, unit: "g", category: "Dairy" },
      { name: "All Purpose Flour (Maida)", quantity: 3, unit: "tbsp", category: "Flour" },
      { name: "Pure Cow Desi Ghee for Frying", quantity: 400, unit: "ml", category: "Oils & Ghee" },
      { name: "Sugar Syrup Infused with Saffron & Rose", quantity: 500, unit: "ml", category: "Syrup" }
    ],
    instructions: [
      {
        step: 1,
        title: "Knead Smooth Dough",
        text: "Knead mawa and chenna on a marble slab with the heel of your palm until completely velvety and crack-free.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Slow Fry in Desi Ghee",
        text: "Roll into small smooth balls. Gently fry in warm ghee on low heat, swirling the ghee continuously until balls turn mahogany golden.",
        timerSeconds: 720
      },
      {
        step: 3,
        title: "Steep in Saffron Rose Syrup",
        text: "Transfer hot drained dumplings into warm cardamom-saffron sugar syrup. Let rest for at least 2 hours to soak thoroughly.",
        timerSeconds: 3600
      }
    ],
    substitutions: [
      { original: "Mawa", substitute: "Full Cream Milk Powder & Ghee", note: "Popular quick homemade substitute." }
    ]
  },
  {
    id: "saffron-rasmalai",
    title: "Saffron Cardamom Rasmalai",
    nativeTitles: {
      te: "కేసర్ రసమలై",
      hi: "केसर इलायची रसमलाई",
      ta: "குங்குமப்பூ ரசமலாய்",
      kn: "ಕೇಸರಿ ರಸಮಲೈ",
      ml: "കുങ്കുമപ്പൂവ് രസമലായ്",
      bn: "কেশর রসমলাই",
      gu: "કેસર રસમલાઈ",
      mr: "केशर रसमलाई"
    },
    description: "Cloud-soft poached discs of freshly curdled cottage cheese (chenna) steeped in a chilled, velvety rabri of saffron-infused reduced milk, garnished with slivered pistachios and almonds.",
    cuisine: "Indian Sweets",
    region: "Bengal & North India",
    mealType: "Desserts",
    foodCategory: "Mithai",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "High-Protein", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: true,
    dairyFree: false,
    prepTime: 25,
    cookTime: 30,
    totalTime: 55,
    servings: 4,
    difficulty: "Advanced",
    budget: "Premium",
    calories: 280,
    nutrition: {
      protein: "9g",
      carbs: "34g",
      fat: "12g",
      fiber: "1g",
      micronutrients: {
        iron: "0.9mg",
        calcium: "260mg",
        vitaminC: "2mg",
        potassium: "290mg",
        sodium: "120mg"
      }
    },
    nutritionSource: "ICMR-NIN Indian Food Composition Tables (IFCT)",
    allergens: ["Dairy", "Tree Nuts"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.98,
    reviewsCount: 512,
    featured: false,
    tags: ["Royal Dessert", "Saffron Rabri", "Chenna Discs", "Gluten-Free"],
    ingredients: [
      { name: "Fresh Chenna from Cow Milk", quantity: 300, unit: "g", category: "Dairy" },
      { name: "Full Cream Milk for Rabri", quantity: 1, unit: "liter", category: "Dairy" },
      { name: "Kashmiri Saffron & Green Cardamom", quantity: 1, unit: "tsp", category: "Spices" },
      { name: "Slivered Pistachios & Almonds", quantity: 3, unit: "tbsp", category: "Nuts" },
      { name: "Sugar", quantity: 150, unit: "g", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Knead Chenna and Poach",
        text: "Knead fresh chenna until smooth, shape into flat discs, and poach in boiling thin sugar syrup for 10 minutes until spongy.",
        timerSeconds: 600
      },
      {
        step: 2,
        title: "Reduce Saffron Rabri",
        text: "Simmer milk until reduced by half. Stir in saffron, cardamom, sugar, and nuts. Chill thoroughly before soaking poached chenna.",
        timerSeconds: 1500
      }
    ],
    substitutions: [
      { original: "Cow Milk Rabri", substitute: "Oat Milk & Cashew Cream", note: "Plant-based alternative." }
    ]
  },

  // =========================================================================
  // 8. INTERNATIONAL: ITALIAN CUISINE
  // =========================================================================
  {
    id: "neapolitan-margherita-pizza",
    title: "Neapolitan Margherita Pizza",
    nativeTitles: {
      te: "మార్ఘరిటా పిజ్జా",
      hi: "नेपोलिटन मार्गेरिटा पिज़्ज़ा",
      ta: "மார்கரிட்டா பீட்சா",
      kn: "ಮಾರ್ಗರಿಟಾ ಪಿಜ್ಜಾ",
      ml: "മാർഗരിറ്റ പിസ്സ",
      bn: "মার্গারিটা পিৎজা",
      gu: "માર્ગરીટા પિઝા",
      mr: "मार्गेरिटा पिझ्झा"
    },
    description: "The timeless Italian masterpiece: a 48-hour cold-fermented airy sourdough crust blistered in high heat, topped with crushed San Marzano plum tomatoes, fresh buffalo mozzarella, aromatic basil, and extra virgin olive oil.",
    cuisine: "Italian",
    region: "Naples, Italy",
    mealType: "Dinner",
    foodCategory: "Pizza",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "High-Protein", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 20,
    cookTime: 10,
    totalTime: 30,
    servings: 3,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 410,
    nutrition: {
      protein: "18g",
      carbs: "54g",
      fat: "14g",
      fiber: "4g",
      micronutrients: {
        iron: "2.6mg",
        calcium: "320mg",
        vitaminC: "15mg",
        potassium: "340mg",
        sodium: "610mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&q=80",
    rating: 4.97,
    reviewsCount: 890,
    featured: false,
    tags: ["Authentic Neapolitan", "Wood Fired Style", "Buffalo Mozzarella", "Artisan Dough"],
    ingredients: [
      { name: "Tipo 00 Pizza Dough (Fermented)", quantity: 300, unit: "g", category: "Dough" },
      { name: "San Marzano Tomatoes (Crushed)", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Fresh Mozzarella di Bufala (Torn)", quantity: 150, unit: "g", category: "Dairy" },
      { name: "Fresh Genovese Basil Leaves", quantity: 8, unit: "leaves", category: "Herbs" },
      { name: "Extra Virgin Olive Oil", quantity: 1.5, unit: "tbsp", category: "Oils" },
      { name: "Sea Salt", quantity: 0.5, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Stretch the Dough",
        text: "Gently stretch fermented dough from center outward on a semolina-dusted peel, preserving the airy outer rim (cornicione).",
        timerSeconds: 240
      },
      {
        step: 2,
        title: "Top and Bake at Maximum Heat",
        text: "Spread crushed San Marzano tomatoes, tear fresh mozzarella, drizzle olive oil. Bake on a preheated pizza stone at 250°C (485°F) for 7-9 minutes until crust blisters.",
        timerSeconds: 480
      },
      {
        step: 3,
        title: "Garnish with Fresh Basil",
        text: "Scatter fresh basil leaves over the bubbling melted cheese and drizzle with a touch of cold-pressed extra virgin olive oil.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Buffalo Mozzarella", substitute: "Vegan Cashew Mozzarella", note: "Bakes and melts with superb creaminess." }
    ]
  },
  {
    id: "wild-mushroom-risotto",
    title: "Creamy Wild Mushroom Risotto",
    nativeTitles: {
      te: "మష్రూమ్ రిసోట్టో",
      hi: "क्रीमी वाइल्ड मशरूम रिसोट्टो",
      ta: "காளான் ரிசொட்டோ",
      kn: "ಮಶ್ರೂಮ್ ರಿಸೊಟ್ಟೊ",
      ml: "മഷ്റൂം റിസോട്ടോ",
      bn: "মাশরুম রিসোত্তো",
      gu: "મશરૂમ રિસોટ્ટો",
      mr: "मशरूम रिसोटो"
    },
    description: "Silky, slow-stirred Italian carnaroli rice simmered in rich vegetable and porcini stock, enriched with sautéed wild cremini and shiitake mushrooms, butter, white wine, and freshly grated Parmigiano-Reggiano.",
    cuisine: "Italian",
    region: "Lombardy, Italy",
    mealType: "Dinner",
    foodCategory: "Risotto",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Gluten-Free", "High-Protein", "Balanced Diet"],
    vegan: false,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 360,
    nutrition: {
      protein: "9g",
      carbs: "52g",
      fat: "13g",
      fiber: "4g",
      micronutrients: {
        iron: "2.1mg",
        calcium: "140mg",
        vitaminC: "6mg",
        potassium: "410mg",
        sodium: "480mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Dairy"],
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 380,
    featured: false,
    tags: ["Italian Classic", "Arborio Rice", "Earthy Porcini", "Gluten-Free", "Comfort Luxury"],
    ingredients: [
      { name: "Carnaroli / Arborio Rice", quantity: 300, unit: "g", category: "Grains" },
      { name: "Mixed Cremini & Porcini Mushrooms", quantity: 350, unit: "g", category: "Vegetables" },
      { name: "Warm Vegetable Porcini Broth", quantity: 900, unit: "ml", category: "Broth" },
      { name: "Shallots & Garlic (Minced)", quantity: 2, unit: "tbsp", category: "Vegetables" },
      { name: "Butter & Extra Virgin Olive Oil", quantity: 3, unit: "tbsp", category: "Dairy & Oils" },
      { name: "Parmigiano-Reggiano (Grated)", quantity: 50, unit: "g", category: "Dairy" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sear Wild Mushrooms",
        text: "Sauté sliced mushrooms in olive oil until golden brown and caramelized. Remove half for garnish.",
        timerSeconds: 360
      },
      {
        step: 2,
        title: "Toast Rice and Simmer Stock",
        text: "Toast carnaroli rice with shallots until translucent. Add warm broth ladle by ladle, stirring continuously until absorbed.",
        timerSeconds: 1200
      },
      {
        step: 3,
        title: "Mantecatura (Emulsify)",
        text: "Remove from heat, vigorously beat in cold butter and parmesan until ultra-creamy (all'onda). Top with seared mushrooms.",
        timerSeconds: 180
      }
    ],
    substitutions: [
      { original: "Parmigiano-Reggiano", substitute: "Nutritional Yeast & Olive Oil", note: "Outstanding dairy-free umami rich alternative." }
    ]
  },

  // =========================================================================
  // 9. INTERNATIONAL: CHINESE & PAN-ASIAN
  // =========================================================================
  {
    id: "wok-vegetable-fried-rice",
    title: "High-Heat Wok Vegetable Fried Rice",
    nativeTitles: {
      te: "వెజిటబుల్ ఫ్రైడ్ రైస్",
      hi: "वेज फ्राइड राइस",
      ta: "வெஜிடபிள் ஃப்ரைட் ரைஸ்",
      kn: "ತರಕಾರಿ ಫ್ರೈಡ್ ರೈಸ್",
      ml: "വെജിറ്റബിൾ ഫ്രൈഡ് റൈസ്",
      bn: "চাইনিজ ভেজিটেবল ফ্রাইড রাইস",
      gu: "વેજ ફ્રાઇડ રાઇસ",
      mr: "व्हेज फ्राईડ રાઈસ"
    },
    description: "Fluffy day-old jasmine rice tossed at blistering wok heat with diced carrots, baby corn, shiitake mushrooms, crunchy scallions, light and dark soy sauces, and aromatic toasted sesame oil.",
    cuisine: "Chinese",
    region: "Cantonese",
    mealType: "Dinner",
    foodCategory: "Rice Dishes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: false, // contains standard soy sauce
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 3,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 310,
    nutrition: {
      protein: "7g",
      carbs: "54g",
      fat: "7g",
      fiber: "4g",
      micronutrients: {
        iron: "2.1mg",
        calcium: "45mg",
        vitaminC: "14mg",
        potassium: "280mg",
        sodium: "490mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Soy", "Gluten", "Sesame"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.92,
    reviewsCount: 520,
    featured: false,
    tags: ["Wok Hei", "Fast & Flavorful", "Cantonese Classic", "Vegan Friendly"],
    ingredients: [
      { name: "Day-Old Jasmine Rice (Chilled)", quantity: 400, unit: "g", category: "Grains" },
      { name: "Finely Diced Vegetables (Carrots, Beans, Corn)", quantity: 200, unit: "g", category: "Vegetables" },
      { name: "Minced Garlic & Ginger", quantity: 1.5, unit: "tbsp", category: "Herbs" },
      { name: "Light Soy Sauce & Dark Soy Sauce", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Toasted Pure Sesame Oil", quantity: 1, unit: "tbsp", category: "Oils" },
      { name: "Spring Onion Greens (Sliced)", quantity: 0.5, unit: "cup", category: "Vegetables" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sear Aromatics in Smoking Wok",
        text: "Heat wok until smoking hot. Add peanut oil, flash fry minced garlic, ginger, and diced vegetables for 90 seconds while tossing.",
        timerSeconds: 90
      },
      {
        step: 2,
        title: "Toss Grains with Wok Hei",
        text: "Add chilled rice, break up clumps with wok spatula. Swirl soy sauces around the edge of the wok so they caramelize before coating the grains.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Finish with Scallions and Sesame",
        text: "Toss in sliced spring onions, ground white pepper, and toasted sesame oil. Serve immediately steaming hot.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Soy Sauce", substitute: "Tamari (Gluten-Free)", note: "Instantly makes this dish 100% gluten-free." }
    ]
  },
  {
    id: "vegetable-hakka-noodles",
    title: "Street-Style Vegetable Hakka Noodles",
    nativeTitles: {
      te: "వెజ్ హక్కా నూడుల్స్",
      hi: "वेज हक्का नूडल्स",
      ta: "வெஜ் ஹக்கா நூடுல்ஸ்",
      kn: "ವೆಜ್ ಹಕ್ಕಾ ನೂಡಲ್ಸ್",
      ml: "വെജ് ഹക്ക നൂഡിൽസ്",
      bn: "ভেজিটেবল হাক্কা নুডুলস",
      gu: "વેજ હક્કા નૂડલ્સ",
      mr: "व्हेज हक्का नूडल्स"
    },
    description: "Springy noodles wok-tossed with julienned crunchy bell peppers, shredded cabbage, carrots, scallions, and cracked black pepper in a savory garlic-soy sauce.",
    cuisine: "Chinese",
    region: "Indo-Chinese",
    mealType: "Dinner",
    foodCategory: "Noodles",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 3,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 320,
    nutrition: {
      protein: "8g",
      carbs: "56g",
      fat: "8g",
      fiber: "5g",
      micronutrients: {
        iron: "2.3mg",
        calcium: "40mg",
        vitaminC: "26mg",
        potassium: "290mg",
        sodium: "460mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Gluten", "Soy"],
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80",
    rating: 4.91,
    reviewsCount: 460,
    featured: false,
    tags: ["Indo-Chinese", "Street Classic", "Crunchy Veggies", "Quick Dinner"],
    ingredients: [
      { name: "Hakka Eggless Wheat Noodles", quantity: 250, unit: "g", category: "Noodles" },
      { name: "Julienned Bell Peppers & Cabbage", quantity: 250, unit: "g", category: "Vegetables" },
      { name: "Garlic (Slivered)", quantity: 1.5, unit: "tbsp", category: "Vegetables" },
      { name: "Soy Sauce & Rice Vinegar", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Freshly Cracked Black Pepper", quantity: 1, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Boil Noodles Al Dente",
        text: "Boil noodles for 4 minutes until firm. Drain and toss with 1 tsp oil to prevent sticking.",
        timerSeconds: 240
      },
      {
        step: 2,
        title: "Flash Toss Vegetables",
        text: "In a smoking wok, toss garlic and julienned vegetables for 2 minutes to keep them delightfully crisp.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Combine and Season",
        text: "Add noodles, soy sauce, rice vinegar, and black pepper. Toss high over flame for 2 minutes and serve.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Wheat Noodles", substitute: "Buckwheat Soba or Rice Vermicelli", note: "Gluten-free choice." }
    ]
  },

  // =========================================================================
  // 10. INTERNATIONAL: JAPANESE
  // =========================================================================
  {
    id: "miso-shiitake-ramen",
    title: "Rich Umami Miso Shiitake Ramen",
    nativeTitles: {
      te: "మిసో షిటాకే రామెన్",
      hi: "मिसो शीताके रेमन",
      ta: "மிசோ ராமன்",
      kn: "ಮಿಸೊ ರಾಮೆನ್",
      ml: "മിസോ ഷിറ്റാകെ റാമൻ",
      bn: "মিসো রামেন",
      gu: "મિસો રામેન",
      mr: "मिसो रामेन"
    },
    description: "Deep, soulful Japanese ramen featuring springy noodles in a slow-simmered kombu and red miso broth, topped with seared braised shiitake mushrooms, charred sweet corn, pak choi, and chili sesame oil.",
    cuisine: "Japanese",
    region: "Hokkaido, Japan",
    mealType: "Dinner",
    foodCategory: "Noodle Soups",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 2,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 390,
    nutrition: {
      protein: "14g",
      carbs: "62g",
      fat: "10g",
      fiber: "7g",
      micronutrients: {
        iron: "3.4mg",
        calcium: "95mg",
        vitaminC: "20mg",
        potassium: "540mg",
        sodium: "680mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Soy", "Gluten", "Sesame"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 420,
    featured: false,
    tags: ["Japanese Ramen", "Umami Miso", "Shiitake Braised", "Soul Food", "Vegan"],
    ingredients: [
      { name: "Fresh Ramen Noodles", quantity: 200, unit: "g", category: "Noodles" },
      { name: "Red & White Fermented Miso Paste", quantity: 3, unit: "tbsp", category: "Condiments" },
      { name: "Dried Shiitake Mushrooms & Kombu Broth", quantity: 700, unit: "ml", category: "Broth" },
      { name: "Baby Pak Choi & Sweet Corn", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Rayu (Chili Sesame Oil)", quantity: 1, unit: "tsp", category: "Condiments" },
      { name: "Crispy Nori Seaweed Sheet", quantity: 2, unit: "sheets", category: "Pantry" }
    ],
    instructions: [
      {
        step: 1,
        title: "Brew Rich Dashi Broth",
        text: "Simmer kombu and dried shiitake mushrooms in water for 20 minutes to extract deep natural glutamates. Whisk in miso paste gently off the heat.",
        timerSeconds: 1200
      },
      {
        step: 2,
        title: "Cook Noodles and Steam Greens",
        text: "Boil ramen noodles for 2.5 minutes until springy. Blanch baby pak choi in the boiling water for 45 seconds.",
        timerSeconds: 150
      },
      {
        step: 3,
        title: "Assemble Ramen Bowl",
        text: "Divide hot noodles into deep bowls. Ladle bubbling miso broth on top. Arrange sliced braised shiitake, corn, blanched pak choi, nori, and drizzle rayu oil.",
        timerSeconds: 180
      }
    ],
    substitutions: [
      { original: "Ramen Noodles", substitute: "Brown Rice Noodles or Soba", note: "Gluten-free substitution." }
    ]
  },
  {
    id: "avocado-cucumber-sushi-maki",
    title: "Avocado & Cucumber Sushi Maki",
    nativeTitles: {
      te: "సుషీ రోల్స్",
      hi: "एवोकैडो और खीरा सुशी रोल्स",
      ta: "சுஷி ரோல்",
      kn: "ಸುಶಿ ರೋಲ್",
      ml: "സുഷി റോൾ",
      bn: "সুশি রোল",
      gu: "સુશી રોલ",
      mr: "सुशी रोल"
    },
    description: "Seasoned Japanese short-grain rice rolled with ripe Haas avocado, crisp cucumber matchsticks, and toasted sesame seeds wrapped in roasted nori, served with pickled ginger (gari) and wasabi.",
    cuisine: "Japanese",
    region: "Tokyo, Japan",
    mealType: "Lunch",
    foodCategory: "Sushi Rolls",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 25,
    cookTime: 15,
    totalTime: 40,
    servings: 3,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 260,
    nutrition: {
      protein: "5g",
      carbs: "46g",
      fat: "7g",
      fiber: "5g",
      micronutrients: {
        iron: "1.8mg",
        calcium: "35mg",
        vitaminC: "10mg",
        potassium: "340mg",
        sodium: "380mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Sesame", "Soy"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 310,
    featured: false,
    tags: ["Japanese Sushi", "Healthy Clean", "Vegan Maki", "Gluten-Free"],
    ingredients: [
      { name: "Japanese Sushi Rice (Seasoned with Rice Vinegar)", quantity: 300, unit: "g", category: "Grains" },
      { name: "Roasted Nori Seaweed Sheets", quantity: 4, unit: "sheets", category: "Pantry" },
      { name: "Ripe Avocado (Sliced)", quantity: 1, unit: "piece", category: "Fruit & Veg" },
      { name: "Crisp English Cucumber (Batons)", quantity: 1, unit: "piece", category: "Vegetables" },
      { name: "Toasted White Sesame Seeds", quantity: 1, unit: "tbsp", category: "Seeds" }
    ],
    instructions: [
      {
        step: 1,
        title: "Spread Rice over Nori",
        text: "Place nori on a bamboo rolling mat (makisu). Spread a thin, even layer of seasoned sushi rice leaving 1 inch at the top border.",
        timerSeconds: 240
      },
      {
        step: 2,
        title: "Fill and Roll Tightly",
        text: "Lay avocado and cucumber strips horizontally across center. Roll tightly forward with the mat to form a compact cylindrical roll.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Slice with Wet Blade",
        text: "Using a sharp, damp knife, slice each roll into 6-8 uniform bite-sized rounds.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Sushi Rice", substitute: "Cauliflower Rice (Stirred with Rice Vinegar)", note: "Ultra low-carb keto option." }
    ]
  },

  // =========================================================================
  // 11. INTERNATIONAL: KOREAN
  // =========================================================================
  {
    id: "korean-bibimbap-bowl",
    title: "Rainbow Korean Bibimbap with Gochujang",
    nativeTitles: {
      te: "కొరియన్ బిబింబాప్ బౌల్",
      hi: "कोरियन बिबिम्बाप बाउल",
      ta: "கொரியன் பிபிம்பாப்",
      kn: "ಕೊರಿಯನ್ ಬಿಬಿಂಬಾಪ್",
      ml: "കൊറിയൻ ബിബിംബാപ്",
      bn: "কোরিয়ান বিবিম্বাপ",
      gu: "કોરિયન બિબિમ્બાપ",
      mr: "कोरियन बिबिम्बाप"
    },
    description: "A visually stunning Korean feast: steamed rice crowned with seasoned sautéed spinach, julienned carrots, shiitake mushrooms, zucchini, pickled radish, and pan-seared sesame tofu, mixed with spicy sweet gochujang sauce.",
    cuisine: "Korean",
    region: "Jeonju, South Korea",
    mealType: "Lunch",
    foodCategory: "Rice Bowls",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 25,
    cookTime: 15,
    totalTime: 40,
    servings: 2,
    difficulty: "Intermediate",
    budget: "Moderate",
    calories: 420,
    nutrition: {
      protein: "15g",
      carbs: "68g",
      fat: "11g",
      fiber: "8g",
      micronutrients: {
        iron: "3.6mg",
        calcium: "130mg",
        vitaminC: "24mg",
        potassium: "580mg",
        sodium: "510mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Soy", "Sesame", "Gluten"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 390,
    featured: false,
    tags: ["Korean Classic", "Rainbow Bowl", "High Protein Tofu", "Gochujang Spicy"],
    ingredients: [
      { name: "Steamed Short Grain Rice", quantity: 300, unit: "g", category: "Grains" },
      { name: "Organic Firm Tofu (Cubed)", quantity: 200, unit: "g", category: "Protein" },
      { name: "Spinach, Carrots, Zucchini & Mushrooms", quantity: 300, unit: "g", category: "Vegetables" },
      { name: "Gochujang (Korean Chili Paste)", quantity: 2, unit: "tbsp", category: "Condiments" },
      { name: "Sesame Oil & Toasted Sesame Seeds", quantity: 1.5, unit: "tbsp", category: "Oils" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sauté Vegetables Individually",
        text: "Sauté each vegetable separately with a drop of sesame oil and pinch of salt to preserve their vibrant distinct colors and textures.",
        timerSeconds: 480
      },
      {
        step: 2,
        title: "Crisp the Tofu",
        text: "Pan fry tofu cubes in sesame oil until golden on all sides.",
        timerSeconds: 300
      },
      {
        step: 3,
        title: "Assemble and Serve",
        text: "Place rice in bowl, arrange colorful vegetables in radiating segments around the perimeter. Top with a spoonful of sweet gochujang sauce.",
        timerSeconds: 180
      }
    ],
    substitutions: [
      { original: "Tofu", substitute: "Fried Sunny Side Egg", note: "Traditional Eggetarian bibimbap style." }
    ]
  },

  // =========================================================================
  // 12. INTERNATIONAL: THAI
  // =========================================================================
  {
    id: "authentic-pad-thai",
    title: "Street-Style Vegetarian Pad Thai",
    nativeTitles: {
      te: "థాయ్ ప్యాడ్ థాయ్",
      hi: "थाई पैड थाई नूडल्स",
      ta: "தாய் பேட் தாய்",
      kn: "ಥಾಯ್ ಪ್ಯಾಡ್ ಥಾಯ್",
      ml: "തായ് പാഡ് തായ്",
      bn: "থাই প্যাড থাই",
      gu: "થાઈ પેડ થાઈ",
      mr: "थाई पॅड थाई"
    },
    description: "Thailand's iconic national street food: flat rice noodles wok-stirred with firm tofu, crunchy bean sprouts, chives, crushed roasted peanuts, and tamarind palm-sugar sauce, with a fresh lime wedge.",
    cuisine: "Thai",
    region: "Bangkok, Thailand",
    mealType: "Dinner",
    foodCategory: "Noodles",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 12,
    totalTime: 32,
    servings: 3,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 380,
    nutrition: {
      protein: "14g",
      carbs: "58g",
      fat: "11g",
      fiber: "5g",
      micronutrients: {
        iron: "3.1mg",
        calcium: "110mg",
        vitaminC: "14mg",
        potassium: "340mg",
        sodium: "460mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Peanuts", "Soy"],
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
    rating: 4.97,
    reviewsCount: 640,
    featured: false,
    tags: ["Thai Street Food", "Gluten-Free Rice Noodles", "Tangy Tamarind", "High Protein"],
    ingredients: [
      { name: "Flat Rice Noodles (Soaked in Warm Water)", quantity: 250, unit: "g", category: "Noodles" },
      { name: "Extra Firm Tofu (Diced)", quantity: 180, unit: "g", category: "Protein" },
      { name: "Fresh Tamarind Pulp & Palm Sugar", quantity: 3, unit: "tbsp", category: "Condiments" },
      { name: "Crunchy Bean Sprouts & Garlic Chives", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Roasted Peanuts (Coarsely Crushed)", quantity: 3, unit: "tbsp", category: "Nuts" },
      { name: "Fresh Lime Wedges & Red Chili Flakes", quantity: 1, unit: "set", category: "Condiments" }
    ],
    instructions: [
      {
        step: 1,
        title: "Sear Tofu in Wok",
        text: "Heat oil in wok, sear cubed tofu until exterior is crisp and golden. Push to side.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Toss Noodles with Tamarind Sauce",
        text: "Add drained rice noodles and tamarind-palm sugar sauce. Toss over high heat for 3 minutes until noodles become chewy and absorb the sauce.",
        timerSeconds: 180
      },
      {
        step: 3,
        title: "Fold Bean Sprouts and Peanuts",
        text: "Toss in garlic chives and half the bean sprouts. Garnish with crushed peanuts, chili flakes, and lime.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Palm Sugar", substitute: "Coconut Jaggery", note: "Equally caramelly and unrefined." }
    ]
  },
  {
    id: "thai-green-curry",
    title: "Fragrant Thai Green Coconut Curry",
    nativeTitles: {
      te: "థాయ్ గ్రీన్ కర్రీ",
      hi: "थाई ग्रीन करी और जैस्मिन राइस",
      ta: "தாய் பச்சை கறி",
      kn: "ಥಾಯ್ ಗ್ರೀನ್ ಕರಿ",
      ml: "തായ് ഗ്രീൻ കറി",
      bn: "থাই গ্রিন কারি",
      gu: "થાઈ ગ્રીન કરી",
      mr: "थाई ग्रीन करी"
    },
    description: "An intoxicatingly fragrant curry made from fresh green bird's eye chillies, lemongrass, galangal, kaffir lime leaves, and creamy coconut milk loaded with bamboo shoots, baby corn, and Thai basil.",
    cuisine: "Thai",
    region: "Central Thailand",
    mealType: "Dinner",
    foodCategory: "Coconut Curries",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "Low-Carb", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Moderate",
    calories: 340,
    nutrition: {
      protein: "8g",
      carbs: "18g",
      fat: "26g",
      fiber: "6g",
      micronutrients: {
        iron: "2.8mg",
        calcium: "60mg",
        vitaminC: "24mg",
        potassium: "460mg",
        sodium: "480mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Soy"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.94,
    reviewsCount: 480,
    featured: false,
    tags: ["Lemongrass & Coconut", "Aromatic Thai", "Gluten-Free", "Spicy & Creamy"],
    ingredients: [
      { name: "Vegetarian Thai Green Curry Paste", quantity: 3, unit: "tbsp", category: "Condiments" },
      { name: "Thick Coconut Cream & Milk", quantity: 400, unit: "ml", category: "Pantry" },
      { name: "Baby Eggplants, Bamboo Shoots & Bell Peppers", quantity: 300, unit: "g", category: "Vegetables" },
      { name: "Torn Kaffir Lime Leaves", quantity: 4, unit: "leaves", category: "Herbs" },
      { name: "Fresh Thai Sweet Basil", quantity: 1, unit: "cup", category: "Herbs" }
    ],
    instructions: [
      {
        step: 1,
        title: "Split Coconut Cream",
        text: "Heat 4 tbsp of coconut cream in a pot until oil begins to separate. Sauté green curry paste for 2 minutes until intensely fragrant.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Simmer Vegetables",
        text: "Add remaining coconut milk, torn lime leaves, and vegetables. Simmer gently for 12 minutes until vegetables are tender.",
        timerSeconds: 720
      },
      {
        step: 3,
        title: "Stir in Basil Leaves",
        text: "Turn off heat, stir in fresh Thai basil leaves, and serve with steamed jasmine rice.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Kaffir Lime Leaves", substitute: "Lime Zest & Lime Juice", note: "Provides similar citrus punch." }
    ]
  },

  // =========================================================================
  // 13. INTERNATIONAL: MEXICAN
  // =========================================================================
  {
    id: "black-bean-corn-tacos",
    title: "Charred Corn & Smoky Black Bean Tacos",
    nativeTitles: {
      te: "బ్లాక్ బీన్ టాకోస్",
      hi: "ब्लैक बीन और कॉर्न मैक्सिकन टैकोस",
      ta: "மெக்சிகன் டகோஸ்",
      kn: "ಮೆಕ್ಸಿಕನ್ ಟ್ಯಾಕೋಸ್",
      ml: "മെക്സിക്കൻ ടാക്കോസ്",
      bn: "মেক্সিকান ট্যাকোস",
      gu: "મેક્સિકન ટાકોઝ",
      mr: "मेक्सिकन टाकोज"
    },
    description: "Warm yellow corn tortillas loaded with spiced simmered black beans, charred sweet corn, fresh pico de gallo salsa, creamy avocado, and zesty lime crema.",
    cuisine: "Mexican",
    region: "Oaxaca, Mexico",
    mealType: "Dinner",
    foodCategory: "Tacos",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "High-Fiber", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 15,
    totalTime: 30,
    servings: 3,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 340,
    nutrition: {
      protein: "13g",
      carbs: "52g",
      fat: "10g",
      fiber: "11g",
      micronutrients: {
        iron: "3.6mg",
        calcium: "85mg",
        vitaminC: "22mg",
        potassium: "520mg",
        sodium: "410mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["None"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    rating: 4.94,
    reviewsCount: 490,
    featured: false,
    tags: ["Mexican Street Taco", "Gluten-Free Corn Tortilla", "High Fiber", "Smoky Spices", "Vegan"],
    ingredients: [
      { name: "Yellow Corn Tortillas", quantity: 6, unit: "pieces", category: "Bakery" },
      { name: "Simmered Black Beans", quantity: 300, unit: "g", category: "Legumes" },
      { name: "Charred Sweet Corn Kernels", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Fresh Pico de Gallo (Tomato, Onion, Jalapeño, Cilantro)", quantity: 1, unit: "cup", category: "Salsa" },
      { name: "Ripe Avocado (Diced)", quantity: 1, unit: "piece", category: "Vegetables" },
      { name: "Smoked Chipotle & Cumin", quantity: 1, unit: "tsp", category: "Spices" }
    ],
    instructions: [
      {
        step: 1,
        title: "Season Black Beans and Char Corn",
        text: "Simmer black beans with chipotle, cumin, garlic, and sea salt. Char sweet corn on a hot dry skillet until flecked with brown spots.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Warm Tortillas",
        text: "Warm corn tortillas on a dry skillet for 30 seconds per side until pliable and fragrant.",
        timerSeconds: 120
      },
      {
        step: 3,
        title: "Layer and Garnish Tacos",
        text: "Spoon black beans onto tortillas, top with charred corn, fresh pico de gallo, diced avocado, and fresh lime juice.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Black Beans", substitute: "Pinto Beans or Lentils", note: "Equally delicious protein base." }
    ]
  },

  // =========================================================================
  // 14. INTERNATIONAL: MEDITERRANEAN & MIDDLE EASTERN
  // =========================================================================
  {
    id: "creamy-hummus-zaatar-pita",
    title: "Creamy Tahini Hummus with Warm Za'atar Pita",
    nativeTitles: {
      te: "హమ్మస్ విత్ పీటా బ్రెడ్",
      hi: "क्रीमी हुमुस और ज़ातार पीटा ब्रेड",
      ta: "ஹம்முஸ் பீட்டா பிரெட்",
      kn: "ಹುಮ್ಮಸ್ ಪೀಟಾ ಬ್ರೆಡ್",
      ml: "ഹംമസ് വിത്ത് പീറ്റ",
      bn: "ক্রিমি হুমুস ও পিটা",
      gu: "ક્રિમી હુમસ અને પીટા",
      mr: "क्रीमी हुमुस व पीटा ब्रेड"
    },
    description: "Ultra-silky Levantine chickpea dip blended with stone-ground roasted sesame tahini, fresh garlic, lemon juice, and extra virgin olive oil, served with wood-fired warm za'atar pita bread.",
    cuisine: "Mediterranean",
    region: "Levant & Greece",
    mealType: "Snacks",
    foodCategory: "Dips & Breads",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Dairy-Free", "Plant-Based", "High-Protein", "High-Fiber", "Balanced Diet"],
    vegan: true,
    glutenFree: false, // pita has gluten
    jainFriendly: false,
    dairyFree: true,
    prepTime: 15,
    cookTime: 0,
    totalTime: 15,
    servings: 4,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 290,
    nutrition: {
      protein: "11g",
      carbs: "38g",
      fat: "12g",
      fiber: "8g",
      micronutrients: {
        iron: "3.2mg",
        calcium: "95mg",
        vitaminC: "10mg",
        potassium: "380mg",
        sodium: "380mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Sesame", "Gluten"],
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80",
    rating: 4.96,
    reviewsCount: 540,
    featured: false,
    tags: ["Mediterranean Diet", "Tahini Rich", "Plant Protein", "Zero Cook Time"],
    ingredients: [
      { name: "Cooked Chickpeas (Warm, Skins Slid Off)", quantity: 400, unit: "g", category: "Legumes" },
      { name: "Pure Sesame Tahini Paste", quantity: 80, unit: "g", category: "Condiments" },
      { name: "Fresh Lemon Juice", quantity: 3, unit: "tbsp", category: "Condiments" },
      { name: "Ice Cubes (for aeration)", quantity: 3, unit: "cubes", category: "Pantry" },
      { name: "Extra Virgin Olive Oil", quantity: 2, unit: "tbsp", category: "Oils" },
      { name: "Warm Za'atar Pita Breads", quantity: 4, unit: "pieces", category: "Bakery" }
    ],
    instructions: [
      {
        step: 1,
        title: "Whip Tahini and Lemon Juice",
        text: "In a food processor, whip tahini and lemon juice with garlic and salt for 1 minute until pale and creamy.",
        timerSeconds: 60
      },
      {
        step: 2,
        title: "Blend with Warm Chickpeas & Ice",
        text: "Add warm cooked chickpeas and ice cubes. Blend on high for 4 minutes until impossibly smooth and fluffy.",
        timerSeconds: 240
      },
      {
        step: 3,
        title: "Swirl with Olive Oil and Paprika",
        text: "Swirl onto a shallow bowl with the back of a spoon, pool extra virgin olive oil in the center, and dust with smoked paprika.",
        timerSeconds: 60
      }
    ],
    substitutions: [
      { original: "Pita Bread", substitute: "Cucumber and Carrot Sticks", note: "Gluten-free and keto-friendly." }
    ]
  },
  {
    id: "crispy-herbed-falafel-platter",
    title: "Crispy Herbed Falafel Platter",
    nativeTitles: {
      te: "ఫలాఫెల్ ప్లాటర్",
      hi: "क्रिस्पी हर्ब फलाफेल प्लेटर",
      ta: "ஃபலாஃபெல் தட்டு",
      kn: "ಫಲಾಫೆಲ್ ಪ್ಲೇಟರ್",
      ml: "ഫലാഫൽ പ്ലാറ്റർ",
      bn: "ফালাফেল প্ল্যাটার",
      gu: "ફલાફેલ પ્લેટર",
      mr: "फलाफेल प्लॅटर"
    },
    description: "Golden, crispy herb fritters prepared from soaked raw chickpeas ground with mountain parsley, cilantro, garlic, cumin, and coriander, served with tahini sauce and pickled turnips.",
    cuisine: "Middle Eastern",
    region: "Levant",
    mealType: "Lunch",
    foodCategory: "Fritters & Platters",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Plant-Based", "High-Protein", "High-Fiber", "Balanced Diet"],
    vegan: true,
    glutenFree: true,
    jainFriendly: false,
    dairyFree: true,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: "Intermediate",
    budget: "Budget",
    calories: 320,
    nutrition: {
      protein: "14g",
      carbs: "42g",
      fat: "12g",
      fiber: "9g",
      micronutrients: {
        iron: "3.8mg",
        calcium: "90mg",
        vitaminC: "16mg",
        potassium: "490mg",
        sodium: "360mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Sesame"],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 460,
    featured: false,
    tags: ["Middle Eastern", "High Protein", "Herbaceous Green", "Gluten-Free", "Vegan"],
    ingredients: [
      { name: "Dry Chickpeas (Soaked 18 Hours, Not Boiled)", quantity: 300, unit: "g", category: "Legumes" },
      { name: "Fresh Parsley & Cilantro Leaves", quantity: 1.5, unit: "cups", category: "Herbs" },
      { name: "Garlic & Onions", quantity: 1, unit: "cup", category: "Vegetables" },
      { name: "Ground Cumin, Coriander & Cardamom", quantity: 1.5, unit: "tbsp", category: "Spices" },
      { name: "Sesame Seeds", quantity: 2, unit: "tbsp", category: "Seeds" }
    ],
    instructions: [
      {
        step: 1,
        title: "Pulse Ingredients Coarsely",
        text: "Pulse drained soaked chickpeas with fresh herbs, garlic, onions, and spices in food processor until coarse breadcrumb texture. Rest batter in fridge for 30 minutes.",
        timerSeconds: 1800
      },
      {
        step: 2,
        title: "Form and Fry to Golden Crunch",
        text: "Shape into spheres with a falafel scoop. Fry in medium-hot oil for 4 minutes until deeply browned and crunchy outside, bright green inside.",
        timerSeconds: 240
      }
    ],
    substitutions: [
      { original: "Frying", substitute: "Air Fry at 190°C for 14 minutes", note: "Reduces fat by 70%." }
    ]
  },

  // =========================================================================
  // 15. INTERNATIONAL: AMERICAN & WORLD
  // =========================================================================
  {
    id: "gourmet-veggie-burger",
    title: "Gourmet Black Bean & Mushroom Burger",
    nativeTitles: {
      te: "వెజ్ బర్గర్",
      hi: "गॉरमे वेज बर्गर",
      ta: "வெஜ் பர்கர்",
      kn: "ವೆಜ್ ಬರ್ಗರ್",
      ml: "വെജ് ബർഗർ",
      bn: "ভেজিটেবল বার্গার",
      gu: "વેજ બર્ગર",
      mr: "व्हेज बर्गर"
    },
    description: "A hearty handcrafted patty of caramelized portobello mushrooms, black beans, walnuts, and smoked paprika, grilled and nestled in a toasted brioche bun with crisp butterhead lettuce, heirloom tomatoes, and secret chipotle aioli.",
    cuisine: "American",
    region: "California, USA",
    mealType: "Dinner",
    foodCategory: "Burgers",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "High-Protein", "High-Fiber", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: false,
    dairyFree: false,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 2,
    difficulty: "Beginner Friendly",
    budget: "Moderate",
    calories: 460,
    nutrition: {
      protein: "19g",
      carbs: "58g",
      fat: "18g",
      fiber: "10g",
      micronutrients: {
        iron: "4.1mg",
        calcium: "120mg",
        vitaminC: "14mg",
        potassium: "520mg",
        sodium: "590mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Gluten", "Dairy", "Tree Nuts"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
    rating: 4.93,
    reviewsCount: 380,
    featured: false,
    tags: ["Plant Power Burger", "Smoky Portobello", "High Protein", "Comfort Food"],
    ingredients: [
      { name: "Cooked Black Beans (Mashed)", quantity: 200, unit: "g", category: "Legumes" },
      { name: "Portobello Mushrooms (Sautéed)", quantity: 150, unit: "g", category: "Vegetables" },
      { name: "Rolled Oats & Chopped Walnuts", quantity: 50, unit: "g", category: "Pantry" },
      { name: "Smoked Paprika & Garlic Powder", quantity: 1, unit: "tbsp", category: "Spices" },
      { name: "Brioche Burger Buns", quantity: 2, unit: "pieces", category: "Bakery" },
      { name: "Heirloom Tomato & Butter Lettuce", quantity: 1, unit: "cup", category: "Vegetables" }
    ],
    instructions: [
      {
        step: 1,
        title: "Bind and Shape Patties",
        text: "Mix mashed beans with sautéed mushrooms, ground oats, chopped walnuts, and smoked seasonings. Form into thick patties.",
        timerSeconds: 300
      },
      {
        step: 2,
        title: "Sear and Melt Cheese",
        text: "Sear patties on a hot griddle for 4 minutes per side. Toast brioche buns with butter.",
        timerSeconds: 480
      },
      {
        step: 3,
        title: "Assemble Gourmet Burger",
        text: "Spread chipotle aioli on bun base, layer butter lettuce, grilled patty, heirloom tomato slice, and top bun.",
        timerSeconds: 120
      }
    ],
    substitutions: [
      { original: "Brioche Bun", substitute: "Gluten-Free Seeded Bun", note: "Gluten-free variant." }
    ]
  },
  {
    id: "fluffy-golden-pancakes",
    title: "Fluffy Golden Buttermilk Pancakes",
    nativeTitles: {
      te: "బటర్‌మిల్క్ పాన్‌కేక్స్",
      hi: "फ्लफी बटरमिल्क पैनकेक्स",
      ta: "பான்கேக்",
      kn: "ಪ್ಯಾನ್‌ಕೇಕ್",
      ml: "പാൻകേക്ക്",
      bn: "প্যানকেক",
      gu: "પેનકેક",
      mr: "पॅनकेक"
    },
    description: "Thick, cloud-like American diner pancakes prepared with cultured buttermilk, Madagascar vanilla, and whipped batter, griddled golden and stacked with whipped butter and pure Grade A maple syrup.",
    cuisine: "American",
    region: "All-American",
    mealType: "Breakfast",
    foodCategory: "Pancakes",
    diet: "Vegetarian",
    dietaryClassifications: ["Vegetarian", "Balanced Diet"],
    vegan: false,
    glutenFree: false,
    jainFriendly: true,
    dairyFree: false,
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 3,
    difficulty: "Beginner Friendly",
    budget: "Budget",
    calories: 330,
    nutrition: {
      protein: "8g",
      carbs: "52g",
      fat: "10g",
      fiber: "2g",
      micronutrients: {
        iron: "1.9mg",
        calcium: "160mg",
        vitaminC: "1mg",
        potassium: "210mg",
        sodium: "410mg"
      }
    },
    nutritionSource: "USDA FoodData Central",
    allergens: ["Gluten", "Dairy"],
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80",
    rating: 4.95,
    reviewsCount: 420,
    featured: false,
    tags: ["Weekend Brunch", "Fluffy Diner Style", "Maple Syrup", "Breakfast Comfort"],
    ingredients: [
      { name: "Flour (All Purpose or Spelt)", quantity: 200, unit: "g", category: "Grains" },
      { name: "Cultured Buttermilk", quantity: 250, unit: "ml", category: "Dairy" },
      { name: "Baking Powder & Baking Soda", quantity: 1.5, unit: "tsp", category: "Pantry" },
      { name: "Melted Butter & Vanilla Extract", quantity: 2, unit: "tbsp", category: "Dairy & Extracts" },
      { name: "Pure Maple Syrup & Fresh Berries", quantity: 0.5, unit: "cup", category: "Syrup" }
    ],
    instructions: [
      {
        step: 1,
        title: "Gently Whisk the Lumpy Batter",
        text: "Whisk dry ingredients in a bowl. Whisk buttermilk, melted butter, and vanilla. Fold gently without overmixing; lumps are crucial for height.",
        timerSeconds: 180
      },
      {
        step: 2,
        title: "Griddle Until Bubbles Pop",
        text: "Pour 1/3 cup batter onto buttered griddle over medium heat. Flip when bubbles form and burst on top surface. Cook 2 more minutes.",
        timerSeconds: 300
      }
    ],
    substitutions: [
      { original: "Buttermilk", substitute: "Soy Milk with 1 tbsp Apple Cider Vinegar", note: "Flawless plant-based buttermilk substitute." }
    ]
  }
];

// Food categories metadata lists
const CUISINES_LIST = [
  { id: "all", name: "All Cuisines", icon: "Utensils", count: RECIPES.length },
  { id: "South Indian", name: "South Indian", icon: "Palmtree", count: RECIPES.filter(r => r.cuisine === "South Indian").length, description: "Fermented idlis, crispy dosas, coconut sadya avial, and aromatic broths." },
  { id: "Andhra", name: "Andhra & Telangana", icon: "Flame", count: RECIPES.filter(r => r.cuisine === "Andhra" || r.cuisine === "Hyderabadi").length, description: "Fiery Guntur chillies, tangy gongura, stuffed gutti vankaya, and royal dum biryani." },
  { id: "North Indian", name: "North Indian", icon: "Wheat", count: RECIPES.filter(r => r.cuisine === "North Indian").length, description: "Rich makhani gravies, tandoori breads, slow-cooked dals, and fragrant pulaos." },
  { id: "East Indian", name: "East Indian", icon: "Fish", count: RECIPES.filter(r => r.cuisine === "East Indian").length, description: "Pungent mustard oil, panch phoran, Bihari sattu litti, and Himalayan momos." },
  { id: "West Indian", name: "West Indian", icon: "Sun", count: RECIPES.filter(r => r.cuisine === "West Indian").length, description: "Spongy khaman dhoklas, Mumbai pav bhaji, zesty misal, and coastal coconut curries." },
  { id: "Indian Snacks", name: "Indian Snacks & Chaat", icon: "Zap", count: RECIPES.filter(r => r.cuisine === "Indian Snacks").length, description: "Crunchy samosas, pani puris, vada pavs, pakoras, and street chaat sensations." },
  { id: "Indian Sweets", name: "Indian Sweets & Mithai", icon: "Crown", count: RECIPES.filter(r => r.cuisine === "Indian Sweets").length, description: "Ghee-soaked gulab jamuns, saffron rasmalai, halwas, and royal elachi payasams." },
  { id: "Italian", name: "Italian", icon: "Pizza", count: RECIPES.filter(r => r.cuisine === "Italian").length, description: "Neapolitan wood-fired pizzas, creamy wild mushroom risottos, and artisan pastas." },
  { id: "Chinese", name: "Chinese & Asian", icon: "Soup", count: RECIPES.filter(r => r.cuisine === "Chinese").length, description: "High-heat wok fried rices, street hakka noodles, and handmade dim sum." },
  { id: "Japanese", name: "Japanese", icon: "Fish", count: RECIPES.filter(r => r.cuisine === "Japanese").length, description: "Deep umami miso ramens, avocado sushi maki rolls, and crisp tempura." },
  { id: "Korean", name: "Korean", icon: "Flame", count: RECIPES.filter(r => r.cuisine === "Korean").length, description: "Rainbow bibimbap bowls, fiery gochujang sauces, and sizzling kimchi delicacies." },
  { id: "Thai", name: "Thai", icon: "Sparkles", count: RECIPES.filter(r => r.cuisine === "Thai").length, description: "Street pad thai, fragrant green coconut curries, and lemongrass tom yum." },
  { id: "Mexican", name: "Mexican", icon: "Sun", count: RECIPES.filter(r => r.cuisine === "Mexican").length, description: "Charred corn black bean tacos, roasted veggie quesadillas, and zesty salsas." },
  { id: "Mediterranean", name: "Mediterranean & Middle Eastern", icon: "Compass", count: RECIPES.filter(r => r.cuisine === "Mediterranean" || r.cuisine === "Middle Eastern").length, description: "Velvety tahini hummus, crispy herb falafels, za'atar pitas, and village salads." },
  { id: "American", name: "American & World", icon: "Coffee", count: RECIPES.filter(r => r.cuisine === "American").length, description: "Gourmet black bean portobello burgers, fluffy diner buttermilk pancakes, and bistro classics." }
];

const MEAL_TYPES_LIST = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Main Course",
  "Side Dishes",
  "Desserts",
  "Street Food",
  "Soups",
  "Breads",
  "Rice Dishes"
];

const DIETARY_OPTIONS_LIST = [
  "All",
  "Vegetarian",
  "Vegan",
  "Non-Vegetarian",
  "Pescatarian",
  "Jain",
  "Gluten-Free",
  "Dairy-Free",
  "High-Protein",
  "Low-Carb",
  "Balanced Diet",
  "Plant-Based"
];

const POPULAR_INGREDIENTS = [
  "Paneer", "Toor Dal", "Tomatoes", "Onions", "Potatoes", "Spinach", "Garlic",
  "Ginger", "Curry Leaves", "Mustard Seeds", "Cumin Seeds", "Coconut",
  "Coriander", "Green Chillies", "Peanuts", "Basmati Rice", "Chickpeas",
  "Mushroom", "Tamarind", "Yogurt", "Ghee", "Kasuri Methi", "Avocado",
  "Tofu", "Black Beans", "Soy Sauce", "Miso", "Mozzarella", "Tahini"
];

const HERO_CAROUSEL_RECIPE_IDS = [
  "hyderabadi-dum-biryani",
  "masala-dosa",
  "paneer-butter-masala",
  "gutti-vankaya-koora",
  "idli-sambar",
  "vegetable-pulao",
  "gulab-jamun"
];

// Generate JS file string
const recipesJsContent = `// RASAVANTA AI Comprehensive Culinary & Recipe Database
// Curated with Indian & International Cuisines, NutriSense Nutrition Data, and 9-Language Localization

export const RECIPES_DATA = ${JSON.stringify(RECIPES, null, 2)};

export const CUISINES_LIST = ${JSON.stringify(CUISINES_LIST, null, 2)};

export const MEAL_TYPES_LIST = ${JSON.stringify(MEAL_TYPES_LIST, null, 2)};

export const DIETARY_OPTIONS_LIST = ${JSON.stringify(DIETARY_OPTIONS_LIST, null, 2)};

export const POPULAR_INGREDIENTS = ${JSON.stringify(POPULAR_INGREDIENTS, null, 2)};

export const HERO_CAROUSEL_RECIPE_IDS = ${JSON.stringify(HERO_CAROUSEL_RECIPE_IDS, null, 2)};

export const getHeroCarouselRecipes = () => {
  return HERO_CAROUSEL_RECIPE_IDS.map((id) => {
    const item = RECIPES_DATA.find((r) => r.id === id);
    if (!item) return null;
    return {
      ...item,
      name: item.title,
      dietaryCategory: item.diet,
      dietaryType: item.diet,
      preparationTime: \`\${item.prepTime} minutes\`,
      cookingTime: \`\${item.cookTime} minutes\`,
      cookTimeStr: \`\${item.cookTime} mins\`,
      prepTimeStr: \`\${item.prepTime} mins\`,
      route: \`/recipes/\${item.id}\`,
    };
  }).filter(Boolean);
};
`;

// Write to client
const clientPath = path.resolve(__dirname, '../client/src/data/recipesData.js');
fs.writeFileSync(clientPath, recipesJsContent, 'utf-8');
console.log(`[Success] Wrote ${RECIPES.length} recipes to ${clientPath}`);

// Write JSON seed file for server
const serverSeedDir = path.resolve(__dirname, '../server/src/seed');
if (!fs.existsSync(serverSeedDir)) {
  fs.mkdirSync(serverSeedDir, { recursive: true });
}
const serverSeedPath = path.resolve(serverSeedDir, 'seedData.json');
fs.writeFileSync(serverSeedPath, JSON.stringify(RECIPES, null, 2), 'utf-8');
console.log(`[Success] Wrote seed data to ${serverSeedPath}`);
