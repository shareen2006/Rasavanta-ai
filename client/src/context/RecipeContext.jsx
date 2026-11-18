import { createContext, useContext, useState, useEffect } from 'react';
import { RECIPES_DATA } from '../data/recipesData';
import toast from 'react-hot-toast';

const RecipeContext = createContext();

const FAVORITES_KEY = 'rasavanta_favorites';
const COOKBOOK_KEY = 'rasavanta_cookbook';

export const RecipeProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : ['gutti-vankaya-koora', 'hyderabadi-khatti-dal'];
    } catch {
      return [];
    }
  });

  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(COOKBOOK_KEY);
      return stored ? JSON.parse(stored) : RECIPES_DATA.slice(0, 3);
    } catch {
      return RECIPES_DATA.slice(0, 3);
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(COOKBOOK_KEY, JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) => {
      const exists = prev.includes(recipeId);
      if (exists) {
        toast('Removed from favorites', { icon: '🤍' });
        return prev.filter((id) => id !== recipeId);
      } else {
        toast('Saved to favorites! ❤️', { icon: '❤️' });
        return [...prev, recipeId];
      }
    });
  };

  const isFavorite = (recipeId) => favorites.includes(recipeId);

  const saveToCookbook = (recipe) => {
    setSavedRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) {
        toast('Recipe is already in your cookbook!', { icon: '📖' });
        return prev;
      }
      toast.success('Added to your Cookbook! 📖');
      return [recipe, ...prev];
    });
  };

  const removeFromCookbook = (recipeId) => {
    setSavedRecipes((prev) => {
      toast('Removed from cookbook', { icon: '🗑️' });
      return prev.filter((r) => r.id !== recipeId);
    });
  };

  const isSavedInCookbook = (recipeId) => {
    return savedRecipes.some((r) => r.id === recipeId);
  };

  return (
    <RecipeContext.Provider
      value={{
        favorites,
        savedRecipes,
        toggleFavorite,
        isFavorite,
        saveToCookbook,
        removeFromCookbook,
        isSavedInCookbook
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipeContext);
