import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RECIPES_DATA } from '../data/recipesData';
import { useRecipes } from '../context/RecipeContext';
import { usePantry } from '../context/PantryContext';
import { 
  Calendar, 
  Sparkles, 
  Clock, 
  Flame, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Check, 
  ChefHat, 
  ArrowRight,
  Filter,
  ShoppingCart,
  X,
  Search,
  CheckCircle2,
  Utensils
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const DAYS_OF_WEEK = [
  { id: 'mon', name: 'Monday', short: 'Mon' },
  { id: 'tue', name: 'Tuesday', short: 'Tue' },
  { id: 'wed', name: 'Wednesday', short: 'Wed' },
  { id: 'thu', name: 'Thursday', short: 'Thu' },
  { id: 'fri', name: 'Friday', short: 'Fri' },
  { id: 'sat', name: 'Saturday', short: 'Sat' },
  { id: 'sun', name: 'Sunday', short: 'Sun' }
];

const MEAL_SLOTS = [
  { id: 'breakfast', name: 'Breakfast', time: '08:00 AM' },
  { id: 'lunch', name: 'Lunch', time: '01:00 PM' },
  { id: 'snack', name: 'Evening Snack', time: '05:00 PM' },
  { id: 'dinner', name: 'Dinner', time: '08:30 PM' }
];

const MEAL_PLAN_STORAGE_KEY = 'rasavanta_weekly_meal_plan';

// Generate default authentic weekly plan from recipes catalog
const generateDefaultPlan = () => {
  const recipes = RECIPES_DATA;
  if (!recipes || recipes.length === 0) return {};

  const getRecipe = (idx) => recipes[idx % recipes.length]?.id;

  return {
    mon: {
      breakfast: getRecipe(1), // Masala Dosa
      lunch: getRecipe(0),     // Gutti Vankaya
      snack: getRecipe(4),     // Samosa / snack
      dinner: getRecipe(3)     // Pulao
    },
    tue: {
      breakfast: getRecipe(1),
      lunch: getRecipe(2),     // Hyderabadi Biryani
      snack: getRecipe(5),
      dinner: getRecipe(0)
    },
    wed: {
      breakfast: getRecipe(1),
      lunch: getRecipe(3),
      snack: getRecipe(4),
      dinner: getRecipe(2)
    },
    thu: {
      breakfast: getRecipe(1),
      lunch: getRecipe(0),
      snack: getRecipe(5),
      dinner: getRecipe(3)
    },
    fri: {
      breakfast: getRecipe(1),
      lunch: getRecipe(2),
      snack: getRecipe(4),
      dinner: getRecipe(0)
    },
    sat: {
      breakfast: getRecipe(1),
      lunch: getRecipe(3),
      snack: getRecipe(5),
      dinner: getRecipe(2)
    },
    sun: {
      breakfast: getRecipe(1),
      lunch: getRecipe(2),
      snack: getRecipe(4),
      dinner: getRecipe(0)
    }
  };
};

export const MealPlanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites } = useRecipes();
  const { items: pantryItems } = usePantry();

  // Active day selection ('all' or specific day ID)
  const [selectedDay, setSelectedDay] = useState('mon');
  const [dietFilter, setDietFilter] = useState('all'); // 'all' | 'Vegetarian' | 'Non-Vegetarian'

  // Weekly plan state with local persistence
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(MEAL_PLAN_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return generateDefaultPlan();
  });

  useEffect(() => {
    try {
      localStorage.setItem(MEAL_PLAN_STORAGE_KEY, JSON.stringify(mealPlan));
    } catch {
      // ignore
    }
  }, [mealPlan]);

  // Modal for assigning recipe to slot
  const [pickerModal, setPickerModal] = useState({
    isOpen: false,
    dayId: null,
    slotId: null
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Lookup recipe by ID
  const getRecipeById = (id) => {
    if (!id) return null;
    return RECIPES_DATA.find((r) => r.id === id) || null;
  };

  // Assign recipe to a slot
  const handleAssignRecipe = (recipeId) => {
    if (!pickerModal.dayId || !pickerModal.slotId) return;

    setMealPlan((prev) => ({
      ...prev,
      [pickerModal.dayId]: {
        ...(prev[pickerModal.dayId] || {}),
        [pickerModal.slotId]: recipeId
      }
    }));

    toast.success('Meal added to schedule!');
    setPickerModal({ isOpen: false, dayId: null, slotId: null });
    setSearchQuery('');
  };

  // Remove recipe from a slot
  const handleRemoveSlot = (dayId, slotId) => {
    setMealPlan((prev) => {
      const dayPlan = { ...(prev[dayId] || {}) };
      delete dayPlan[slotId];
      return {
        ...prev,
        [dayId]: dayPlan
      };
    });
    toast('Meal removed from schedule', { icon: '🗑️' });
  };

  // AI Auto-Generate Weekly Plan
  const handleAutoGenerate = () => {
    const pool = dietFilter === 'all' 
      ? RECIPES_DATA 
      : RECIPES_DATA.filter((r) => r.diet === dietFilter);

    if (pool.length === 0) {
      toast.error('No recipes matching filter criteria.');
      return;
    }

    const newPlan = {};
    DAYS_OF_WEEK.forEach((d, dIdx) => {
      newPlan[d.id] = {
        breakfast: pool[(dIdx * 3 + 0) % pool.length].id,
        lunch: pool[(dIdx * 3 + 1) % pool.length].id,
        snack: pool[(dIdx * 3 + 2) % pool.length].id,
        dinner: pool[(dIdx * 3 + 3) % pool.length].id
      };
    });

    setMealPlan(newPlan);
    toast.success('AI Kitchen has planned a fresh 7-day culinary menu!', {
      icon: '✨'
    });
  };

  // Clear all meals
  const handleClearWeek = () => {
    setMealPlan({});
    toast('Weekly meal plan reset', { icon: '🧹' });
  };

  // Open Smart Basket with ingredients
  const handleExportGrocery = () => {
    try {
      localStorage.setItem('rasavanta_meal_plan', JSON.stringify(mealPlan));
    } catch {
      // ignore
    }
    toast.success('Opening Smart Basket™ grocery synchronizer!', { icon: '🛒' });
    navigate('/basket');
  };

  // Calculate daily totals for active day
  const dailyMetrics = useMemo(() => {
    const daySlots = mealPlan[selectedDay] || {};
    let totalCalories = 0;
    let totalPrep = 0;
    let recipeCount = 0;

    Object.values(daySlots).forEach((rId) => {
      const r = getRecipeById(rId);
      if (r) {
        totalCalories += r.calories || 350;
        totalPrep += (r.prepTime || 15) + (r.cookTime || 25);
        recipeCount++;
      }
    });

    return {
      calories: totalCalories,
      prepTime: totalPrep,
      recipes: recipeCount
    };
  }, [mealPlan, selectedDay]);

  // Filtered recipes for the picker modal
  const filteredPickerRecipes = useMemo(() => {
    return RECIPES_DATA.filter((r) => {
      if (dietFilter !== 'all' && r.diet !== dietFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          (r.tags && r.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [dietFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12 text-[#303A32]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ============================================================== */}
        {/* 1. HEADER SECTION                                              */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#A7B99A]/30">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#244B39] text-[#D99A38] px-3.5 py-1 text-xs font-bold shadow-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>Weekly Culinary Architecture</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#244B39] tracking-tight">
              MealCraft™ — 7-Day Meal Planner
            </h1>
            <p className="text-sm text-[#566459] max-w-2xl leading-relaxed">
              Design nutritionally balanced Indian meal routines with MealCraft, synchronize recipes with your Smart Pantry ingredients, and eliminate last-minute dinner indecision.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleAutoGenerate}
              className="inline-flex items-center gap-2 rounded-full bg-[#244B39] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#193527] transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-[#D99A38]" />
              <span>AI Auto-Plan Week</span>
            </button>

            <button
              onClick={handleExportGrocery}
              className="inline-flex items-center gap-2 rounded-full bg-white border border-[#A7B99A]/40 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#244B39] hover:bg-[#FAF8F2] hover:border-[#244B39] transition shadow-xs cursor-pointer"
              title="View and synchronize ingredients in Smart Basket"
            >
              <ShoppingCart className="h-4 w-4 text-[#D99A38]" />
              <span>Smart Basket Sync</span>
            </button>

            <button
              onClick={handleClearWeek}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-[#A7B99A]/30 px-3.5 py-2.5 text-xs font-semibold text-[#566459] hover:text-rose-600 hover:border-rose-300 transition cursor-pointer"
              title="Reset meal plan"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. WEEKLY SUMMARY KPIS                                         */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white p-5 border border-[#A7B99A]/30 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Planned Meals</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] mt-1.5">
              {Object.values(mealPlan).reduce((acc, day) => acc + Object.keys(day || {}).length, 0)} / 28
            </div>
            <div className="text-[11px] text-[#A7B99A] mt-0.5">Across 7 days</div>
          </div>

          <div className="rounded-3xl bg-white p-5 border border-[#A7B99A]/30 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Today's Calories</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D99A38] mt-1.5">
              {dailyMetrics.calories} kcal
            </div>
            <div className="text-[11px] text-[#566459] mt-0.5">Ayurvedically balanced</div>
          </div>

          <div className="rounded-3xl bg-white p-5 border border-[#A7B99A]/30 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Est. Cook Time</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] mt-1.5">
              {dailyMetrics.prepTime} mins
            </div>
            <div className="text-[11px] text-[#A7B99A] mt-0.5">For {dailyMetrics.recipes} planned dishes</div>
          </div>

          <div className="rounded-3xl bg-white p-5 border border-[#A7B99A]/30 shadow-soft">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Pantry Alignment</div>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700 mt-1.5">
              92%
            </div>
            <div className="text-[11px] text-emerald-600 mt-0.5">High zero-waste score</div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DAY SELECTOR & DIET FILTER BAR                              */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-2 sm:p-2.5 rounded-3xl border border-[#A7B99A]/35 shadow-xs backdrop-blur-xs">
          
          {/* Day Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDay === day.id;
              const dayMeals = Object.keys(mealPlan[day.id] || {}).length;
              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#244B39] text-white shadow-xs'
                      : 'text-[#303A32] hover:bg-[#F5F0E5] hover:text-[#244B39]'
                  }`}
                >
                  <span>{day.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#D99A38] text-white' : 'bg-[#FAF8F2] text-[#566459]'
                  }`}>
                    {dayMeals}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Diet Preference Filter */}
          <div className="flex items-center gap-2 pl-2 sm:border-l border-[#A7B99A]/30">
            <span className="text-xs font-semibold text-[#566459] hidden md:inline">Diet:</span>
            {['all', 'Vegetarian', 'Non-Vegetarian'].map((diet) => (
              <button
                key={diet}
                onClick={() => setDietFilter(diet)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  dietFilter === diet
                    ? 'bg-[#D99A38] text-white shadow-xs'
                    : 'bg-white border border-[#A7B99A]/30 text-[#566459] hover:border-[#244B39]'
                }`}
              >
                {diet === 'all' ? 'All Diets' : diet === 'Vegetarian' ? 'Veg Only' : 'Non-Veg'}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. ACTIVE DAY MEAL SLOTS GRID                                  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEAL_SLOTS.map((slot) => {
            const recipeId = mealPlan[selectedDay]?.[slot.id];
            const recipe = getRecipeById(recipeId);

            return (
              <div 
                key={slot.id}
                className="flex flex-col justify-between rounded-3xl bg-white border border-[#A7B99A]/35 shadow-soft hover:shadow-card-hover transition-all duration-300 p-5 space-y-4"
              >
                {/* Slot Header */}
                <div className="flex items-center justify-between border-b border-[#A7B99A]/20 pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#244B39]">
                      {slot.name}
                    </h3>
                    <div className="text-[11px] text-[#566459]">{slot.time}</div>
                  </div>

                  <span className="rounded-full bg-[#FAF8F2] px-2.5 py-1 text-[10px] font-bold text-[#D99A38] border border-[#A7B99A]/30">
                    {recipe ? `${recipe.calories || 300} kcal` : 'Unassigned'}
                  </span>
                </div>

                {/* Slot Content */}
                {recipe ? (
                  <div className="space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-gray-100 mb-3 group">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1.5">
                          <span className="rounded-full bg-[#244B39]/90 text-white text-[10px] font-bold px-2 py-0.5">
                            {recipe.cuisine}
                          </span>
                          <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 ${
                            recipe.diet === 'Vegetarian'
                              ? 'bg-emerald-800 text-emerald-100'
                              : 'bg-rose-800 text-rose-100'
                          }`}>
                            {recipe.diet}
                          </span>
                        </div>
                      </div>

                      {/* Recipe Title & Details */}
                      <Link 
                        to={`/recipes/${recipe.id}`}
                        className="font-serif text-base font-bold text-[#244B39] hover:text-[#D99A38] transition line-clamp-1"
                      >
                        {recipe.title}
                      </Link>

                      <p className="text-xs text-[#566459] line-clamp-2 mt-1">
                        {recipe.description}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-[#566459] mt-2.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#D99A38]" />
                          <span>{(recipe.prepTime || 15) + (recipe.cookTime || 25)} mins</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Flame className="h-3.5 w-3.5 text-[#D99A38]" />
                          <span>{recipe.nutrition?.protein || '12g'} protein</span>
                        </span>
                      </div>
                    </div>

                    {/* Slot Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#A7B99A]/20">
                      <button
                        onClick={() => setPickerModal({ isOpen: true, dayId: selectedDay, slotId: slot.id })}
                        className="flex-1 rounded-xl bg-[#FAF8F2] border border-[#A7B99A]/30 py-2 text-xs font-bold text-[#244B39] hover:bg-[#244B39] hover:text-white transition cursor-pointer"
                      >
                        Change Recipe
                      </button>

                      <button
                        onClick={() => handleRemoveSlot(selectedDay, slot.id)}
                        className="h-8 w-8 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
                        title="Remove from meal slot"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty Slot Call to Action */
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#A7B99A]/40 rounded-2xl p-6 text-center space-y-3 bg-[#FAF8F2]/60">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-[#D99A38] shadow-xs">
                      <Utensils className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#244B39]">No meal planned</div>
                      <div className="text-[11px] text-[#566459]">Choose a delicious recipe</div>
                    </div>
                    <button
                      onClick={() => setPickerModal({ isOpen: true, dayId: selectedDay, slotId: slot.id })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#244B39] text-white px-4 py-2 text-xs font-bold hover:bg-[#193527] transition shadow-xs cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Select Recipe</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* 5. QUICK RECIPE PICKER MODAL                                   */}
        {/* ============================================================== */}
        <AnimatePresence>
          {pickerModal.isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#A7B99A]/40 flex flex-col justify-between space-y-4"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#A7B99A]/30 pb-3">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#244B39]">
                      Select Recipe for {MEAL_SLOTS.find((s) => s.id === pickerModal.slotId)?.name}
                    </h3>
                    <p className="text-xs text-[#566459]">
                      Assigning to {DAYS_OF_WEEK.find((d) => d.id === pickerModal.dayId)?.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setPickerModal({ isOpen: false, dayId: null, slotId: null })}
                    className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[#566459] hover:bg-gray-200 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes by name, cuisine, ingredients..."
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:border-[#244B39]"
                  />
                </div>

                {/* Recipe List */}
                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[50vh] pr-1">
                  {filteredPickerRecipes.map((r) => (
                    <div
                      key={r.id}
                      onClick={() => handleAssignRecipe(r.id)}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[#A7B99A]/30 hover:border-[#244B39] hover:bg-[#FAF8F2] transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#244B39] group-hover:text-[#D99A38] transition">
                            {r.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#566459] mt-0.5">
                            <span>{r.cuisine}</span>
                            <span>•</span>
                            <span>{r.diet}</span>
                            <span>•</span>
                            <span>{r.calories || 320} kcal</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rounded-full bg-[#244B39] text-white px-3.5 py-1.5 text-xs font-bold group-hover:bg-[#D99A38] transition"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealPlanner;