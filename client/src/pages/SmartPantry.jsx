import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePantry } from '../context/PantryContext';
import { PantryItemModal } from '../components/pantry/PantryItemModal';
import { PANTRY_CATEGORIES } from '../data/pantryData';
import { 
  Refrigerator, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Edit3, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SmartPantry = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, addItem, updateItem, deleteItem, stats, expiringItems } = usePantry();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveModal = (itemData) => {
    if (editingItem) {
      updateItem(editingItem.id, itemData);
    } else {
      addItem(itemData);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Remove ${name} from your pantry?`)) {
      deleteItem(id);
    }
  };

  // Helper to calculate days remaining
  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(expiryDate);
    exp.setHours(0, 0, 0, 0);
    return Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Filtered Pantry List
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.category.toLowerCase().includes(q)) {
          return false;
        }
      }

      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      const days = getDaysRemaining(item.expiryDate);
      if (statusFilter === 'expired' && (days === null || days >= 0)) return false;
      if (statusFilter === 'expiring' && (days === null || days < 0 || days > 3)) return false;
      if (statusFilter === 'fresh' && (days !== null && days <= 3)) return false;

      return true;
    });
  }, [items, searchQuery, selectedCategory, statusFilter]);

  // Cook with expiring items action
  const handleCookWithExpiring = () => {
    const expiringNames = expiringItems.map((i) => i.name);
    navigate('/ai-kitchen', { state: { initialIngredients: expiringNames } });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#244B39] text-[#D99A38] px-3.5 py-1 text-xs font-bold shadow-xs mb-2">
              <Refrigerator className="h-3.5 w-3.5" /> Kitchen Inventory & Expiry Tracker
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244B39]">
              {t('smartPantry.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#566459] mt-1">
              {t('smartPantry.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {expiringItems.length > 0 && (
              <button
                type="button"
                onClick={handleCookWithExpiring}
                className="flex items-center gap-2 rounded-full bg-[#D97556] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#BC5A3D] transition"
              >
                <Sparkles className="h-4 w-4 text-[#D99A38]" />
                <span>Cook Expiring Items ({expiringItems.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenAdd}
              className="flex items-center gap-2 rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#193527] transition"
            >
              <Plus className="h-4 w-4" />
              <span>{t('smartPantry.addItem')}</span>
            </button>
          </div>
        </div>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setStatusFilter('all')}
            className={`p-5 rounded-3xl bg-white border cursor-pointer transition ${
              statusFilter === 'all' ? 'border-[#244B39] ring-2 ring-[#244B39]/20' : 'border-[#A7B99A]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('smartPantry.totalItems')}
              </span>
              <Layers className="h-4 w-4 text-[#244B39]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#244B39] mt-2">
              {stats.total}
            </div>
          </div>

          <div
            onClick={() => setStatusFilter('fresh')}
            className={`p-5 rounded-3xl bg-white border cursor-pointer transition ${
              statusFilter === 'fresh' ? 'border-emerald-600 ring-2 ring-emerald-600/20' : 'border-[#A7B99A]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('smartPantry.freshItems')}
              </span>
              <CheckCircle className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700 mt-2">
              {stats.fresh}
            </div>
          </div>

          <div
            onClick={() => setStatusFilter('expiring')}
            className={`p-5 rounded-3xl bg-white border cursor-pointer transition ${
              statusFilter === 'expiring' ? 'border-[#D99A38] ring-2 ring-[#D99A38]/20' : 'border-[#A7B99A]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('smartPantry.expiringSoon')}
              </span>
              <Clock className="h-4 w-4 text-[#D99A38]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#D99A38] mt-2">
              {stats.expiringSoon}
            </div>
          </div>

          <div
            onClick={() => setStatusFilter('expired')}
            className={`p-5 rounded-3xl bg-white border cursor-pointer transition ${
              statusFilter === 'expired' ? 'border-[#D97556] ring-2 ring-[#D97556]/20' : 'border-[#A7B99A]/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('smartPantry.expired')}
              </span>
              <AlertTriangle className="h-4 w-4 text-[#D97556]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#D97556] mt-2">
              {stats.expired}
            </div>
          </div>
        </div>

        {/* Toolbar: Search and Category Pills */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#566459]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('smartPantry.search')}
                className="w-full rounded-full border border-[#A7B99A]/40 bg-white py-2 pl-10 pr-4 text-xs text-[#303A32] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#244B39]"
              />
            </div>

            {/* Status Clear indicator */}
            {statusFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className="text-xs font-bold text-[#D97556] hover:underline"
              >
                Clear status filter ({statusFilter})
              </button>
            )}
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${
                selectedCategory === 'All'
                  ? 'bg-[#244B39] text-white shadow-xs'
                  : 'bg-white border border-[#A7B99A]/30 text-[#303A32] hover:bg-[#FAF8F2]'
              }`}
            >
              All Categories
            </button>
            {PANTRY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold shrink-0 transition ${
                  selectedCategory === cat
                    ? 'bg-[#244B39] text-white shadow-xs'
                    : 'bg-white border border-[#A7B99A]/30 text-[#303A32] hover:bg-[#FAF8F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pantry Items Table & Cards */}
        <div className="rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft overflow-hidden">
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F2] border-b border-[#F5F0E5] text-[11px] font-bold uppercase tracking-wider text-[#566459]">
                  <tr>
                    <th className="py-4 px-6">{t('smartPantry.tableItem')}</th>
                    <th className="py-4 px-6">{t('smartPantry.tableQty')}</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">{t('smartPantry.tableExpiry')}</th>
                    <th className="py-4 px-6">{t('smartPantry.tableStatus')}</th>
                    <th className="py-4 px-6 text-right">{t('smartPantry.tableActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F0E5]">
                  {filteredItems.map((item) => {
                    const days = getDaysRemaining(item.expiryDate);
                    let statusBadge = null;

                    if (days < 0) {
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 text-red-800 px-2.5 py-0.5 font-bold">
                          <AlertTriangle className="h-3 w-3" /> Expired ({Math.abs(days)}d ago)
                        </span>
                      );
                    } else if (days <= 3) {
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 px-2.5 py-0.5 font-bold animate-pulse">
                          <Clock className="h-3 w-3" /> Expiring in {days}d
                        </span>
                      );
                    } else {
                      statusBadge = (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 font-bold">
                          <CheckCircle className="h-3 w-3" /> Fresh ({days}d left)
                        </span>
                      );
                    }

                    return (
                      <tr key={item.id} className="hover:bg-[#FAF8F2]/50 transition">
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#244B39] text-sm">{item.name}</div>
                          <div className="text-[11px] text-[#566459]">{item.category}</div>
                        </td>
                        <td className="py-4 px-6 font-semibold text-[#303A32]">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-4 px-6 text-[#566459]">
                          {item.location || 'Kitchen'}
                        </td>
                        <td className="py-4 px-6 text-[#566459]">
                          {item.expiryDate || 'N/A'}
                        </td>
                        <td className="py-4 px-6">
                          {statusBadge}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="rounded-lg p-1.5 text-[#566459] hover:bg-[#FAF8F2] hover:text-[#244B39] transition"
                            title={t('smartPantry.modalTitleEdit')}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)}
                            className="rounded-lg p-1.5 text-[#566459] hover:bg-red-50 hover:text-[#D97556] transition"
                            title="Delete item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center space-y-4">
              <Refrigerator className="mx-auto h-12 w-12 text-[#A7B99A]/60" />
              <h3 className="font-serif text-xl font-bold text-[#244B39]">
                {t('smartPantry.empty')}
              </h3>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white"
              >
                <Plus className="h-4 w-4" /> Add Your First Item
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Item Modal */}
      <PantryItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveModal}
        editingItem={editingItem}
      />
    </div>
  );
};
