import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PANTRY_CATEGORIES, PANTRY_UNITS } from '../../data/pantryData';
import { X, Calendar, Package, Layers, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PantryItemModal = ({ isOpen, onClose, onSave, editingItem }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    quantity: 1,
    unit: 'kg',
    purchaseDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    location: 'Refrigerator'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        category: editingItem.category || 'Vegetables',
        quantity: editingItem.quantity || 1,
        unit: editingItem.unit || 'kg',
        purchaseDate: editingItem.purchaseDate || new Date().toISOString().split('T')[0],
        expiryDate: editingItem.expiryDate || '',
        location: editingItem.location || 'Refrigerator'
      });
    } else {
      // Default dates
      const expDefault = new Date();
      expDefault.setDate(expDefault.getDate() + 7);
      setFormData({
        name: '',
        category: 'Vegetables',
        quantity: 1,
        unit: 'kg',
        purchaseDate: new Date().toISOString().split('T')[0],
        expiryDate: expDefault.toISOString().split('T')[0],
        location: 'Refrigerator'
      });
    }
    setErrors({});
  }, [editingItem, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ingredient name is required';
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity required';
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required for smart tracking';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      quantity: Number(formData.quantity)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#A7B99A]/30 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 rounded-full p-2 text-[#566459] hover:bg-[#F5F0E5] transition"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#244B39]">
              {editingItem ? t('smartPantry.modalTitleEdit') : t('smartPantry.modalTitleAdd')}
            </h3>
            <p className="text-xs text-[#566459] mt-1">
              Add your groceries to track freshness and let RasaGen suggest zero-waste recipes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Item Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                {t('smartPantry.nameLabel')} *
              </label>
              <div className="relative">
                <Package className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fresh Paneer, Tomatoes, Curry Leaves..."
                  className={`w-full rounded-2xl border bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-400 focus:ring-red-400' : 'border-[#A7B99A]/40 focus:ring-[#244B39]'
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('smartPantry.categoryLabel')}
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244B39]"
                  >
                    {PANTRY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  Storage Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 px-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244B39]"
                >
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Freezer">Freezer</option>
                  <option value="Countertop">Countertop</option>
                  <option value="Pantry Shelf">Pantry Shelf</option>
                  <option value="Spice Rack">Spice Rack</option>
                </select>
              </div>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('smartPantry.quantityLabel')} *
                </label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
                  <input
                    type="number"
                    step="any"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.quantity ? 'border-red-400 focus:ring-red-400' : 'border-[#A7B99A]/40 focus:ring-[#244B39]'
                    }`}
                  />
                </div>
                {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('smartPantry.unitLabel')}
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 px-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244B39]"
                >
                  {PANTRY_UNITS.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purchase & Expiry Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('smartPantry.purchaseDateLabel')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244B39]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1.5">
                  {t('smartPantry.expiryDateLabel')} *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-[#D97556]" />
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.expiryDate ? 'border-red-400 focus:ring-red-400' : 'border-[#A7B99A]/40 focus:ring-[#244B39]'
                    }`}
                  />
                </div>
                {errors.expiryDate && <p className="mt-1 text-xs text-red-500">{errors.expiryDate}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-[#F5F0E5]">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-5 py-2.5 text-xs font-semibold text-[#566459] hover:bg-[#F5F0E5] transition"
              >
                {t('smartPantry.cancel')}
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#193527] transition"
              >
                {t('smartPantry.save')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
