import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePantry } from '../context/PantryContext';
import { useRecipes } from '../context/RecipeContext';
import { recipeService } from '../services/recipeService';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { 
  Sparkles, 
  Plus, 
  X, 
  Refrigerator, 
  RotateCcw, 
  Flame, 
  Clock, 
  Users, 
  ChefHat, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { POPULAR_INGREDIENTS, CUISINES_LIST } from '../data/recipesData';
import { SUPPORTED_LANGUAGES } from '../i18n';
import toast from 'react-hot-toast';

export const AIKitchen = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { items: pantryItems } = usePantry();
  const { saveToCookbook, isSavedInCookbook } = useRecipes();

  // Ingredient state
  const [ingredients, setIngredients] = useState(() => {
    if (location.state?.initialIngredients) {
      return location.state.initialIngredients;
    }
    return ['Paneer', 'Tomatoes', 'Curry Leaves'];
  });

  const [inputVal, setInputVal] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [diet, setDiet] = useState('All');
  const [allergies, setAllergies] = useState('');
  const [maxTime, setMaxTime] = useState(30);
  const [budget, setBudget] = useState('Budget');
  const [servings, setServings] = useState(4);
  const [outputLang, setOutputLang] = useState(i18n.language || 'en');

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [generatedResults, setGeneratedResults] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(true);

  const generationThoughts = [
    'Analyzing flavor compounds and spices...',
    'Balancing Ayurvedic rasas (sweet, sour, pungent)...',
    'Calibrating heat and cooking times...',
    'Composing zero-waste ingredient substitutions...',
    'Formulating step-by-step culinary method...'
  ];

  // Rotate thoughts during generation animation
  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(() => {
        setGenerationStep((prev) => (prev + 1) % generationThoughts.length);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Add ingredient
  const handleAddIngredient = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (ingredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      toast('Ingredient already added!', { icon: 'ℹ️' });
      return;
    }
    setIngredients((prev) => [...prev, trimmed]);
    setInputVal('');
  };

  // Remove ingredient
  const handleRemoveIngredient = (name) => {
    setIngredients((prev) => prev.filter((i) => i !== name));
  };

  // Load from Smart Pantry
  const handleImportFromPantry = () => {
    if (pantryItems.length === 0) {
      toast('Pantry is empty! Add items in Smart Pantry first.', { icon: '🛒' });
      return;
    }
    const pantryNames = pantryItems.map((p) => p.name);
    setIngredients((prev) => [...new Set([...prev, ...pantryNames])]);
    toast.success(`Imported ${pantryNames.length} ingredients from Smart Pantry! 🥬`);
  };

  // Generate Action
  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add at least 1 ingredient from your kitchen!');
      return;
    }

    setIsGenerating(true);
    setGeneratedResults(null);

    try {
      const result = await recipeService.generateRecipes({
        ingredients,
        cuisine,
        diet,
        allergies,
        maxTime,
        budget,
        servings,
        outputLang
      });

      setGeneratedResults(result.data);
      setIsDemoMode(result.isDemo);
      toast.success('RasaGen composed tailored recipes for your kitchen! 🍲');
    } catch {
      toast.error('Generation encountered an issue. Please retry.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#244B39] text-[#D99A38] px-4 py-1.5 text-xs font-bold shadow-xs">
            <Sparkles className="h-4 w-4" /> AI Culinary Studio
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#244B39]">
            {t('aiKitchen.title')}
          </h1>
          <p className="text-sm text-[#566459] leading-relaxed">
            {t('aiKitchen.subtitle')}
          </p>
        </div>

        {/* Workspace Dual Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL — INGREDIENT WORKSPACE */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F0E5]">
              <h2 className="font-serif text-xl font-bold text-[#244B39] flex items-center gap-2">
                <span>{t('aiKitchen.ingredientsLabel')}</span>
                <span className="rounded-full bg-[#FAF8F2] px-2.5 py-0.5 text-xs text-[#566459]">
                  {ingredients.length}
                </span>
              </h2>

              {/* Load from Pantry Quick Action */}
              <button
                type="button"
                onClick={handleImportFromPantry}
                className="flex items-center gap-1.5 rounded-full border border-[#A7B99A]/40 bg-[#FAF8F2] px-3 py-1 text-xs font-bold text-[#244B39] hover:bg-[#244B39] hover:text-white transition"
              >
                <Refrigerator className="h-3.5 w-3.5 text-[#D99A38]" />
                <span className="hidden sm:inline">Pantry Sync</span>
              </button>
            </div>

            {/* Input & Add Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddIngredient(inputVal);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('aiKitchen.ingredientsPlaceholder')}
                className="flex-1 rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-4 py-2.5 text-xs sm:text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244B39]"
              />
              <button
                type="submit"
                className="flex items-center gap-1 rounded-2xl bg-[#244B39] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#193527] transition"
              >
                <Plus className="h-4 w-4" /> {t('aiKitchen.addBtn')}
              </button>
            </form>

            {/* Added Ingredient Chips */}
            <div className="min-h-[90px] rounded-2xl bg-[#FAF8F2] p-3 border border-[#A7B99A]/20">
              {ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {ingredients.map((ing) => (
                      <motion.span
                        key={ing}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-1 text-xs font-semibold text-[#244B39] shadow-xs"
                      >
                        <span>{ing}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(ing)}
                          className="rounded-full p-0.5 text-[#566459] hover:bg-[#D97556]/10 hover:text-[#D97556]"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="text-xs text-[#566459] text-center py-6">
                  {t('aiKitchen.emptyIngredients')}
                </p>
              )}
            </div>

            {/* Quick Suggestions */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459] mb-2">
                {t('aiKitchen.quickSuggestions')}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_INGREDIENTS.slice(0, 12).map((ing) => (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => handleAddIngredient(ing)}
                    className="rounded-full bg-white border border-[#A7B99A]/30 px-2.5 py-1 text-[11px] font-medium text-[#303A32] hover:border-[#244B39] hover:bg-[#244B39] hover:text-white transition"
                  >
                    + {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Button */}
            {ingredients.length > 0 && (
              <button
                type="button"
                onClick={() => setIngredients([])}
                className="text-xs font-semibold text-[#D97556] hover:underline"
              >
                {t('aiKitchen.clearAll')}
              </button>
            )}

            {/* Cooking Parameters / Preferences */}
            <div className="space-y-4 pt-4 border-t border-[#F5F0E5]">
              <h3 className="font-serif text-lg font-bold text-[#244B39]">
                {t('aiKitchen.preferencesTitle')}
              </h3>

              {/* Cuisine & Diet */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    {t('aiKitchen.cuisinePref')}
                  </label>
                  <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs text-[#303A32] focus:bg-white"
                  >
                    <option value="All">Any Regional Cuisine</option>
                    {CUISINES_LIST.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    {t('aiKitchen.dietPref')}
                  </label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value)}
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs text-[#303A32] focus:bg-white"
                  >
                    <option value="All">Any Dietary Type</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              {/* Time & Servings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    {t('aiKitchen.maxTime')}
                  </label>
                  <select
                    value={maxTime}
                    onChange={(e) => setMaxTime(Number(e.target.value))}
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs text-[#303A32] focus:bg-white"
                  >
                    <option value={20}>Quick (≤ 20 min)</option>
                    <option value={30}>Standard (≤ 30 min)</option>
                    <option value={45}>Elaborate (≤ 45 min)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    {t('aiKitchen.servings')}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setServings((s) => Math.max(1, s - 1))}
                      className="h-9 w-9 rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] font-bold text-[#244B39] hover:bg-white"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-sm text-[#244B39]">
                      {servings} Servings
                    </span>
                    <button
                      type="button"
                      onClick={() => setServings((s) => s + 1)}
                      className="h-9 w-9 rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] font-bold text-[#244B39] hover:bg-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Allergies / Dislikes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('aiKitchen.allergies')}
                </label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder={t('aiKitchen.allergiesPlaceholder')}
                  className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3.5 py-2 text-xs text-[#303A32] focus:bg-white"
                />
              </div>

              {/* Output Language for Gemini API Instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('aiKitchen.outputLang')}
                </label>
                <select
                  value={outputLang}
                  onChange={(e) => setOutputLang(e.target.value)}
                  className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs text-[#303A32] focus:bg-white"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* GENERATE BUTTON */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#244B39] py-4 text-sm font-bold text-white shadow-lg hover:bg-[#193527] transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles className="h-5 w-5 text-[#D99A38] animate-pulse" />
              <span>{isGenerating ? t('aiKitchen.generating') : t('aiKitchen.generateBtn')}</span>
            </button>
          </div>

          {/* RIGHT PANEL — RECIPE RESULTS WORKSPACE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Demo Notice Banner */}
            {isDemoMode && (
              <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 shadow-xs">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold">Demonstration Mode:</span> {t('aiKitchen.demoNotice')}
                </div>
              </div>
            )}

            {/* Loading Animated State */}
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-white p-12 text-center border border-[#A7B99A]/30 shadow-soft space-y-6"
              >
                <div className="relative mx-auto h-20 w-20">
                  <div className="absolute inset-0 rounded-full border-4 border-[#F5F0E5] border-t-[#244B39] animate-spin" />
                  <div className="absolute inset-3 rounded-full border-4 border-[#F5F0E5] border-b-[#D99A38] animate-spin" style={{ animationDirection: 'reverse' }} />
                  <ChefHat className="absolute inset-0 m-auto h-8 w-8 text-[#244B39]" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#244B39]">
                    {t('aiKitchen.generating')}
                  </h3>
                  <p className="text-sm font-medium text-[#D99A38] mt-2 animate-pulse">
                    {generationThoughts[generationStep]}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Generated Results View */}
            {!isGenerating && generatedResults && (
              <div className="space-y-6">
                
                {/* Hero Top Generated Recipe */}
                {generatedResults[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-3xl bg-white border-2 border-[#D99A38] shadow-card-hover"
                  >
                    <div className="relative aspect-16/9 w-full bg-[#FAF8F2]">
                      <img
                        src={generatedResults[0].image}
                        alt={generatedResults[0].title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-[#244B39] px-3.5 py-1 text-xs font-bold text-white shadow-md">
                          <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
                          Top AI Match ({generatedResults[0].matchScore}%)
                        </span>
                        <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#244B39]">
                          {generatedResults[0].cuisine}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                          {generatedResults[0].title}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/90 mt-1 line-clamp-2">
                          {generatedResults[0].description}
                        </p>
                      </div>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs border-b border-[#F5F0E5] pb-4">
                        <div>
                          <div className="text-[#566459]">Cook Time</div>
                          <div className="font-bold text-[#244B39] text-sm mt-0.5">{generatedResults[0].cookTime} min</div>
                        </div>
                        <div>
                          <div className="text-[#566459]">Servings</div>
                          <div className="font-bold text-[#244B39] text-sm mt-0.5">{generatedResults[0].servings}</div>
                        </div>
                        <div>
                          <div className="text-[#566459]">Calories</div>
                          <div className="font-bold text-[#D97556] text-sm mt-0.5">{generatedResults[0].calories} kcal</div>
                        </div>
                        <div>
                          <div className="text-[#566459]">Difficulty</div>
                          <div className="font-bold text-[#244B39] text-sm mt-0.5">{generatedResults[0].difficulty}</div>
                        </div>
                      </div>

                      {/* Ingredients Preview */}
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#303A32] mb-2">
                          Ingredients Used:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {generatedResults[0].ingredients.map((ing, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-[#FAF8F2] border border-[#A7B99A]/30 px-3 py-1 text-xs font-medium text-[#244B39]"
                            >
                              {ing.quantity} {ing.unit} {ing.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => saveToCookbook(generatedResults[0])}
                          className="flex-1 rounded-2xl border border-[#244B39] py-3 text-xs font-bold text-[#244B39] hover:bg-[#244B39]/5 transition"
                        >
                          {isSavedInCookbook(generatedResults[0].id) ? 'Saved in Cookbook ✓' : 'Save to Cookbook'}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/recipes/${generatedResults[0].id}`)}
                          className="flex-1 rounded-2xl bg-[#244B39] py-3 text-xs font-bold text-white shadow-md hover:bg-[#193527] transition flex items-center justify-center gap-1.5"
                        >
                          <span>Open Full Cooking Method</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Additional Match Cards */}
                {generatedResults.length > 1 && (
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#244B39] mb-4">
                      Alternative Recipes with Your Ingredients
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {generatedResults.slice(1).map((r) => (
                        <RecipeCard key={r.id} recipe={r} matchScore={r.matchScore} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Initial Blank Workspace State */}
            {!isGenerating && !generatedResults && (
              <div className="rounded-3xl bg-white p-12 text-center border border-[#A7B99A]/30 shadow-soft space-y-4">
                <div className="h-16 w-16 rounded-full bg-[#F5F0E5] text-[#244B39] flex items-center justify-center mx-auto shadow-inner">
                  <Sparkles className="h-8 w-8 text-[#D99A38]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#244B39]">
                  Ready to compose customized recipes
                </h3>
                <p className="text-xs sm:text-sm text-[#566459] max-w-md mx-auto leading-relaxed">
                  Enter your ingredients on the left panel or click "Pantry Sync" to import directly from your kitchen inventory. RasaGen will craft tailored zero-waste recipes.
                </p>
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 rounded-full bg-[#244B39] px-7 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#193527] transition"
                >
                  <Sparkles className="h-4 w-4 text-[#D99A38]" />
                  <span>Generate with Default Ingredients</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
