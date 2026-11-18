import { motion } from 'framer-motion';
import { useRecipes } from '../../context/RecipeContext';
import { Clock, Heart, Sparkles, Flame } from 'lucide-react';

export const FloatingRecipeCard = ({
  recipe,
  offset,
  isCenter,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
  xStep,
  zStep,
  rotStep,
  shouldReduceMotion,
}) => {
  const { isFavorite, toggleFavorite } = useRecipes();
  const absOffset = Math.abs(offset);

  // Calculate 3D transforms based on circular arc position
  const x = offset * xStep;
  const baseZ = isCenter ? 50 : -absOffset * zStep;
  const z = isHovered ? baseZ + 20 : baseZ;
  const rotateY = shouldReduceMotion ? 0 : -offset * rotStep;
  const baseScale = isCenter ? 1.0 : Math.max(0.74, 1 - absOffset * 0.15);
  const scale = isHovered ? baseScale * 1.03 : baseScale;
  const opacity = absOffset > 2 ? 0 : Math.max(0.55, 1 - absOffset * 0.22);
  const zIndex = isHovered ? 50 : 30 - absOffset * 5;

  const isVeg = recipe.diet === 'Vegetarian';
  const favoriteActive = isFavorite(recipe.id);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      animate={{
        x,
        z,
        rotateY,
        scale,
        opacity,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.25, 1, 0.5, 1],
      }}
      style={{
        zIndex,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
      }}
      className={`absolute top-0 bottom-0 m-auto cursor-pointer rounded-2xl sm:rounded-3xl transition-shadow duration-300 group ${
        isCenter
          ? 'ring-2 ring-[#D99A38] shadow-[0_16px_36px_rgba(36,75,57,0.28)]'
          : 'shadow-md hover:opacity-95'
      }`}
    >
      <div 
        className={`relative w-[180px] sm:w-[205px] md:w-[225px] h-[255px] sm:h-[290px] md:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF8F2] border-2 ${
          isCenter ? 'border-white' : 'border-white/60'
        }`}
      >
        {/* Authentic Indian Recipe Photograph */}
        <img
          src={recipe.image}
          alt={recipe.title || recipe.name}
          loading={isCenter ? 'eager' : 'lazy'}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            isCenter ? 'scale-105 group-hover:scale-110' : 'scale-100 group-hover:scale-105'
          }`}
        />

        {/* Subtle Dark Vignette Gradient for Clean Text Legibility */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isCenter 
              ? 'bg-gradient-to-t from-black/95 via-black/45 to-black/10' 
              : 'bg-gradient-to-t from-black/85 via-black/35 to-transparent'
          }`}
        />

        {/* Top Badges Bar: Cuisine, Veg/Non-Veg & Favourites */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Cuisine Pill */}
            <span className="inline-flex items-center gap-1 rounded-full bg-[#244B39]/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs border border-[#A7B99A]/30">
              <span>{recipe.cuisine}</span>
            </span>

            {/* FSSAI Veg / Non-Veg Indicator */}
            <span 
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md shadow-xs ${
                isVeg
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
              }`}
            >
              <span className={`inline-block w-2.5 h-2.5 rounded-xs border p-0.5 flex items-center justify-center ${
                isVeg ? 'border-emerald-400' : 'border-rose-400'
              }`}>
                <span className={`block w-1.5 h-1.5 rounded-full ${
                  isVeg ? 'bg-emerald-400' : 'bg-rose-400'
                }`} />
              </span>
              <span>{isVeg ? 'Veg' : 'Non-Veg'}</span>
            </span>
          </div>

          {/* Favourites Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(recipe.id);
            }}
            aria-label={`Save ${recipe.title} to favourites`}
            className={`h-7 w-7 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xs ${
              favoriteActive
                ? 'bg-[#D97556] text-white'
                : 'bg-black/40 text-white/80 hover:bg-black/60 hover:text-white'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${favoriteActive ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Recipe Details Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 text-white flex flex-col justify-end z-10">
          <div className="flex items-center gap-2 text-[11px] text-[#D99A38] font-bold mb-1">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{recipe.cookTime || 30} mins</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#F5F0E5]/90 font-medium">
              <Flame className="h-3 w-3 text-[#D99A38]" />
              <span>{recipe.servings || 4} Servings</span>
            </span>
          </div>

          <h3 className="font-serif text-base sm:text-xl font-bold leading-snug drop-shadow-sm text-white line-clamp-1 group-hover:text-[#D99A38] transition-colors">
            {recipe.title || recipe.name}
          </h3>

          {isCenter && (
            <p className="text-[11px] text-[#F5F0E5]/80 line-clamp-1 mt-1 font-normal">
              {recipe.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingRecipeCard;
