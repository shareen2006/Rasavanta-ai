import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../../context/RecipeContext';
import { 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  ChefHat,
  Utensils
} from 'lucide-react';

export const RecipePreview = ({ recipe }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useRecipes();

  if (!recipe) return null;

  const favoriteActive = isFavorite(recipe.id);
  const mainIngredients = (recipe.ingredients || []).slice(0, 6);
  const isVeg = recipe.diet === 'Vegetarian';

  const handleNavigate = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <motion.div
      key={recipe.id}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-[#A7B99A]/40 p-4 sm:p-5 shadow-lg text-[#303A32] space-y-3.5"
    >
      {/* Header: Dish Title, Cuisine, Veg Badge & Favorite */}
      <div className="flex items-start justify-between gap-3 border-b border-[#A7B99A]/20 pb-3">
        <div className="space-y-1">
          {/* Cuisine & Diet Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#244B39] text-[#FAF8F2] px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="h-3 w-3 text-[#D99A38]" />
              <span>{recipe.cuisine}</span>
            </span>

            {/* FSSAI Veg / Non-Veg Indicator */}
            <span 
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                isVeg 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}
            >
              <span className={`inline-block w-2 h-2 rounded-xs border p-0.5 flex items-center justify-center ${
                isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}>
                <span className={`block w-1 h-1 rounded-full ${
                  isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`} />
              </span>
              <span>{isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </span>
          </div>

          {/* Dish Name */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#244B39] tracking-tight leading-snug pt-0.5">
            {recipe.title || recipe.name}
          </h3>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={`Save ${recipe.title} to favourites`}
          className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center transition-all duration-200 border shrink-0 ${
            favoriteActive
              ? 'bg-[#D97556] text-white border-[#D97556] shadow-xs'
              : 'bg-[#FAF8F2] text-[#566459] border-[#A7B99A]/40 hover:text-[#D97556] hover:border-[#D97556]/60'
          }`}
        >
          <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${favoriteActive ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#566459] leading-relaxed line-clamp-2">
        {recipe.description}
      </p>

      {/* Cooking Specs Grid */}
      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#FAF8F2] border border-[#A7B99A]/30 text-center">
        <div>
          <div className="text-[10px] uppercase font-bold text-[#566459]">Prep Time</div>
          <div className="text-xs font-bold text-[#244B39]">
            {recipe.prepTime || 20} mins
          </div>
        </div>

        <div className="border-x border-[#A7B99A]/30">
          <div className="text-[10px] uppercase font-bold text-[#566459]">Cooking Time</div>
          <div className="text-xs font-bold text-[#244B39]">
            {recipe.cookTime || 30} mins
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold text-[#566459]">Servings</div>
          <div className="text-xs font-bold text-[#244B39]">
            {recipe.servings || 4} Servings
          </div>
        </div>
      </div>

      {/* Main Ingredients Pills */}
      <div>
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#244B39] mb-1.5 flex items-center gap-1.5">
          <Utensils className="h-3 w-3 text-[#D99A38]" />
          <span>Key Ingredients</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {mainIngredients.map((ing, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[10px] sm:text-[11px] font-medium bg-[#FAF8F2] text-[#303A32] border border-[#A7B99A]/40 px-2.5 py-0.5 rounded-full"
            >
              {typeof ing === 'string' ? ing : ing.name}
            </span>
          ))}
        </div>
      </div>

      {/* View Full Recipe CTA Button */}
      <button
        onClick={handleNavigate}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-[#244B39] h-10 sm:h-11 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#193527] transition-all duration-200 group"
      >
        <ChefHat className="h-4 w-4 text-[#D99A38]" />
        <span>View Full Recipe</span>
        <ArrowRight className="h-4 w-4 text-[#D99A38] transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default RecipePreview;
