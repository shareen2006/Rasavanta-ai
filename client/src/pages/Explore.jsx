import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  RotateCcw, 
  UtensilsCrossed, 
  Sparkles, 
  Clock, 
  Flame, 
  ChevronRight, 
  Check,
  Dumbbell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RECIPES_DATA, 
  CUISINES_LIST, 
  MEAL_TYPES_LIST, 
  DIETARY_OPTIONS_LIST, 
  POPULAR_INGREDIENTS 
} from '../data/recipesData';
import { RecipeCard } from '../components/recipe/RecipeCard';
import { RecipeCarousel } from '../components/carousel/RecipeCarousel';

export const Explore = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || 'all');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [maxCookTime, setMaxCookTime] = useState(90);
  const [maxCalories, setMaxCalories] = useState(800);
  const [minProtein, setMinProtein] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showPantryPicker, setShowPantryPicker] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  // Sync URL search params
  useEffect(() => {
    const cuisineParam = searchParams.get('cuisine');
    if (cuisineParam) {
      setSelectedCuisine(cuisineParam);
    }
    const qParam = searchParams.get('q');
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  // Toggle pantry ingredient for matching
  const toggleIngredient = (ing) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCuisine('all');
    setSelectedMealType('All');
    setSelectedDiet('All');
    setMaxCookTime(90);
    setMaxCalories(800);
    setMinProtein(0);
    setSelectedDifficulty('all');
    setSortBy('rating');
    setSelectedIngredients([]);
    setDisplayCount(12);
    setSearchParams({});
  };

  // Count active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedCuisine !== 'all') count++;
    if (selectedMealType !== 'All') count++;
    if (selectedDiet !== 'All') count++;
    if (maxCookTime < 90) count++;
    if (maxCalories < 800) count++;
    if (minProtein > 0) count++;
    if (selectedDifficulty !== 'all') count++;
    if (selectedIngredients.length > 0) count += selectedIngredients.length;
    return count;
  }, [searchQuery, selectedCuisine, selectedMealType, selectedDiet, maxCookTime, maxCalories, minProtein, selectedDifficulty, selectedIngredients]);

  // Filtered & Sorted Recipes
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter((recipe) => {
      // 1. Search Query (name, description, ingredients, cuisine, region, tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesDesc = recipe.description.toLowerCase().includes(query);
        const matchesIng = recipe.ingredients.some((i) => i.name.toLowerCase().includes(query));
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(query);
        const matchesRegion = recipe.region && recipe.region.toLowerCase().includes(query);
        const matchesMeal = recipe.mealType && recipe.mealType.toLowerCase().includes(query);
        const matchesTags = recipe.tags && recipe.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesIng && !matchesCuisine && !matchesRegion && !matchesMeal && !matchesTags) {
          return false;
        }
      }

      // 2. Cuisine
      if (selectedCuisine !== 'all') {
        const cLower = selectedCuisine.toLowerCase();
        const matchCuisine = 
          recipe.cuisine.toLowerCase() === cLower ||
          (selectedCuisine === 'Andhra' && (recipe.cuisine === 'Andhra' || recipe.cuisine === 'Hyderabadi')) ||
          (selectedCuisine === 'Mediterranean' && (recipe.cuisine === 'Mediterranean' || recipe.cuisine === 'Middle Eastern'));
        if (!matchCuisine) return false;
      }

      // 3. Meal / Food Type
      if (selectedMealType !== 'All') {
        if (!recipe.mealType || recipe.mealType.toLowerCase() !== selectedMealType.toLowerCase()) {
          return false;
        }
      }

      // 4. Dietary Classifications
      if (selectedDiet !== 'All') {
        const d = selectedDiet.toLowerCase();
        if (d === 'vegetarian' && recipe.diet !== 'Vegetarian') return false;
        if (d === 'vegan' && (!recipe.vegan && !recipe.dietaryClassifications?.includes('Vegan'))) return false;
        if (d === 'gluten-free' && (!recipe.glutenFree && !recipe.dietaryClassifications?.includes('Gluten-Free'))) return false;
        if (d === 'dairy-free' && (!recipe.dairyFree && !recipe.dietaryClassifications?.includes('Dairy-Free'))) return false;
        if (d === 'jain' && (!recipe.jainFriendly && !recipe.dietaryClassifications?.includes('Jain'))) return false;
        if (d === 'high-protein' && !recipe.dietaryClassifications?.includes('High-Protein')) return false;
        if (d === 'low-carb' && !recipe.dietaryClassifications?.includes('Low-Carb')) return false;
        if (d === 'pescatarian' && recipe.diet !== 'Pescatarian') return false;
        if (d === 'non-vegetarian' && recipe.diet !== 'Non-Vegetarian') return false;
      }

      // 5. Cook Time
      const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
      if (totalTime > maxCookTime) {
        return false;
      }

      // 6. Max Calories
      if (recipe.calories > maxCalories) {
        return false;
      }

      // 7. Min Protein
      if (minProtein > 0) {
        const proteinNum = parseInt(recipe.nutrition?.protein || '0', 10);
        if (proteinNum < minProtein) return false;
      }

      // 8. Difficulty
      if (selectedDifficulty !== 'all' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // 9. Selected Pantry Ingredients match
      if (selectedIngredients.length > 0) {
        const recipeIngs = recipe.ingredients.map((ing) => ing.name.toLowerCase());
        const hasAllSelected = selectedIngredients.every((uIng) =>
          recipeIngs.some((rIng) => rIng.includes(uIng.toLowerCase()))
        );
        if (!hasAllSelected) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'time') {
        const timeA = (a.prepTime || 0) + (a.cookTime || 0);
        const timeB = (b.prepTime || 0) + (b.cookTime || 0);
        return timeA - timeB;
      }
      if (sortBy === 'calories') {
        return a.calories - b.calories;
      }
      if (sortBy === 'protein') {
        const pA = parseInt(a.nutrition?.protein || '0', 10);
        const pB = parseInt(b.nutrition?.protein || '0', 10);
        return pB - pA;
      }
      if (sortBy === 'popularity') {
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      }
      // default: rating
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [searchQuery, selectedCuisine, selectedMealType, selectedDiet, maxCookTime, maxCalories, minProtein, selectedDifficulty, selectedIngredients, sortBy]);

  // Compute pantry match score if ingredients selected
  const recipesWithMatchScore = useMemo(() => {
    if (selectedIngredients.length === 0) return filteredRecipes;
    return filteredRecipes.map((r) => {
      const rIngs = r.ingredients.map((i) => i.name.toLowerCase());
      let matchedCount = 0;
      selectedIngredients.forEach((u) => {
        if (rIngs.some((ri) => ri.includes(u.toLowerCase()))) {
          matchedCount++;
        }
      });
      const matchScore = Math.min(100, Math.round((matchedCount / selectedIngredients.length) * 100));
      return { ...r, matchScore };
    });
  }, [filteredRecipes, selectedIngredients]);

  const displayedRecipes = recipesWithMatchScore.slice(0, displayCount);
  const featuredList = RECIPES_DATA.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Editorial Search Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#A7B99A]/40 px-3.5 py-1 text-xs font-semibold text-[#244B39] shadow-xs">
            <UtensilsCrossed className="h-3.5 w-3.5 text-[#D99A38]" /> 
            Comprehensive Food & Recipe Library • {RECIPES_DATA.length} Verified Dishes
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#244B39]">
            {t('explore.title')}
          </h1>
          <p className="text-sm text-[#566459] leading-relaxed max-w-2xl mx-auto">
            Explore authentic regional culinary treasures across India—from Andhra spices and Kerala sadyas to Bengali mustard curries—alongside authentic Italian, Japanese, Korean, Mexican, and world classics.
          </p>

          {/* Search Bar Input */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-[#566459]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by recipe name, ingredients, cuisine (e.g. Dosa, Paneer, Italian, Saffron)..."
                className="w-full rounded-full border border-[#A7B99A]/50 bg-white py-3.5 pl-12 pr-10 text-sm text-[#303A32] shadow-soft focus:outline-none focus:ring-2 focus:ring-[#244B39]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-[#566459] hover:text-[#303A32]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* HORIZONTAL CUISINE RIBBON BAR */}
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {CUISINES_LIST.map((c) => {
              const isSelected = selectedCuisine.toLowerCase() === c.id.toLowerCase();
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCuisine(c.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#244B39] text-white shadow-md'
                      : 'bg-white text-[#566459] hover:bg-[#FAF8F2] hover:text-[#244B39] border border-[#A7B99A]/30'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#FAF8F2] text-[#A7B99A]'
                  }`}>
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MEAL TYPE & DIETARY FILTER PILLS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#A7B99A]/30 shadow-xs">
          {/* Meal Type Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A7B99A] mr-1 shrink-0">
              Meal:
            </span>
            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Street Food'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMealType(type)}
                className={`rounded-xl px-3 py-1 text-xs font-semibold shrink-0 transition ${
                  selectedMealType === type
                    ? 'bg-[#D99A38] text-white shadow-xs'
                    : 'bg-[#FAF8F2] text-[#566459] hover:bg-[#F5F0E5] hover:text-[#244B39]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Dietary Quick Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A7B99A] mr-1 shrink-0">
              Diet:
            </span>
            {['All', 'Vegetarian', 'Vegan', 'Jain', 'Gluten-Free', 'High-Protein'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`rounded-xl px-2.5 py-1 text-xs font-semibold shrink-0 transition ${
                  selectedDiet === diet
                    ? 'bg-[#244B39] text-white shadow-xs'
                    : 'bg-[#FAF8F2] text-[#566459] hover:bg-[#F5F0E5] hover:text-[#244B39]'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* PANTRY INGREDIENTS MATCHER TOGGLE */}
        <div className="rounded-2xl bg-white border border-[#A7B99A]/30 p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D99A38]" />
              <span className="text-xs font-bold text-[#244B39]">Cook With What You Have</span>
              <span className="text-[11px] text-[#566459] hidden sm:inline">
                Tap ingredients currently in your kitchen to discover matching recipes:
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPantryPicker(!showPantryPicker)}
              className="text-xs font-bold text-[#244B39] hover:text-[#D99A38] underline"
            >
              {showPantryPicker ? 'Collapse Pantry Bar ▲' : 'Open Pantry Ingredients ▼'}
            </button>
          </div>

          {/* Pantry Ingredients Chips */}
          {(showPantryPicker || selectedIngredients.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-3 mt-3 border-t border-[#F5F0E5]"
            >
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_INGREDIENTS.map((ing) => {
                  const isChecked = selectedIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs transition cursor-pointer ${
                        isChecked
                          ? 'bg-[#244B39] text-white font-bold shadow-xs'
                          : 'bg-[#FAF8F2] text-[#303A32] border border-[#A7B99A]/30 hover:border-[#244B39]'
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3 text-[#D99A38]" />}
                      <span>{ing}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIVE FILTER CHIPS ROW */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-[#566459]">Active Filters ({activeFilterCount}):</span>
            
            {selectedCuisine !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-0.5 text-xs text-[#244B39] font-medium">
                Cuisine: {selectedCuisine}
                <button onClick={() => setSelectedCuisine('all')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            )}

            {selectedMealType !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-0.5 text-xs text-[#244B39] font-medium">
                Meal: {selectedMealType}
                <button onClick={() => setSelectedMealType('All')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            )}

            {selectedDiet !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-0.5 text-xs text-[#244B39] font-medium">
                Diet: {selectedDiet}
                <button onClick={() => setSelectedDiet('All')} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            )}

            {maxCookTime < 90 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-0.5 text-xs text-[#244B39] font-medium">
                ≤ {maxCookTime} mins
                <button onClick={() => setMaxCookTime(90)} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            )}

            {minProtein > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-[#A7B99A]/40 px-3 py-0.5 text-xs text-[#244B39] font-medium">
                Protein ≥ {minProtein}g
                <button onClick={() => setMinProtein(0)} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            )}

            {selectedIngredients.map((ing) => (
              <span key={ing} className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-0.5 text-xs font-medium">
                {ing}
                <button onClick={() => toggleIngredient(ing)} className="hover:text-red-600"><X className="h-3 w-3" /></button>
              </span>
            ))}

            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#D97556] hover:underline ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Featured Mini Carousel banner */}
        <div className="mb-6">
          <RecipeCarousel 
            recipes={featuredList} 
            title="Chef's Heritage & International Showcase" 
            subtitle="Iconic masterworks from Hyderabadi dum biryani to authentic Neapolitan margherita." 
          />
        </div>

        {/* Main Content Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#F5F0E5]">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#244B39]">
                  <Filter className="h-4 w-4 text-[#D99A38]" />
                  <span>Culinary Filters</span>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-[#D97556] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Meal / Food Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-2.5">
                  Food Category
                </label>
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {MEAL_TYPES_LIST.map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMealType(m)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        selectedMealType.toLowerCase() === m.toLowerCase()
                          ? 'bg-[#244B39] text-white font-bold'
                          : 'text-[#566459] hover:bg-[#FAF8F2] hover:text-[#244B39]'
                      }`}
                    >
                      <span>{m}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences (Multi-Classifications) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-2.5">
                  Dietary Classification
                </label>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {DIETARY_OPTIONS_LIST.map((diet) => (
                    <button
                      key={diet}
                      onClick={() => setSelectedDiet(diet)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                        selectedDiet.toLowerCase() === diet.toLowerCase()
                          ? 'bg-[#244B39] text-white font-bold'
                          : 'text-[#566459] hover:bg-[#FAF8F2] hover:text-[#244B39]'
                      }`}
                    >
                      <span>{diet}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cook Time Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#303A32]">
                    Total Time
                  </label>
                  <span className="text-xs font-bold text-[#244B39]">≤ {maxCookTime} min</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="5"
                  value={maxCookTime}
                  onChange={(e) => setMaxCookTime(Number(e.target.value))}
                  className="w-full accent-[#244B39]"
                />
                <div className="flex justify-between text-[10px] text-[#566459] mt-1">
                  <span>15 min</span>
                  <span>45 min</span>
                  <span>90 min</span>
                </div>
              </div>

              {/* Minimum Protein Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#303A32] flex items-center gap-1">
                    <Dumbbell className="h-3 w-3 text-[#244B39]" /> Min Protein
                  </label>
                  <span className="text-xs font-bold text-[#244B39]">{minProtein}g+</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="5"
                  value={minProtein}
                  onChange={(e) => setMinProtein(Number(e.target.value))}
                  className="w-full accent-[#244B39]"
                />
                <div className="flex justify-between text-[10px] text-[#566459] mt-1">
                  <span>Any</span>
                  <span>10g</span>
                  <span>25g</span>
                </div>
              </div>

              {/* Max Calories Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#303A32] flex items-center gap-1">
                    <Flame className="h-3 w-3 text-[#D97556]" /> Max Calories
                  </label>
                  <span className="text-xs font-bold text-[#244B39]">≤ {maxCalories} kcal</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="50"
                  value={maxCalories}
                  onChange={(e) => setMaxCalories(Number(e.target.value))}
                  className="w-full accent-[#244B39]"
                />
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-2.5">
                  {t('explore.filterDifficulty')}
                </label>
                <div className="space-y-1.5">
                  {['all', 'Beginner Friendly', 'Intermediate', 'Advanced'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`w-full text-left rounded-xl px-3 py-1.5 text-xs transition ${
                        selectedDifficulty === diff
                          ? 'bg-[#D99A38]/20 text-[#244B39] font-bold border border-[#D99A38]'
                          : 'text-[#566459] hover:bg-[#FAF8F2]'
                      }`}
                    >
                      {diff === 'all' ? 'All Skill Levels' : diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RECIPE RESULTS MAIN GRID */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar (Sort & Mobile Filter Trigger) */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-[#A7B99A]/30 shadow-xs">
              <div className="text-xs font-semibold text-[#566459]">
                Showing <strong className="text-[#244B39] font-bold">{Math.min(displayCount, recipesWithMatchScore.length)}</strong> of <strong className="text-[#244B39] font-bold">{recipesWithMatchScore.length}</strong> recipes
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Drawer Button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 rounded-full border border-[#A7B99A]/50 bg-[#FAF8F2] px-3.5 py-1.5 text-xs font-bold text-[#244B39]"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#566459]">{t('explore.sortLabel')}:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3 py-1.5 text-xs font-semibold text-[#244B39] focus:outline-none"
                  >
                    <option value="rating">Top Rated</option>
                    <option value="time">Fastest Cook Time</option>
                    <option value="calories">Lowest Calories</option>
                    <option value="protein">Highest Protein</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recipes Grid */}
            {displayedRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    matchScore={recipe.matchScore} 
                  />
                ))}
              </div>
            ) : (
              /* Clear Empty State */
              <div className="rounded-3xl bg-white p-12 text-center border border-[#A7B99A]/30 shadow-soft">
                <UtensilsCrossed className="mx-auto h-12 w-12 text-[#A7B99A]/60 mb-3" />
                <h3 className="font-serif text-xl font-bold text-[#244B39]">
                  {t('explore.noResults')}
                </h3>
                <p className="text-xs text-[#566459] mt-2 max-w-md mx-auto">
                  No recipes found matching your exact filter criteria. Try adjusting your cooking time, loosening dietary constraints, or clearing ingredients.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#193527] transition"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {recipesWithMatchScore.length > displayCount && (
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => setDisplayCount((prev) => prev + 12)}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-[#244B39] px-8 py-3 text-xs font-bold text-[#244B39] hover:bg-[#244B39] hover:text-white transition-all shadow-sm cursor-pointer"
                >
                  <span>Load More Recipes</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative ml-auto h-full w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F5F0E5]">
                  <h3 className="font-serif text-xl font-bold text-[#244B39]">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)} className="p-1">
                    <X className="h-5 w-5 text-[#566459]" />
                  </button>
                </div>

                {/* Mobile Cuisine */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    Cuisine
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs font-medium"
                  >
                    {CUISINES_LIST.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Food / Meal Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    Food Category
                  </label>
                  <select
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value)}
                    className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs font-medium"
                  >
                    {MEAL_TYPES_LIST.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Dietary */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                    Dietary
                  </label>
                  <select
                    value={selectedDiet}
                    onChange={(e) => setSelectedDiet(e.target.value)}
                    className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] p-2.5 text-xs font-medium"
                  >
                    {DIETARY_OPTIONS_LIST.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Cook Time */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                    Max Time: ≤ {maxCookTime} min
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    step="5"
                    value={maxCookTime}
                    onChange={(e) => setMaxCookTime(Number(e.target.value))}
                    className="w-full accent-[#244B39]"
                  />
                </div>

                {/* Mobile Min Protein */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                    Min Protein: {minProtein}g+
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={minProtein}
                    onChange={(e) => setMinProtein(Number(e.target.value))}
                    className="w-full accent-[#244B39]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F5F0E5] flex gap-2">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="w-1/2 rounded-full border border-[#A7B99A]/40 py-2.5 text-xs font-bold text-[#566459]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-1/2 rounded-full bg-[#244B39] py-2.5 text-xs font-bold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
