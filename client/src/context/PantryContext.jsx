import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { pantryService } from '../services/pantryService';
import toast from 'react-hot-toast';

const PantryContext = createContext();

export const PantryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await pantryService.getPantry();
        setItems(data);
      } catch (err) {
        console.error('Failed to load pantry items:', err);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const addItem = async (itemData) => {
    try {
      const created = await pantryService.addPantryItem(itemData);
      setItems((prev) => [created, ...prev]);
      toast.success(`${created.name} added to your pantry! 🥬`);
      return created;
    } catch {
      toast.error('Failed to add pantry item');
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const updated = await pantryService.updatePantryItem(id, itemData);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      toast.success('Pantry item updated successfully!');
      return updated;
    } catch {
      toast.error('Failed to update pantry item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await pantryService.deletePantryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast('Item removed from pantry', { icon: '🗑️' });
    } catch {
      toast.error('Failed to delete item');
    }
  };

  // Expiry statistics computation
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let fresh = 0;
    let expiringSoon = 0;
    let expired = 0;

    items.forEach((item) => {
      if (!item.expiryDate) {
        fresh++;
        return;
      }
      const exp = new Date(item.expiryDate);
      exp.setHours(0, 0, 0, 0);
      const diffTime = exp.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        expired++;
      } else if (diffDays <= 3) {
        expiringSoon++;
      } else {
        fresh++;
      }
    });

    return {
      total: items.length,
      fresh,
      expiringSoon,
      expired
    };
  }, [items]);

  const expiringItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return items.filter((item) => {
      if (!item.expiryDate) return false;
      const exp = new Date(item.expiryDate);
      exp.setHours(0, 0, 0, 0);
      const diffDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    });
  }, [items]);

  return (
    <PantryContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateItem,
        deleteItem,
        stats,
        expiringItems
      }}
    >
      {children}
    </PantryContext.Provider>
  );
};

export const usePantry = () => useContext(PantryContext);
