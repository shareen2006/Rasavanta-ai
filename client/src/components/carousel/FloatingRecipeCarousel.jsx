import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getHeroCarouselRecipes } from '../../data/recipesData';
import { useRecipes } from '../../context/RecipeContext';
import { 
  Clock, 
  Flame, 
  Heart, 
  Sparkles, 
  ChefHat, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Utensils
} from 'lucide-react';

export const FloatingRecipeCarousel = () => {
  const recipes = getHeroCarouselRecipes();
  const count = recipes.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useRecipes();
  const shouldReduceMotion = useReducedMotion();
  const autoPlayRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Gentle auto-rotation every 5s, paused when hovering
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, nextSlide, shouldReduceMotion]);

  // Touch & Swipe gestures
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const dragEndX = e.changedTouches[0].clientX;
    const diff = dragStartX - dragEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  };

  const currentRecipe = recipes[activeIndex] || recipes[0];
  const isVeg = currentRecipe.diet === 'Vegetarian';
  const favoriteActive = isFavorite(currentRecipe.id);
  const keyIngredients = (currentRecipe.ingredients || []).slice(0, 5);

  return (
    <div 
      className="relative w-full max-w-[500px] xl:max-w-[520px] mx-auto select-none focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Recipe Showcase"
    >
      {/* Top Eyebrow Badge & Slider Indicators */}
      <div className="flex items-center justify-between px-1 mb-2.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#A7B99A]/40 px-3 py-1 text-xs font-semibold text-[#244B39] shadow-xs">
          <Sparkles className="h-3 w-3 text-[#D99A38]" />
          <span>AI Kitchen Showcase</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-[#A7B99A]/30">
            {recipes.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show ${r.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-4 h-1.5 bg-[#D99A38]'
                    : 'w-1.5 h-1.5 bg-[#A7B99A]/60 hover:bg-[#244B39]'
                }`}
              />
            ))}
          </div>

          {/* Quick Chevrons */}
          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              aria-label="Previous recipe"
              className="h-7 w-7 rounded-full bg-white/90 border border-[#A7B99A]/40 flex items-center justify-center text-[#244B39] hover:bg-[#244B39] hover:text-white transition shadow-xs cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next recipe"
              className="h-7 w-7 rounded-full bg-white/90 border border-[#A7B99A]/40 flex items-center justify-center text-[#244B39] hover:bg-[#244B39] hover:text-white transition shadow-xs cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Unified Showcase Card */}
      <div className="relative">
        {/* Subtle Decorative Layered Backing (Adds depth without jitter or 3D transform issues) */}
        <div className="absolute inset-x-3 -bottom-2.5 h-full rounded-3xl bg-[#EADBCC]/60 border border-[#A7B99A]/30 -z-10 transform scale-[0.98]" />

        <div className="relative rounded-3xl bg-white border border-[#A7B99A]/40 shadow-soft overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRecipe.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* Dish Photo with Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F2]">
                <img
                  src={currentRecipe.image}
                  alt={currentRecipe.title || currentRecipe.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/rasavanta-recipe-placeholder.svg';
                  }}
                />

                {/* Gradient Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#244B39]/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white shadow-xs border border-white/20">
                      <span>{currentRecipe.cuisine}</span>
                    </span>

                    {/* FSSAI Veg Indicator */}
                    <span 
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md shadow-xs ${
                        isVeg
                          ? 'bg-emerald-950/85 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-950/85 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      <span className={`inline-block w-2 h-2 rounded-xs border p-0.5 flex items-center justify-center ${
                        isVeg ? 'border-emerald-400' : 'border-rose-400'
                      }`}>
                        <span className={`block w-1 h-1 rounded-full ${isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      </span>
                      <span>{isVeg ? 'Veg' : 'Non-Veg'}</span>
                    </span>
                  </div>

                  {/* Favourites Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(currentRecipe.id);
                    }}
                    aria-label={`Save ${currentRecipe.title} to favourites`}
                    className={`h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xs cursor-pointer ${
                      favoriteActive
                        ? 'bg-[#D97556] text-white shadow-xs'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favoriteActive ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Overlay: Cooking Specs */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/95 font-medium z-10">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-[#D99A38] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{currentRecipe.cookTime || 25} mins</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                      <Flame className="h-3.5 w-3.5 text-[#D99A38]" />
                      <span>{currentRecipe.servings || 4} Servings</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-[#FAF8F2]/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {currentRecipe.calories || 320} kcal
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#244B39] tracking-tight leading-snug line-clamp-1">
                      {currentRecipe.title || currentRecipe.name}
                    </h3>
                    <p className="text-xs text-[#566459] leading-relaxed line-clamp-2 mt-1">
                      {currentRecipe.description}
                    </p>
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="pt-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#244B39] uppercase tracking-wider mb-1.5">
                    <Utensils className="h-3 w-3 text-[#D99A38]" />
                    <span>Pantry Ingredients</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {keyIngredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-[10px] sm:text-[11px] font-medium bg-[#FAF8F2] text-[#303A32] border border-[#A7B99A]/40 px-2.5 py-0.5 rounded-full"
                      >
                        {typeof ing === 'string' ? ing : ing.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 border-t border-[#A7B99A]/20">
                  <button
                    onClick={() => navigate(`/recipes/${currentRecipe.id}`)}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#244B39] h-10 px-5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#193527] transition-all duration-200 cursor-pointer group"
                  >
                    <ChefHat className="h-4 w-4 text-[#D99A38]" />
                    <span>View Full Recipe & Cooking Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D99A38] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FloatingRecipeCarousel;
