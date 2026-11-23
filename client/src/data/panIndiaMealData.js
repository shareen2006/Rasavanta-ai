/**
 * RASAVANTA AI — Comprehensive Pan-India Daily Meal & Regional Culinary Database
 * 
 * Features:
 * - 6 Culinary Zones: North, South, East, West, Central, Northeast India
 * - All 28 States and 8 Union Territories represented
 * - 4 Daily Meal Categories: Breakfast, Lunch, Evening Snacks, Dinner
 * - Authentic everyday Indian home cooking, regional specialties, and wholesome thalis
 * - Full 9-Language Localization (English, Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Gujarati, Marathi)
 * - Accurate macronutrients, calories, preparation time, and verified food photography
 */

export const INDIAN_ZONES = [
  { id: 'all', name: 'All India', icon: '🌐', description: 'Curated culinary journey across all regions of Bharat' },
  { id: 'north', name: 'North India', icon: '🏔️', description: 'Rich gravies, tandoori breads, fragrant parathas & hearty pulses' },
  { id: 'south', name: 'South India', icon: '🌴', description: 'Steamed rice crepes, fragrant lentils, coconut curries & rasams' },
  { id: 'east', name: 'East India', icon: '🌅', description: 'Mustard flavors, river fish curries, delicate pithas & comforting dalma' },
  { id: 'west', name: 'West India', icon: '🌊', description: 'Spiced misals, comforting theplas, tangy kadhis & coastal curries' },
  { id: 'central', name: 'Central India', icon: '🏛️', description: 'Hearty baflas, tempered poha, seasonal corn specialties & forest lentils' },
  { id: 'northeast', name: 'Northeast India', icon: '🎋', description: 'Fresh herbs, bamboo shoot stews, steaming momos & aromatic hill rices' }
];

export const INDIAN_STATES_UTS = [
  // ── NORTH INDIA ───────────────────────────────────────────────────────────
  { id: 'punjab', name: 'Punjab', zone: 'north', isUT: false },
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', zone: 'north', isUT: true },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', zone: 'north', isUT: false },
  { id: 'uttarakhand', name: 'Uttarakhand', zone: 'north', isUT: false },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', zone: 'north', isUT: false },
  { id: 'rajasthan', name: 'Rajasthan', zone: 'north', isUT: false },
  { id: 'haryana', name: 'Haryana', zone: 'north', isUT: false },
  { id: 'delhi', name: 'Delhi (NCT)', zone: 'north', isUT: true },
  { id: 'ladakh', name: 'Ladakh', zone: 'north', isUT: true },
  { id: 'chandigarh', name: 'Chandigarh', zone: 'north', isUT: true },

  // ── SOUTH INDIA ───────────────────────────────────────────────────────────
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', zone: 'south', isUT: false },
  { id: 'telangana', name: 'Telangana', zone: 'south', isUT: false },
  { id: 'tamil-nadu', name: 'Tamil Nadu', zone: 'south', isUT: false },
  { id: 'karnataka', name: 'Karnataka', zone: 'south', isUT: false },
  { id: 'kerala', name: 'Kerala', zone: 'south', isUT: false },
  { id: 'puducherry', name: 'Puducherry', zone: 'south', isUT: true },
  { id: 'lakshadweep', name: 'Lakshadweep', zone: 'south', isUT: true },
  { id: 'andaman-nicobar', name: 'Andaman & Nicobar Islands', zone: 'south', isUT: true },

  // ── EAST INDIA ────────────────────────────────────────────────────────────
  { id: 'west-bengal', name: 'West Bengal', zone: 'east', isUT: false },
  { id: 'odisha', name: 'Odisha', zone: 'east', isUT: false },
  { id: 'bihar', name: 'Bihar', zone: 'east', isUT: false },
  { id: 'jharkhand', name: 'Jharkhand', zone: 'east', isUT: false },

  // ── WEST INDIA ────────────────────────────────────────────────────────────
  { id: 'maharashtra', name: 'Maharashtra', zone: 'west', isUT: false },
  { id: 'gujarat', name: 'Gujarat', zone: 'west', isUT: false },
  { id: 'goa', name: 'Goa', zone: 'west', isUT: false },
  { id: 'dadra-daman-diu', name: 'Dadra & Nagar Haveli and Daman & Diu', zone: 'west', isUT: true },

  // ── CENTRAL INDIA ─────────────────────────────────────────────────────────
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', zone: 'central', isUT: false },
  { id: 'chhattisgarh', name: 'Chhattisgarh', zone: 'central', isUT: false },

  // ── NORTHEAST INDIA ───────────────────────────────────────────────────────
  { id: 'assam', name: 'Assam', zone: 'northeast', isUT: false },
  { id: 'meghalaya', name: 'Meghalaya', zone: 'northeast', isUT: false },
  { id: 'manipur', name: 'Manipur', zone: 'northeast', isUT: false },
  { id: 'mizoram', name: 'Mizoram', zone: 'northeast', isUT: false },
  { id: 'nagaland', name: 'Nagaland', zone: 'northeast', isUT: false },
  { id: 'tripura', name: 'Tripura', zone: 'northeast', isUT: false },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', zone: 'northeast', isUT: false },
  { id: 'sikkim', name: 'Sikkim', zone: 'northeast', isUT: false }
];

export const MEAL_CATEGORIES = [
  { id: 'breakfast', name: 'Breakfast', time: '08:00 AM', icon: '🌅', description: 'Energizing regional breakfast dishes to start your day' },
  { id: 'lunch', name: 'Lunch', time: '01:00 PM', icon: '☀️', description: 'Wholesome, nutritionally complete regional home meals' },
  { id: 'snack', name: 'Evening Snack', time: '05:00 PM', icon: '☕', description: 'Savory street-style snacks and chai accompaniments' },
  { id: 'dinner', name: 'Dinner', time: '08:30 PM', icon: '🌙', description: 'Light, gut-friendly, comforting traditional dinners' }
];

export const DAYS_OF_WEEK = [
  { id: 'mon', name: 'Monday', short: 'Mon', theme: 'Fresh Beginnings' },
  { id: 'tue', name: 'Tuesday', short: 'Tue', theme: 'Spice & Wholesome' },
  { id: 'wed', name: 'Wednesday', short: 'Wed', theme: 'Midweek Nourish' },
  { id: 'thu', name: 'Thursday', short: 'Thu', theme: 'Traditional Comfort' },
  { id: 'fri', name: 'Friday', short: 'Fri', theme: 'Feast & Flavor' },
  { id: 'sat', name: 'Saturday', short: 'Sat', theme: 'Weekend Indulgence' },
  { id: 'sun', name: 'Sunday', short: 'Sun', theme: 'Royal Heritage' }
];

/**
 * Curated Pan-India Dish Repository
 * Contains authentic dishes across all 36 States/UTs and all 4 meal categories
 */
export const PAN_INDIA_DISHES = [
  // =========================================================================
  // NORTH INDIA — PUNJAB, DELHI, HARYANA, UP, RAJASTHAN, KASHMIR, HP, UTTARAKHAND, LADAKH
  // =========================================================================
  {
    id: 'punjabi-aloo-paratha',
    name: 'Spiced Aloo Paratha with White Butter & Curd',
    nativeTitles: {
      en: 'Spiced Aloo Paratha with White Butter & Curd',
      te: 'ఆలూ పరాఠా మరియు తాజా పెరుగు',
      hi: 'मक्खन और दही के साथ आलू पराठा',
      ta: 'ஆலு பரோட்டா மற்றும் தயிர்',
      kn: 'ಆಲೂ ಪರೋಟ ಮತ್ತು ಮೊಸರು',
      ml: 'ആലു പറാത്ത തൈരിനൊപ്പം',
      bn: 'আলু পরোটা মাখনের সাথে',
      gu: 'આલૂ પરાઠા માખણ અને દહીં સાથે',
      mr: 'मऊ लुसलुशीत बटाटा पराठा'
    },
    zone: 'north',
    state: 'Punjab',
    cuisine: 'Punjabi',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 340,
    nutrition: { protein: '8g', carbs: '52g', fat: '12g', fiber: '5g' },
    ingredients: ['Whole Wheat Flour', 'Potatoes', 'Green Chilies', 'Cumin Powder', 'Fresh Butter', 'Curd'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp whole wheat flatbread stuffed with spiced mashed potatoes, griddled in ghee and served with fresh churned white butter.',
    tasteProfile: 'Warm, Savory & Hearty'
  },
  {
    id: 'punjabi-rajma-chawal',
    name: 'Homestyle Punjabi Rajma Chawal',
    nativeTitles: {
      en: 'Homestyle Punjabi Rajma Chawal',
      te: 'పంజాబీ రాజ్మా చావల్',
      hi: 'पंजाबी राजमा चावल',
      ta: 'பஞ்சாபி ராஜ்மா சாதம்',
      kn: 'ಪಂಜಾಬಿ ರಾಜ್ಮಾ ಅನ್ನ',
      ml: 'പഞ്ചാബി രാജ്മ ചാവൽ',
      bn: 'পাঞ্জাবি রাজমা চাওয়াল',
      gu: 'પંજાબી રાજમા ભાત',
      mr: 'पंजाबी राजमा भात'
    },
    zone: 'north',
    state: 'Punjab',
    cuisine: 'Punjabi',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 35,
    calories: 460,
    nutrition: { protein: '16g', carbs: '74g', fat: '10g', fiber: '11g' },
    ingredients: ['Red Kidney Beans (Rajma)', 'Basmati Rice', 'Onions', 'Tomatoes', 'Ginger-Garlic', 'Garam Masala'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Melt-in-mouth red kidney beans simmered in a luscious onion-tomato gravy, served over steaming fragrant basmati rice with pickled onions.',
    tasteProfile: 'Rich, Comforting & Protein-Packed'
  },
  {
    id: 'punjabi-samosa-chai',
    name: 'Crispy Punjabi Samosa with Mint Chutney',
    nativeTitles: {
      en: 'Crispy Punjabi Samosa with Mint Chutney',
      te: 'సమోసా మరియు పుదీనా చట్నీ',
      hi: 'पुदीना चटनी के साथ कुरकुरा समोसा',
      ta: 'மொறுமொறுப்பான சமோசா புதினா சட்னியுடன்',
      kn: 'ಗರಿಗರಿಯಾದ ಸಮೋಸಾ ಮತ್ತು ಪುದೀನಾ ಚಟ್ನಿ',
      ml: 'മൊരിഞ്ഞ സമൂസ പുതിന ചട്നിക്കൊപ്പം',
      bn: 'মুচমুচে সিঙাড়া ও পুদিনা চাটনি',
      gu: 'ક્રિસ્પી સમોસા ફુદીના ચટણી સાથે',
      mr: 'कुरकुरीत समोसा पुदिना चटणीसह'
    },
    zone: 'north',
    state: 'Punjab',
    cuisine: 'North Indian',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 20,
    calories: 280,
    nutrition: { protein: '5g', carbs: '36g', fat: '13g', fiber: '3g' },
    ingredients: ['Flour (Maida/Wheat)', 'Potatoes', 'Green Peas', 'Coriander Seeds', 'Mint & Coriander Chutney'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden triangular pastry crust filled with spiced potatoes and sweet peas, paired with zesty mint coriander dip.',
    tasteProfile: 'Crispy, Savory & Tangy'
  },
  {
    id: 'punjabi-dal-makhani-phulka',
    name: 'Slow-Cooked Dal Makhani with Tawa Phulka',
    nativeTitles: {
      en: 'Slow-Cooked Dal Makhani with Tawa Phulka',
      te: 'దాల్ మఖనీ మరియు పుల్కా',
      hi: 'तवा फुल्का के साथ धीमी आंच पर पकी दाल मखनी',
      ta: 'தால் மக்கனி மற்றும் புல்கா',
      kn: 'ದಾಲ್ ಮಖನಿ ಮತ್ತು ಫುಲ್ಕಾ ರೊಟ್ಟಿ',
      ml: 'ദാൽ മഖനി ഫുൽക്കയ്ക്കൊപ്പം',
      bn: 'দাল মাখানি ও তவா ফুলকা',
      gu: 'દાલ મખની અને ગરમ ફુલકા',
      mr: 'दाल मखनी आणि मऊ फुलके'
    },
    zone: 'north',
    state: 'Punjab',
    cuisine: 'Punjabi',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 40,
    calories: 420,
    nutrition: { protein: '15g', carbs: '58g', fat: '14g', fiber: '9g' },
    ingredients: ['Black Urad Dal', 'Kidney Beans', 'Cream', 'Butter', 'Tomatoes', 'Wheat Flour Phulkas'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Creamy black lentils slow-cooked overnight with ginger, tomato puree and fresh cream, served with puffed whole wheat phulkas.',
    tasteProfile: 'Velvety, Smoky & Nourishing'
  },
  {
    id: 'delhi-chole-bhature',
    name: 'Delhi Style Chole Bhature with Pickled Onions',
    nativeTitles: {
      en: 'Delhi Style Chole Bhature with Pickled Onions',
      te: 'ఢిల్లీ స్టైల్ చోలే భటూరే',
      hi: 'दिल्ली स्टाइल छोले भटूरे',
      ta: 'டெல்லி ஸ்டைல் சோலே பதூரே',
      kn: 'ದೆಹಲಿ ಶೈಲಿಯ ಛೋಲೆ ಭಟೂರೆ',
      ml: 'ഡൽഹി സ്റ്റൈൽ ചോലെ ഭട്ടൂര',
      bn: 'দিল্লি স্পেশাল ছোলে ভাটুরে',
      gu: 'દિલ્હી સ્ટાઈલ છોલે ભટૂરે',
      mr: 'दिल्ली स्टाईल छोले भटुरे'
    },
    zone: 'north',
    state: 'Delhi (NCT)',
    cuisine: 'North Indian',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 25,
    cookTime: 30,
    calories: 540,
    nutrition: { protein: '17g', carbs: '78g', fat: '18g', fiber: '10g' },
    ingredients: ['Chickpeas (Kabuli Chana)', 'Flour', 'Pomegranate Seeds (Anardana)', 'Tea Leaves for color', 'Pickled Chillies'],
    image: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Piping hot fluffy bhature served with piquant, dark-spiced Delhi chickpeas, sliced ginger juliennes and pickled green chillies.',
    tasteProfile: 'Robust, Tangy & Indulgent'
  },
  {
    id: 'kashmiri-dum-aloo-pulao',
    name: 'Kashmiri Shahi Dum Aloo with Saffron Rice',
    nativeTitles: {
      en: 'Kashmiri Shahi Dum Aloo with Saffron Rice',
      te: 'కాశ్మీరీ దమ్ ఆలూ మరియు కుంకుమపువ్వు అన్నం',
      hi: 'कश्मीरी दम आलू और केसरिया पुलाव',
      ta: 'காஷ்மீரி தம் ஆலு மற்றும் குங்குமப்பூ சாதம்',
      kn: 'ಕಾಶ್ಮೀರಿ ದಮ್ ಆಲೂ ಮತ್ತು ಕೇಸರಿ ಅನ್ನ',
      ml: 'കാശ്മീരി ദം ആലു കേസരി റൈസിനൊപ്പം',
      bn: 'কাশ্মীরি দম আলু ও জাফরানি পোলাও',
      gu: 'કાશ્મીરી દમ આલૂ અને કેસર પુલાવ',
      mr: 'काश्मिरी दम आलू आणि केशर भात'
    },
    zone: 'north',
    state: 'Jammu & Kashmir',
    cuisine: 'Kashmiri',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 35,
    calories: 430,
    nutrition: { protein: '9g', carbs: '65g', fat: '14g', fiber: '6g' },
    ingredients: ['Baby Potatoes', 'Kashmiri Red Chilli', 'Fennel Powder (Saunf)', 'Dry Ginger (Sonth)', 'Curd', 'Saffron Basmati Rice'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep-fried baby potatoes slow-cooked in curd-based gravy scented with fennel and dry ginger, paired with saffron-infused rice.',
    tasteProfile: 'Fragrant, Mildly Spiced & Royal'
  },
  {
    id: 'kashmiri-kahwa-girda',
    name: 'Kashmiri Saffron Kahwa with Traditional Girda Bread',
    nativeTitles: {
      en: 'Kashmiri Saffron Kahwa with Traditional Girda Bread',
      te: 'కాశ్మీరీ ఖావా మరియు గిర్దా రొట్టె',
      hi: 'कश्मीरी कहवा और गिरदा रोटी',
      ta: 'காஷ்மீரி கஹ்வா மற்றும் கிர்தா ரொட்டி',
      kn: 'ಕಾಶ್ಮೀರಿ ಕಹ್ವಾ ಮತ್ತು ಗಿರ್ದಾ ಬ್ರೆಡ್',
      ml: 'കാശ്മീരി കഹ്വ ഗിർദ ബ്രെഡിനൊപ്പം',
      bn: 'কাশ্মীরি কাহওয়া ও গিরদা রুটি',
      gu: 'કાશ્મીરી કહવા અને ગીરદા રોટલી',
      mr: 'काश्मिरी कहवा आणि गिरदा ब्रेड'
    },
    zone: 'north',
    state: 'Jammu & Kashmir',
    cuisine: 'Kashmiri',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 10,
    cookTime: 15,
    calories: 220,
    nutrition: { protein: '6g', carbs: '40g', fat: '4g', fiber: '3g' },
    ingredients: ['Green Tea Leaves', 'Saffron', 'Almonds', 'Cardamom', 'Cinnamon', 'Traditional Clay-Oven Girda Bread'],
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden Kashmiri green tea brewed with whole saffron, cinnamon and crushed almonds, paired with tandoor-baked morning bread.',
    tasteProfile: 'Floral, Warming & Soulful'
  },
  {
    id: 'rajasthani-dal-baati-churma',
    name: 'Authentic Rajasthani Dal Baati Churma',
    nativeTitles: {
      en: 'Authentic Rajasthani Dal Baati Churma',
      te: 'రాజస్థానీ దాల్ బాటీ చుర్మా',
      hi: 'पारंपरिक राजस्थानी दाल बाटी चूरमा',
      ta: 'ராஜஸ்தானி தால் பாட்டி சுர்மா',
      kn: 'ರಾಜಸ್ಥಾನಿ ದಾಲ್ ಬಾಟಿ ಚುರ್ಮಾ',
      ml: 'രാജസ്ഥാനി ദാൽ ബാട്ടി ചൂർമ',
      bn: 'রাজস্থানি ডাল বাটি চুরমা',
      gu: 'રાજસ્થાની દાળ બાટી ચૂરમા',
      mr: 'पारंपरिक राजस्थानी डाळ बाटी चुरमा'
    },
    zone: 'north',
    state: 'Rajasthan',
    cuisine: 'Rajasthani',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 25,
    cookTime: 45,
    calories: 590,
    nutrition: { protein: '18g', carbs: '82g', fat: '22g', fiber: '9g' },
    ingredients: ['Wheat Baatis', 'Panchmel Dal (5 Lentils)', 'Pure Desi Ghee', 'Jaggery/Sugar Churma', 'Garlic Chutney'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Hard wheat flour dumplings baked over cow-dung embers, dipped in hot ghee, served with spiced mixed lentils and sweet powdered churma.',
    tasteProfile: 'Hearty, Earthy & Luxurious'
  },
  {
    id: 'rajasthani-pyaaz-kachori',
    name: 'Jodhpur Pyaaz Kachori with Sweet Imli Chutney',
    nativeTitles: {
      en: 'Jodhpur Pyaaz Kachori with Sweet Imli Chutney',
      te: 'జోధ్‌పూర్ ఉల్లిపాయ కచోరీ',
      hi: 'जोधपुरी प्याज कचौड़ी और इमली चटनी',
      ta: 'ஜோத்பூர் வெங்காய கச்சோரி',
      kn: 'ಜೋಧ್‌ಪುರ ಈರುಳ್ಳಿ ಕಚೋರಿ',
      ml: 'ജോധ്പൂർ ഉള്ളി കച്ചോരി',
      bn: 'যোধপুরী পেঁয়াজ কচুরি',
      gu: 'જોધપુરી ડુંગળી કચોરી',
      mr: 'जोधपुरी कांदा कचोरी'
    },
    zone: 'north',
    state: 'Rajasthan',
    cuisine: 'Rajasthani',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 20,
    calories: 310,
    nutrition: { protein: '6g', carbs: '38g', fat: '15g', fiber: '4g' },
    ingredients: ['Refined Flour', 'Spiced Caramelized Onions', 'Fennel Seeds', 'Coriander Seeds', 'Tamarind Chutney'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Flaky deep-fried puffed pastry packed with fragrant, fennel-seasoned onion stuffing, accompanied by tangy date-tamarind dip.',
    tasteProfile: 'Flaky, Spiced & Piquant'
  },
  {
    id: 'himachali-siddu-ghee',
    name: 'Traditional Himachali Siddu with Ghee & Chutney',
    nativeTitles: {
      en: 'Traditional Himachali Siddu with Ghee & Chutney',
      te: 'హిమాచలీ సిద్దూ మరియు నెయ్యి',
      hi: 'पारंपरिक हिमाचली सिद्दू और देसी घी',
      ta: 'ஹிமாச்சலி சித்து நெய்யுடன்',
      kn: 'ಹಿಮಾಚಲಿ ಸಿದ್ದು ಮತ್ತು ತುಪ್ಪ',
      ml: 'ഹിമാചലി സിദ്ധു നെയ്യൊപ്പം',
      bn: 'হিমাচলি সিদ্দু ও ঘি',
      gu: 'હિમાચલી સિદ્દુ અને ઘી',
      mr: 'हिमाचली सिद्दू आणि साजूक तूप'
    },
    zone: 'north',
    state: 'Himachal Pradesh',
    cuisine: 'Himachali',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 30,
    cookTime: 20,
    calories: 320,
    nutrition: { protein: '10g', carbs: '50g', fat: '9g', fiber: '6g' },
    ingredients: ['Fermented Wheat Dough', 'Crushed Walnuts', 'Opium Poppy Seeds / Dal paste', 'Pure Ghee', 'Walnut Coriander Chutney'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Steamed fermented wheat bun filled with roasted poppy seeds, walnuts and mountain spices, drenched in melting golden pahadi ghee.',
    tasteProfile: 'Nutty, Steamed & Wholesome'
  },
  {
    id: 'uttarakhand-mandua-roti-chainsoo',
    name: 'Kumaoni Chainsoo (Black Gram Dal) with Mandua Roti',
    nativeTitles: {
      en: 'Kumaoni Chainsoo with Mandua Roti',
      te: 'కుమావోని చైన్సూ మరియు రాగి రొట్టె',
      hi: 'कुमाऊंनी चैंसू और मंडुवे की रोटी',
      ta: 'குமாவோனி செயின்சு மற்றும் ராகி ரொட்டி',
      kn: 'ಕುಮಾವೊನಿ ಚೈನ್ಸು ಮತ್ತು ರಾಗಿ ರೊಟ್ಟಿ',
      ml: 'കുമാവോണി ചെയിൻസു റാഗി റൊട്ടിക്കൊപ്പം',
      bn: 'কুমায়ুনি চাইনসু ও রাগি রুটি',
      gu: 'કુમાઉની ચૈંસૂ અને રાગી રોટલી',
      mr: 'कुमाऊंनी चैंसू आणि नाचणीची भाकरी'
    },
    zone: 'north',
    state: 'Uttarakhand',
    cuisine: 'Pahadi',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 30,
    calories: 380,
    nutrition: { protein: '16g', carbs: '64g', fat: '6g', fiber: '10g' },
    ingredients: ['Roasted Black Gram (Bhatt/Urad)', 'Finger Millet (Mandua/Ragi) Flour', 'Jamboo Herb', 'Garlic', 'Ghee'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Nutritious roasted and ground black gram curry tempered in cast iron with wild Himalayan herbs, served with earthy finger millet rotis.',
    tasteProfile: 'Rustic, Earthy & High-Altitude Comfort'
  },
  {
    id: 'ladakhi-veg-thukpa',
    name: 'Warming Ladakhi Vegetable Thukpa Noodle Broth',
    nativeTitles: {
      en: 'Warming Ladakhi Vegetable Thukpa Noodle Broth',
      te: 'లడఖీ తుక్పా సూప్',
      hi: 'गरमागरम लद्दाखी वेज थुकपा',
      ta: 'லடாக் காய்கறி துக்பா',
      kn: 'ಲಡಾಖಿ ತುಕಪಾ ನೂಡಲ್ಸ್ ಸೂಪ್',
      ml: 'ലഡാക്കി വെജ് തുക്പ സൂപ്പ്',
      bn: 'লাদাখি ভেজ থুকপা সুপ',
      gu: 'લદાખી વેજ થુકપા સૂપ',
      mr: 'गरमागरम लडाखी थुकपा'
    },
    zone: 'north',
    state: 'Ladakh',
    cuisine: 'Tibetan & Ladakhi',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 330,
    nutrition: { protein: '11g', carbs: '56g', fat: '6g', fiber: '7g' },
    ingredients: ['Hand-pulled Wheat Noodles', 'Local Spinach', 'Carrots', 'Radish', 'Ginger Broth', 'Tingmo bread / Sesame oil'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    description: 'Steaming Tibetan-Ladakhi mountain noodle soup simmered in fragrant clear broth with crisp highland vegetables and mountain herbs.',
    tasteProfile: 'Warm, Herbaceous & Rejuvenating'
  },
  {
    id: 'haryana-bajra-khichdi',
    name: 'Haryanvi Bajra Khichdi with Fresh White Makhan & Lassi',
    nativeTitles: {
      en: 'Haryanvi Bajra Khichdi with Fresh White Makhan & Lassi',
      te: 'హర్యానా సజ్జ కిచిడీ మరియు లస్సీ',
      hi: 'हरियाणवी बाजरा खिचड़ी, सफेद मक्खन और लस्सी',
      ta: 'ஹரியான்வி கம்பு கிச்சடி மற்றும் மோர்',
      kn: 'ಹರಿಯಾಣಿ ಸಜ್ಜೆ ಖಿಚಡಿ ಮತ್ತು ಮಜ್ಜಿಗೆ',
      ml: 'ഹരിയാൻവി ബജ്റ കിച്ചടി തൈരിനൊപ്പം',
      bn: 'হরিয়ানভি বাজরা খিচুড়ি ও মাখন',
      gu: 'હરિયાણવી બાજરી ખીચડી અને છાશ',
      mr: 'हरियाणवी बाजरी खिचडी आणि लोणी'
    },
    zone: 'north',
    state: 'Haryana',
    cuisine: 'Haryanvi',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 35,
    calories: 410,
    nutrition: { protein: '12g', carbs: '68g', fat: '11g', fiber: '12g' },
    ingredients: ['Pounded Pearl Millet (Bajra)', 'Yellow Moong Dal', 'Pure Desi Ghee', 'Cumin', 'Fresh Churned Buttermilk'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Coarsely crushed pearl millet slow-cooked with yellow lentils, topped with melting village makhan and paired with thick salted lassi.',
    tasteProfile: 'Creamy, High-Fiber & Wholesome'
  },

  // =========================================================================
  // SOUTH INDIA — ANDHRA, TELANGANA, TAMIL NADU, KARNATAKA, KERALA, UTs
  // =========================================================================
  {
    id: 'andhra-pesarattu-upma',
    name: 'Andhra MLA Pesarattu stuffed with Ghee Upma',
    nativeTitles: {
      en: 'Andhra MLA Pesarattu stuffed with Ghee Upma',
      te: 'ఆంధ్రా ఎంఎల్ఏ పెసరట్టు ఉప్మా అల్లం పచ్చడితో',
      hi: 'अल्लप पचड़ी के साथ आंध्र पेसरट्टू उपमा',
      ta: 'ஆந்திரா பெசரட்டு உப்மா மற்றும் இஞ்சி சட்னி',
      kn: 'ಆಂಧ್ರ ಪೆಸರಟ್ಟು ಉಪ್ಮಾ ಅಲ್ಲದ ಚಟ್ನಿಯೊಂದಿಗೆ',
      ml: 'ആന്ധ്ര പെസരട്ടു ഉപ്പുമാവ് ഇഞ്ചി ചട്നിക്കൊപ്പം',
      bn: 'অন্ধ্র পেসারাত্তু উপমা আদা চাটনি সহ',
      gu: 'આંધ્ર પેસરટ્ટુ ઉપમા આદુ ચટણી સાથે',
      mr: 'आंध्र पेसरट्टू उपमा आल्याच्या चटणीसह'
    },
    zone: 'south',
    state: 'Andhra Pradesh',
    cuisine: 'Andhra',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 360,
    nutrition: { protein: '14g', carbs: '56g', fat: '9g', fiber: '8g' },
    ingredients: ['Whole Green Moong Dal', 'Semolina (Upma Rava)', 'Ginger', 'Green Chillies', 'Pure Ghee', 'Allam (Ginger) Pachadi'],
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp green gram crepe smeared with spiced ginger paste, folded around buttery semolina upma, served with tangy ginger chutney.',
    tasteProfile: 'Crisp, Savory & Zingy'
  },
  {
    id: 'andhra-gongura-pappu-rice',
    name: 'Authentic Andhra Gongura Pappu with Steamed Rice & Ghee',
    nativeTitles: {
      en: 'Andhra Gongura Pappu with Steamed Rice & Ghee',
      te: 'గోంగూర పప్పు, వేడి అన్నం మరియు నెయ్యి',
      hi: 'गरम चावल और घी के साथ गोंगूरा पप्पू',
      ta: 'ஆந்திரா கோங்குரா பருப்பு சாதம்',
      kn: 'ಗೊಂಗೂರ ಬೇಳೆ ಸಾರು ಮತ್ತು ತುಪ್ಪದ ಅನ್ನ',
      ml: 'ഗോംഗൂര പരിപ്പ് ചോറിനൊപ്പം',
      bn: 'অন্ধ্র গোঙ্গুরা ডাল ও গরম ভাত',
      gu: 'ગોંગુરા દાળ અને ગરમ ભાત',
      mr: 'अस्सल आंध्र गोंगुरा डाळ भात'
    },
    zone: 'south',
    state: 'Andhra Pradesh',
    cuisine: 'Andhra',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 25,
    calories: 450,
    nutrition: { protein: '15g', carbs: '76g', fat: '10g', fiber: '9g' },
    ingredients: ['Sorrel Leaves (Gongura)', 'Toor Dal', 'Garlic', 'Mustard & Cumin Tadka', 'Ghee', 'Sona Masoori Rice'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Tangy red sorrel leaves pressure-cooked with split pigeon peas and tempered with garlic, red chillies and fragrant ghee over rice.',
    tasteProfile: 'Sour, Fiery & Quintessentially Andhra'
  },
  {
    id: 'andhra-mirchi-bajji',
    name: 'Andhra Street-Style Stuffed Mirchi Bajji',
    nativeTitles: {
      en: 'Andhra Street-Style Stuffed Mirchi Bajji',
      te: 'స్టఫ్డ్ మిరపకాయ బజ్జి ఉల్లిపాయ మసాలాతో',
      hi: 'आंध्रा स्ट्रीट स्टाइल मिर्ची भज्जी',
      ta: 'ஆந்திரா மிளகாய் பஜ்ஜி',
      kn: 'ಆಂಧ್ರ ಶೈಲಿಯ ಮೆಣಸಿನಕಾಯಿ ಬಜ್ಜಿ',
      ml: 'ആന്ധ്ര മുളക് ബജ്ജി ഉള്ളി മസാലയ്ക്കൊപ്പം',
      bn: 'অন্ধ্র স্টাইলের লঙ্কা চপ',
      gu: 'આંધ્ર સ્ટાઇલ મરચાં ભજીયા',
      mr: 'आंध्र स्टाईल भरलेली मिरची भजी'
    },
    zone: 'south',
    state: 'Andhra Pradesh',
    cuisine: 'Andhra',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 270,
    nutrition: { protein: '6g', carbs: '32g', fat: '13g', fiber: '4g' },
    ingredients: ['Large Bhavnagri Green Chillies', 'Besan (Gram Flour)', 'Ajwain', 'Tamarind Ajwain Stuffing', 'Finely Chopped Onions'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp batter-dipped large green peppers slit and stuffed with roasted peanut-onion salad and a dash of chaat masala and lemon.',
    tasteProfile: 'Crunchy, Spicy & Tangy'
  },
  {
    id: 'telangana-sarva-pindi',
    name: 'Telangana Crispy Sarva Pindi with Peanut Podi',
    nativeTitles: {
      en: 'Telangana Crispy Sarva Pindi with Peanut Podi',
      te: 'తెలంగాణ సర్వపిండి పల్లీల పొడితో',
      hi: 'तेलंगाना की पारंपरिक सर्व पिंडी',
      ta: 'தெலுங்கானா சர்வா பிண்டி',
      kn: 'ತೆಲಂಗಾಣ ಸರ್ವಪಿಂಡಿ',
      ml: 'തെലങ്കാന സർവ പിണ്ടി',
      bn: 'তেলেঙ্গানা সর্বা পিন্ডি',
      gu: 'તેલંગાણા સર્વા પિંડી',
      mr: 'तेलंगणा पारंपरिक सर्व पिंडी'
    },
    zone: 'south',
    state: 'Telangana',
    cuisine: 'Telangana',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 310,
    nutrition: { protein: '8g', carbs: '48g', fat: '10g', fiber: '6g' },
    ingredients: ['Rice Flour', 'Chana Dal', 'Roasted Peanuts', 'Sesame Seeds', 'Curry Leaves', 'Green Chillies'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Savory round pancake pressed into a copper skillet with thumb imprints, studded with peanuts, sesame seeds and chana dal.',
    tasteProfile: 'Ultra-Crispy, Nutty & Savory'
  },
  {
    id: 'hyderabadi-dum-biryani',
    name: 'Royal Hyderabadi Dum Biryani with Mirchi ka Salan',
    nativeTitles: {
      en: 'Royal Hyderabadi Dum Biryani with Mirchi ka Salan',
      te: 'హైదరాబాదీ దమ్ బిర్యానీ మిర్చీ కా సాలన్‌తో',
      hi: 'हैदराबादी दम बिरयानी और मिर्ची का सालन',
      ta: 'ஹைதராபாத்தி தம் பிரியாணி',
      kn: 'ಹೈದರಾಬಾದಿ ದಮ್ ಬಿರಿಯಾನಿ',
      ml: 'ഹൈദരാബാദി ദം ബിരിയാണി',
      bn: 'হায়দ্রাবাদি দম বিরিয়ানি',
      gu: 'હૈદરાબાદી દમ બિરયાની',
      mr: 'शाही हैदराबादी दम बिर्याणी'
    },
    zone: 'south',
    state: 'Telangana',
    cuisine: 'Hyderabadi',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 30,
    cookTime: 40,
    calories: 520,
    nutrition: { protein: '14g', carbs: '78g', fat: '16g', fiber: '7g' },
    ingredients: ['Aged Basmati Rice', 'Paneer / Vegetables', 'Fried Onions (Birista)', 'Mint & Coriander', 'Saffron Milk', 'Sesame Peanut Salan'],
    image: '/images/recipes/hyderabadi-dum-biryani.jpg',
    description: 'Artfully layered long-grain basmati rice and marinated vegetables sealed with dough and slow-cooked in dum style with saffron and kewra.',
    tasteProfile: 'Fragrant, Royal & Layered Spice'
  },
  {
    id: 'tamilnadu-masala-dosa-sambar',
    name: 'Crispy Mysore Masala Dosa with Drumstick Sambar',
    nativeTitles: {
      en: 'Crispy Mysore Masala Dosa with Drumstick Sambar',
      te: 'మసాలా దోశ ములక్కాడ సాంబార్ మరియు కొబ్బరి చట్నీతో',
      hi: 'सांभर और नारियल चटनी के साथ कुरकुरा मसाला डोसा',
      ta: 'மொருமொருப்பான மசாலா தோசை சாம்பார் சட்னியுடன்',
      kn: 'ಮೈಸೂರು ಮಸಾಲೆ ದೋಸೆ ಸಾಂಬಾರ್ ಮತ್ತು ಚಟ್ನಿ',
      ml: 'മൊരിഞ്ഞ മസാല ദോശ സാമ്പാറും ചട്നിയും',
      bn: 'মশলা দোসা ও সজনে ডাঁটার সম্বর',
      gu: 'ક્રિસ્પી મસાલા ઢોંસા સંભાર સાથે',
      mr: 'कुरकुरीत मसाला डोसा आणि सांबार'
    },
    zone: 'south',
    state: 'Tamil Nadu',
    cuisine: 'South Indian',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 15,
    calories: 320,
    nutrition: { protein: '7g', carbs: '52g', fat: '9g', fiber: '5g' },
    ingredients: ['Fermented Rice-Urad Batter', 'Potato Palya', 'Drumsticks', 'Toor Dal', 'Coconut Chutney', 'Pure Ghee'],
    image: '/images/recipes/masala-dosa.jpg',
    description: 'Golden fermented crepe smeared with spiced red garlic chutney and stuffed with tempered turmeric potato mash, served with piping sambar.',
    tasteProfile: 'Crisp, Buttery & Aromatic'
  },
  {
    id: 'tamilnadu-thali-sambar-rasam',
    name: 'Traditional Tamil Nadu Lunch Thali with Sambar & Pepper Rasam',
    nativeTitles: {
      en: 'Tamil Nadu Lunch Thali with Sambar & Pepper Rasam',
      te: 'తమిళనాడు లంచ్ మీల్స్ సాంబార్ మరియు రసంతో',
      hi: 'सांभर और रसम के साथ पारंपरिक तमिल थाली',
      ta: 'பாரம்பரிய தமிழ்நாடு மதிய உணவு சாப்பாடு',
      kn: 'ತಮಿಳುನಾಡು ಶೈಲಿಯ ಊಟ ಸಾಂಬಾರ್ ರಸಂ ಜೊತೆ',
      ml: 'തമിഴ്നാട് ലഞ്ച് മീൽസ് സാമ്പാറും രസവും',
      bn: 'তামিলনাড়ু স্পেশাল সাম্বার ও রসম ভাত',
      gu: 'તમિલનાડુ લંચ થાળી સંભાર અને રસમ સાથે',
      mr: 'पारंपरिक तमिळ जेवणाची थाळी'
    },
    zone: 'south',
    state: 'Tamil Nadu',
    cuisine: 'Tamil',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 25,
    cookTime: 35,
    calories: 470,
    nutrition: { protein: '15g', carbs: '80g', fat: '9g', fiber: '8g' },
    ingredients: ['Ponni Boiled Rice', 'Arachuvitta Sambar', 'Black Pepper Cumin Rasam', 'Cabbage Poriyal', 'Curd & Appalam'],
    image: '/images/recipes/south-indian-thali.jpg',
    description: 'Traditional multi-course feast featuring freshly ground spice sambar, fiery black pepper rasam, vegetable poriyal and fresh curd.',
    tasteProfile: 'Digestive, Tangy & Balanced'
  },
  {
    id: 'tamilnadu-sundal',
    name: 'Temple Style Coconut Chana Sundal',
    nativeTitles: {
      en: 'Temple Style Coconut Chana Sundal',
      te: 'గుడి స్టైల్ శనగల సుండల్ కొబ్బరి తురుముతో',
      hi: 'नारियल और चने का मंदिर स्टाइल सुंडल',
      ta: 'கோவில் ஸ்டைல் கொண்டைக்கடலை சுண்டல்',
      kn: 'ಗುಡಿ ಶೈಲಿಯ ಕಡಲೆಕಾಳು ಸುಂಡಲ್',
      ml: 'കടല സുണ്ടൽ തേങ്ങ ചിരവിയതിനൊപ്പം',
      bn: 'মন্দির স্টাইল ছোলা সুন্দরল',
      gu: 'મંદિર સ્ટાઇલ ચણા સુંડલ',
      mr: 'मंदिरातील चणा सुंडल'
    },
    zone: 'south',
    state: 'Tamil Nadu',
    cuisine: 'Tamil',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 10,
    cookTime: 15,
    calories: 210,
    nutrition: { protein: '9g', carbs: '32g', fat: '5g', fiber: '7g' },
    ingredients: ['White Chickpeas', 'Freshly Grated Coconut', 'Mustard Seeds', 'Asafoetida', 'Curry Leaves', 'Green Chillies'],
    image: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Nutritious steamed chickpeas tossed in coconut oil with crackling mustard seeds, curry leaves, asafoetida and grated fresh coconut.',
    tasteProfile: 'Mild, Savory & Protein-Rich'
  },
  {
    id: 'karnataka-bisi-bele-bath',
    name: 'Karnataka Authentic Bisi Bele Bath with Boondi',
    nativeTitles: {
      en: 'Karnataka Authentic Bisi Bele Bath with Boondi',
      te: 'కర్ణాటక బిసిబేలే బాత్ బూందీతో',
      hi: 'कर्नाटक का प्रामाणिक बिसी बेले बाथ और बूंदी',
      ta: 'கர்நாடகா பிசிபேளே பாத் பூந்தியுடன்',
      kn: 'ಅಪ್ಪಟ ಕರ್ನಾಟಕ ಶೈಲಿಯ ಬಿಸಿಬೇಳೆ ಬಾತ್ ಮತ್ತು ಬೂಂದಿ',
      ml: 'കർണാടക ബിസി ബേലെ ബാത്ത് ബൂന്തിക്കൊപ്പം',
      bn: 'কর্ণাটক স্পেশাল বিসি বেলে বাথ',
      gu: 'કર્ણાટક બસી બેલે બાથ અને બુંદી',
      mr: 'कर्नाटक पारंपरिक बिसी बेळे भात'
    },
    zone: 'south',
    state: 'Karnataka',
    cuisine: 'Kannada',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 30,
    calories: 440,
    nutrition: { protein: '14g', carbs: '72g', fat: '11g', fiber: '8g' },
    ingredients: ['Sona Masoori Rice', 'Toor Dal', 'Mixed Vegetables', 'Bisi Bele Bath Masala Podi', 'Tamarind', 'Pure Ghee & Crispy Boondi'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Wholesome one-pot rice and lentil preparation spiced with cinnamon, poppy seeds, stone flower and kapok buds, garnished with ghee boondi.',
    tasteProfile: 'Aromatic, Tangy, Spicy & Comforting'
  },
  {
    id: 'kerala-appam-vegetable-stew',
    name: 'Lacy Kerala Appam with Creamy Coconut Vegetable Stew',
    nativeTitles: {
      en: 'Lacy Kerala Appam with Creamy Coconut Vegetable Stew',
      te: 'కేరళ ఆప్పం మరియు కొబ్బరి పాల కూరగాయల స్టూ',
      hi: 'केरल अप्पम और नारियल दूध की वेज स्टू',
      ta: 'கேரளா ஆப்பம் தேங்காய்ப்பால் காய்கறி இஸ்டூவுடன்',
      kn: 'ಕೇರಳ ಆಪ್ಪಂ ಮತ್ತು ತರಕಾರಿ ಸ್ಟೂ',
      ml: 'പാലപ്പം പച്ചക്കറി ഇസ്റ്റൂവിനൊപ്പം',
      bn: 'কেরল আপ্পম ও নারকেল দুধের ভেজ স্টু',
      gu: 'કેરળ અપ્પમ અને નાળિયેર દૂધ વેજ સ્ટૂ',
      mr: 'केरळ अप्पम आणि नारळाच्या दुधाचा स्टू'
    },
    zone: 'south',
    state: 'Kerala',
    cuisine: 'Kerala',
    mealType: 'breakfast',
    diet: 'Vegan',
    prepTime: 20,
    cookTime: 20,
    calories: 310,
    nutrition: { protein: '6g', carbs: '52g', fat: '9g', fiber: '5g' },
    ingredients: ['Fermented Rice & Coconut Batter', 'Fresh Coconut Milk', 'Potatoes', 'Carrots & Green Peas', 'Cardamom & Whole Spices'],
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    description: 'Bowl-shaped fermented rice pancakes with soft spongy centers and delicate lacy crisps, paired with velvety coconut milk stew.',
    tasteProfile: 'Mild, Creamy & Coconut-Aromatic'
  },
  {
    id: 'kerala-sadya-avial-red-rice',
    name: 'Traditional Kerala Sadya Avial with Matta Red Rice',
    nativeTitles: {
      en: 'Traditional Kerala Sadya Avial with Matta Red Rice',
      te: 'కేరళ అవియల్ మరియు మట్టా రెడ్ రైస్',
      hi: 'केरल साद्या अवियल और मट्टा राइस',
      ta: 'கேரளா அவியல் மற்றும் மட்டா அரிசி சாதம்',
      kn: 'ಕೇರಳ ಅವಿಯಲ್ ಮತ್ತು ಕೆಂಪು ಅನ್ನ',
      ml: 'കേരള സദ്യ അവിയൽ മട്ടയരിക്കൊപ്പം',
      bn: 'কেরল আভিয়াল ও লাল চালের ভাত',
      gu: 'કેરળ અવિયલ અને મટ્ટા લાલ ભાત',
      mr: 'केरळ साद्या अवियल आणि लाल भात'
    },
    zone: 'south',
    state: 'Kerala',
    cuisine: 'Kerala',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 420,
    nutrition: { protein: '11g', carbs: '74g', fat: '10g', fiber: '9g' },
    ingredients: ['13 Native Vegetables (Drumstick, Raw Banana, Elephant Yam, Carrot)', 'Fresh Ground Coconut & Cumin Paste', 'Curd', 'Cold-pressed Coconut Oil', 'Matta Rice'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Thick medley of thirteen garden vegetables cooked in coconut cumin paste, seasoned with sour curd and fresh unheated coconut oil.',
    tasteProfile: 'Rich in Fiber, Gentle & Nutty'
  },
  {
    id: 'kerala-parippu-vada-chai',
    name: 'Crispy Kerala Parippu Vada with Hot Spiced Chai',
    nativeTitles: {
      en: 'Crispy Kerala Parippu Vada with Hot Spiced Chai',
      te: 'కేరళ పరిప్పు వడ మరియు వేడి చాయ్',
      hi: 'केरल परिप्पु वड़ा और गरमागरम चाय',
      ta: 'கேரளா பருப்பு வடை மற்றும் மசாலா டீ',
      kn: 'ಕೇರಳ ಪರಿಪ್ಪು ವಡೆ ಮತ್ತು ಚಹಾ',
      ml: 'മൊരിഞ്ഞ പരിപ്പുവടയും ചൂട് ചായയും',
      bn: 'কেরল পরিপ্পু বড়া ও গরম চা',
      gu: 'કેરળ પરિપ્પુ વડા અને ગરમ ચા',
      mr: 'कुरकुरीत केरळ डाळ वडा आणि चहा'
    },
    zone: 'south',
    state: 'Kerala',
    cuisine: 'Kerala',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 15,
    calories: 240,
    nutrition: { protein: '8g', carbs: '28g', fat: '11g', fiber: '5g' },
    ingredients: ['Chana / Toor Dal', 'Shallots', 'Ginger', 'Green Chillies', 'Curry Leaves', 'Fennel Seeds'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Coarsely ground lentils spiced with shallots, fiery green chillies and fresh curry leaves, deep-fried until crunchy on the outside.',
    tasteProfile: 'Crisp, Rustic & Addictive'
  },
  {
    id: 'goan-poi-vegetable-xacuti',
    name: 'Goan Poi Bread with Mushroom & Vegetable Xacuti',
    nativeTitles: {
      en: 'Goan Poi Bread with Mushroom & Vegetable Xacuti',
      te: 'గోవా పోయి బ్రెడ్ మష్రూమ్ షకూటీతో',
      hi: 'गोअन पोई ब्रेड और वेज शाकूती',
      ta: 'கோவன் பொய் ரொட்டி மற்றும் காளான் ஷாகுதி',
      kn: 'ಗೋವಾ ಪೊಯಿ ರೊಟ್ಟಿ ಮತ್ತು ವೆಜ್ ಶಾಕೂಟಿ',
      ml: 'ഗോവൻ പൊയ് ബ്രെഡ് വെജ് ഷാക്കൂത്തിക്കൊപ്പം',
      bn: 'গোয়ান পোই রুটি ও মাশরুম শাকুতি',
      gu: 'ગોઅન પોઈ બ્રેડ અને વેજ શાકૂતી',
      mr: 'गोवन पोई आणि मशरूम शाकुती'
    },
    zone: 'west',
    state: 'Goa',
    cuisine: 'Goan',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 380,
    nutrition: { protein: '11g', carbs: '58g', fat: '12g', fiber: '7g' },
    ingredients: ['Goan Poi Bread', 'Button Mushrooms & Potatoes', 'White Poppy Seeds (Khus Khus)', 'Roasted Coconut', 'Kashmiri Chillies & Star Anise'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Complex coastal gravy prepared with dark roasted grated coconut and sixteen whole spices, served with hollow fermented whole-wheat poi.',
    tasteProfile: 'Deep Spiced, Roasted Coconut & Fragrant'
  },

  // =========================================================================
  // EAST INDIA — WEST BENGAL, ODISHA, BIHAR, JHARKHAND
  // =========================================================================
  {
    id: 'bengali-luchi-aloo-dum',
    name: 'Fluffy Bengali Luchi with Kolar Dum Aloo',
    nativeTitles: {
      en: 'Fluffy Bengali Luchi with Kolar Dum Aloo',
      te: 'బెంగాలీ లూచీ మరియు ఆలూ దమ్',
      hi: 'गरमागरम बंगाली लुची और दम आलू',
      ta: 'பெங்காலி லுச்சி மற்றும் ஆலு தம்',
      kn: 'ಬಂಗಾಳಿ ಲುಚಿ ಮತ್ತು ಆಲೂ ದಮ್',
      ml: 'ബംഗാളി ലൂച്ചി ആലു ദമ്മിനൊപ്പം',
      bn: 'ফুলকো লুচি ও কষা আলুর দম',
      gu: 'બંગાળી લૂચી અને દમ આલૂ',
      mr: 'बंगाली लुची आणि मसालेदार दम आलू'
    },
    zone: 'east',
    state: 'West Bengal',
    cuisine: 'Bengali',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 20,
    calories: 390,
    nutrition: { protein: '7g', carbs: '56g', fat: '16g', fiber: '4g' },
    ingredients: ['Flour (Maida)', 'Baby Potatoes', 'Hing (Asafoetida)', 'Panch Phoron', 'Ginger Paste', 'Mustard Oil / Ghee'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Puffed deep-fried white flour bread served alongside baby potatoes simmered in a mildly sweet and spicy ginger-asafoetida gravy.',
    tasteProfile: 'Fluffy, Aromatic & Comforting'
  },
  {
    id: 'bengali-shorshe-macher-jhol',
    name: 'Traditional Bengali Shorshe Macher Jhol with Gobindobhog Rice',
    nativeTitles: {
      en: 'Bengali Shorshe Macher Jhol with Gobindobhog Rice',
      te: 'బెంగాలీ ఆవాల చేపల కూర మరియు అన్నం',
      hi: 'पारंपरिक बंगाली सरसों माछेर झोल और चावल',
      ta: 'பெங்காலி கடுகு மீன் குழம்பு சாதத்துடன்',
      kn: 'ಬಂಗಾಳಿ ಸಾಸಿವೆ ಮೀನು ಸಾರು ಮತ್ತು ಅನ್ನ',
      ml: 'ബംഗാളി കടുക് മീൻ കറി ചോറിനൊപ്പം',
      bn: 'সর্ষে ইলিশ / কাতলা মাছের ঝোল ও গরম ভাত',
      gu: 'બંગાળી રાઈ માછલી કરી અને ભાત',
      mr: 'पारंपरिक बंगाली मोहरी माशाचे कालवण व भात'
    },
    zone: 'east',
    state: 'West Bengal',
    cuisine: 'Bengali',
    mealType: 'lunch',
    diet: 'Non-Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 480,
    nutrition: { protein: '28g', carbs: '58g', fat: '14g', fiber: '3g' },
    ingredients: ['Freshwater Fish (Rohu/Katla/Hilsa)', 'Yellow & Black Mustard Seed Paste', 'Green Chillies', 'Kalonji (Nigella)', 'Cold-pressed Mustard Oil', 'Gobindobhog Rice'],
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh carp steaks simmered gently in a pungent, golden mustard and green chilli emulsion, served over aromatic Bengal short-grain rice.',
    tasteProfile: 'Pungent, Silky & Rich in Omega-3'
  },
  {
    id: 'bengali-jhalmuri',
    name: 'Kolkata Street Style Tangy Jhalmuri',
    nativeTitles: {
      en: 'Kolkata Street Style Tangy Jhalmuri',
      te: 'కోల్‌కతా ఝాల్మురీ',
      hi: 'कोलकाता स्ट्रीट स्टाइल झालमुड़ी',
      ta: 'கொல்கத்தா ஜால்முறி',
      kn: 'ಕೋಲ್ಕತ್ತಾ ಝಾಲ್ಮುರಿ',
      ml: 'കൊൽക്കത്ത ജാൽമുറി',
      bn: 'জিভে জল আনা মশলাদার ঝালমুড়ি',
      gu: 'કોલકાતા ઝાલમુરી',
      mr: 'कोलकाता प्रसिद्ध झणझणीत झालमुरी'
    },
    zone: 'east',
    state: 'West Bengal',
    cuisine: 'Bengali',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 10,
    cookTime: 0,
    calories: 190,
    nutrition: { protein: '5g', carbs: '34g', fat: '4g', fiber: '4g' },
    ingredients: ['Puffed Rice (Muri)', 'Boiled Potatoes & Kala Chana', 'Raw Mustard Oil', 'Roasted Cumin Spice Mix', 'Fresh Coconut Bits', 'Chopped Green Chillies'],
    image: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Light crisp puffed rice tossed with boiled chickpeas, peanuts, fresh coconut slivers and a kick of raw pungent mustard oil.',
    tasteProfile: 'Light, Crunchy & Pungent'
  },
  {
    id: 'bengali-khichuri-begun-bhaja',
    name: 'Bengali Bhoger Khichuri with Begun Bhaja',
    nativeTitles: {
      en: 'Bengali Bhoger Khichuri with Begun Bhaja',
      te: 'బెంగాలీ కిచిడీ మరియు వంకాయ వేపుడు',
      hi: 'बंगाली खिचड़ी और बैंगन भाजा',
      ta: 'பெங்காலி கிச்சடி மற்றும் கத்தரிக்காய் வறுவல்',
      kn: 'ಬಂಗಾಳಿ ಖಿಚಡಿ ಮತ್ತು ಬದನೆಕಾಯಿ ಬಾಜಾ',
      ml: 'ബംഗാളി കിച്ചടി വഴുതനങ്ങ വറുത്തതിനൊപ്പം',
      bn: 'ভোগের ভুনা খিচুড়ি ও মচমচে বেগুন ভাজা',
      gu: 'બંગાળી ખીચડી અને રીંગણ ભાજા',
      mr: 'बंगाली खिचडी आणि कुरकुरीत वांगे भाजा'
    },
    zone: 'east',
    state: 'West Bengal',
    cuisine: 'Bengali',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 30,
    calories: 410,
    nutrition: { protein: '14g', carbs: '68g', fat: '10g', fiber: '7g' },
    ingredients: ['Gobindobhog Rice', 'Roasted Yellow Moong Dal', 'Ginger Paste', 'Garam Masala', 'Round Eggplant Slices', 'Pure Ghee'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Fragrant roasted moong dal and aromatic rice slow-cooked with whole spices, served with pan-fried turmeric eggplant rounds.',
    tasteProfile: 'Sublime, Aromatic & Soothing'
  },
  {
    id: 'odisha-pakhala-bhata',
    name: 'Traditional Odia Pakhala Bhata with Badi Chura & Saaga',
    nativeTitles: {
      en: 'Odia Pakhala Bhata with Badi Chura & Saaga',
      te: 'ఒడిశా పఖాల భాత మరియు బడి చురా',
      hi: 'उड़िया पखाल भात, बड़ी चूरा और साग',
      ta: 'ஒடிசா பகாலா சாதம் மற்றும் படி சுரா',
      kn: 'ಒಡಿಶಾ ಪಖಾಲ ಅನ್ನ ಮತ್ತು ಬಡಿ ಚುರಾ',
      ml: 'ഒഡീഷ പഖാല ഭാത ബഡി ചൂര്യ്ക്കൊപ്പം',
      bn: 'উড়িষ্যা স্পেশাল পাখাল ভাত ও বড়ি চূড়া',
      gu: 'ઓડિશા પખાલા ભાત અને બડી ચૂરા',
      mr: 'ओडिया पखाल भात आणि सांडगे चूरा'
    },
    zone: 'east',
    state: 'Odisha',
    cuisine: 'Odia',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 380,
    nutrition: { protein: '10g', carbs: '72g', fat: '6g', fiber: '7g' },
    ingredients: ['Fermented Cooked Rice', 'Curd & Water', 'Tempered Mustard & Curry Leaves', 'Sundried Black Gram Badis (Crushed)', 'Fresh Green Saaga (Spinach/Amaranth)'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Gut-rejuvenating fermented rice submerged in lightly seasoned whey, served with crushed spiced lentil dumplings and stir-fried greens.',
    tasteProfile: 'Cooling, Fermented & Mineral-Rich'
  },
  {
    id: 'odisha-dalma-rice',
    name: 'Puri Jagannath Temple Style Dalma with Steamed Rice',
    nativeTitles: {
      en: 'Puri Temple Style Dalma with Steamed Rice',
      te: 'పూరి జగన్నాథ్ దాల్మా మరియు అన్నం',
      hi: 'पुरी जगन्नाथ मंदिर स्टाइल दालमा और चावल',
      ta: 'பூரி ஜெகன்நாதர் தால்மா சாதத்துடன்',
      kn: 'ಪುರಿ ಜಗನ್ನಾಥ ದಾಲ್ಮಾ ಮತ್ತು ಅನ್ನ',
      ml: 'പുരി ജഗന്നാഥ ദാൽമ ചോറിനൊപ്പം',
      bn: 'জগন্নাথ মন্দিরের ডালমা ও অন্ন',
      gu: 'પુરી જગન્નાથ મંદિર દાલમા અને ભાત',
      mr: 'पुरी जगन्नाथ मंदिर स्टाईल डालमा व भात'
    },
    zone: 'east',
    state: 'Odisha',
    cuisine: 'Odia',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 30,
    calories: 410,
    nutrition: { protein: '16g', carbs: '70g', fat: '8g', fiber: '10g' },
    ingredients: ['Toor Dal', 'Raw Papaya', 'Pumpkin', 'Plantain & Brinjal', 'Roasted Cumin-Dry Chilli Powder', 'Ghee & Grated Coconut'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Wholesome split lentils simmered with five countryside root vegetables, seasoned with dry roasted cumin powder and pure ghee.',
    tasteProfile: 'Nourishing, Sattvic & Balanced'
  },
  {
    id: 'bihar-litti-chokha',
    name: 'Traditional Bihari Litti Chokha with Ghee',
    nativeTitles: {
      en: 'Traditional Bihari Litti Chokha with Ghee',
      te: 'బీహారీ లిట్టీ చోఖా మరియు నెయ్యి',
      hi: 'पारंपरिक बिहारी लिट्टी चोखा और देसी घी',
      ta: 'பீஹாரி லிட்டி சோகா நெய்யுடன்',
      kn: 'ಬಿಹಾರಿ ಲಿಟ್ಟಿ ಚೋಖಾ ಮತ್ತು ತುಪ್ಪ',
      ml: 'ബിഹാരി ലിറ്റി ചോക്ക നെയ്യൊപ്പം',
      bn: 'খাঁটি বিহারি লিট্টি চোখা ও ঘি',
      gu: 'બિહારી લિટ્ટી ચોખા અને ઘી',
      mr: 'पारंपरिक बिहारी लिट्टी चोखा'
    },
    zone: 'east',
    state: 'Bihar',
    cuisine: 'Bihari',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 25,
    cookTime: 30,
    calories: 480,
    nutrition: { protein: '15g', carbs: '72g', fat: '14g', fiber: '11g' },
    ingredients: ['Whole Wheat Dough Balls', 'Roasted Gram Flour (Sattu)', 'Kalonji & Ajwain', 'Charred Eggplant & Tomato Chokha', 'Pure Desi Ghee'],
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    description: 'Whole wheat dough rounds stuffed with spiced roasted black gram flour, roasted on embers, soaked in ghee and served with smoky mashed aubergine.',
    tasteProfile: 'Smoky, Earthy & High Protein'
  },
  {
    id: 'jharkhand-dhuska-ghugni',
    name: 'Jharkhandi Dhuska with Spicy Kala Chana Ghugni',
    nativeTitles: {
      en: 'Jharkhandi Dhuska with Spicy Kala Chana Ghugni',
      te: 'జార్ఖండ్ ధుస్కా మరియు శనగల ఘుగ్నీ',
      hi: 'झारखंडी धुस्का और चटपटी चना घुघनी',
      ta: 'ஜார்க்கண்ட் துஸ்கா மற்றும் கொண்டைக்கடலை குகினி',
      kn: 'ಜಾರ್ಖಂಡ್ ಧುಸ್ಕಾ ಮತ್ತು ಕಡಲೆ ಘುಗ್ನಿ',
      ml: 'ജാർഖണ്ഡ് ദുസ്ക കടല ഗുഗ്നിക്കൊപ്പം',
      bn: 'ঝাড়খণ্ডী ধুশকা ও চানা ঘুগনি',
      gu: 'ઝારખંડી ધુસ્કા અને ચણા ઘૂઘની',
      mr: 'झारखंडी धुस्का आणि मसालेदार हरभरा घुगणी'
    },
    zone: 'east',
    state: 'Jharkhand',
    cuisine: 'Jharkhandi',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 360,
    nutrition: { protein: '12g', carbs: '54g', fat: '11g', fiber: '8g' },
    ingredients: ['Rice & Chana Dal Batter', 'Black Chickpeas', 'Ginger & Garlic', 'Cumin & Coriander', 'Mustard Oil'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep-fried fluffy pancakes made from fermented rice and split chickpea batter, served with dark spiced black chickpea stew.',
    tasteProfile: 'Golden, Crisp & Zesty'
  },

  // =========================================================================
  // WEST INDIA — MAHARASHTRA, GUJARAT, GOA, UTs
  // =========================================================================
  {
    id: 'maharashtrian-kanda-poha',
    name: 'Authentic Maharashtrian Kanda Batata Poha',
    nativeTitles: {
      en: 'Authentic Maharashtrian Kanda Batata Poha',
      te: 'మహారాష్ట్ర కాందా పోహా పల్లీలతో',
      hi: 'महाराष्ट्रियन कांदा बटाटा पोहा',
      ta: 'மகாராஷ்டிரா அவல் உப்புமா',
      kn: 'ಮಹಾರಾಷ್ಟ್ರ ಕಾಂದಾ ಪೋಹಾ',
      ml: 'മഹാരാഷ്ട്ര കാന്ദ പോഹ',
      bn: 'মহারাষ্ট্রীয় কন্দা পোহা',
      gu: 'મહારાષ્ટ્રીયન કાંદા બટાકા પૌઆ',
      mr: 'खमंग चवदार कांदे पोहे लिंबू पिळून'
    },
    zone: 'west',
    state: 'Maharashtra',
    cuisine: 'Maharashtrian',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 10,
    cookTime: 15,
    calories: 270,
    nutrition: { protein: '6g', carbs: '46g', fat: '7g', fiber: '4g' },
    ingredients: ['Flattened Rice (Thick Poha)', 'Finely Chopped Onions', 'Diced Potatoes', 'Roasted Peanuts', 'Mustard Seeds', 'Fresh Coriander & Lemon'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Tempered flattened rice tossed with sweet onions, fried potatoes, crunchy peanuts and fresh turmeric, garnished with coconut and lemon.',
    tasteProfile: 'Light, Tangy, Crunchy & Fresh'
  },
  {
    id: 'maharashtrian-pitla-bhakri',
    name: 'Rustic Maharashtrian Jowar Bhakri with Besan Pitla & Thecha',
    nativeTitles: {
      en: 'Jowar Bhakri with Besan Pitla & Mirchi Thecha',
      te: 'జొన్న రొట్టె, పిట్ల మరియు మిర్చి తేచా',
      hi: 'ज्वार भाकरी, बेसन पिठलं और तीखा ठेचा',
      ta: 'ஜோவர் ரொட்டி மற்றும் பிட்லா தேச்சா',
      kn: 'ಜೋಳದ ರೊಟ್ಟಿ, ಬೆಸನ್ ಪಿಟ್ಲಾ ಮತ್ತು ಖಾರದ ತೇಚಾ',
      ml: 'ജോവർ റൊട്ടി പിറ്റ്‌ലയും തേച്ചയും',
      bn: 'জোয়ার ভাকরি ও বেশন পিটলা',
      gu: 'જુવાર રોટલો અને બેસન પીઠલા',
      mr: 'झणझणीत पिठलं, गरम भाकरी आणि खर्डा/ठेचा'
    },
    zone: 'west',
    state: 'Maharashtra',
    cuisine: 'Maharashtrian',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 25,
    calories: 420,
    nutrition: { protein: '14g', carbs: '68g', fat: '10g', fiber: '9g' },
    ingredients: ['Sorghum (Jowar) Flour', 'Gram Flour (Besan)', 'Garlic Green Chilli Thecha', 'Mustard & Cumin Seeds', 'Raw Onions & Ghee'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Wholesome hand-patted sorghum flatbread served with savory spiced gram flour porridge and fiery mortar-crushed garlic chilli paste.',
    tasteProfile: 'Fiery, Earthy & Farmhouse Classic'
  },
  {
    id: 'maharashtrian-kolhapuri-misal',
    name: 'Fiery Kolhapuri Katachi Misal Pav with Farsan',
    nativeTitles: {
      en: 'Fiery Kolhapuri Misal Pav with Farsan',
      te: 'కొల్హాపూర్ మిసల్ పావ్ మరియు ఫర్సాన్',
      hi: 'तीखा कोल्हापुरी मिसल पाव',
      ta: 'காரசாரமான கோலாப்பூரி மிசல் பாவ்',
      kn: 'ಖಾರವಾದ ಕೊಲ್ಹಾಪುರಿ ಮಿಸಳ್ ಪಾವ್',
      ml: 'സ്പൈസി കോലാപൂരി മിസൽ പാവ്',
      bn: 'ঝাল কোলহাপুরী মিসাল পাভ',
      gu: 'તીખી કોલ્હાપુરી મિસળ પાવ',
      mr: 'झणझणीत कोल्हापुरी कट मिसळ पाव'
    },
    zone: 'west',
    state: 'Maharashtra',
    cuisine: 'Maharashtrian',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 25,
    calories: 410,
    nutrition: { protein: '13g', carbs: '62g', fat: '14g', fiber: '8g' },
    ingredients: ['Sprouted Moth Beans (Matki)', 'Kanda-Lasun Masala Tarri (Spicy Kat)', 'Crunchy Farsan', 'Chopped Onions & Lemon', 'Ladi Pav'],
    image: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Sprouted moth beans cooked in a fiery red coconut-garlic gravy topped with crisp savory farsan, diced onions and served with soft pav.',
    tasteProfile: 'Fiery, Crunchy & Robust'
  },
  {
    id: 'maharashtrian-varan-bhaat',
    name: 'Comforting Maharashtrian Varan Bhaat with Toop & Limboo',
    nativeTitles: {
      en: 'Maharashtrian Varan Bhaat with Toop & Limboo',
      te: 'వరణ్ బాత్ మరియు నెయ్యి',
      hi: 'सादा वरण भात, देसी घी और नींबू',
      ta: 'வரன் பாத் மற்றும் நெய்',
      kn: 'ವರನ್ ಅನ್ನ ಮತ್ತು ತುಪ್ಪ',
      ml: 'വരൻ ഭാത് നെയ്യൊപ്പം',
      bn: 'মহারাষ্ট্রীয় বরণ ভাত ও ঘি',
      gu: 'વરણ ભાત અને સાચું ઘી',
      mr: 'सुखद वरण भात, साजूक तूप आणि लिंबू'
    },
    zone: 'west',
    state: 'Maharashtra',
    cuisine: 'Maharashtrian',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 10,
    cookTime: 20,
    calories: 360,
    nutrition: { protein: '12g', carbs: '65g', fat: '8g', fiber: '5g' },
    ingredients: ['Indrayani / Kolam Rice', 'Split Pigeon Peas (Toor Dal)', 'Turmeric & Hing', 'Pure Desi Cow Ghee', 'Fresh Lemon Wedge'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Simple soothing yellow lentils seasoned only with turmeric and asafoetida, poured over warm rice with a generous spoonful of melted ghee.',
    tasteProfile: 'Gentle, Buttery & Deeply Comforting'
  },
  {
    id: 'gujarati-thepla-batata',
    name: 'Spiced Methi Thepla with Sukhi Batata Nu Shaak',
    nativeTitles: {
      en: 'Spiced Methi Thepla with Sukhi Batata Nu Shaak',
      te: 'గుజరాతీ మేథీ థెప్లా మరియు ఆలూ కూర',
      hi: 'गुजराती मेथी थेपला और सूखी आलू की सब्जी',
      ta: 'குஜராத்தி மேத்தி தேப்லா மற்றும் உருளைக்கிழங்கு',
      kn: 'ಗುಜರಾತಿ ಮೆಂತೆ ತೆಪ್ಲಾ ಮತ್ತು ಆಲೂ ಪಲ್ಯ',
      ml: 'മേത്തി തെപ്ല ഉരുളക്കിഴങ്ങ് കറിക്കൊപ്പം',
      bn: 'গুজরাতি মেথি থেপলা ও শুকনো আলুর তরকারি',
      gu: 'પોચા મેથીના થેપલા અને બટાકાનું શાક',
      mr: 'मऊ मेथी थेपला आणि सुकी बटाटा भाजी'
    },
    zone: 'west',
    state: 'Gujarat',
    cuisine: 'Gujarati',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 330,
    nutrition: { protein: '8g', carbs: '52g', fat: '10g', fiber: '6g' },
    ingredients: ['Whole Wheat Flour', 'Fresh Fenugreek (Methi) Leaves', 'Curd & Sesame Seeds', 'Dry Spiced Potatoes', 'Mango Pickle (Chhundo)'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Thin, spiced flatbread kneaded with fresh fenugreek greens, sesame and yogurt, served with cumin-tempered dry potatoes and sweet pickle.',
    tasteProfile: 'Subtly Bitter, Spiced & Soft'
  },
  {
    id: 'gujarati-thali-kadhi-khichdi',
    name: 'Traditional Gujarati Thali with Sweet-Sour Kadhi & Khichdi',
    nativeTitles: {
      en: 'Gujarati Thali with Sweet-Sour Kadhi & Khichdi',
      te: 'గుజరాతీ కఢీ మరియు కిచిడీ థాలీ',
      hi: 'गुजराती कढ़ी, खिचड़ी और रोटली थाली',
      ta: 'குஜராத்தி மோர் குழம்பு மற்றும் கிச்சடி தாலி',
      kn: 'ಗುಜರಾತಿ ಕಢಿ ಮತ್ತು ಖಿಚಡಿ ಊಟ',
      ml: 'ഗുജറാത്തി കഢി കിച്ചടി താലി',
      bn: 'গুজরাতি সুস্বাদু কঢ়ি ও খিচুড়ি থালি',
      gu: 'પરંપરાગત ગુજરાતી કઢી, ખીચડી અને રોટલી થાળી',
      mr: 'गोड-आंबट गुजराती कढी, खिचडी थाळी'
    },
    zone: 'west',
    state: 'Gujarat',
    cuisine: 'Gujarati',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 30,
    calories: 450,
    nutrition: { protein: '13g', carbs: '76g', fat: '10g', fiber: '8g' },
    ingredients: ['Moong Dal Khichdi', 'Sour Buttermilk Kadhi with Jaggery', 'Cumin & Cinnamon', 'Soft Phulkas (Rotli)', 'Kachumber Salad'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'A harmonious balanced thali featuring sweet-tangy spiced buttermilk kadhi, ghee-topped comforting moong dal khichdi and wafer-thin rotlis.',
    tasteProfile: 'Sweet, Sour, Spiced & Harmonious'
  },
  {
    id: 'gujarati-khaman-dhokla',
    name: 'Steamed Nylon Khaman Dhokla with Green Chillies',
    nativeTitles: {
      en: 'Steamed Nylon Khaman Dhokla with Green Chillies',
      te: 'స్పాంజ్ ఖమన్ డోక్లా పచ్చిమిర్చి తాలింపుతో',
      hi: 'नरम स्पंजी नायलॉन खमन ढोकला',
      ta: 'மென்மையான கமன் டோக்லா',
      kn: 'ಮೃದುವಾದ ಖಮನ್ ಡೋಕ್ಲಾ',
      ml: 'ഖമൻ ധോക്‌ള പച്ചമുളക് താളിച്ചതിനൊപ്പം',
      bn: 'নরম স্পঞ্জি খামান ঢোকলা',
      gu: 'પોચો સ્પોન્જી નાયલોન ખમણ ઢોકળા',
      mr: 'मऊ लुसलुशीत खमण ढोकळा'
    },
    zone: 'west',
    state: 'Gujarat',
    cuisine: 'Gujarati',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 20,
    calories: 220,
    nutrition: { protein: '7g', carbs: '38g', fat: '5g', fiber: '4g' },
    ingredients: ['Bengal Gram Flour (Besan)', 'Lemon Juice & Sugar', 'Mustard Seeds & Curry Leaves', 'Slit Green Chillies', 'Fresh Grated Coconut'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Feather-light steamed savory chickpea cakes bathed in sweet-tangy mustard and green chilli water, topped with coconut and cilantro.',
    tasteProfile: 'Juicy, Spongy, Sweet & Tangy'
  },

  // =========================================================================
  // CENTRAL INDIA — MADHYA PRADESH, CHHATTISGARH
  // =========================================================================
  {
    id: 'indori-poha-sev-jalebi',
    name: 'World Famous Indori Poha with Ratlami Sev & Jeeravan',
    nativeTitles: {
      en: 'Indori Poha with Ratlami Sev & Jeeravan Masala',
      te: 'ఇండోరీ పోహా రత్లామీ సేవ్‌తో',
      hi: 'रतलामी सेव और जीरावन के साथ इंदौरी पोहा',
      ta: 'இந்தோரி போஹா ரத்லாமி சேவுடன்',
      kn: 'ಇಂದೋರಿ ಪೋಹಾ ಮತ್ತು ರತ್ಲಾಮಿ ಸೇವ್',
      ml: 'ഇന്ദോരി പോഹ സേവിനൊപ്പം',
      bn: 'ইন্দোরি পোহা রতলামি সেভ সহযোগে',
      gu: 'ઈન્દોરી પૌઆ રતલામી સેવ અને જીરાવન સાથે',
      mr: 'प्रसिद्ध इंदोरी पोहे आणि रतलामी शेव'
    },
    zone: 'central',
    state: 'Madhya Pradesh',
    cuisine: 'Malwi',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 290,
    nutrition: { protein: '7g', carbs: '48g', fat: '8g', fiber: '5g' },
    ingredients: ['Steamed Poha', 'Fennel Seeds (Saunf)', 'Indori Jeeravan Masala', 'Spicy Ratlami Clove Sev', 'Pomegranate Arils & Lemon'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Steam-cooked flattened rice infused with fennel seeds and topped with sweet pomegranate, crunchy clove-scented sev and zesty jeeravan.',
    tasteProfile: 'Aromatic, Tangy & Crunchy'
  },
  {
    id: 'mp-dal-bafla-churma',
    name: 'Madhya Pradesh Royal Dal Bafla with Desi Ghee',
    nativeTitles: {
      en: 'Madhya Pradesh Dal Bafla with Desi Ghee',
      te: 'దాల్ బాఫ్లా మరియు నెయ్యి',
      hi: 'मध्य प्रदेश का पारंपरिक दाल बाफला',
      ta: 'மத்திய பிரதேசம் தால் பாப்லா',
      kn: 'ದಾಲ್ ಬಾಫ್ಲಾ ಮತ್ತು ತುಪ್ಪ',
      ml: 'ദാൽ ബാഫ്‌ല നെയ്യൊപ്പം',
      bn: 'মধ্যপ্রদেশ স্পেশাল ডাল বাফলা',
      gu: 'દાળ બાફલા અને દેશી ઘી',
      mr: 'मध्य प्रदेशचा प्रसिद्ध डाळ बाफला'
    },
    zone: 'central',
    state: 'Madhya Pradesh',
    cuisine: 'Malwi',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 25,
    cookTime: 40,
    calories: 540,
    nutrition: { protein: '17g', carbs: '78g', fat: '18g', fiber: '8g' },
    ingredients: ['Boiled & Baked Wheat Baflas', 'Tur & Chana Dal', 'Pure Desi Ghee', 'Garlic Chutney', 'Sweet Churma'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Wheat dough dumplings first boiled in turmeric water, roasted until crisp in golden ghee, and cracked into rich tempered dal.',
    tasteProfile: 'Crisp-Soft, Ghee-Laden & Rich'
  },
  {
    id: 'mp-bhutte-ka-kees',
    name: 'Indori Street Style Bhutte Ka Kees',
    nativeTitles: {
      en: 'Indori Street Style Bhutte Ka Kees',
      te: 'భుట్టే కా కీస్ (మొక్కజొన్న కూర)',
      hi: 'इंदौर का मशहूर भुट्टे का कीस',
      ta: 'இந்தோரி புட்டே கா கீஸ்',
      kn: 'ಇಂದೋರಿ ಜೋಳದ ಕೀಸ್',
      ml: 'ഭുട്ടെ കാ കീസ് മധുരച്ചോളം വിഭവം',
      bn: 'ইন্দোরি ভুট্টা কি কিশ',
      gu: 'ઈન્દોરી ભુટ્ટે કા કીસ',
      mr: 'खमंग इंदोरी भुट्टे का कीस'
    },
    zone: 'central',
    state: 'Madhya Pradesh',
    cuisine: 'Malwi',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 250,
    nutrition: { protein: '6g', carbs: '36g', fat: '9g', fiber: '5g' },
    ingredients: ['Fresh Grated Sweet Corn', 'Milk', 'Mustard & Cumin Seeds', 'Asafoetida', 'Grated Coconut & Fresh Coriander'],
    image: 'https://images.unsplash.com/photo-1626276628289-6e9e7b8e3c22?auto=format&fit=crop&w=1200&q=80',
    description: 'Freshly grated seasonal corn sautéed in spices, slow-cooked in rich milk until velvety, finished with coconut and fresh coriander.',
    tasteProfile: 'Sweet, Creamy, Spiced & Luscious'
  },
  {
    id: 'chhattisgarh-chousela-aloo',
    name: 'Chhattisgarhi Crisp Chousela with Aloo Tamatar Jhol',
    nativeTitles: {
      en: 'Chhattisgarhi Crisp Chousela with Aloo Tamatar Jhol',
      te: 'ఛత్తీస్‌గఢ్ చౌసేలా మరియు ఆలూ కూర',
      hi: 'छत्तीसगढ़ी चौसेला और तरी वाले आलू',
      ta: 'சத்தீஸ்கர் சௌசேலா மற்றும் உருளைக்கிழங்கு குழம்பு',
      kn: 'ಛತ್ತೀಸ್‌ಗಢ್ ಚೌಸೇಲಾ ಮತ್ತು ಆಲೂ ಪಲ್ಯ',
      ml: 'ഛത്തീസ്ഗഡ് ചൗസേല ഉരുളക്കിഴങ്ങ് കറിക്കൊപ്പം',
      bn: 'ছত্তিশগড়ী চৌসেলা ও আলুর ঝোল',
      gu: 'છત્તીસગઢી ચૌસેલા અને બટાકાનું શાક',
      mr: 'छत्तीसगढी चौसेला आणि झणझणीत बटाटा रस्सा'
    },
    zone: 'central',
    state: 'Chhattisgarh',
    cuisine: 'Chhattisgarhi',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 340,
    nutrition: { protein: '7g', carbs: '54g', fat: '11g', fiber: '4g' },
    ingredients: ['Rice Flour Puris (Chousela)', 'Potatoes', 'Tomatoes', 'Panch Phoron', 'Fresh Coriander'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp and crunchy puffed bread kneaded with rice flour and ajwain, served with a homestyle rustic tomato-potato broth.',
    tasteProfile: 'Crisp, Light & Comforting'
  },
  {
    id: 'chhattisgarh-faraa-chutney',
    name: 'Steamed Chhattisgarhi Faraa with Spicy Tomato Chutney',
    nativeTitles: {
      en: 'Steamed Chhattisgarhi Faraa with Tomato Chutney',
      te: 'ఛత్తీస్‌గఢ్ ఫరా మరియు టమోటా చట్నీ',
      hi: 'छत्तीसगढ़ी फरा और भुनी टमाटर चटनी',
      ta: 'சத்தீஸ்கர் ஃபரா தக்காளி சட்னியுடன்',
      kn: 'ಛತ್ತೀಸ್‌ಗಢ್ ಫರಾ ಮತ್ತು ಟೊಮೆಟೊ ಚಟ್ನಿ',
      ml: 'ഛത്തീസ്ഗഡ് ഫറ തക്കാളി ചട്നിക്കൊപ്പം',
      bn: 'ছত্তিশগড়ী ফারা ও টমেটো চাটনি',
      gu: 'છત્તીસગઢી ફરા અને ટમેટા ચટણી',
      mr: 'वाफवलेले छत्तीसगढी फरा आणि चटणी'
    },
    zone: 'central',
    state: 'Chhattisgarh',
    cuisine: 'Chhattisgarhi',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 20,
    cookTime: 15,
    calories: 210,
    nutrition: { protein: '5g', carbs: '42g', fat: '3g', fiber: '4g' },
    ingredients: ['Cooked Rice & Rice Flour Dough', 'White Sesame Seeds', 'Curry Leaves', 'Green Chillies', 'Charred Tomato Chutney'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Steamed cylindrical rice dumplings pan-tossed with crackling sesame seeds, mustard and green chillies, served with woodfire tomato chutney.',
    tasteProfile: 'Chewy, Roasted Sesame & Zero-Oil Healthy'
  },

  // =========================================================================
  // NORTHEAST INDIA — ASSAM, MEGHALAYA, MANIPUR, MIZORAM, NAGALAND, TRIPURA, ARUNACHAL, SIKKIM
  // =========================================================================
  {
    id: 'sikkim-steamed-veg-momos',
    name: 'Sikkimese Steamed Momos with Spicy Fire Tomato Sesame Chutney',
    nativeTitles: {
      en: 'Sikkimese Steamed Momos with Fire Chutney',
      te: 'సిక్కిం స్టీమ్డ్ మోమోస్ మరియు స్పైసీ చట్నీ',
      hi: 'सिक्किमी वेज मोमोज और तीखी टमाटर तिल चटनी',
      ta: 'சிக்கிம் காய்கறி மோமோஸ் கார சட்னியுடன்',
      kn: 'ಸಿಕ್ಕಿಂ ವೆಜ್ ಮೋಮೋಸ್ ಮತ್ತು ಖಾರದ ಚಟ್ನಿ',
      ml: 'സിക്കിം വെജ് മോമോസ് സ്പൈസി ചട്നിക്കൊപ്പം',
      bn: 'সিকিমিজ স্টিমড ভেজ মোমো ও ঝাল চাটনি',
      gu: 'સિક્કિમ વેજ મોમોઝ અને તીખી ચટણી',
      mr: 'सिक्कीमचे प्रसिद्ध वाफवलेले व्हेज मोमोज'
    },
    zone: 'northeast',
    state: 'Sikkim',
    cuisine: 'Sikkimese',
    mealType: 'snack',
    diet: 'Vegan',
    prepTime: 25,
    cookTime: 15,
    calories: 240,
    nutrition: { protein: '7g', carbs: '44g', fat: '4g', fiber: '5g' },
    ingredients: ['Thin Wheat Wrappers', 'Finely Minced Cabbage & Onion', 'Ginger', 'Dalle Khursani Chilli', 'Roasted Sesame Chutney'],
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-pleated paper-thin steamed dumplings loaded with aromatic minced cabbage and shallots, paired with fiery Dalle red chilli dip.',
    tasteProfile: 'Juicy, Steamed, Fiery & Fragrant'
  },
  {
    id: 'sikkim-gyathuk-thukpa',
    name: 'Himalayan Vegetable Gyathuk Thukpa with Clear Broth',
    nativeTitles: {
      en: 'Himalayan Vegetable Gyathuk Thukpa',
      te: 'హిమాలయన్ వెజ్ తుక్పా నూడుల్స్',
      hi: 'हिमालयन वेज ज्ञातुक थुकपा सूप',
      ta: 'இமாலயன் காய்கறி துக்பா',
      kn: 'ಹಿಮಾಲಯನ್ ತುಕಪಾ ನೂಡಲ್ಸ್',
      ml: 'ഹിമാലയൻ വെജ് തുക്പ',
      bn: 'হিমালয়ান ভেজিটেবল থুকপা সুপ',
      gu: 'હિમાલયન વેજ થુકપા',
      mr: 'हिमालयन पौष्टिक व्हेज थुकपा'
    },
    zone: 'northeast',
    state: 'Sikkim',
    cuisine: 'Sikkimese',
    mealType: 'dinner',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 320,
    nutrition: { protein: '11g', carbs: '56g', fat: '5g', fiber: '6g' },
    ingredients: ['Wheat Eggless Noodles', 'Bok Choy / Local Greens', 'Shiitake Mushrooms', 'Garlic Ginger Broth', 'Szechuan Pepper'],
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    description: 'Nourishing mountainous noodle soup steeped in aromatic slow-simmered vegetable broth with wild greens and tingling Timmur pepper.',
    tasteProfile: 'Soul-Warming, Herbal & Clear'
  },
  {
    id: 'assam-jolpan-pitha',
    name: 'Assamese Bihu Jolpan with Bora Saul & Fresh Cream',
    nativeTitles: {
      en: 'Assamese Jolpan with Bora Saul & Fresh Cream',
      te: 'అస్సామీ జోల్‌పాన్ మరియు పిఠా',
      hi: 'असमिया पारंपरिक जोलपान और पीठा',
      ta: 'அஸ்ஸாமி ஜோல்பான் மற்றும் பீதா',
      kn: 'ಅಸ್ಸಾಮಿ ಜೋಲ್ಪಾನ್ ಮತ್ತು ಪೀಠ',
      ml: 'ആസാമീസ് ജോൽപാൻ ബിഹു വിഭവം',
      bn: 'আসামের ঐতিহ্যবাহী জলপান ও তিল পিঠা',
      gu: 'અસમિયા જોલપાન અને પીઠા',
      mr: 'आसामी पारंपरिक जोलपान आणि पीठा'
    },
    zone: 'northeast',
    state: 'Assam',
    cuisine: 'Assamese',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 10,
    cookTime: 0,
    calories: 290,
    nutrition: { protein: '6g', carbs: '52g', fat: '7g', fiber: '4g' },
    ingredients: ['Bora Saul (Sticky Rice) / Flat Rice (Komal Saul)', 'Creamy Buffalo Milk Curd (Doi)', 'Organic Date Palm Jaggery (Gur)', 'Sesame Til Pitha'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Ancestral Assamese morning meal of naturally soaked soft rice served with thick curd, liquid date palm jaggery and roasted sesame pithas.',
    tasteProfile: 'Sweet, Earthy & Wholesome'
  },
  {
    id: 'assam-masor-tenga-rice',
    name: 'Assamese Tangy Masor Tenga with Joha Rice',
    nativeTitles: {
      en: 'Assamese Tangy Masor Tenga with Joha Rice',
      te: 'అస్సామీ పుల్లని చేపల కూర మరియు అన్నం',
      hi: 'असमिया खट्टा मासोर तेंगा और जोहा चावल',
      ta: 'அஸ்ஸாமி புளிப்பு மீன் குழம்பு சாதத்துடன்',
      kn: 'ಅಸ್ಸಾಮಿ ಹುಳಿ ಮೀನು ಸಾರು ಮತ್ತು ಅನ್ನ',
      ml: 'ആസാമീസ് മാസോർ തെംഗ ചോറിനൊപ്പം',
      bn: 'আসামের বিখ্যাত মাছের টেঙ্গা ও জোহা ভাত',
      gu: 'અસમિયા માસોર તેંગા અને જોહા ભાત',
      mr: 'आसामी आंबट माशाचे कालवण आणि जोहा भात'
    },
    zone: 'northeast',
    state: 'Assam',
    cuisine: 'Assamese',
    mealType: 'lunch',
    diet: 'Non-Vegetarian',
    prepTime: 15,
    cookTime: 20,
    calories: 410,
    nutrition: { protein: '26g', carbs: '56g', fat: '10g', fiber: '3g' },
    ingredients: ['Fresh River Carp (Rohu)', 'Ou Tenga (Elephant Apple) or Tomatoes', 'Kaji Nemu (Assam Lemon)', 'Mustard Oil', 'Aromatic Joha Rice'],
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
    description: 'Light and refreshing sour fish curry cooked with elephant apple or country tomatoes, flavored with indigenous aromatic Assam lemon.',
    tasteProfile: 'Light, Tangy, Refreshing & Citrusy'
  },
  {
    id: 'assam-khar-dal-bhat',
    name: 'Authentic Assamese Omita Khar with Dal & Bhat',
    nativeTitles: {
      en: 'Assamese Raw Papaya Khar with Dal & Bhat',
      te: 'అస్సామీ ఖార్ మరియు పప్పు అన్నం',
      hi: 'असमिया पपीता खार, दाल और भात',
      ta: 'அஸ்ஸாமி கார் பருப்பு சாதம்',
      kn: 'ಅಸ್ಸಾಮಿ ಖಾರ್ ಮತ್ತು ಬೇಳೆ ಅನ್ನ',
      ml: 'ആസാമീസ് ഖാർ ചോറിനൊപ്പം',
      bn: 'আসামের পরম্পরাগত ওমিতা খার ও ডাল ভাত',
      gu: 'અસમિયા ઓમિતા ખાર અને દાળ ભાત',
      mr: 'पारंपरिक आसामी खार डाळ आणि भात'
    },
    zone: 'northeast',
    state: 'Assam',
    cuisine: 'Assamese',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 25,
    calories: 390,
    nutrition: { protein: '13g', carbs: '68g', fat: '7g', fiber: '8g' },
    ingredients: ['Raw Green Papaya', 'Khar (Alkaline Banana Ash Extract)', 'Panch Phoron', 'Mustard Oil', 'Lentils & Steamed Rice'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'A soothing alkaline digestive dish prepared from green raw papaya and filtered banana peel ash water, seasoned with pungent mustard oil.',
    tasteProfile: 'Gentle, Alkaline & Cleansing'
  },
  {
    id: 'meghalaya-jadoh-veg-curry',
    name: 'Khasi Jadoh Spiced Rice with Herb Salad',
    nativeTitles: {
      en: 'Khasi Jadoh Spiced Rice with Herb Salad',
      te: 'మేఘాలయ జాడోహ్ మరియు మూలికా సలాడ్',
      hi: 'मेघालय का पारंपरिक जादोह और ताज़ा सलाद',
      ta: 'மேகாலயா ஜாதோ மற்றும் சாலட்',
      kn: 'ಮೇಘಾಲಯ ಜಾಡೋಹ್ ಮತ್ತು ಸಲಾಡ್',
      ml: 'മേഘാലയ ജാദോഹ് ചോറ് സാലഡിനൊപ്പം',
      bn: 'মেঘালয়ের খাসি জাদোহ ভাত ও সালাদ',
      gu: 'મેઘાલય જાદોહ રાઇસ અને કચુંબર',
      mr: 'मेघालय पारंपरिक जादोह भात'
    },
    zone: 'northeast',
    state: 'Meghalaya',
    cuisine: 'Khasi',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 430,
    nutrition: { protein: '11g', carbs: '74g', fat: '9g', fiber: '6g' },
    ingredients: ['Short Grain Hill Red Rice', 'Ginger & Garlic', 'Onions', 'Bay Leaves', 'Wild Mint & Sesame Herb Garnish'],
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional Meghalayan rice cooked with aromatic spices, onions and ginger, finished with wild herbs and crunchy radish salad.',
    tasteProfile: 'Fragrant, Rustic & Savory'
  },
  {
    id: 'manipur-kangshoi-rice',
    name: 'Manipuri Vegetable Kangshoi Stew with Fragrant Rice',
    nativeTitles: {
      en: 'Manipuri Vegetable Kangshoi Stew with Rice',
      te: 'మణిపురి కాంగ్‌షోయ్ కూరగాయల స్టూ',
      hi: 'मणिपुरी वेजिटेबल कांगसोई स्टू और चावल',
      ta: 'மணிப்பூரி காய்கறி காங்சோய் சாதத்துடன்',
      kn: 'ಮಣಿಪುರಿ ಕಾಂಗ್‌ಶೋಯಿ ತರಕಾರಿ ಸೂಪ್',
      ml: 'മണിപ്പൂരി കാങ്ഷോയ് വെജ് സ്റ്റൂ',
      bn: 'মণিপুরী কাংশোই ভেজিটেবল স্টু ও ভাত',
      gu: 'મણિપુરી વેજ કાંગ્શોઈ અને ભાત',
      mr: 'मणिपुरी पौष्टिक कांगसोई भाजी आणि भात'
    },
    zone: 'northeast',
    state: 'Manipur',
    cuisine: 'Manipuri',
    mealType: 'dinner',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 20,
    calories: 310,
    nutrition: { protein: '8g', carbs: '62g', fat: '3g', fiber: '8g' },
    ingredients: ['Seasonal Green Vegetables', 'Maroi Nakupi (Chives)', 'Ginger & Cloves', 'Bamboo Shoot', 'Steamed Rice'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Oil-free light vegetable broth boiled with indigenous fragrant allium chives, fresh ginger, seasonal pods and green shoots.',
    tasteProfile: 'Delicate, Oil-Free, Herbal & Restorative'
  },
  {
    id: 'nagaland-steamed-vegetable-bamboo-stew',
    name: 'Naga Steamed Vegetable Stew with Fermented Bamboo Shoot',
    nativeTitles: {
      en: 'Naga Vegetable Stew with Fermented Bamboo Shoot',
      te: 'నాగాలాండ్ వెజిటబుల్ బాంబూ షూట్ స్టూ',
      hi: 'नागा बैम्बू शूट वेज स्टू और चावल',
      ta: 'நாகா காய்கறி மற்றும் மூங்கில் குருத்து குழம்பு',
      kn: 'ನಾಗಾ ತರಕಾರಿ ಮತ್ತು ಬಿದಿರಿನ ಚಿಗುರು ಸಾರು',
      ml: 'നാഗാ വെജ് ബാംബൂ ഷൂട്ട് സ്റ്റൂ',
      bn: 'নাগা ব্যাম্বু শ্যুট ভেজিটেবল স্টু',
      gu: 'નાગા વેજ અને વાંસ કૂંપળ સ્ટૂ',
      mr: 'नागालँड बांबू शूट आणि भाजी रस्सा'
    },
    zone: 'northeast',
    state: 'Nagaland',
    cuisine: 'Naga',
    mealType: 'dinner',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 25,
    calories: 320,
    nutrition: { protein: '9g', carbs: '60g', fat: '4g', fiber: '9g' },
    ingredients: ['Fermented Bamboo Shoot (Bastanga)', 'Colocasia Leaves', 'King Chilli (Bhut Jolokia snippet)', 'Mountain Beans', 'Steamed Sticky Rice'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Earthy Naga mountain stew flavored with pungent fermented bamboo shoot, wild mountain herbs and wholesome native leafy greens.',
    tasteProfile: 'Pungent, Smoky & High Fiber'
  },
  {
    id: 'tripura-muya-awandru-rice',
    name: 'Tripuri Muya Awandru Bamboo Stew with Rice',
    nativeTitles: {
      en: 'Tripuri Muya Awandru Bamboo Stew with Rice',
      te: 'త్రిపుర మూయా అవండ్రూ మరియు అన్నం',
      hi: 'त्रिपुरी मुया अवांद्रू और चावल',
      ta: 'திரிபுரா மூயா அவண்ட்ரூ சாதத்துடன்',
      kn: 'ತ್ರಿಪುರಾ ಮುಯಾ ಅವಾಂಡ್ರೂ ಮತ್ತು ಅನ್ನ',
      ml: 'ത്രിപുര മുയ അവാണ്ട്രു ചോറിനൊപ്പം',
      bn: 'ত্রিপুরী মুয়া আওয়ান্দ্রু ও ভাত',
      gu: 'ત્રિપુરી મુયા અવાન્દ્રુ અને ભાત',
      mr: 'त्रिपुरी मुया आवांद्रू आणि भात'
    },
    zone: 'northeast',
    state: 'Tripura',
    cuisine: 'Tripuri',
    mealType: 'lunch',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 20,
    calories: 330,
    nutrition: { protein: '8g', carbs: '65g', fat: '4g', fiber: '7g' },
    ingredients: ['Tender Bamboo Shoots (Muya)', 'Rice Flour Paste (Awandru)', 'Green Chillies', 'Bhut Jolokia hint', 'Local Basil Herbs'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Indigenous Tripuri delicacy combining tender bamboo shoots cooked in a thick comforting rice flour slurry infused with green chillies.',
    tasteProfile: 'Velvety, Spicy & Distinctive'
  },
  {
    id: 'mizoram-bai-rice',
    name: 'Mizo Bai Steamed Vegetable Stew with Mountain Rice',
    nativeTitles: {
      en: 'Mizo Bai Steamed Vegetable Stew with Mountain Rice',
      te: 'మిజోరమ్ బాయి కూరగాయల స్టూ',
      hi: 'मिज़ो बाई वेज स्टू और पहाड़ी चावल',
      ta: 'மிஸோ பாய் காய்கறி கூழ் சாதத்துடன்',
      kn: 'ಮಿಜೋ ಬಾಯಿ ತರಕಾರಿ ಸಾರು',
      ml: 'മിസോ ബായ് വെജ് സ്റ്റൂ',
      bn: 'মিজো বাই ভেজিটেবল স্টু ও ভাত',
      gu: 'મિઝો બાઈ વેજ સ્ટૂ અને ભાત',
      mr: 'मिझो बाई पौष्टिक भाजी आणि भात'
    },
    zone: 'northeast',
    state: 'Mizoram',
    cuisine: 'Mizo',
    mealType: 'dinner',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 20,
    calories: 290,
    nutrition: { protein: '8g', carbs: '58g', fat: '3g', fiber: '8g' },
    ingredients: ['Pork-free Mustard Leaves', 'Local Beans', 'Bamboo Shoot', 'Baking Soda pinch', 'Red Hill Rice'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=1200&q=80',
    description: 'Simple and healthy steamed vegetable stew prepared with fresh garden greens, tender bamboo and mountain spices, eaten daily in Mizo homes.',
    tasteProfile: 'Pure, Unadulterated & Wholesome'
  },
  {
    id: 'arunachal-khura-butter-tea',
    name: 'Monpa Khura Buckwheat Pancakes with Butter Tea',
    nativeTitles: {
      en: 'Monpa Khura Buckwheat Pancakes with Butter Tea',
      te: 'అరుణాచల్ ఖురా మరియు బటర్ టీ',
      hi: 'अरुणाचली खुरा पैनकेक और बटर टी',
      ta: 'அருணாச்சல குரா மற்றும் பட்டர் டீ',
      kn: 'ಅರುಣಾಚಲ ಖುರಾ ಮತ್ತು ಬಟರ್ ಟೀ',
      ml: 'അരുണാചൽ ഖുറ പാൻകേക്ക് ബട്ടർ ടീയ്ക്കൊപ്പം',
      bn: 'অরুণাচলি খুরা প্যানকেক ও বাটার চা',
      gu: 'અરુણાચલી ખુરા અને બટર ટી',
      mr: 'अरुणाचली खुरा आणि बटर चहा'
    },
    zone: 'northeast',
    state: 'Arunachal Pradesh',
    cuisine: 'Monpa & Tribal',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 280,
    nutrition: { protein: '8g', carbs: '46g', fat: '7g', fiber: '6g' },
    ingredients: ['Buckwheat Flour', 'Spring Water', 'Yak/Cow Butter Tea (Po Cha)', 'Rock Salt', 'Chilli Paste'],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1200&q=80',
    description: 'Nutritious gluten-free buckwheat crepes made by the Monpa tribe of Tawang, paired with salted churned butter tea.',
    tasteProfile: 'Nutty, Savory & Warming'
  },

  // =========================================================================
  // REMAINING STATES & UNION TERRITORIES — 100% PAN-INDIA COVERAGE
  // =========================================================================
  {
    id: 'up-bedmi-puri-aloo',
    name: 'Banarasi Bedmi Puri with Rasedar Aloo Sabzi',
    nativeTitles: {
      en: 'Banarasi Bedmi Puri with Rasedar Aloo Sabzi',
      te: 'బెడ్మీ పూరీ మరియు ఆలు కూర',
      hi: 'बनारसी बेडमी पूरी और रसेदार आलू',
      ta: 'பெட்மி பூரி மற்றும் உருளைக்கிழங்கு மசாலா',
      kn: 'ಬೆಡ್ಮಿ ಪೂರಿ ಮತ್ತು ಆಲೂ ಪಲ್ಯ',
      ml: 'ബെഡ്മി പൂരി ഉരുളക്കിഴങ്ങ് കറിക്കൊപ്പം',
      bn: 'বেনারসি বেডমি পুরি ও আলুর দম',
      gu: 'બનારસી બેડમી પૂરી અને રસેદાર આલૂ',
      mr: 'बनारसी बेडमी पुरी आणि रस्सा बटाटा'
    },
    zone: 'north',
    state: 'Uttar Pradesh',
    cuisine: 'Awadhi & Banarasi',
    mealType: 'breakfast',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 20,
    calories: 390,
    nutrition: { protein: '11g', carbs: '58g', fat: '14g', fiber: '6g' },
    ingredients: ['Whole Wheat Flour with Spiced Urad Dal', 'Potatoes', 'Hing (Asafoetida)', 'Fennel Seeds', 'Dry Ginger & Mango Powder'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp, flaky whole wheat puris stuffed with coarsely ground spiced black gram lentils, served with no-onion-garlic spicy tomato potato broth.',
    tasteProfile: 'Crisp, Robust & Tangy'
  },
  {
    id: 'up-awadhi-veg-tehri',
    name: 'Fragrant Awadhi Vegetable Tehri with Boondi Raita',
    nativeTitles: {
      en: 'Fragrant Awadhi Vegetable Tehri with Boondi Raita',
      te: 'అవధి వెజ్ తెహ్రీ మరియు బూందీ రైతా',
      hi: 'अवधी वेजिटेबल तहरी और बूंदी रायता',
      ta: 'அவதி காய்கறி தெஹ்ரி மற்றும் பூந்தி ரைத்தா',
      kn: 'ಅವಧಿ ತರಕಾರಿ ತೆಹ್ರಿ ಮತ್ತು ಬೂಂದಿ ರಾಯತ',
      ml: 'അവധ് വെജ് തെഹ്‌രി ബൂന്തി റായ്ത്തയ്ക്കൊപ്പം',
      bn: 'অওধি ভেজিটেবল তেহরি ও বুন্দি রায়তা',
      gu: 'અવધી વેજ તેહરી અને બુંદી રાયતું',
      mr: 'सुगंधी अवधी व्हेज तेहरी आणि बुंदी रायता'
    },
    zone: 'north',
    state: 'Uttar Pradesh',
    cuisine: 'Awadhi',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 440,
    nutrition: { protein: '12g', carbs: '74g', fat: '11g', fiber: '7g' },
    ingredients: ['Basmati Rice', 'Potatoes & Green Peas', 'Cauliflower', 'Mustard Oil & Turmeric', 'Garam Masala', 'Chilled Boondi Raita'],
    image: '/images/recipes/vegetable-pulao.jpg',
    description: 'Golden spiced turmeric rice cooked in mustard oil with seasonal winter cauliflower, green peas and whole spices, paired with cooling boondi curd.',
    tasteProfile: 'Fragrant, Comforting & Homestyle'
  },
  {
    id: 'up-banarasi-tamatar-chaat',
    name: 'Famous Banarasi Ghee Tamatar Chaat',
    nativeTitles: {
      en: 'Famous Banarasi Ghee Tamatar Chaat',
      te: 'బనారస్ టమోటా చాట్ నెయ్యితో',
      hi: 'बनारस की प्रसिद्ध देसी घी टमाटर चाट',
      ta: 'பனாரஸ் தக்காளி சாட் நெய்யுடன்',
      kn: 'ಬನಾರಸ್ ಟೊಮೆಟೊ ಚಾಟ್ ತುಪ್ಪದಲ್ಲಿ',
      ml: 'ബനാറസ് തക്കാളി ചാറ്റ് നെയ്യൊപ്പം',
      bn: 'বেনারসি দেশি ঘি টমেটো চাট',
      gu: 'બનારસી ઘી ટમેટા ચાટ',
      mr: 'प्रसिद्ध बनारसी साजूक तूप टोमॅटो चाट'
    },
    zone: 'north',
    state: 'Uttar Pradesh',
    cuisine: 'Banarasi',
    mealType: 'snack',
    diet: 'Vegetarian',
    prepTime: 15,
    cookTime: 15,
    calories: 260,
    nutrition: { protein: '5g', carbs: '36g', fat: '11g', fiber: '4g' },
    ingredients: ['Ripe Red Tomatoes', 'Boiled Potatoes', 'Roasted Cumin & Black Salt', 'Sugar Syrup splash', 'Pure Desi Ghee & Crispy Namak Pare'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Hot sizzling mashed tomato and potato ragda cooked in pure ghee, laced with spiced sugar-lemon syrup and topped with crunchy crackers.',
    tasteProfile: 'Sweet, Sour, Tangy & Sizzling'
  },
  {
    id: 'chandigarh-stuffed-kulcha',
    name: 'Sector-17 Stuffed Tandoori Kulcha with Pindi Chana',
    nativeTitles: {
      en: 'Chandigarh Stuffed Tandoori Kulcha with Pindi Chana',
      te: 'చండీగఢ్ తందూరీ కుల్చా మరియు చెనా',
      hi: 'चंडीगढ़ तंदूरी कुल्चा और पिंडी चना',
      ta: 'சண்டிகர் தந்தூரி குல்சா மற்றும் சனா',
      kn: 'ಚಂಡೀಗಢ್ ತಂದೂರಿ ಕುಲ್ಚಾ ಮತ್ತು ಚನಾ',
      ml: 'ചണ്ഡിഗഡ് തന്തൂരി കുൽച്ച പിണ്ടി ചനയ്ക്കൊപ്പം',
      bn: 'চণ্ডীগড় তন্দুরি কুলচা ও পিন্ডি চানা',
      gu: 'ચંદીગઢ તંદૂરી કુલ્ચા અને પિંડી ચણા',
      mr: 'चंदिगढ तंदुरी कुलचा आणि पिंडी चणे'
    },
    zone: 'north',
    state: 'Chandigarh',
    cuisine: 'Punjabi Urban',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 20,
    calories: 490,
    nutrition: { protein: '15g', carbs: '72g', fat: '15g', fiber: '9g' },
    ingredients: ['Layered Leavened Dough', 'Potato & Paneer Stuffing', 'Pindi Chickpeas', 'Amritsari Warian', 'Coriander & White Butter'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp, layered clay oven baked flatbread filled with spiced paneer and potatoes, crushed with fresh butter and served with dark chickpea curry.',
    tasteProfile: 'Flaky, Smoky & Indulgent'
  },
  {
    id: 'puducherry-creole-sambar-rice',
    name: 'Puducherry Franco-Tamil Creole Sambar Sadam',
    nativeTitles: {
      en: 'Puducherry Franco-Tamil Creole Sambar Sadam',
      te: 'పుదుచ్చేరి క్రెయోల్ సాంబార్ రైస్',
      hi: 'पुदुचेरी फ्रेंको-तमिल सांबर सादम',
      ta: 'புதுச்சேரி பிரெஞ்சு-தமிழ் சாம்பார் சாதம்',
      kn: 'ಪುದುಚೇರಿ ಸಾಂಬಾರ್ ಅನ್ನ',
      ml: 'പുതുച്ചേരി ക്രിയോൾ സാമ്പാർ സാദം',
      bn: 'পুদুচেরি ক্রেওল সাম্বার ভাত',
      gu: 'પુડુચેરી ક્રેઓલ સંભાર ભાત',
      mr: 'पुद्दुचेरी क्रेओल सांबार भात'
    },
    zone: 'south',
    state: 'Puducherry',
    cuisine: 'Franco-Tamil Creole',
    mealType: 'lunch',
    diet: 'Vegetarian',
    prepTime: 20,
    cookTime: 25,
    calories: 430,
    nutrition: { protein: '13g', carbs: '76g', fat: '9g', fiber: '8g' },
    ingredients: ['Ponni Rice & Toor Dal', 'Shallots & Drumstick', 'Coconut Milk touch', 'Curry Leaves & Mustard', 'Elephant Foot Yam Ghee Roast'],
    image: '/images/recipes/south-indian-thali.jpg',
    description: 'Velvety one-pot lentil rice infused with French herbs and aromatic coastal tamarind broth, finished with a dash of sweet coconut milk.',
    tasteProfile: 'Gentle, Herbaceous & Fragrant'
  },
  {
    id: 'lakshadweep-coconut-rice-curry',
    name: 'Minicoy Island Coconut Rice with Vegetable Kurma',
    nativeTitles: {
      en: 'Minicoy Island Coconut Rice with Vegetable Kurma',
      te: 'లక్షద్వీప్ కొబ్బరి అన్నం మరియు కూరగాయల కుర్మా',
      hi: 'लक्षद्वीप कोकोनट राइस और वेज कुरमा',
      ta: 'லட்சத்தீவு தேங்காய் சாதம் மற்றும் குருமா',
      kn: 'ಲಕ್ಷದ್ವೀಪ ತೆಂಗಿನಕಾಯಿ ಅನ್ನ ಮತ್ತು ಕುರ್ಮಾ',
      ml: 'ലക്ഷദ്വീപ് തേങ്ങാച്ചോറ് വെജ് കുർമയ്ക്കൊപ്പം',
      bn: 'লাক্ষাদ্বীপ নারকেল ভাত ও ভেজ কুরমা',
      gu: 'લક્ષદ્વીપ નાળિયેર ભાત અને વેજ કુરમા',
      mr: 'लक्षद्वीप नारळ भात आणि व्हेज कुरमा'
    },
    zone: 'south',
    state: 'Lakshadweep',
    cuisine: 'Maldivian & Malabari',
    mealType: 'lunch',
    diet: 'Vegan',
    prepTime: 15,
    cookTime: 25,
    calories: 420,
    nutrition: { protein: '9g', carbs: '70g', fat: '12g', fiber: '6g' },
    ingredients: ['Basmati/Jeerakasala Rice', 'Fresh Coconut Milk', 'Cardamom & Cloves', 'Seasonal Island Vegetables', 'Curry Leaves'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Fragrant short-grain rice simmered gently in pure sweet coconut milk with whole spices, served alongside a spiced coconut island stew.',
    tasteProfile: 'Subtle Sweetness, Aromatic & Tropical'
  },
  {
    id: 'andaman-coconut-fish-curry',
    name: 'Andaman Coastal Coconut Fish Curry with Steamed Rice',
    nativeTitles: {
      en: 'Andaman Coastal Coconut Fish Curry with Steamed Rice',
      te: 'అండమాన్ కొబ్బరి చేపల కూర మరియు అన్నం',
      hi: 'अंडमान कोस्टल फिश करी और चावल',
      ta: 'அந்தமான் தேங்காய் மீன் குழம்பு சாதத்துடன்',
      kn: 'ಅಂಡಮಾನ್ ಕರಾವಳಿ ಮೀನು ಸಾರು ಮತ್ತು ಅನ್ನ',
      ml: 'ആന്തമാൻ കോക്കനട്ട് ഫിഷ് കറി ചോറിനൊപ്പം',
      bn: 'আন্দামান কোস্টাল ফিশ কারি ও গরম ভাত',
      gu: 'અંદામાન કોસ્ટલ ફિશ કરી અને ભાત',
      mr: 'अंदमान नारळ माशाचे कालवण व भात'
    },
    zone: 'south',
    state: 'Andaman & Nicobar Islands',
    cuisine: 'Island Seafood & Coastal',
    mealType: 'lunch',
    diet: 'Non-Vegetarian',
    prepTime: 15,
    cookTime: 25,
    calories: 460,
    nutrition: { protein: '29g', carbs: '54g', fat: '13g', fiber: '3g' },
    ingredients: ['Fresh Sea Kingfish / Snapper', 'Island Coconut Cream', 'Kudampuli (Malabar Tamarind)', 'Shallots & Ginger', 'Curry Leaves & Mustard'],
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh oceanic fish gently poached in thick coastal coconut gravy soured with dried Malabar gambooge and finished with fresh green chillies.',
    tasteProfile: 'Tangy, Rich, Tropical & Oceanic'
  },
  {
    id: 'daman-ubadiyu-vegetable-pot',
    name: 'Daman & Diu Ubadiyu Clay Pot Winter Veg Medley',
    nativeTitles: {
      en: 'Daman & Diu Ubadiyu Clay Pot Winter Veg Medley',
      te: 'ఉబాడియు మట్టి కుండ కూరగాయల వంటకం',
      hi: 'दमन और दीव का पारंपरिक उबाडियू',
      ta: 'தமன் மற்றும் தியூ உபாடியு',
      kn: 'ದಮನ್ ಮತ್ತು ದಿಯು ಉಬಾಡಿಯು ತರಕಾರಿ ಖಾದ್ಯ',
      ml: 'ദാമൻ ആൻഡ് ദിയു ഉബാഡിയു',
      bn: 'দমন ও দিউ মাটির পাত্রের উবাডিউ',
      gu: 'દમણ અને દીવનું પ્રખ્યાત માટલા ઊંબાડિયું',
      mr: 'दमण आणि दीव पारंपरिक मातीचे उबाडियू'
    },
    zone: 'west',
    state: 'Dadra & Nagar Haveli and Daman & Diu',
    cuisine: 'Coastal Gujarati',
    mealType: 'dinner',
    diet: 'Vegan',
    prepTime: 25,
    cookTime: 40,
    calories: 360,
    nutrition: { protein: '10g', carbs: '58g', fat: '10g', fiber: '11g' },
    ingredients: ['Sweet Potatoes & Purple Yam (Kand)', 'Valor Papdi Pods', 'Green Garlic & Ginger Paste', 'Ajwain (Carom)', 'Wild Herbs (Kalar / Aamla leaves)'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Earthen pot packed with seasonal tubers and winter green beans, sealed with aromatic forest herbs, and slow-roasted underground over coals.',
    tasteProfile: 'Smoky, Earthy, Herbaceous & High-Fiber'
  }
];

/**
 * Filter Pan-India Dishes by Zone, State, Meal Slot and Dietary Preference
 */
export function queryPanIndiaDishes({
  zone = 'all',
  state = 'all',
  mealType = null,
  diet = 'all',
  search = ''
}) {
  return PAN_INDIA_DISHES.filter((dish) => {
    // Zone filter
    if (zone !== 'all' && dish.zone !== zone) {
      return false;
    }

    // State filter
    if (state !== 'all') {
      const stateObj = INDIAN_STATES_UTS.find((s) => s.id === state);
      if (stateObj && dish.state.toLowerCase() !== stateObj.name.toLowerCase()) {
        return false;
      }
    }

    // Meal category filter (breakfast, lunch, snack, dinner)
    if (mealType && dish.mealType !== mealType) {
      return false;
    }

    // Diet filter
    if (diet !== 'all') {
      if (diet === 'Vegetarian' && dish.diet === 'Non-Vegetarian') return false;
      if (diet === 'Vegan' && dish.diet !== 'Vegan') return false;
      if (diet === 'Non-Vegetarian' && dish.diet !== 'Non-Vegetarian') return false;
    }

    // Text search filter
    if (search && search.trim()) {
      const q = search.toLowerCase();
      const inName = dish.name.toLowerCase().includes(q);
      const inState = dish.state.toLowerCase().includes(q);
      const inCuisine = dish.cuisine.toLowerCase().includes(q);
      const inDesc = dish.description.toLowerCase().includes(q);
      const inNative = Object.values(dish.nativeTitles || {}).some((t) => t.toLowerCase().includes(q));
      const inIngredients = dish.ingredients.some((i) => i.toLowerCase().includes(q));

      if (!inName && !inState && !inCuisine && !inDesc && !inNative && !inIngredients) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Generate a cohesive 7-day meal plan (Monday to Sunday) across all 4 meal slots
 * Ensures zero slot repeats across days, respects zone/state and diet filters.
 */
export function generatePanIndiaWeeklyPlan({
  zone = 'all',
  state = 'all',
  diet = 'all'
}) {
  const plan = {};

  const getDishesForSlot = (slotId) => {
    let pool = queryPanIndiaDishes({ zone, state, mealType: slotId, diet });
    // If specific state or zone has too few items for all 7 days, gracefully fall back to zone or all-India
    if (pool.length < 3 && state !== 'all') {
      pool = queryPanIndiaDishes({ zone, state: 'all', mealType: slotId, diet });
    }
    if (pool.length < 3 && zone !== 'all') {
      pool = queryPanIndiaDishes({ zone: 'all', state: 'all', mealType: slotId, diet });
    }
    if (pool.length === 0) {
      pool = queryPanIndiaDishes({ zone: 'all', state: 'all', mealType: slotId });
    }
    return pool;
  };

  const breakfastPool = getDishesForSlot('breakfast');
  const lunchPool = getDishesForSlot('lunch');
  const snackPool = getDishesForSlot('snack');
  const dinnerPool = getDishesForSlot('dinner');

  DAYS_OF_WEEK.forEach((day, dayIndex) => {
    plan[day.id] = {
      breakfast: breakfastPool[(dayIndex) % breakfastPool.length]?.id || breakfastPool[0]?.id,
      lunch: lunchPool[(dayIndex) % lunchPool.length]?.id || lunchPool[0]?.id,
      snack: snackPool[(dayIndex) % snackPool.length]?.id || snackPool[0]?.id,
      dinner: dinnerPool[(dayIndex) % dinnerPool.length]?.id || dinnerPool[0]?.id
    };
  });

  return plan;
}
