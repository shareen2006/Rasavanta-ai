import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ShoppingCart, 
  Sparkles, 
  Utensils, 
  RefreshCw, 
  CheckCircle2, 
  HelpCircle,
  ChevronDown,
  Layers,
  ChefHat
} from 'lucide-react';
import { getIngredientMetadata, EQUIPMENT_VISUALS } from '../../services/ingredientVisualService';

export const IngredientsEquipmentSection = ({ 
  ingredients = [], 
  equipment = [], 
  substitutions = [] 
}) => {
  // Checklist state for ingredients (track available vs need to buy)
  const [checkedState, setCheckedState] = useState(() => {
    const initial = {};
    ingredients.forEach((ing, idx) => {
      initial[idx] = true; // default available
    });
    return initial;
  });

  const [expandedPurpose, setExpandedPurpose] = useState({});

  const toggleCheck = (idx) => {
    setCheckedState((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const markAll = (status) => {
    const updated = {};
    ingredients.forEach((_, idx) => {
      updated[idx] = status;
    });
    setCheckedState(updated);
  };

  const togglePurpose = (idx) => {
    setExpandedPurpose((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const availableCount = Object.values(checkedState).filter(Boolean).length;
  const missingCount = ingredients.length - availableCount;

  // Build substitution map from recipe
  const subMap = {};
  (substitutions || []).forEach((s) => {
    if (s.original) {
      subMap[s.original.toLowerCase()] = `${s.substitute} (${s.note || 'Culinary swap'})`;
    }
  });

  // Equipments list
  const activeEquipment = equipment && equipment.length > 0
    ? equipment
    : [
        EQUIPMENT_VISUALS.kadhai,
        EQUIPMENT_VISUALS.knife,
        EQUIPMENT_VISUALS['cutting board'],
        EQUIPMENT_VISUALS.spatula
      ];

  return (
    <div className="space-y-10">
      {/* ── INGREDIENTS SECTION ────────────────────────────────────────── */}
      <div className="space-y-6">
        {/* Header & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A7B99A]/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#244B39] text-[#FAF8F2] shadow-sm">
                <Utensils className="h-4 w-4 text-[#D99A38]" />
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#244B39]">
                Visual Ingredients Inventory
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#566459] mt-1">
              Photographic guide, culinary roles, and kitchen pantry checklist.
            </p>
          </div>

          {/* Checklist Quick Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#244B39]/10 text-[#244B39]">
              {availableCount} of {ingredients.length} in Kitchen
            </span>
            <button
              type="button"
              onClick={() => markAll(true)}
              className="rounded-xl border border-[#244B39]/30 bg-white px-2.5 py-1.5 text-xs font-medium text-[#244B39] hover:bg-[#244B39]/5 transition"
            >
              All Available
            </button>
            <button
              type="button"
              onClick={() => markAll(false)}
              className="rounded-xl border border-[#D97556]/40 bg-white px-2.5 py-1.5 text-xs font-medium text-[#D97556] hover:bg-[#D97556]/5 transition"
            >
              Need to Buy
            </button>
          </div>
        </div>

        {/* Missing item alert banner if any */}
        {missingCount > 0 && (
          <div className="rounded-2xl bg-[#FFF6F0] border border-[#D97556]/30 p-3.5 flex items-center justify-between text-xs text-[#8C3A27]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-[#D97556]" />
              <span>
                <strong>{missingCount} item{missingCount > 1 ? 's' : ''}</strong> marked for your grocery list.
              </span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97556]">
              Pantry Sync Active
            </span>
          </div>
        )}

        {/* Photographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.map((ing, idx) => {
            const rawName = typeof ing === 'string' ? ing : ing.name;
            const meta = getIngredientMetadata(rawName);
            const imgSrc = ing.image || meta.image;
            const isAvailable = checkedState[idx] !== false;
            const purpose = ing.purpose || meta.purpose;
            const swap = subMap[rawName.toLowerCase()] || meta.substitution;
            const isPurposeOpen = expandedPurpose[idx];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isAvailable
                    ? 'bg-white border-[#A7B99A]/40 shadow-sm hover:shadow-card-hover'
                    : 'bg-[#FAF8F2]/60 border-[#D97556]/30 opacity-75'
                }`}
              >
                {/* Photo & Badge Header */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F5F0E5]">
                  <img
                    src={imgSrc}
                    alt={rawName}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/rasavanta-recipe-placeholder.svg';
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Quantity & Unit Pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-[#244B39] shadow-sm">
                      {ing.quantity || 1} {ing.unit || 'portion'}
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="rounded-full bg-[#244B39]/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
                      {ing.category || meta.category}
                    </span>
                  </div>

                  {/* Ingredient Name Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <h4 className="font-serif font-bold text-white text-base drop-shadow-sm capitalize line-clamp-1">
                      {rawName}
                    </h4>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-3.5 space-y-3">
                  {/* Preparation Note if provided */}
                  {ing.note && (
                    <div className="text-[11px] font-medium text-[#566459] bg-[#FAF8F2] px-2.5 py-1 rounded-lg border border-[#A7B99A]/20">
                      Prep: {ing.note}
                    </div>
                  )}

                  {/* Interactive Checklist Button */}
                  <button
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isAvailable
                        ? 'bg-[#244B39]/10 text-[#244B39] hover:bg-[#244B39]/15'
                        : 'bg-[#D97556]/15 text-[#D97556] hover:bg-[#D97556]/20'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {isAvailable ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-[#244B39]" />
                          <span>In My Kitchen</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 text-[#D97556]" />
                          <span>Need to Buy</span>
                        </>
                      )}
                    </span>
                    <span className="text-[11px] underline opacity-80">Toggle</span>
                  </button>

                  {/* Expandable Purpose & Substitution */}
                  <div className="border-t border-[#F5F0E5] pt-2 space-y-1.5">
                    <button
                      type="button"
                      onClick={() => togglePurpose(idx)}
                      className="w-full flex items-center justify-between text-[11px] font-medium text-[#244B39] hover:text-[#D99A38] transition"
                    >
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-[#D99A38]" />
                        <span>Why this ingredient?</span>
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          isPurposeOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isPurposeOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden text-[11px] text-[#566459] bg-[#FAF8F2] p-2.5 rounded-xl border border-[#A7B99A]/20 space-y-2"
                        >
                          <p>
                            <strong className="text-[#244B39]">Role:</strong> {purpose}
                          </p>
                          {swap && (
                            <p className="text-[#D97556]">
                              <strong>Sub:</strong> {swap}
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── EQUIPMENT & UTENSILS SECTION ─────────────────────────────────── */}
      <div className="space-y-6 pt-4 border-t border-[#A7B99A]/30">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D99A38] text-white shadow-sm">
            <ChefHat className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#244B39]">
              Required Cookware & Utensils
            </h3>
            <p className="text-xs sm:text-sm text-[#566459]">
              Professional kitchen tools engineered for optimal heat and culinary technique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeEquipment.map((eq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="overflow-hidden rounded-2xl bg-white border border-[#A7B99A]/30 shadow-sm p-4 flex flex-col space-y-3 hover:shadow-card-hover transition"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-[#F5F0E5]">
                <img
                  src={eq.image}
                  alt={eq.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/rasavanta-recipe-placeholder.svg';
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#244B39]">
                  {eq.name}
                </h4>
                <p className="text-xs text-[#566459] mt-1 line-clamp-3">
                  {eq.purpose}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
