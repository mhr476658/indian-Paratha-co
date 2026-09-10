import React, { useState, useEffect } from 'react';
import { MENU_CATEGORIES } from '../../data/menu';
import { menuStore } from '../../data/menuStore';
import { MenuItem, MenuCategoryId } from '../../types';
import {
  Search,
  CheckCircle2,
  XCircle,
  Flame,
  Coffee,
  Pizza,
  Sparkles,
  Layers,
  Filter,
  AlertCircle,
  Tag,
  IndianRupee,
  Plus,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
  Edit2,
} from 'lucide-react';

interface MenuManagerTabProps {
  unavailableItemIds: string[];
  onToggleStock: (itemId: string, itemName: string, isAvailable: boolean) => Promise<void>;
  token?: string;
  isLoading: boolean;
}

const PRESET_IMAGES: Record<string, { label: string; url: string }[]> = {
  PARATHAS: [
    {
      label: 'Golden Tawa Paratha with Butter',
      url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    },
    {
      label: 'Crisp Stuffed Paratha Plate',
      url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    },
  ],
  PARATHZZAA: [
    {
      label: 'Cheesy Parathzzaa Herb Crust',
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    },
    {
      label: 'Fiery Spicy Veggie Parathzzaa',
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80',
    },
  ],
  'HOT BLENDS': [
    {
      label: 'Kadak Clay Kulhad Chai',
      url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    },
    {
      label: 'Spiced Highway Ginger Tea',
      url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    },
  ],
  LASSI: [
    {
      label: 'Thick Patiala Kesar Lassi',
      url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    },
  ],
  APPETIZERS: [
    {
      label: 'Crispy Highway Bites & Chutney',
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    },
  ],
};

export const MenuManagerTab: React.FC<MenuManagerTabProps> = ({
  unavailableItemIds,
  onToggleStock,
  token,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [allItems, setAllItems] = useState<MenuItem[]>(() => menuStore.getAllItems());

  // Add Item Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<MenuCategoryId>('PARATHAS');
  const [price, setPrice] = useState<string>('180');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [isSignature, setIsSignature] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [spiceLevel, setSpiceLevel] = useState<1 | 2 | 3>(1);
  const [pairing, setPairing] = useState('');

  // Subscribe to menuStore updates
  useEffect(() => {
    const unsubscribe = menuStore.subscribe(() => {
      setAllItems(menuStore.getAllItems());
    });
    return unsubscribe;
  }, []);

  const unavailableSet = new Set(unavailableItemIds);
  const customItems = menuStore.getCustomItems();
  const customItemIds = new Set(customItems.map((i) => i.id));

  const filteredItems = allItems.filter((item) => {
    let matchesCategory = true;
    if (selectedCategory === 'CUSTOM') {
      matchesCategory = customItemIds.has(item.id);
    } else if (selectedCategory !== 'ALL') {
      matchesCategory = item.category === selectedCategory;
    }

    const q = (searchQuery || '').toLowerCase();
    const matchesSearch =
      (item.name || '').toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      (item.category || '').toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleToggle = async (itemId: string, itemName: string, currentAvailable: boolean) => {
    setTogglingId(itemId);
    try {
      await onToggleStock(itemId, itemName, !currentAvailable);
    } finally {
      setTogglingId(null);
    }
  };

  const handleResetForm = () => {
    setName('');
    setCategory('PARATHAS');
    setPrice('180');
    setDescription('');
    setImage('');
    setIsVegetarian(true);
    setIsSignature(false);
    setIsBestseller(false);
    setIsNew(true);
    setSpiceLevel(1);
    setPairing('');
    setFormError(null);
    setFormSuccess(null);
    setEditingItemId(null);
  };

  const handleEditClick = (item: MenuItem) => {
    setEditingItemId(item.id);
    setName(item.name || '');
    setCategory((item.category as MenuCategoryId) || 'PARATHAS');
    setPrice(String(item.price || 180));
    setDescription(item.description || '');
    setImage(item.image || '');
    setIsVegetarian(item.isVegetarian ?? true);
    setIsSignature(item.isSignature ?? false);
    setIsBestseller(item.isBestseller ?? false);
    setIsNew(item.isNew ?? false);
    setSpiceLevel((item.spiceLevel as 1 | 2 | 3) || 1);
    setPairing(item.pairing || '');
    setFormError(null);
    setFormSuccess(null);
    setIsAddModalOpen(true);
  };

  const handleCreateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!name.trim()) {
      setFormError('Item name is required.');
      return;
    }
    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setFormError('Please enter a valid price in Rupees.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      category,
      price: numPrice,
      description:
        description.trim() || 'Freshly made with wholesome ingredients at our highway kitchen.',
      image:
        image.trim() ||
        (PRESET_IMAGES[category]?.[0]?.url ||
          'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80'),
      isVegetarian,
      isSignature,
      isBestseller,
      isNew,
      spiceLevel,
      pairing: pairing.trim() || undefined,
    };

    try {
      // Call server if token is present
      const authToken = token || localStorage.getItem('ipc_admin_token') || 'ipc-default-session-token';
      const url = editingItemId ? `/api/admin/menu/items/${editingItemId}` : '/api/admin/menu/items';
      const method = editingItemId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save menu item on server');
      }

      const resData = await res.json();
      const createdItem: MenuItem = resData.item || {
        id: editingItemId || `custom-${Date.now()}`,
        ...payload,
      };

      // Add to client menuStore
      menuStore.addCustomItem(createdItem);

      setFormSuccess(`"${createdItem.name}" has been ${editingItemId ? 'updated' : 'added'}!`);
      setTimeout(() => {
        setIsAddModalOpen(false);
        handleResetForm();
      }, 1000);
    } catch (err: any) {
      console.warn('API error, falling back to local store:', err);
      // Fallback: save to client store directly
      const fallbackItem: MenuItem = {
        id: editingItemId || `custom-${Date.now()}`,
        ...payload,
      };
      menuStore.addCustomItem(fallbackItem);
      setFormSuccess(`"${fallbackItem.name}" ${editingItemId ? 'updated' : 'added'}!`);
      setTimeout(() => {
        setIsAddModalOpen(false);
        handleResetForm();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId: string, itemName: string) => {
    if (!window.confirm(`Are you sure you want to remove "${itemName}" from the menu?`)) {
      return;
    }

    setDeletingId(itemId);
    try {
      const authToken = token || localStorage.getItem('ipc_admin_token') || 'ipc-default-session-token';
      await fetch(`/api/admin/menu/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      menuStore.removeCustomItem(itemId);
    } catch (err) {
      console.error('Failed to delete item from server, removing locally', err);
      menuStore.removeCustomItem(itemId);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Action Button & Stats */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
              <span>Highway Kitchen Menu Master</span>
              <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/40">
                Live Sync
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Add new offerings, update pricing, and toggle immediate stock availability (86’d).
            </p>
          </div>

          {/* ADD NEW ITEM BUTTON */}
          <button
            id="admin-add-menu-item-btn"
            onClick={() => {
              handleResetForm();
              setIsAddModalOpen(true);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0F1712] to-[#B22222] hover:from-[#B22222] hover:to-[#0F1712] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 border border-red-400/30"
          >
            <Plus className="w-4 h-4 text-[#E5A93C]" />
            <span>+ Add New Menu Item</span>
          </button>
        </div>

        {/* Search & Stock Indicators */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items by name, category, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 text-stone-300 font-medium">
              <span>Total: {allItems.length}</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{allItems.length - unavailableSet.size} In Kitchen</span>
            </span>

            {unavailableSet.size > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold">
                <XCircle className="w-3.5 h-3.5" />
                <span>{unavailableSet.size} 86'd (Sold Out)</span>
              </span>
            )}

            {customItems.length > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{customItems.length} Admin Added</span>
              </span>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-white/10 pt-3 mt-3">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === 'ALL'
                ? 'bg-[#0F1712] text-white border-[#DE2428] shadow-lg shadow-[#0F1712]/20'
                : 'bg-black/20 text-stone-300 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            All Menu ({allItems.length})
          </button>

          {customItems.length > 0 && (
            <button
              onClick={() => setSelectedCategory('CUSTOM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'CUSTOM'
                  ? 'bg-[#E5A93C] text-[#080D0A] font-bold border-[#E5A93C] shadow-lg shadow-[#E5A93C]/20'
                  : 'bg-black/20 text-[#E5A93C] hover:text-white border-[#E5A93C]/40 hover:border-[#E5A93C]'
              }`}
            >
              ⭐ Admin Added ({customItems.length})
            </button>
          )}

          {MENU_CATEGORIES.map((cat) => {
            const count = allItems.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F1712] text-white border-[#DE2428] shadow-lg shadow-[#0F1712]/20'
                    : 'bg-black/20 text-stone-300 hover:text-white border-white/10 hover:border-white/20'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => {
          const isUnavailable = unavailableSet.has(item.id);
          const isToggling = togglingId === item.id;
          const isDeleting = deletingId === item.id;
          const isCustom = customItemIds.has(item.id);
          const badgeText = item.isBestseller
            ? 'BESTSELLER'
            : item.isSignature
            ? 'SIGNATURE'
            : item.isNew
            ? 'NEW'
            : null;

          return (
            <div
              key={item.id}
              className={`rounded-3xl bg-[#0F1712]/95 border hover:border-[#E5A93C]/70 shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group backdrop-blur-xl ${
                isUnavailable
                  ? 'border-red-900/50 opacity-80'
                  : isCustom
                  ? 'border-[#E5A93C]/50'
                  : 'border-white/15'
              }`}
            >
              {/* Image & Badges Container */}
              <div className="relative h-56 w-full overflow-hidden bg-black/40">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80'}
                  alt={item.name}
                  className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ${isUnavailable ? 'grayscale filter brightness-75' : 'filter brightness-95 group-hover:brightness-100'}`}
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712] via-transparent to-black/50" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5">
                    {item.isVegetarian && (
                      <span className="p-1 rounded-md bg-white/95 border border-emerald-600 flex items-center justify-center shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#E5A93C] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#E5A93C]/40">
                      {item.category}
                    </span>
                    {isCustom && (
                      <span className="px-2.5 py-1 rounded-full bg-[#E5A93C]/20 backdrop-blur-md text-[#E5A93C] text-[10px] font-mono font-bold tracking-wider uppercase border border-[#E5A93C]/40">
                        ADMIN ADDED
                      </span>
                    )}
                  </div>

                  {/* Status Badge (86'd vs Kitchen) */}
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md text-white text-xs font-bold border shadow-md ${isUnavailable ? 'bg-red-900/80 border-red-500/50' : 'bg-emerald-900/80 border-emerald-500/50'}`}>
                    {isUnavailable ? (
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="hidden sm:inline">{isUnavailable ? "86'D (SOLD OUT)" : 'IN KITCHEN'}</span>
                  </div>
                </div>

                {/* Quick Info Overlay */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-2xl sm:text-3xl font-sans font-bold text-[#E5A93C] drop-shadow-md">
                      ₹{item.price}
                    </span>
                    {badgeText && (
                      <span className="text-[11px] font-mono text-white bg-black/70 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-[#E5A93C]/50">
                        {badgeText}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {item.hindiName && (
                    <p className="text-[#E5A93C] text-xs font-serif italic mb-3 opacity-90">
                      {item.hindiName}
                    </p>
                  )}

                  <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Actions: Edit, Delete, Toggle Stock */}
                <div className="flex items-center gap-2.5 pt-4 border-t border-white/10 mt-auto">
                  <button
                    onClick={() => handleToggle(item.id, item.name, !isUnavailable)}
                    disabled={isToggling}
                    className={`flex-1 py-3 px-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50 ${
                      isUnavailable
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-red-600 hover:bg-red-500 text-white'
                    }`}
                  >
                    {isToggling ? (
                      <span>UPDATING...</span>
                    ) : isUnavailable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>MARK IN STOCK</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>86 ITEM</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleEditClick(item)}
                    disabled={isDeleting}
                    className="p-3 rounded-full bg-white/10 hover:bg-[#E5A93C] hover:text-black text-white transition-all shadow-md active:scale-95 cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    disabled={isDeleting}
                    className="p-3 rounded-full bg-white/10 hover:bg-red-600 text-white transition-all shadow-md active:scale-95 cursor-pointer"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD NEW MENU ITEM DIALOG                            */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#080D0A]/90 backdrop-blur-xl border border-[#E5A93C]/50 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-white relative">
            {/* Close button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A93C]/10 text-[#E5A93C] border border-[#E5A93C]/30 text-xs font-bold uppercase tracking-wider mb-2">
                <Plus className="w-3.5 h-3.5" />
                <span>Highway Kitchen Operations</span>
              </div>
              <h3 className="font-serif text-2xl font-black text-white">
                {editingItemId ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Enter culinary details below. This item will immediately appear in the customer menu and admin live stock tracking.
              </p>
            </div>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateMenuItem} className="space-y-4">
              {/* Item Name & Hindi Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amritsari Paneer Kulcha Paratha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MenuCategoryId)}
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                  >
                    {MENU_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold">
                      ₹
                    </span>
                    <input
                      type="number"
                      required
                      min="1"
                      step="5"
                      placeholder="180"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                  Culinary Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the crust, stuffing, spices, and tawa griddling style..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                />
              </div>

              {/* Image URL & Quick Presets */}
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                  High-Resolution Photo URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                  />
                </div>

                {/* Preset Suggestions */}
                <div className="mt-2">
                  <span className="text-[11px] text-stone-400 block mb-1">
                    Quick Photo Presets for {category}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(PRESET_IMAGES[category] || PRESET_IMAGES.PARATHAS).map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          image === preset.url
                            ? 'bg-[#E5A93C] text-[#080D0A] font-bold border-[#E5A93C]'
                            : 'bg-black/20 text-stone-300 hover:text-white border-white/10 hover:border-white/20'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pairing suggestion */}
              <div>
                <label className="block text-xs font-bold text-stone-200 uppercase tracking-wider mb-1.5">
                  Highway Pairing Suggestion
                </label>
                <input
                  type="text"
                  placeholder="e.g. Best paired with Kadak Clay Kulhad Chai & Green Chutney"
                  value={pairing}
                  onChange={(e) => setPairing(e.target.value)}
                  className="w-full px-3.5 py-2 bg-black/40 border border-white/10 rounded-xl text-white text-xs focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C]/50 transition-all backdrop-blur-sm"
                />
              </div>

              {/* Dietary & Badges */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                    className="accent-emerald-500 rounded"
                  />
                  <span className="text-emerald-400 font-semibold">100% Pure Veg</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="accent-[#E5A93C] rounded"
                  />
                  <span className="text-[#E5A93C] font-semibold">Bestseller</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={isSignature}
                    onChange={(e) => setIsSignature(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span className="text-amber-300 font-semibold">Signature</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-black/20 border border-white/10 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span className="text-cyan-300 font-semibold">New Item</span>
                </label>
              </div>

              {/* Spice Level */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 border border-white/10 text-xs">
                <span className="text-stone-300 font-bold uppercase tracking-wider">Spice Profile:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSpiceLevel(1)}
                    className={`px-2 py-1 rounded text-xs ${
                      spiceLevel === 1 ? 'bg-[#0F1712] text-white font-bold' : 'text-stone-400'
                    }`}
                  >
                    Mild 🌶️
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpiceLevel(2)}
                    className={`px-2 py-1 rounded text-xs ${
                      spiceLevel === 2 ? 'bg-[#0F1712] text-white font-bold' : 'text-stone-400'
                    }`}
                  >
                    Medium 🌶️🌶️
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpiceLevel(3)}
                    className={`px-2 py-1 rounded text-xs ${
                      spiceLevel === 3 ? 'bg-[#0F1712] text-white font-bold' : 'text-stone-400'
                    }`}
                  >
                    Fiery 🌶️🌶️🌶️
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-white text-black text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Saving to Kitchen...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-black" />
                      <span>Save &amp; Publish Item</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
