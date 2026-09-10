import React, { useState, useMemo } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryFilter = 'ALL' | 'FOOD' | 'CHAI' | 'PARATHAS' | 'PARATHZZAA' | 'AMBIENCE' | 'TRAVEL';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('ALL');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories: GalleryFilter[] = [
    'ALL',
    'FOOD',
    'CHAI',
    'PARATHAS',
    'PARATHZZAA',
    'AMBIENCE',
    'TRAVEL',
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'ALL') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const currentIndex = activeItem
    ? filteredItems.findIndex((i) => i.id === activeItem.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredItems.length - 1) {
      setActiveItem(filteredItems[currentIndex + 1]);
    } else {
      setActiveItem(filteredItems[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveItem(filteredItems[currentIndex - 1]);
    } else {
      setActiveItem(filteredItems[filteredItems.length - 1]);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FAF6F0] text-[#0B192C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#9B1B1E]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#9B1B1E]">
              VISUAL CHRONICLES
            </span>
            <span className="w-6 h-[2px] bg-[#9B1B1E]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#0B192C] tracking-tight">
            FOOD & DESTINATION GALLERY
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-sans">
            A glimpse into the warmth, flavours, and highway journeys that define the IPC world.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 justify-start sm:justify-center -mx-4 px-4 sm:mx-0">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`gallery-filter-${cat.toLowerCase()}`}
              onClick={() => setActiveFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-[#0B192C] text-[#D49B44] shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid (Mobile: 2-columns, Desktop: Editorial Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredItems.map((item, idx) => {
            // Give some items taller aspect for editorial masonry look on desktop
            const isTall = idx % 3 === 0;

            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => setActiveItem(item)}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden bg-stone-200 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 ${
                  isTall ? 'row-span-1 sm:row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D49B44]">
                      {item.category}
                    </span>
                    <ZoomIn className="w-4 h-4 text-white/80" />
                  </div>
                  <h3 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {activeItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveItem(null)}
        >
          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            onClick={() => setActiveItem(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Modal Content */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase font-bold tracking-widest text-[#D49B44] block mb-1">
                {activeItem.category}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-bold">
                {activeItem.title}
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-lg">
                {activeItem.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
