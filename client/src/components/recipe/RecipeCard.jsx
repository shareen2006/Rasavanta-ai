import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecipes } from '../../context/RecipeContext';
import { Clock, Flame, Users, Heart, Sparkles, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export const RecipeCard = ({ recipe, matchScore }) => {
  const { i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useRecipes();

  const favorite = isFavorite(recipe.id);
  const nativeTitle = recipe.nativeTitles?.[i18n.language] || recipe.title;

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft hover:shadow-card-hover transition-all duration-300"
    >
      {/* Food Photography Image Header */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F5F0E5]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = '/images/rasavanta-recipe-placeholder.svg'; }}
        />
        
        {/* Gradient Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#244B39] backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95 shadow-md"
        >
          <motion.div
            animate={{ scale: favorite ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                favorite ? 'fill-[#D97556] text-[#D97556]' : 'text-[#303A32]'
              }`}
            />
          </motion.div>
        </button>

        {/* Top-Left Match Score or Cuisine Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {matchScore ? (
            <span className="flex items-center gap-1 rounded-full bg-[#244B39]/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm">
              <Sparkles className="h-3 w-3 text-[#D99A38]" /> {matchScore}% Match
            </span>
          ) : (
            <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#244B39] shadow-sm">
              {recipe.cuisine}
            </span>
          )}
        </div>

        {/* Bottom Image Overlay Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md ${
              recipe.diet === 'Vegetarian' 
                ? 'bg-emerald-600/80 text-white' 
                : recipe.diet === 'Vegan'
                ? 'bg-teal-600/80 text-white'
                : 'bg-amber-700/80 text-white'
            }`}>
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              {recipe.diet}
            </span>
            {recipe.glutenFree && (
              <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px]">
                GF
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full">
            <Clock className="h-3 w-3 text-[#D99A38]" /> {totalTime} min
          </span>
        </div>
      </div>

      {/* Recipe Info Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <h3 className="font-serif text-xl font-bold text-[#244B39] group-hover:text-[#D99A38] transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          {nativeTitle && nativeTitle !== recipe.title && (
            <div className="text-xs font-medium text-[#566459] line-clamp-1 mt-0.5">
              {nativeTitle}
            </div>
          )}
        </div>

        <p className="text-xs text-[#566459] line-clamp-2 leading-relaxed mb-4 flex-1">
          {recipe.description}
        </p>

        {/* Nutritional & Cooking Highlights */}
        <div className="flex items-center justify-between border-t border-[#F5F0E5] pt-3 text-xs text-[#566459]">
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-[#D97556]" />
            <strong className="text-[#303A32]">{recipe.calories}</strong> kcal
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#A7B99A]" />
            <span>{recipe.servings} Servings</span>
          </span>
          <span className="flex items-center gap-1">
            <ChefHat className="h-3.5 w-3.5 text-[#244B39]" />
            <span>{recipe.difficulty}</span>
          </span>
        </div>

        {/* Action Link Button */}
        <Link
          to={`/recipes/${recipe.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F5F0E5] py-2.5 text-xs font-bold text-[#244B39] transition-all duration-200 group-hover:bg-[#244B39] group-hover:text-white"
        >
          View Cooking Method
        </Link>
      </div>
    </motion.div>
  );
};
