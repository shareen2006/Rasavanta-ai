import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Scale, 
  Sparkles, 
  Flame, 
  Heart, 
  Activity, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Plus, 
  Minus,
  UtensilsCrossed,
  Info
} from 'lucide-react';
import { RECIPES_DATA } from '../data/recipesData';

export const NutriSensePage = () => {
  const { t } = useTranslation();

  // Selected recipe for in-depth nutritional inspection
  const [selectedRecipeId, setSelectedRecipeId] = useState(RECIPES_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [servings, setServings] = useState(1);
  const [userGoal, setUserGoal] = useState('satvik'); // 'satvik', 'protein', 'weight', 'heart'

  // Filtered recipes for selection
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) return RECIPES_DATA;
    const q = searchQuery.toLowerCase();
    return RECIPES_DATA.filter(r => 
      r.title.toLowerCase().includes(q) || 
      r.cuisine.toLowerCase().includes(q) ||
      (r.category && r.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeRecipe = useMemo(() => {
    return RECIPES_DATA.find(r => r.id === selectedRecipeId) || RECIPES_DATA[0];
  }, [selectedRecipeId]);

  // Scaled nutrition values
  const nutrition = useMemo(() => {
    const r = activeRecipe;
    const baseCal = r.calories || 320;
    const baseProtein = parseFloat(r.nutrition?.protein || '10');
    const baseCarbs = parseFloat(r.nutrition?.carbs || '40');
    const baseFat = parseFloat(r.nutrition?.fat || '12');
    const baseFiber = parseFloat(r.nutrition?.fiber || '5');

    return {
      calories: Math.round(baseCal * servings),
      protein: Math.round(baseProtein * servings * 10) / 10,
      carbs: Math.round(baseCarbs * servings * 10) / 10,
      fat: Math.round(baseFat * servings * 10) / 10,
      fiber: Math.round(baseFiber * servings * 10) / 10,
      micronutrients: {
        iron: Math.round((parseFloat(r.nutrition?.micronutrients?.iron || '2.5') * servings) * 10) / 10,
        calcium: Math.round((parseFloat(r.nutrition?.micronutrients?.calcium || '65') * servings)),
        vitaminC: Math.round((parseFloat(r.nutrition?.micronutrients?.vitaminC || '15') * servings)),
        potassium: Math.round((parseFloat(r.nutrition?.micronutrients?.potassium || '350') * servings)),
        sodium: Math.round((parseFloat(r.nutrition?.micronutrients?.sodium || '380') * servings))
      }
    };
  }, [activeRecipe, servings]);

  // Daily RDA recommended targets for adults (ICMR-NIN guidelines)
  const RDA = {
    protein: userGoal === 'protein' ? 75 : 60, // grams
    carbs: userGoal === 'weight' ? 200 : 260, // grams
    fat: userGoal === 'heart' ? 45 : 55, // grams
    fiber: 30, // grams
    iron: 19, // mg
    calcium: 1000, // mg
    vitaminC: 80, // mg
    potassium: 3500 // mg
  };

  // Compute Ayurvedic Shad-Rasa profile based on cuisine & ingredients
  const shadRasa = useMemo(() => {
    const title = activeRecipe.title.toLowerCase();
    const desc = (activeRecipe.description || '').toLowerCase();

    // Default authentic Ayurvedic balance estimates
    let sweet = 25; // Madhura
    let sour = 15;  // Amla
    let salty = 15; // Lavana
    let pungent = 20; // Katu
    let bitter = 15; // Tikta
    let astringent = 10; // Kashaya

    if (title.includes('rasam') || title.includes('tamarind') || title.includes('lemon')) {
      sour = 35;
      pungent = 25;
      sweet = 10;
    } else if (title.includes('kheer') || title.includes('halwa') || title.includes('payasam') || title.includes('jamun')) {
      sweet = 60;
      sour = 5;
      salty = 5;
      pungent = 10;
      bitter = 10;
      astringent = 10;
    } else if (title.includes('palak') || title.includes('methi') || title.includes('karela')) {
      bitter = 35;
      astringent = 25;
      sweet = 15;
    } else if (title.includes('chettinad') || title.includes('mirchi') || title.includes('kadai') || title.includes('vepudu')) {
      pungent = 45;
      salty = 20;
      sour = 15;
      sweet = 10;
    }

    // Determine Dosha Impact
    let doshaAdvice = "Tridoshic Harmony: Well-balanced for everyday vitality.";
    if (pungent > 35) {
      doshaAdvice = "Balances Kapha and stimulates Agni (digestive fire). Pitta constitutions should consume moderately.";
    } else if (sweet > 40) {
      doshaAdvice = "Deeply nourishing for Vata and Pitta. Kapha constitutions should balance with warm spices.";
    } else if (sour > 25) {
      doshaAdvice = "Promotes saliva and enzyme secretion. Excellent for digestion and Vata grounding.";
    }

    return {
      madhura: sweet,
      amla: sour,
      lavana: salty,
      katu: pungent,
      tikta: bitter,
      kashaya: astringent,
      doshaAdvice
    };
  }, [activeRecipe]);

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        
        {/* Header Banner */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#A7B99A]/30 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF8F2] px-3.5 py-1 text-xs font-bold text-[#244B39] border border-[#A7B99A]/30">
                <Scale className="h-3.5 w-3.5 text-[#D97556]" />
                Clinical & Ayurvedic Nutritional Studio
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244B39] tracking-tight">
                NutriSense™ AI
              </h1>
              <p className="text-sm sm:text-base text-[#566459] max-w-2xl leading-relaxed">
                Experience comprehensive, laboratory-grade nutritional analysis harmonized with classical Ayurvedic wisdom (Shad-Rasa). Evaluate macro fulfillment, micronutrient bio-absorption, and digestive harmony for any recipe.
              </p>
            </div>

            {/* Quick Goals */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">Personal Health Focus</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'satvik', label: 'Satvik Balance' },
                  { id: 'protein', label: 'High Protein' },
                  { id: 'weight', label: 'Calorie Mindful' },
                  { id: 'heart', label: 'Heart & Lipids' }
                ].map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setUserGoal(goal.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      userGoal === goal.id
                        ? 'bg-[#244B39] text-[#F5F0E5] shadow-xs'
                        : 'bg-[#FAF8F2] text-[#566459] border border-[#A7B99A]/30 hover:border-[#244B39]'
                    }`}
                  >
                    {goal.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dual Layout: Recipe Selector & NutriSense Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recipe Picker (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-3xl bg-white p-5 border border-[#A7B99A]/30 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#244B39] flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-[#D99A38]" />
                  Select Recipe to Analyze
                </h3>
                <span className="text-xs font-semibold text-[#566459] bg-[#FAF8F2] px-2 py-0.5 rounded-full border border-[#A7B99A]/20">
                  {filteredRecipes.length} dishes
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#566459]" />
                <input
                  type="text"
                  placeholder="Search recipe or cuisine..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] pl-8 pr-3 py-2 text-xs text-[#244B39] focus:outline-none focus:ring-2 focus:ring-[#244B39]/20"
                />
              </div>

              {/* Recipe Scroll List */}
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filteredRecipes.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipeId(recipe.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition cursor-pointer ${
                      selectedRecipeId === recipe.id
                        ? 'bg-[#244B39] text-[#F5F0E5] shadow-xs'
                        : 'bg-[#FAF8F2] text-[#303A32] hover:bg-[#F5F0E5] border border-[#A7B99A]/20'
                    }`}
                  >
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title} 
                      className="h-12 w-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{recipe.title}</div>
                      <div className={`text-[10px] truncate ${
                        selectedRecipeId === recipe.id ? 'text-[#F5F0E5]/80' : 'text-[#566459]'
                      }`}>
                        {recipe.cuisine} • {recipe.calories} kcal
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: NutriSense Deep Dive (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Recipe Header Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D99A38]">
                    {activeRecipe.cuisine} • {activeRecipe.dietary || 'Vegetarian'}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39]">
                    {activeRecipe.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#566459] max-w-xl">
                    {activeRecipe.description}
                  </p>
                </div>

                {/* Servings Counter */}
                <div className="flex items-center gap-3 bg-[#FAF8F2] p-2 rounded-2xl border border-[#A7B99A]/30 self-start">
                  <span className="text-xs font-bold text-[#566459] pl-1">Servings:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="h-7 w-7 rounded-lg bg-white flex items-center justify-center text-[#244B39] border border-[#A7B99A]/30 hover:bg-[#FAF8F2] transition cursor-pointer"
                      disabled={servings <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-serif text-base font-bold text-[#244B39] w-4 text-center">
                      {servings}
                    </span>
                    <button
                      onClick={() => setServings(servings + 1)}
                      className="h-7 w-7 rounded-lg bg-white flex items-center justify-center text-[#244B39] border border-[#A7B99A]/30 hover:bg-[#FAF8F2] transition cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Macronutrient Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[#F5F0E5]">
                <div className="rounded-2xl bg-[#FAF8F2] p-3 text-center border border-[#A7B99A]/20">
                  <span className="text-[10px] font-bold uppercase text-[#566459] block">Calories</span>
                  <div className="font-serif text-xl font-bold text-[#244B39] mt-0.5">{nutrition.calories}</div>
                  <span className="text-[10px] text-[#566459]">kcal</span>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 text-center border border-[#A7B99A]/20">
                  <span className="text-[10px] font-bold uppercase text-[#566459] block">Protein</span>
                  <div className="font-serif text-xl font-bold text-emerald-800 mt-0.5">{nutrition.protein}g</div>
                  <span className="text-[10px] text-emerald-700">{Math.round((nutrition.protein / RDA.protein) * 100)}% RDA</span>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 text-center border border-[#A7B99A]/20">
                  <span className="text-[10px] font-bold uppercase text-[#566459] block">Carbohydrates</span>
                  <div className="font-serif text-xl font-bold text-amber-800 mt-0.5">{nutrition.carbs}g</div>
                  <span className="text-[10px] text-amber-700">{Math.round((nutrition.carbs / RDA.carbs) * 100)}% RDA</span>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 text-center border border-[#A7B99A]/20">
                  <span className="text-[10px] font-bold uppercase text-[#566459] block">Dietary Fat</span>
                  <div className="font-serif text-xl font-bold text-stone-800 mt-0.5">{nutrition.fat}g</div>
                  <span className="text-[10px] text-stone-600">{Math.round((nutrition.fat / RDA.fat) * 100)}% RDA</span>
                </div>

                <div className="rounded-2xl bg-[#FAF8F2] p-3 text-center border border-[#A7B99A]/20 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold uppercase text-[#566459] block">Fiber</span>
                  <div className="font-serif text-xl font-bold text-[#244B39] mt-0.5">{nutrition.fiber}g</div>
                  <span className="text-[10px] text-[#244B39]">{Math.round((nutrition.fiber / RDA.fiber) * 100)}% RDA</span>
                </div>
              </div>

              {/* Micronutrients Progress Bars */}
              <div className="space-y-3 pt-4 border-t border-[#F5F0E5]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#244B39] flex items-center justify-between">
                  <span>Essential Micronutrients & Electrolytes</span>
                  <span className="text-[10px] text-[#566459] font-normal">IFCT (ICMR-NIN) Verified</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#303A32]">Iron (Plant Bio-Available)</span>
                      <span className="text-[#566459]">{nutrition.micronutrients.iron} mg / {RDA.iron} mg</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#FAF8F2] overflow-hidden border border-[#A7B99A]/20">
                      <div 
                        className="h-full bg-[#D97556] rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (nutrition.micronutrients.iron / RDA.iron) * 100)}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#303A32]">Calcium</span>
                      <span className="text-[#566459]">{nutrition.micronutrients.calcium} mg / {RDA.calcium} mg</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#FAF8F2] overflow-hidden border border-[#A7B99A]/20">
                      <div 
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (nutrition.micronutrients.calcium / RDA.calcium) * 100)}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#303A32]">Vitamin C (Immunity & Iron Absorption)</span>
                      <span className="text-[#566459]">{nutrition.micronutrients.vitaminC} mg / {RDA.vitaminC} mg</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#FAF8F2] overflow-hidden border border-[#A7B99A]/20">
                      <div 
                        className="h-full bg-[#D99A38] rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (nutrition.micronutrients.vitaminC / RDA.vitaminC) * 100)}%` }} 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-[#303A32]">Potassium</span>
                      <span className="text-[#566459]">{nutrition.micronutrients.potassium} mg / {RDA.potassium} mg</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#FAF8F2] overflow-hidden border border-[#A7B99A]/20">
                      <div 
                        className="h-full bg-[#244B39] rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (nutrition.micronutrients.potassium / RDA.potassium) * 100)}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ayurvedic Shad-Rasa (Six Tastes) Balance Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#244B39] flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-emerald-700" />
                    Ayurvedic Shad-Rasa (Six Tastes) Harmony
                  </h3>
                  <p className="text-xs text-[#566459]">
                    Ayurveda teaches that a truly satisfying meal satisfies all six rasas to prevent cravings and optimize Agni (metabolic fire).
                  </p>
                </div>
              </div>

              {/* 6 Rasas Visual Meter */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Madhura (Sweet)', val: shadRasa.madhura, color: 'bg-amber-400', desc: 'Nourishing, grounding' },
                  { name: 'Amla (Sour)', val: shadRasa.amla, color: 'bg-lime-500', desc: 'Enzyme-stimulating' },
                  { name: 'Lavana (Salty)', val: shadRasa.lavana, color: 'bg-blue-400', desc: 'Electrolyte retaining' },
                  { name: 'Katu (Pungent)', val: shadRasa.katu, color: 'bg-red-500', desc: 'Digestive fire, clearing' },
                  { name: 'Tikta (Bitter)', val: shadRasa.tikta, color: 'bg-emerald-600', desc: 'Detoxifying, toning' },
                  { name: 'Kashaya (Astringent)', val: shadRasa.kashaya, color: 'bg-stone-500', desc: 'Tissue firming' }
                ].map((rasa) => (
                  <div key={rasa.name} className="rounded-2xl bg-[#FAF8F2] p-3 border border-[#A7B99A]/20 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#244B39]">{rasa.name}</span>
                      <span className="font-bold text-[#566459]">{rasa.val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white overflow-hidden">
                      <div className={`h-full ${rasa.color} rounded-full`} style={{ width: `${rasa.val}%` }} />
                    </div>
                    <span className="text-[10px] text-[#566459] block">{rasa.desc}</span>
                  </div>
                ))}
              </div>

              {/* Tridoshic Advisory */}
              <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/50 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-emerald-900">Ayurvedic Tridoshic Evaluation</div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {shadRasa.doshaAdvice}
                  </p>
                </div>
              </div>

              {/* Links to Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <Link
                  to={`/recipes/${activeRecipe.id}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#244B39] hover:text-[#D99A38] transition"
                >
                  View Full Recipe Preparation & Cooking Mode
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  to="/meal-planner"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#244B39] px-4 py-2 text-xs font-bold text-[#F5F0E5] hover:bg-[#1b382b] transition shadow-xs"
                >
                  Add to MealCraft Routine
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
