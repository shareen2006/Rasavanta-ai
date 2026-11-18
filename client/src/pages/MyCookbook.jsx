import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRecipes } from '../context/RecipeContext';
import { 
  BookMarked, 
  Heart, 
  Trash2, 
  Search, 
  UtensilsCrossed, 
  Clock, 
  Flame, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MyCookbook = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { savedRecipes, favorites, removeFromCookbook, toggleFavorite, isFavorite } = useRecipes();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Filter cookbook recipes
  const displayRecipes = useMemo(() => {
    return savedRecipes.filter((recipe) => {
      // Tab filter
      if (activeTab === 'favorites' && !favorites.includes(recipe.id)) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!recipe.title.toLowerCase().includes(q) && !recipe.cuisine.toLowerCase().includes(q)) {
          return false;
        }
      }

      // Tag filter
      if (selectedTag !== 'all' && recipe.cuisine.toLowerCase() !== selectedTag.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [savedRecipes, favorites, activeTab, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#244B39] text-[#D99A38] px-3.5 py-1 text-xs font-bold shadow-xs mb-2">
              <BookMarked className="h-3.5 w-3.5" /> Curated Family Sanctuary
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244B39]">
              {t('cookbook.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#566459] mt-1">
              {t('cookbook.subtitle')}
            </p>
          </div>

          <Link
            to="/ai-kitchen"
            className="flex items-center gap-2 rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#193527] transition"
          >
            <Sparkles className="h-4 w-4 text-[#D99A38]" />
            <span>Generate New Recipe</span>
          </Link>
        </div>

        {/* Toolbar: Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A7B99A]/30 pb-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`rounded-full px-5 py-2 text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-[#244B39] text-white shadow-xs'
                  : 'bg-white text-[#566459] hover:bg-[#FAF8F2]'
              }`}
            >
              {t('cookbook.all')} ({savedRecipes.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition ${
                activeTab === 'favorites'
                  ? 'bg-[#D97556] text-white shadow-xs'
                  : 'bg-white text-[#566459] hover:bg-[#FAF8F2]'
              }`}
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>{t('cookbook.favorites')} ({favorites.length})</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#566459]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your cookbook..."
              className="w-full rounded-full border border-[#A7B99A]/40 bg-white py-2 pl-10 pr-4 text-xs text-[#303A32] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#244B39]"
            />
          </div>
        </div>

        {/* Pinterest-Inspired Varied Proportions Layout */}
        {displayRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {displayRecipes.map((recipe, idx) => {
                const favorite = isFavorite(recipe.id);
                // Alternate aspect proportions for dynamic pinterest aesthetic
                const isTall = idx % 3 === 1;

                return (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft hover:shadow-card-hover transition-all duration-300"
                  >
                    {/* Image with dynamic height */}
                    <div className={`relative w-full overflow-hidden bg-[#F5F0E5] ${isTall ? 'aspect-3/4' : 'aspect-4/3'}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 z-10 flex gap-2">
                        <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-[#244B39]">
                          {recipe.cuisine}
                        </span>
                        {recipe.isCustomGenerated && (
                          <span className="rounded-full bg-[#244B39] text-[#D99A38] px-2.5 py-1 text-[11px] font-bold">
                            AI Crafted
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(recipe.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#244B39] backdrop-blur-md hover:scale-110 shadow-xs"
                          title="Favorite"
                        >
                          <Heart className={`h-4 w-4 ${favorite ? 'fill-[#D97556] text-[#D97556]' : 'text-[#303A32]'}`} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCookbook(recipe.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-[#566459] backdrop-blur-md hover:text-[#D97556] hover:scale-110 shadow-xs"
                          title={t('cookbook.remove')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Floating bottom info */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-3 text-xs mb-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-[#D99A38]" /> {recipe.cookTime || 25} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-[#D97556]" /> {recipe.calories} kcal
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold line-clamp-1">
                          {recipe.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom action banner */}
                    <div className="p-4 bg-white flex items-center justify-between border-t border-[#F5F0E5]">
                      <span className="text-xs font-semibold text-[#566459]">
                        {recipe.servings} Servings
                      </span>
                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#244B39] hover:text-[#D99A38] transition"
                      >
                        Cook Now <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty Cookbook State */
          <div className="rounded-3xl bg-white p-14 text-center border border-[#A7B99A]/30 shadow-soft space-y-4">
            <BookMarked className="mx-auto h-14 w-14 text-[#A7B99A]/60" />
            <h3 className="font-serif text-2xl font-bold text-[#244B39]">
              {t('cookbook.empty')}
            </h3>
            <p className="text-xs sm:text-sm text-[#566459] max-w-md mx-auto leading-relaxed">
              {t('cookbook.emptyAction')}
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                to="/recipes"
                className="rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#193527] transition"
              >
                Browse Catalog
              </Link>
              <Link
                to="/ai-kitchen"
                className="rounded-full border border-[#244B39] px-6 py-2.5 text-xs font-bold text-[#244B39] hover:bg-[#244B39]/5 transition"
              >
                Generate with AI
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
