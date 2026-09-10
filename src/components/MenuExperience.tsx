import React, { useState, useMemo, useEffect } from 'react';
import { menuStore } from '../data/menuStore';
import { MenuItem } from '../types';
import { Search, Plus, Check, Sparkles, Flame, X, Eye } from 'lucide-react';

interface MenuExperienceProps {
  onAddToCart: (item: MenuItem) => void;
  onSelectItemDetail?: (item: MenuItem) => void;
}

export const MenuExperience: React.FC<MenuExperienceProps> = ({
  onAddToCart,
  onSelectItemDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'bestsellers' | 'spicy'>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [allItems, setAllItems] = useState<MenuItem[]>(() => menuStore.getAllItems());

  useEffect(() => {
    const unsubscribe = menuStore.subscribe(() => {
      setAllItems(menuStore.getAllItems());
    });
    return unsubscribe;
  }, []);

  const categories = [
    { id: 'ALL', label: 'All Dishes' },
    { id: 'PARATHAS', label: 'Signature Parathas' },
    { id: 'PARATHZZAA', label: 'Parathzzaa®' },
    { id: 'HOT BLENDS', label: 'Kulhad Chai & Blends' },
    { id: 'RICE', label: 'Biryani & Rice' },
    { id: 'COMBOS', label: 'Combos & Breakfast' },
    { id: 'APPETIZERS', label: 'Snacks & Chaat' },
    { id: 'LASSI', label: 'Patiala Lassi' },
    { id: 'DESSERTS', label: 'Desserts & Sweets' },
  ];

  // Filtered Items based on Category, Search query, and Dietary filters
  const filteredItems = useMemo(() => {
    let items = allItems;

    if (activeCategory !== 'ALL') {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (dietaryFilter === 'bestsellers') {
      items = items.filter((item) => item.isBestseller || item.isSignature);
    } else if (dietaryFilter === 'spicy') {
      items = items.filter((item) => (item.spiceLevel || 0) >= 2);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          (item.name || '').toLowerCase().includes(q) ||
          (item.description || '').toLowerCase().includes(q) ||
          (item.category || '').toLowerCase().includes(q) ||
          Boolean(item.hindiName && item.hindiName.includes(q))
      );
    }

    return items;
  }, [activeCategory, searchQuery, dietaryFilter, allItems]);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section
      id="menu"
      className="py-20 sm:py-28 bg-[#080D0A] text-white transition-colors border-t border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#E5A93C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#2E4434]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#E5A93C]">
              COMPLETE DIGITAL MENU &amp; ORDERING
            </span>
            <span className="w-8 h-[1.5px] bg-[#E5A93C]" />
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5E6CC] to-[#E5A93C]">Handcrafted</span> Menu
          </h2>

          <p className="text-white/70 text-sm sm:text-base mt-3 font-sans max-w-xl mx-auto leading-relaxed">
            Prepared fresh to order on seasoned cast-iron hearths with 100% stone-ground whole wheat, farm-churned white butter, and aromatic botanical spices.
          </p>
        </div>

        {/* Search Bar and Quick Dietary Filter Chips */}
        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search dishes (e.g. Aloo Cheese, Paneer Tikka, Kulhad Chai, Biryani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F1712] text-white placeholder-white/40 pl-12 pr-10 py-4 rounded-full border border-white/20 focus:outline-none focus:border-[#E5A93C] text-sm font-medium shadow-2xl transition-all"
            />
            <Search className="w-5 h-5 text-[#E5A93C] absolute left-4.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filter Tags (Pills) */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-sans">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-4 py-1.5 rounded-full transition-all border cursor-pointer font-semibold ${
                dietaryFilter === 'all'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 text-white/75 border-white/10 hover:border-white/30'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setDietaryFilter('bestsellers')}
              className={`px-4 py-1.5 rounded-full transition-all border flex items-center gap-1.5 cursor-pointer font-semibold ${
                dietaryFilter === 'bestsellers'
                  ? 'bg-[#E5A93C] text-black border-[#E5A93C] shadow-md'
                  : 'bg-white/5 text-white/75 border-white/10 hover:border-white/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bestsellers Only</span>
            </button>
            <button
              onClick={() => setDietaryFilter('spicy')}
              className={`px-4 py-1.5 rounded-full transition-all border flex items-center gap-1.5 cursor-pointer font-semibold ${
                dietaryFilter === 'spicy'
                  ? 'bg-red-500 text-white border-red-500 shadow-md'
                  : 'bg-white/5 text-white/75 border-white/10 hover:border-white/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Spicy Flavors</span>
            </button>
          </div>
        </div>

        {/* Categories Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'bg-white/10 text-white/75 hover:text-white hover:bg-white/15 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-white/60 font-mono">
          <span>
            Showing <strong className="text-white font-sans">{filteredItems.length}</strong> delicious items
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            100% Pure Vegetarian Kitchen
          </span>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#0F1712] rounded-3xl border border-white/10 p-8">
            <Search className="w-12 h-12 text-[#E5A93C] mx-auto mb-3 opacity-60" />
            <h3 className="font-sans text-xl font-bold text-white mb-2">No matching dishes found</h3>
            <p className="text-white/70 text-xs sm:text-sm font-sans max-w-sm mx-auto mb-4">
              Try searching for "Aloo", "Paneer", "Parathzzaa", or clear your current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('ALL');
                setDietaryFilter('all');
              }}
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#E5A93C]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItemDetail && onSelectItemDetail(item)}
                className="rounded-3xl bg-[#0F1712]/95 border border-white/15 hover:border-[#E5A93C]/70 shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group backdrop-blur-xl"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1712] via-transparent to-black/40" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded-md bg-white/95 border border-emerald-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </span>
                      {item.isSignature && (
                        <span className="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-wider shadow-sm">
                          Signature
                        </span>
                      )}
                    </div>

                    {item.spiceLevel && (
                      <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[#E5A93C] text-[10px] font-mono font-bold flex items-center gap-1 border border-white/10">
                        <Flame className="w-3 h-3 text-[#E5A93C]" />
                        <span>Level {item.spiceLevel}</span>
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-[#E5A93C] font-sans font-bold text-lg border border-[#E5A93C]/40 shadow-lg">
                      ₹{item.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-[#E5A93C] transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {item.hindiName && (
                      <p className="text-[#E5A93C] text-xs font-serif italic mb-2 opacity-90">
                        {item.hindiName}
                      </p>
                    )}

                    <p className="text-white/70 text-xs font-sans leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Add to order CTA */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => handleAdd(item, e)}
                      className={`flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        addedIds[item.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white hover:bg-[#E5A93C] text-black'
                      }`}
                    >
                      {addedIds[item.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItemDetail && onSelectItemDetail(item);
                      }}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
