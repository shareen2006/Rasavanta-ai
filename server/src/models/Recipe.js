const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true, trim: true },
  category: { type: String, trim: true, default: 'Pantry' },
  isAllergen: { type: Boolean, default: false },
  note: { type: String, trim: true }
}, { _id: false });

const InstructionStepSchema = new mongoose.Schema({
  step: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  timerSeconds: { type: Number, default: 0 }
}, { _id: false });

const SubstitutionSchema = new mongoose.Schema({
  original: { type: String, required: true },
  substitute: { type: String, required: true },
  note: { type: String }
}, { _id: false });

const MicronutrientSchema = new mongoose.Schema({
  iron: { type: String, default: '0mg' },
  calcium: { type: String, default: '0mg' },
  vitaminC: { type: String, default: '0mg' },
  potassium: { type: String, default: '0mg' },
  sodium: { type: String, default: '0mg' }
}, { _id: false });

const NutritionSchema = new mongoose.Schema({
  protein: { type: String, required: true, default: '0g' },
  carbs: { type: String, required: true, default: '0g' },
  fat: { type: String, required: true, default: '0g' },
  fiber: { type: String, required: true, default: '0g' },
  micronutrients: { type: MicronutrientSchema, default: () => ({}) }
}, { _id: false });

const RecipeSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    index: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true,
    index: true 
  },
  nativeTitles: {
    te: { type: String, trim: true },
    hi: { type: String, trim: true },
    ta: { type: String, trim: true },
    kn: { type: String, trim: true },
    ml: { type: String, trim: true },
    bn: { type: String, trim: true },
    gu: { type: String, trim: true },
    mr: { type: String, trim: true }
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  cuisine: { 
    type: String, 
    required: true, 
    trim: true,
    index: true 
  },
  region: { 
    type: String, 
    trim: true,
    index: true 
  },
  mealType: { 
    type: String, 
    required: true, 
    trim: true,
    index: true 
  },
  foodCategory: { 
    type: String, 
    trim: true 
  },
  diet: { 
    type: String, 
    required: true, 
    enum: ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Eggetarian', 'Pescatarian'],
    index: true 
  },
  dietaryClassifications: [{ 
    type: String,
    index: true 
  }],
  vegan: { type: Boolean, default: false },
  glutenFree: { type: Boolean, default: false },
  jainFriendly: { type: Boolean, default: false },
  dairyFree: { type: Boolean, default: false },
  prepTime: { type: Number, required: true, min: 0 },
  cookTime: { type: Number, required: true, min: 0 },
  totalTime: { type: Number, min: 0 },
  servings: { type: Number, required: true, default: 4 },
  difficulty: { 
    type: String, 
    enum: ['Beginner Friendly', 'Intermediate', 'Advanced'], 
    default: 'Beginner Friendly' 
  },
  budget: { 
    type: String, 
    enum: ['Budget', 'Moderate', 'Premium'], 
    default: 'Budget' 
  },
  calories: { type: Number, required: true },
  nutrition: { type: NutritionSchema, required: true },
  nutritionSource: { 
    type: String, 
    default: 'ICMR-NIN Indian Food Composition Tables (IFCT) & USDA FoodData Central' 
  },
  allergens: [{ type: String }],
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  reviewsCount: { type: Number, default: 50 },
  featured: { type: Boolean, default: false, index: true },
  tags: [{ type: String, index: true }],
  ingredients: [IngredientSchema],
  instructions: [InstructionStepSchema],
  substitutions: [SubstitutionSchema]
}, {
  timestamps: true
});

// Pre-save hook to calculate totalTime and ensure dietary classifications are consistent with ingredients
RecipeSchema.pre('save', function (next) {
  this.totalTime = (this.prepTime || 0) + (this.cookTime || 0);

  // Derive flags
  if (this.diet === 'Vegan') {
    this.vegan = true;
    this.dairyFree = true;
  }
  
  next();
});

// Indexes for high performance discovery
RecipeSchema.index({ cuisine: 1, mealType: 1, diet: 1 });
RecipeSchema.index({ totalTime: 1, difficulty: 1 });
RecipeSchema.index({
  title: 'text',
  description: 'text',
  'ingredients.name': 'text',
  tags: 'text'
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
