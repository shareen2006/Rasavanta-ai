import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '../context/NavigationContext';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Plus, 
  Check, 
  Refrigerator, 
  Scale, 
  ShieldCheck, 
  Flame, 
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import { RECIPES_DATA, CUISINES_LIST, POPULAR_INGREDIENTS } from '../data/recipesData';
import { RecipeCarousel } from '../components/carousel/RecipeCarousel';
import { Hero3DCurvedCarousel } from '../components/carousel/Hero3DCurvedCarousel';
import { RecipeCard } from '../components/recipe/RecipeCard';

export const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { triggerBrandedTransition } = useNavigation();

  const [inputIngredient, setInputIngredient] = useState('');
  const [selectedChips, setSelectedChips] = useState(['Paneer', 'Tomatoes', 'Curry Leaves']);

  const handleToggleChip = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputIngredient.trim()) {
      const combined = [...new Set([...selectedChips, inputIngredient.trim()])];
      navigate('/ai-kitchen', { state: { initialIngredients: combined } });
    } else if (selectedChips.length > 0) {
      navigate('/ai-kitchen', { state: { initialIngredients: selectedChips } });
    } else {
      navigate('/ai-kitchen');
    }
  };

  const featuredRecipes = RECIPES_DATA.filter((r) => r.featured);
  const recommendedRecipes = RECIPES_DATA.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E5] text-[#303A32]">
      
      {/* 1. MAIN HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 border-b border-[#A7B99A]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-[#A7B99A]/40 px-3.5 py-1 text-xs font-semibold text-[#244B39] shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
                <span>{t('hero.badge', 'Intelligent Cooking & Zero-Waste Kitchen')}</span>
              </div>

              {/* Main Headline */}
              <h1 
                className="font-serif font-bold tracking-tight text-[#244B39] m-0 p-0"
                style={{
                  fontFamily: '"DM Serif Display", serif',
                  fontSize: 'clamp(2.2rem, 1.6rem + 2vw, 3.4rem)',
                  lineHeight: 1.05,
                }}
              >
                <span className="block text-[#244B39]">Your Ingredients.</span>
                <span className="block italic text-[#D99A38]">
                  Endless Possibilities.
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#566459] leading-relaxed max-w-xl">
                Discover delicious recipes, make smarter food choices, and transform everyday pantry staples into extraordinary culinary experiences with zero food waste.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => triggerBrandedTransition('/ai-kitchen')}
                  className="flex items-center gap-2.5 rounded-full bg-[#244B39] h-11 sm:h-12 px-6 sm:px-7 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#193527] hover:shadow-lg transition-all duration-200 cursor-pointer group"
                >
                  <Sparkles className="h-4 w-4 text-[#D99A38] group-hover:rotate-12 transition-transform" />
                  <span>{t('hero.ctaGenerate', 'Generate Recipe')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/recipes"
                  className="flex items-center gap-2 rounded-full bg-white border border-[#A7B99A]/40 h-11 sm:h-12 px-5 sm:px-6 text-xs sm:text-sm font-bold text-[#244B39] hover:bg-[#FAF8F2] hover:border-[#244B39] transition-all shadow-xs"
                >
                  <span>{t('hero.ctaExplore', 'Explore 500+ Recipes')}</span>
                </Link>
              </div>

              {/* Integrated Statistics Grid */}
              <div className="pt-2">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white/85 border border-[#A7B99A]/40 shadow-xs backdrop-blur-xs">
                  <div className="text-left">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] tracking-tight">500+</div>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#566459] mt-0.5">{t('home.statsRecipes', 'Curated Recipes')}</div>
                  </div>
                  <div className="text-left border-x border-[#A7B99A]/30 px-3 sm:px-4">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] tracking-tight">9+</div>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#566459] mt-0.5">{t('home.statsCuisines', 'Regional Cuisines')}</div>
                  </div>
                  <div className="text-left pl-1 sm:pl-2">
                    <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D97556] tracking-tight">12 kg</div>
                    <div className="text-[11px] sm:text-xs font-semibold text-[#566459] mt-0.5">{t('home.statsWasteSaved', 'Waste Saved/Mo')}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Featured Recipe Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 xl:col-span-6 relative w-full flex flex-col items-center justify-center mt-6 lg:mt-0"
            >
              <Hero3DCurvedCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INGREDIENT SEARCH & QUICK CHIPS SECTION */}
      <section className="py-10 sm:py-12 bg-white/75 border-b border-[#A7B99A]/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#FAF8F2] p-6 sm:p-8 border border-[#A7B99A]/40 shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D99A38] mb-1.5">
                <Refrigerator className="h-4 w-4" />
                <span>Pantry-First Cooking</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39]">
                What's in your kitchen right now?
              </h2>
              <p className="text-xs sm:text-sm text-[#566459] mt-1.5">
                Select ingredients below or type your own to discover recipes you can cook right away with zero food waste.
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center max-w-2xl mx-auto mb-6">
              <Search className="absolute left-4 sm:left-5 h-4 sm:h-5 w-4 sm:w-5 text-[#566459]" />
              <input
                type="text"
                value={inputIngredient}
                onChange={(e) => setInputIngredient(e.target.value)}
                placeholder={t('hero.inputPlaceholder', 'e.g., Paneer, Spinach, Rice, Mustard...')}
                className="w-full h-12 sm:h-13 rounded-full border border-[#A7B99A]/60 bg-white pl-11 sm:pl-13 pr-40 text-xs sm:text-sm text-[#303A32] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#244B39] transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-[#244B39] text-xs font-bold text-white hover:bg-[#193527] transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Cook with These</span>
                <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
              </button>
            </form>

            {/* Selected & Popular Chips */}
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">
                {t('hero.quickAdd', 'Popular Ingredients')} — Tap to Add or Remove
              </span>
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl pt-0.5">
                {POPULAR_INGREDIENTS.slice(0, 12).map((ing) => {
                  const isSelected = selectedChips.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => handleToggleChip(ing)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#244B39] text-white shadow-xs'
                          : 'bg-white border border-[#A7B99A]/40 text-[#303A32] hover:border-[#244B39] hover:bg-[#F5F0E5]'
                      }`}
                    >
                      {isSelected ? <Check className="h-3 w-3 text-[#D99A38]" /> : <Plus className="h-3 w-3 text-[#566459]" />}
                      <span>{ing}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED RECIPES EMBLA CAROUSEL */}
      <section className="w-full overflow-hidden py-10 sm:py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RecipeCarousel
          recipes={featuredRecipes}
          title={t('home.featuredTitle', 'Featured Delicacies')}
          subtitle={t('home.featuredSubtitle', 'Artisanal dishes crafted with traditional regional spices and balanced nutrition.')}
        />
      </section>

      {/* 4. EXPLORE BY CUISINE */}
      <section className="py-10 sm:py-12 bg-[#FAF8F2] border-y border-[#A7B99A]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39]">
              {t('home.cuisinesTitle', 'Explore Regional Heritage')}
            </h2>
            <p className="text-xs sm:text-sm text-[#566459] mt-1.5">
              {t('home.cuisinesSubtitle', 'Discover authentic recipes across India’s vibrant culinary traditions.')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
            {CUISINES_LIST.filter((c) => c.id !== 'all').map((cuisine) => (
              <Link
                key={cuisine.id}
                to={`/recipes?cuisine=${cuisine.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 sm:p-5 border border-[#A7B99A]/30 shadow-soft hover:shadow-card-hover transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-[#FAF8F2] px-2.5 py-0.5 text-[11px] font-bold text-[#244B39] group-hover:bg-[#244B39] group-hover:text-white transition-colors">
                      {cuisine.count} Recipes
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#A7B99A] group-hover:text-[#244B39] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#244B39] group-hover:text-[#D99A38] transition-colors">
                    {cuisine.name}
                  </h3>
                  <p className="text-xs text-[#566459] mt-1 leading-relaxed line-clamp-2">
                    {cuisine.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW RASAVANTA AI WORKS / ABOUT */}
      <section id="about" className="py-12 sm:py-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99A38]">
            Intelligent Cooking
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] mt-1">
            {t('home.howItWorksTitle', 'How Rasavanta AI Works')}
          </h2>
          <p className="text-xs sm:text-sm text-[#566459] mt-1.5">
            {t('home.howItWorksSubtitle', 'Three simple steps to transform your kitchen into an intelligent culinary studio.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="relative rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#F5F0E5] flex items-center justify-center font-serif text-lg font-bold text-[#244B39] shadow-inner">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-[#244B39]">
              {t('home.step1Title', 'Take Inventory')}
            </h3>
            <p className="text-xs sm:text-sm text-[#566459] leading-relaxed">
              {t('home.step1Desc', 'Enter the ingredients in your pantry or fridge. Rasavanta tracks shelf-life and priority usage.')}
            </p>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#D99A38]/50 shadow-soft space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#244B39] flex items-center justify-center font-serif text-lg font-bold text-[#D99A38] shadow-md">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-[#244B39]">
              {t('home.step2Title', 'AI Culinary Synthesis')}
            </h3>
            <p className="text-xs sm:text-sm text-[#566459] leading-relaxed">
              {t('home.step2Desc', 'RasaGen AI creates customized recipes balancing Ayurvedic rasas and zero food waste.')}
            </p>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft space-y-3">
            <div className="h-10 w-10 rounded-xl bg-[#F5F0E5] flex items-center justify-center font-serif text-lg font-bold text-[#244B39] shadow-inner">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-[#244B39]">
              {t('home.step3Title', 'Cook with Guidance')}
            </h3>
            <p className="text-xs sm:text-sm text-[#566459] leading-relaxed">
              {t('home.step3Desc', 'Follow interactive step-by-step cooking timers, voice commands, and live ingredient substitutions.')}
            </p>
          </div>
        </div>
      </section>

      {/* 6. SMART PANTRY & ZERO WASTE BANNER */}
      <section className="py-12 sm:py-14 bg-[#244B39] text-[#F5F0E5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#D99A38]">
                <Refrigerator className="h-3.5 w-3.5" /> Pantry Intelligence
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                {t('home.pantryPromoTitle', 'Stop throwing food away. Start cooking smarter.')}
              </h2>
              <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed">
                {t('home.pantryPromoSubtitle', 'Rasavanta tracks expiration dates and creates custom recipes to save your food before it goes bad.')}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/pantry"
                  className="rounded-full bg-[#D99A38] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#303A32] shadow-md hover:bg-[#E8B45E] transition"
                >
                  {t('home.pantryPromoCta', 'Open Smart Pantry')}
                </Link>
                <Link
                  to="/ai-kitchen"
                  className="rounded-full border border-white/30 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/10 transition"
                >
                  RasaGen Studio
                </Link>
              </div>
            </div>

            {/* Zero Waste Statistics Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-white/10 p-6 sm:p-7 border border-white/15 backdrop-blur-md space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {t('home.zeroWasteTitle', 'Zero-Waste Kitchen Metrics')}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5F0E5]/80 leading-relaxed">
                {t('home.zeroWasteSubtitle', 'Proven results from households using Rasavanta AI to plan meals and optimize grocery spending.')}
              </p>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="rounded-xl bg-white/5 p-3.5">
                  <div className="text-xl sm:text-2xl font-bold text-[#D99A38]">₹4,200</div>
                  <div className="text-[11px] text-[#F5F0E5]/70 mt-0.5">Average Monthly Grocery Savings</div>
                </div>
                <div className="rounded-xl bg-white/5 p-3.5">
                  <div className="text-xl sm:text-2xl font-bold text-[#A7B99A]">12 kg</div>
                  <div className="text-[11px] text-[#F5F0E5]/70 mt-0.5">Food Waste Prevented per Household</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NUTRITIONAL WISDOM SECTION */}
      <section className="py-12 sm:py-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97556]">
            Holistic Health
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] mt-1">
            {t('home.nutritionTitle', 'Ancient Ayurvedic Wisdom meets AI')}
          </h2>
          <p className="text-xs sm:text-sm text-[#566459] mt-1.5">
            {t('home.nutritionSubtitle', 'Science-backed macro tracking combined with the 6 tastes of classical Indian cooking.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#D99A38] mb-3.5">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#244B39]">Ayurvedic Shad-Rasa Balance</h3>
            <p className="text-xs text-[#566459] leading-relaxed mt-1.5">
              Every recipe balances the 6 Ayurvedic rasas: Sweet, Sour, Salty, Pungent, Bitter, and Astringent for digestive harmony and deep satiety.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3.5">
              <Flame className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#244B39]">Smart Macro Calibrations</h3>
            <p className="text-xs text-[#566459] leading-relaxed mt-1.5">
              Real-time calculations of proteins, complex carbs, and heart-healthy cold-pressed fats to support daily vitality without restrictive dieting.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#D97556] mb-3.5">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#244B39]">Intelligent Ingredient Swaps</h3>
            <p className="text-xs text-[#566459] leading-relaxed mt-1.5">
              Allergy-aware substitutions maintain signature texture and regional taste authenticity even when key ingredients are missing.
            </p>
          </div>
        </div>
      </section>

      {/* 8. RECOMMENDED RECIPES GRID */}
      <section className="py-10 sm:py-12 bg-[#FAF8F2] border-t border-[#A7B99A]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39]">
                Handpicked Recommendations
              </h2>
              <p className="text-xs sm:text-sm text-[#566459] mt-1">
                Seasonal inspirations curated by our culinary team.
              </p>
            </div>
            <Link
              to="/recipes"
              className="text-xs sm:text-sm font-bold text-[#244B39] hover:text-[#D99A38] transition flex items-center gap-1"
            >
              Browse All Recipes <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-12 sm:py-14 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99A38]">
            Community Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] mt-1">
            {t('home.testimonialsTitle', 'Loved by Home Chefs across India')}
          </h2>
          <p className="text-xs sm:text-sm text-[#566459] mt-1.5">
            {t('home.testimonialsSubtitle', 'See how Rasavanta AI brings regional flavor and smart sustainability into everyday cooking.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft relative flex flex-col justify-between">
            <div>
              <Quote className="h-6 w-6 text-[#A7B99A]/40 mb-3" />
              <p className="text-xs sm:text-sm text-[#303A32] leading-relaxed italic mb-5">
                "Being in a hostel in Bengaluru with limited cookware, Rasavanta's AI Kitchen completely transformed my dinners. I just type what's left in my mini fridge, and it creates simple, tasty dishes."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3.5 border-t border-[#F5F0E5]">
              <div className="h-9 w-9 rounded-full bg-[#244B39] text-white flex items-center justify-center font-bold text-xs">
                VK
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#244B39]">Varun Krishna</div>
                <div className="text-[11px] text-[#566459]">Software Engineer, Bengaluru</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft relative flex flex-col justify-between">
            <div>
              <Quote className="h-6 w-6 text-[#A7B99A]/40 mb-3" />
              <p className="text-xs sm:text-sm text-[#303A32] leading-relaxed italic mb-5">
                "The Telugu translations are so natural and accurate! My mother uses it everyday in Vijayawada to track pantry expiry dates and try out regional recipes from other states."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3.5 border-t border-[#F5F0E5]">
              <div className="h-9 w-9 rounded-full bg-[#D97556] text-white flex items-center justify-center font-bold text-xs">
                SR
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#244B39]">Sowmya Rao</div>
                <div className="text-[11px] text-[#566459]">Home Chef & Nutritionist, Hyderabad</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 border border-[#A7B99A]/30 shadow-soft relative flex flex-col justify-between">
            <div>
              <Quote className="h-6 w-6 text-[#A7B99A]/40 mb-3" />
              <p className="text-xs sm:text-sm text-[#303A32] leading-relaxed italic mb-5">
                "Interactive cooking mode on my tablet while preparing dinner is a game changer. The step-by-step timer and substitutions saved my curry when I ran out of cream."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3.5 border-t border-[#F5F0E5]">
              <div className="h-9 w-9 rounded-full bg-[#D99A38] text-white flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-[#244B39]">Ananya Mukherjee</div>
                <div className="text-[11px] text-[#566459]">Food Blogger, Kolkata</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
