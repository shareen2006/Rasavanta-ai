import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Copy, 
  Refrigerator, 
  Calendar, 
  ArrowLeft, 
  UtensilsCrossed, 
  Sparkles, 
  Layers, 
  AlertCircle,
  Check,
  Share2
} from 'lucide-react';
import { usePantry } from '../context/PantryContext';
import { RECIPES_DATA } from '../data/recipesData';
import toast from 'react-hot-toast';

export const SmartBasketPage = () => {
  const { t } = useTranslation();
  const { items: pantryItems, addItem } = usePantry();

  // Retrieve meal plan from localStorage or state
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('rasavanta_meal_plan');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default meal plan sample
    return {
      Monday: { breakfast: 'masala-dosa', lunch: 'andhra-chicken-curry', dinner: 'hyderabadi-biryani', snack: 'hyderabadi-mirchi-bajji' },
      Tuesday: { breakfast: 'steamed-idli-sambar', lunch: 'gutti-vankaya', dinner: 'dal-makhani', snack: 'andhra-pesarattu' },
      Wednesday: { breakfast: 'poha-breakfast', lunch: 'chettinad-chicken', dinner: 'palak-paneer', snack: 'punjabi-samosa' },
      Thursday: { breakfast: 'medu-vada', lunch: 'kerala-sadya-avial', dinner: 'paneer-butter-masala', snack: 'bhel-puri-mumbai' },
      Friday: { breakfast: 'andhra-pesarattu', lunch: 'bengali-macher-jhol', dinner: 'butter-chicken', snack: 'bombay-vada-pav' },
      Saturday: { breakfast: 'masala-dosa', lunch: 'andhra-royyala-vepudu', dinner: 'hyderabadi-biryani', snack: 'hyderabadi-mirchi-bajji' },
      Sunday: { breakfast: 'appam-stew', lunch: 'hyderabadi-biryani', dinner: 'dal-makhani', snack: 'gujarati-khaman-dhokla' }
    };
  });

  // Custom added items
  const [customItems, setCustomItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rasavanta_custom_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Checked/purchased items IDs
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rasavanta_checked_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // New item modal/form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Vegetables');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemUnit, setNewItemUnit] = useState('kg');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'needed', 'in_pantry', 'completed'

  // Persist checked items
  useEffect(() => {
    localStorage.setItem('rasavanta_checked_basket', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Persist custom items
  useEffect(() => {
    localStorage.setItem('rasavanta_custom_basket', JSON.stringify(customItems));
  }, [customItems]);

  // Aggregate ingredients from all recipes in the active meal plan
  const aggregatedItems = useMemo(() => {
    const itemMap = new Map();

    const recipeMap = new Map(RECIPES_DATA.map(r => [r.id, r]));

    Object.entries(mealPlan).forEach(([day, slots]) => {
      Object.entries(slots).forEach(([slot, recipeId]) => {
        const recipe = recipeMap.get(recipeId);
        if (!recipe?.ingredients) return;

        recipe.ingredients.forEach(ing => {
          const rawName = typeof ing === 'string' ? ing : ing.name;
          const cleanedName = rawName.split('(')[0].trim();
          const key = cleanedName.toLowerCase();

          if (!itemMap.has(key)) {
            itemMap.set(key, {
              id: `ing-${key.replace(/\s+/g, '-')}`,
              name: cleanedName,
              fullName: rawName,
              quantity: ing.quantity || '1',
              unit: ing.unit || 'portion',
              category: ing.category || 'Pantry Staples',
              sourceRecipes: [recipe.title || recipe.name],
              days: [day]
            });
          } else {
            const existing = itemMap.get(key);
            if (!existing.sourceRecipes.includes(recipe.title || recipe.name)) {
              existing.sourceRecipes.push(recipe.title || recipe.name);
            }
            if (!existing.days.includes(day)) {
              existing.days.push(day);
            }
          }
        });
      });
    });

    // Merge custom items
    customItems.forEach(c => {
      const key = c.name.toLowerCase();
      if (!itemMap.has(key)) {
        itemMap.set(key, {
          ...c,
          sourceRecipes: ['Custom Added Item'],
          days: ['Anytime']
        });
      }
    });

    // Cross-reference with Smart Pantry
    const pantryNameSet = new Set(
      pantryItems.map(p => p.name.toLowerCase().split('(')[0].trim())
    );

    return Array.from(itemMap.values()).map(item => {
      const inPantry = pantryNameSet.has(item.name.toLowerCase()) || 
                       pantryItems.some(p => p.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(p.name.toLowerCase()));
      return {
        ...item,
        inPantry
      };
    });
  }, [mealPlan, customItems, pantryItems]);

  // Filter items based on activeFilter
  const filteredItems = useMemo(() => {
    return aggregatedItems.filter(item => {
      const isChecked = checkedItems.includes(item.id);
      if (activeFilter === 'needed') return !item.inPantry && !isChecked;
      if (activeFilter === 'in_pantry') return item.inPantry;
      if (activeFilter === 'completed') return isChecked;
      return true;
    });
  }, [aggregatedItems, activeFilter, checkedItems]);

  // Statistics
  const stats = useMemo(() => {
    const total = aggregatedItems.length;
    const inPantry = aggregatedItems.filter(i => i.inPantry).length;
    const needed = aggregatedItems.filter(i => !i.inPantry).length;
    const completed = aggregatedItems.filter(i => checkedItems.includes(i.id)).length;
    const savedAmount = inPantry * 65; // Estimated avg ₹65 per stocked pantry ingredient

    return { total, inPantry, needed, completed, savedAmount };
  }, [aggregatedItems, checkedItems]);

  // Toggle item checked
  const toggleItemCheck = (id) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Add custom grocery item
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      name: newItemName.trim(),
      fullName: newItemName.trim(),
      quantity: newItemQuantity,
      unit: newItemUnit,
      category: newItemCategory,
      isCustom: true
    };

    setCustomItems(prev => [newItem, ...prev]);
    setNewItemName('');
    setShowAddForm(false);
    toast.success(`Added ${newItem.name} to your Smart Basket!`);
  };

  // Remove item
  const handleRemoveItem = (id) => {
    setCustomItems(prev => prev.filter(c => c.id !== id));
    setCheckedItems(prev => prev.filter(i => i !== id));
    toast('Item removed from basket', { icon: '🗑️' });
  };

  // Copy shopping list to clipboard
  const handleCopyList = () => {
    const neededItems = aggregatedItems.filter(i => !i.inPantry && !checkedItems.includes(i.id));
    if (neededItems.length === 0) {
      toast('No items marked as needed to buy!', { icon: 'ℹ️' });
      return;
    }

    const text = [
      '🛒 *RASAVANTA AI — SMART BASKET GROCERY LIST*',
      `Generated on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}`,
      '----------------------------------------',
      ...neededItems.map((item, idx) => `${idx + 1}. [ ] ${item.name} (${item.quantity} ${item.unit}) - ${item.category}`),
      '----------------------------------------',
      `Total items to purchase: ${neededItems.length}`,
      'Powered by RASAVANTA AI • Zero-Waste Smart Kitchen'
    ].join('\n');

    navigator.clipboard.writeText(text);
    toast.success('Shopping list copied to clipboard! Ready to share on WhatsApp or Notes.', {
      duration: 3500,
      icon: '📋'
    });
  };

  // Sync checked items to Smart Pantry
  const handleSyncToPantry = async () => {
    const purchased = aggregatedItems.filter(i => checkedItems.includes(i.id));
    if (purchased.length === 0) {
      toast('Please check off items as purchased before syncing to pantry!', { icon: '🛒' });
      return;
    }

    let addedCount = 0;
    for (const p of purchased) {
      // Default 7 days expiry from now
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 7);

      await addItem({
        name: p.name,
        category: p.category || 'Pantry Staples',
        location: p.category === 'Dairy' || p.category === 'Vegetables' ? 'Refrigerator' : 'Pantry Shelf',
        quantity: parseFloat(p.quantity) || 1,
        unit: p.unit || 'kg',
        purchaseDate: new Date().toISOString().split('T')[0],
        expiryDate: expDate.toISOString().split('T')[0]
      });
      addedCount++;
    }

    // Clear checked items after sync
    setCheckedItems([]);
    toast.success(`Successfully imported ${addedCount} purchased items directly into Smart Pantry!`, {
      duration: 4000,
      icon: '🥬'
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link 
            to="/meal-planner" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#244B39] hover:text-[#D99A38] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to MealCraft Weekly Planner
          </Link>
          <div className="flex items-center gap-2">
            <Link 
              to="/pantry" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#566459] bg-white px-3 py-1.5 rounded-full border border-[#A7B99A]/30 hover:border-[#244B39] transition shadow-xs"
            >
              <Refrigerator className="h-3.5 w-3.5 text-[#244B39]" />
              Smart Pantry ({pantryItems.length})
            </Link>
            <Link 
              to="/recipes" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#566459] bg-white px-3 py-1.5 rounded-full border border-[#A7B99A]/30 hover:border-[#244B39] transition shadow-xs"
            >
              <UtensilsCrossed className="h-3.5 w-3.5 text-[#D99A38]" />
              Explore Recipes
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#A7B99A]/30 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF8F2] px-3.5 py-1 text-xs font-bold text-[#244B39] border border-[#A7B99A]/30">
                <ShoppingCart className="h-3.5 w-3.5 text-[#D99A38]" />
                Zero-Waste Grocery Synchronizer
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244B39] tracking-tight">
                Smart Basket™
              </h1>
              <p className="text-sm sm:text-base text-[#566459] max-w-2xl leading-relaxed">
                Intelligently aggregate ingredients across your 7-day MealCraft routine. We automatically cross-reference your Smart Pantry to highlight items you already own, eliminating food waste and unnecessary shopping costs.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyList}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#244B39] border border-[#244B39] hover:bg-[#FAF8F2] transition shadow-xs cursor-pointer"
                title="Copy needed items to clipboard for WhatsApp"
              >
                <Share2 className="h-4 w-4 text-[#D99A38]" />
                <span>Share List</span>
              </button>

              <button
                onClick={handleSyncToPantry}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#244B39] px-5 py-3 text-xs sm:text-sm font-bold text-[#F5F0E5] hover:bg-[#1b382b] transition shadow-sm cursor-pointer"
                title="Add checked items into your Smart Pantry inventory"
              >
                <Refrigerator className="h-4 w-4 text-[#D99A38]" />
                <span>Sync to Pantry ({checkedItems.length})</span>
              </button>
            </div>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#F5F0E5]">
            <div className="rounded-2xl bg-[#FAF8F2] p-4 text-center border border-[#A7B99A]/20">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Total Needed</div>
              <div className="font-serif text-2xl font-bold text-[#244B39] mt-1">{stats.total} Items</div>
              <div className="text-[10px] text-[#566459] mt-0.5">Across weekly routine</div>
            </div>

            <div className="rounded-2xl bg-emerald-50/60 p-4 text-center border border-emerald-200/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">In Smart Pantry</div>
              <div className="font-serif text-2xl font-bold text-emerald-700 mt-1">{stats.inPantry} Items</div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Already in stock 🥬</div>
            </div>

            <div className="rounded-2xl bg-amber-50/60 p-4 text-center border border-amber-200/50">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Need to Buy</div>
              <div className="font-serif text-2xl font-bold text-amber-700 mt-1">{stats.needed} Items</div>
              <div className="text-[10px] text-amber-700 font-medium mt-0.5">Missing from pantry 🛒</div>
            </div>

            <div className="rounded-2xl bg-white p-4 text-center border border-[#A7B99A]/30">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#566459]">Estimated Savings</div>
              <div className="font-serif text-2xl font-bold text-[#244B39] mt-1">₹{stats.savedAmount}</div>
              <div className="text-[10px] text-[#D99A38] font-bold mt-0.5">From zero duplicate buys</div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Add Custom Item */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Items (${aggregatedItems.length})` },
              { id: 'needed', label: `Need to Buy (${stats.needed})` },
              { id: 'in_pantry', label: `In Pantry (${stats.inPantry})` },
              { id: 'completed', label: `Purchased (${stats.completed})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#244B39] text-[#F5F0E5] shadow-xs'
                    : 'bg-white text-[#566459] border border-[#A7B99A]/30 hover:border-[#244B39]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#244B39] border border-[#A7B99A]/40 hover:border-[#244B39] transition shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 text-[#D99A38]" />
            <span>Add Extra Item</span>
          </button>
        </div>

        {/* Add Custom Item Form */}
        {showAddForm && (
          <form 
            onSubmit={handleAddCustomItem}
            className="rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft space-y-4"
          >
            <h3 className="text-sm font-bold text-[#244B39] flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#D99A38]" />
              Add Custom Grocery Item
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#566459] block mb-1">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Buffalo Milk, Almonds, Saffron..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3.5 py-2 text-sm text-[#244B39] focus:outline-none focus:ring-2 focus:ring-[#244B39]/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#566459] block mb-1">Category</label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3.5 py-2 text-sm text-[#244B39] focus:outline-none focus:ring-2 focus:ring-[#244B39]/20"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Lentils">Lentils</option>
                  <option value="Spices">Spices</option>
                  <option value="Oils">Oils & Ghee</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Pantry Staples">Pantry Staples</option>
                </select>
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="text-xs font-semibold text-[#566459] block mb-1">Qty</label>
                  <input
                    type="text"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3 py-2 text-sm text-[#244B39] focus:outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-xs font-semibold text-[#566459] block mb-1">Unit</label>
                  <input
                    type="text"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    className="w-full rounded-xl border border-[#A7B99A]/40 bg-[#FAF8F2] px-3 py-2 text-sm text-[#244B39] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#566459] hover:text-[#244B39]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#244B39] px-5 py-2 text-xs font-bold text-[#F5F0E5] hover:bg-[#1b382b] transition shadow-xs"
              >
                Add to Basket
              </button>
            </div>
          </form>
        )}

        {/* Grocery Items List */}
        <div className="rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF8F2] text-[#D99A38] border border-[#A7B99A]/30">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#244B39]">No ingredients in this view</h3>
              <p className="text-xs sm:text-sm text-[#566459] max-w-sm mx-auto">
                {activeFilter === 'completed'
                  ? 'No items have been checked off yet. Tap the circles as you place items into your physical shopping cart!'
                  : 'All ingredients needed for your weekly meals are currently stocked in your Smart Pantry!'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#F5F0E5]">
              {filteredItems.map(item => {
                const isChecked = checkedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 sm:p-5 transition hover:bg-[#FAF8F2]/60 ${
                      isChecked ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleItemCheck(item.id)}
                        className="text-[#244B39] hover:text-[#D99A38] transition cursor-pointer flex-shrink-0"
                        title={isChecked ? 'Mark as not purchased' : 'Mark as purchased'}
                      >
                        {isChecked ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <Circle className="h-6 w-6 text-[#A7B99A] hover:text-[#244B39]" />
                        )}
                      </button>

                      {/* Item Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-sm sm:text-base font-bold ${
                            isChecked ? 'line-through text-[#566459]/60' : 'text-[#244B39]'
                          }`}>
                            {item.name}
                          </span>
                          <span className="text-xs font-semibold text-[#566459] bg-[#FAF8F2] px-2 py-0.5 rounded-md border border-[#A7B99A]/20">
                            {item.quantity} {item.unit}
                          </span>
                          {item.inPantry ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              <Check className="h-3 w-3" /> In Pantry
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                              Need to Buy
                            </span>
                          )}
                        </div>

                        {/* Origin details */}
                        <div className="text-[11px] text-[#566459] mt-1 truncate">
                          <span>{item.category}</span>
                          <span className="mx-1.5">•</span>
                          <span>Used in: {item.sourceRecipes.slice(0, 3).join(', ')}{item.sourceRecipes.length > 3 ? ` +${item.sourceRecipes.length - 3} more` : ''}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pl-4">
                      {item.isCustom && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1.5 text-[#566459] hover:text-red-600 transition"
                          title="Remove custom item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
