import apiClient from './api';
import { INITIAL_PANTRY_ITEMS } from '../data/pantryData';

const PANTRY_STORAGE_KEY = 'rasavanta_pantry_items';

const getStoredPantry = () => {
  try {
    const raw = localStorage.getItem(PANTRY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(INITIAL_PANTRY_ITEMS));
      return INITIAL_PANTRY_ITEMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PANTRY_ITEMS;
  }
};

const saveStoredPantry = (items) => {
  try {
    localStorage.setItem(PANTRY_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
};

export const pantryService = {
  async getPantry() {
    try {
      const response = await apiClient.get('/pantry');
      return response.data;
    } catch {
      return getStoredPantry();
    }
  },

  async addPantryItem(itemData) {
    try {
      const response = await apiClient.post('/pantry', itemData);
      return response.data;
    } catch {
      const current = getStoredPantry();
      const newItem = {
        ...itemData,
        id: 'pantry-' + Date.now()
      };
      const updated = [newItem, ...current];
      saveStoredPantry(updated);
      return newItem;
    }
  },

  async updatePantryItem(id, itemData) {
    try {
      const response = await apiClient.put(`/pantry/${id}`, itemData);
      return response.data;
    } catch {
      const current = getStoredPantry();
      const updated = current.map((item) => (item.id === id ? { ...item, ...itemData } : item));
      saveStoredPantry(updated);
      return updated.find((i) => i.id === id);
    }
  },

  async deletePantryItem(id) {
    try {
      const response = await apiClient.delete(`/pantry/${id}`);
      return response.data;
    } catch {
      const current = getStoredPantry();
      const updated = current.filter((item) => item.id !== id);
      saveStoredPantry(updated);
      return { success: true, id };
    }
  }
};
