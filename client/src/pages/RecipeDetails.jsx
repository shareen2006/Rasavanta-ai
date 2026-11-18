import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecipes } from '../context/RecipeContext';
import { RECIPES_DATA } from '../data/recipesData';
import { 
  Clock, 
  Users, 
  Flame, 
  ChefHat, 
  Heart, 
  Share2, 
  ArrowLeft, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite, saveToCookbook, isSavedInCookbook } = useRecipes();

  // Find recipe
  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Interactive Cooking Mode
  const [cookingModeOpen, setCookingModeOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const found = RECIPES_DATA.find((r) => r.id === id);
    if (found) {
      setRecipe(found);
      setServings(found.servings || 4);
    } else {
      // If generated or not found, fallback to first
      setRecipe(RECIPES_DATA[0]);
      setServings(RECIPES_DATA[0].servings || 4);
    }
    setCheckedIngredients({});
  }, [id]);

  // Step Timer
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      toast('Timer completed for this step! 🔔', { icon: '⏰' });
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // When step changes in cooking mode, initialize timer
  useEffect(() => {
    if (cookingModeOpen && recipe?.instructions?.[currentStepIndex]) {
      const stepTimer = recipe.instructions[currentStepIndex].timerSeconds || 300;
      setTimerSeconds(stepTimer);
      setTimerRunning(false);
    }
  }, [currentStepIndex, cookingModeOpen, recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#F5F0E5] flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold text-[#566459]">Loading recipe...</p>
          <button onClick={() => navigate('/recipes')} className="text-xs font-bold text-[#244B39]">
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const nativeTitle = recipe.nativeTitles?.[i18n.language] || recipe.title;
  const favorite = isFavorite(recipe.id);
  const saved = isSavedInCookbook(recipe.id);
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  // Scaled ingredients
  const scaleFactor = servings / (recipe.servings || 4);

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('recipeDetails.shareCopied'));
  };

  const handleFinishCooking = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    toast.success(t('cookingMode.completed'), { duration: 5000 });
    setCookingModeOpen(false);
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#244B39] hover:text-[#D99A38] transition"
        >
          <ArrowLeft className="h-4 w-4" /> {t('recipeDetails.back')}
        </Link>

        {/* Magazine Editorial Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#244B39] px-3.5 py-1 text-xs font-bold text-white shadow-xs">
              {recipe.cuisine} {recipe.region ? `• ${recipe.region}` : ''}
            </span>
            {recipe.mealType && (
              <span className="rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/40 px-3 py-1 text-xs font-bold">
                {recipe.mealType}
              </span>
            )}
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
              {recipe.diet}
            </span>
            {recipe.glutenFree && (
              <span className="rounded-full bg-teal-100 text-teal-800 px-3 py-1 text-xs font-bold">
                Gluten-Free
              </span>
            )}
            {recipe.vegan && (
              <span className="rounded-full bg-green-100 text-green-800 px-3 py-1 text-xs font-bold">
                Vegan
              </span>
            )}
            {recipe.jainFriendly && (
              <span className="rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-bold">
                Jain Friendly
              </span>
            )}
            {recipe.dietaryClassifications?.includes('High-Protein') && (
              <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-bold">
                High-Protein
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#244B39] tracking-tight leading-tight">
            {recipe.title}
          </h1>

          {nativeTitle && nativeTitle !== recipe.title && (
            <div className="text-lg font-medium text-[#566459]">
              {nativeTitle}
            </div>
          )}

          <p className="text-sm sm:text-base text-[#566459] leading-relaxed max-w-3xl">
            {recipe.description}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-[#A7B99A]/30 py-4">
            <div className="flex items-center gap-6 text-xs text-[#566459]">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#D99A38]" />
                <span>{recipe.prepTime}m prep + {recipe.cookTime}m cook</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-[#D97556]" />
                <span>{recipe.calories} kcal / serving</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ChefHat className="h-4 w-4 text-[#244B39]" />
                <span>{recipe.difficulty}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(recipe.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold border transition ${
                  favorite
                    ? 'bg-[#D97556] text-white border-[#D97556]'
                    : 'bg-white text-[#303A32] border-[#A7B99A]/40 hover:bg-[#F5F0E5]'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorite ? 'fill-white' : ''}`} />
                <span>{favorite ? 'Favorited' : 'Favorite'}</span>
              </button>

              <button
                type="button"
                onClick={() => saveToCookbook(recipe)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold border transition ${
                  saved
                    ? 'bg-[#244B39] text-white border-[#244B39]'
                    : 'bg-white text-[#244B39] border-[#244B39] hover:bg-[#244B39]/5'
                }`}
              >
                <span>{saved ? t('recipeDetails.saved') : t('recipeDetails.saveCookbook')}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-full bg-white border border-[#A7B99A]/40 p-2 text-[#566459] hover:text-[#244B39] transition"
                title={t('recipeDetails.share')}
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Large Editorial Photograph */}
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-3xl shadow-xl border-4 border-white bg-white">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = '/images/rasavanta-recipe-placeholder.svg'; }}
          />
        </div>

        {/* Interactive Cooking Mode CTA Banner */}
        <div className="rounded-3xl bg-[#244B39] p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h3 className="font-serif text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#D99A38]" />
              Ready to start cooking this dish?
            </h3>
            <p className="text-xs text-[#F5F0E5]/80 mt-1">
              Launch distraction-free cooking companion mode with live step timers and large text for your kitchen counter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCurrentStepIndex(0);
              setCookingModeOpen(true);
            }}
            className="shrink-0 rounded-full bg-[#D99A38] px-6 py-3 text-xs font-bold text-[#303A32] shadow-md hover:bg-[#E8B45E] transition"
          >
            {t('recipeDetails.cookingModeBtn')}
          </button>
        </div>

        {/* Main Content Layout: Ingredients on Left, Method on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* INGREDIENTS CHECKLIST (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#F5F0E5]">
              <h2 className="font-serif text-xl font-bold text-[#244B39]">
                {t('recipeDetails.ingredientsTitle')}
              </h2>

              {/* Servings Scaler */}
              <div className="flex items-center gap-1.5 rounded-full bg-[#FAF8F2] border border-[#A7B99A]/30 p-1">
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="h-6 w-6 rounded-full bg-white text-xs font-bold text-[#244B39] shadow-xs"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-[#244B39]">
                  {servings} {t('recipeDetails.servings')}
                </span>
                <button
                  type="button"
                  onClick={() => setServings((s) => s + 1)}
                  className="h-6 w-6 rounded-full bg-white text-xs font-bold text-[#244B39] shadow-xs"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#566459] italic">
              {t('recipeDetails.scaleNote')}
            </p>

            {/* Checklist Items */}
            <ul className="space-y-2.5">
              {recipe.ingredients.map((ing, idx) => {
                const scaledQty = Math.round(ing.quantity * scaleFactor * 10) / 10;
                const isChecked = !!checkedIngredients[idx];

                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition ${
                      isChecked
                        ? 'bg-emerald-50/70 border border-emerald-200'
                        : 'bg-[#FAF8F2] border border-[#A7B99A]/20 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-lg border flex items-center justify-center transition ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-[#A7B99A] bg-white text-transparent'
                      }`}>
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className={`text-xs sm:text-sm font-medium ${
                        isChecked ? 'line-through text-[#566459]' : 'text-[#303A32]'
                      }`}>
                        {ing.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-[#244B39]">
                      {scaledQty} {ing.unit}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Smart Substitutions Box */}
            {recipe.substitutions && recipe.substitutions.length > 0 && (
              <div className="pt-4 border-t border-[#F5F0E5] space-y-3">
                <h3 className="font-serif text-base font-bold text-[#244B39] flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D99A38]" />
                  {t('recipeDetails.substitutionsTitle')}
                </h3>
                <div className="space-y-2">
                  {recipe.substitutions.map((sub, sIdx) => (
                    <div key={sIdx} className="rounded-2xl bg-amber-50/60 p-3 border border-amber-200/50 text-xs">
                      <div className="font-bold text-[#244B39]">
                        If missing: <span className="line-through text-[#D97556]">{sub.original}</span> → <span className="text-emerald-700">{sub.substitute}</span>
                      </div>
                      <p className="text-[11px] text-[#566459] mt-0.5">{sub.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP-BY-STEP METHOD (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#244B39] pb-4 border-b border-[#F5F0E5]">
                {t('recipeDetails.instructionsTitle')}
              </h2>

              <div className="space-y-6">
                {recipe.instructions.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-9 w-9 rounded-full bg-[#244B39] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {step.step}
                      </div>
                      {step.step < recipe.instructions.length && (
                        <div className="w-0.5 flex-1 bg-[#A7B99A]/40 my-2" />
                      )}
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif text-base font-bold text-[#244B39]">
                          {step.title}
                        </h4>
                        {step.timerSeconds && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF8F2] px-2.5 py-0.5 text-[11px] font-semibold text-[#566459]">
                            <Clock className="h-3 w-3 text-[#D99A38]" />
                            {Math.round(step.timerSeconds / 60)} min
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#566459] leading-relaxed mt-2">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Profile Breakdown */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif text-xl font-bold text-[#244B39] flex items-center gap-2">
                  <Scale className="h-5 w-5 text-[#D97556]" />
                  NutriSense™ Verified Nutrition (Per Serving)
                </h3>
                <span className="text-[11px] font-semibold text-[#566459] bg-[#FAF8F2] px-2.5 py-1 rounded-full border border-[#A7B99A]/30">
                  {recipe.calories} kcal
                </span>
              </div>

              {/* Macronutrient Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-[#FAF8F2] p-3 sm:p-4 text-center border border-[#A7B99A]/20">
                  <div className="text-[11px] font-medium text-[#566459]">{t('recipeDetails.protein')}</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#244B39] mt-0.5">
                    {recipe.nutrition.protein}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 sm:p-4 text-center border border-[#A7B99A]/20">
                  <div className="text-[11px] font-medium text-[#566459]">{t('recipeDetails.carbs')}</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#244B39] mt-0.5">
                    {recipe.nutrition.carbs}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 sm:p-4 text-center border border-[#A7B99A]/20">
                  <div className="text-[11px] font-medium text-[#566459]">{t('recipeDetails.fat')}</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-[#244B39] mt-0.5">
                    {recipe.nutrition.fat}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 sm:p-4 text-center border border-[#A7B99A]/20">
                  <div className="text-[11px] font-medium text-[#566459]">Dietary Fiber</div>
                  <div className="font-serif text-lg sm:text-xl font-bold text-emerald-800 mt-0.5">
                    {recipe.nutrition.fiber}
                  </div>
                </div>
              </div>

              {/* Micronutrients breakdown */}
              {recipe.nutrition.micronutrients && (
                <div className="pt-3 border-t border-[#F5F0E5]">
                  <div className="text-xs font-bold text-[#244B39] mb-2">Key Micronutrients & Electrolytes</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="rounded-xl bg-[#FAF8F2] p-2 border border-[#A7B99A]/20">
                      <span className="text-[10px] text-[#566459] block">Iron</span>
                      <strong className="text-[#244B39]">{recipe.nutrition.micronutrients.iron || '—'}</strong>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F2] p-2 border border-[#A7B99A]/20">
                      <span className="text-[10px] text-[#566459] block">Calcium</span>
                      <strong className="text-[#244B39]">{recipe.nutrition.micronutrients.calcium || '—'}</strong>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F2] p-2 border border-[#A7B99A]/20">
                      <span className="text-[10px] text-[#566459] block">Vitamin C</span>
                      <strong className="text-[#244B39]">{recipe.nutrition.micronutrients.vitaminC || '—'}</strong>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F2] p-2 border border-[#A7B99A]/20">
                      <span className="text-[10px] text-[#566459] block">Potassium</span>
                      <strong className="text-[#244B39]">{recipe.nutrition.micronutrients.potassium || '—'}</strong>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F2] p-2 border border-[#A7B99A]/20 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-[#566459] block">Sodium</span>
                      <strong className="text-[#244B39]">{recipe.nutrition.micronutrients.sodium || '—'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Allergens & Scientific Source Attribution */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F5F0E5] text-[11px] text-[#566459]">
                <div>
                  <span className="font-bold text-[#303A32]">Allergen Advisory: </span>
                  {recipe.allergens && recipe.allergens.length > 0 && recipe.allergens[0] !== 'None' ? (
                    <span className="text-amber-800 font-semibold">Contains {recipe.allergens.join(', ')}</span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">No Major Common Allergens Declared</span>
                  )}
                </div>
                <div className="italic text-[10px]">
                  Source: {recipe.nutritionSource || 'ICMR-NIN IFCT & USDA FoodData Central'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-SCREEN COOKING MODE OVERLAY */}
      <AnimatePresence>
        {cookingModeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#F5F0E5] p-4 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="mx-auto w-full max-w-4xl flex items-center justify-between pb-4 border-b border-[#A7B99A]/30">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D99A38]">
                  {t('cookingMode.title')}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#244B39]">{recipe.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setCookingModeOpen(false)}
                className="rounded-full bg-white p-2.5 text-[#566459] hover:text-[#303A32] shadow-xs"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Stage */}
            <div className="mx-auto w-full max-w-3xl flex-1 flex flex-col justify-center py-8">
              
              {/* Step Counter & Progress bar */}
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#244B39]">
                  <span>{t('cookingMode.stepOf', { current: currentStepIndex + 1, total: recipe.instructions.length })}</span>
                  <span>{Math.round(((currentStepIndex + 1) / recipe.instructions.length) * 100)}% Completed</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#A7B99A]/30 overflow-hidden">
                  <div
                    className="h-full bg-[#244B39] transition-all duration-300"
                    style={{ width: `${((currentStepIndex + 1) / recipe.instructions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Card */}
              <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#A7B99A]/30 shadow-xl space-y-6">
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#244B39]">
                  {recipe.instructions[currentStepIndex].title}
                </h2>
                <p className="text-base sm:text-xl text-[#303A32] leading-relaxed">
                  {recipe.instructions[currentStepIndex].text}
                </p>

                {/* Step Timer Display */}
                <div className="pt-6 border-t border-[#F5F0E5] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-[#D99A38]" />
                    <span className="font-mono text-3xl font-bold text-[#244B39]">
                      {formatTimer(timerSeconds)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTimerRunning(!timerRunning)}
                      className="flex items-center gap-2 rounded-full bg-[#244B39] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#193527]"
                    >
                      {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{timerRunning ? t('cookingMode.timerPause') : t('cookingMode.timerStart')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTimerRunning(false);
                        setTimerSeconds(recipe.instructions[currentStepIndex].timerSeconds || 300);
                      }}
                      className="rounded-full bg-[#FAF8F2] p-2.5 text-[#566459] hover:bg-white"
                      title={t('cookingMode.timerReset')}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
                  className="flex items-center gap-2 rounded-full bg-white border border-[#A7B99A]/40 px-6 py-3 text-xs font-bold text-[#244B39] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF8F2]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t('cookingMode.prev')}</span>
                </button>

                {currentStepIndex < recipe.instructions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStepIndex((p) => p + 1)}
                    className="flex items-center gap-2 rounded-full bg-[#244B39] px-7 py-3 text-xs font-bold text-white hover:bg-[#193527] shadow-md"
                  >
                    <span>{t('cookingMode.next')}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinishCooking}
                    className="flex items-center gap-2 rounded-full bg-[#D99A38] px-8 py-3 text-xs font-bold text-[#303A32] hover:bg-[#E8B45E] shadow-lg animate-bounce"
                  >
                    <span>{t('cookingMode.finish')}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
