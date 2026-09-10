import React, { useRef, useState } from 'react';
import {
  X,
  Upload,
  Sparkles,
  Maximize2,
  Minimize2,
  Sliders,
  Eye,
  EyeOff,
  RefreshCw,
  Check,
  Smartphone,
  Tablet,
  Laptop,
  Image as ImageIcon,
} from 'lucide-react';

export interface BackgroundPreset {
  id: string;
  name: string;
  tagline: string;
  url: string;
  badge?: string;
  previewUrl: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    id: 'official-brand',
    name: 'Official IPC Artwork',
    tagline: 'Brand Emblem, Chai & Clay Kulhad, Spices & Tawa Paratha',
    url: '/IMG-20260906-WA0007.jpg',
    badge: 'Official Brand',
    previewUrl: '/IMG-20260906-WA0007.jpg',
  },
  {
    id: 'golden-paratha',
    name: 'Tawa Paratha & Churned Butter',
    tagline: 'Fresh crisp tawa griddled paratha with pure white butter',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=1600&auto=format&fit=crop&q=85',
    badge: 'Culinary Masterpiece',
    previewUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'kulhad-chai',
    name: 'Clay Kulhad Masala Chai',
    tagline: 'Steaming ginger cardamom tea poured in earthen clay pots',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1600&auto=format&fit=crop&q=85',
    badge: 'Highway Warmth',
    previewUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'highway-chalet',
    name: 'Highway Chalet Ambience',
    tagline: 'Rustic cedar wood, warm pendant lanterns & open night skies',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=85',
    badge: 'NH7 Heritage',
    previewUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
  },
];

interface BackgroundStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBg: string;
  onSelectBg: (url: string) => void;
  onUploadFile: (file: File) => void;
  bgFit: 'auto' | 'contain' | 'cover';
  onChangeFit: (fit: 'auto' | 'contain' | 'cover') => void;
  isArtworkView: boolean;
  onToggleArtworkView: () => void;
  isCustomImage: boolean;
  onResetDefault: () => void;
  detectedScreen: 'phone' | 'tablet' | 'laptop';
}

export const BackgroundStudioModal: React.FC<BackgroundStudioModalProps> = ({
  isOpen,
  onClose,
  currentBg,
  onSelectBg,
  onUploadFile,
  bgFit,
  onChangeFit,
  isArtworkView,
  onToggleArtworkView,
  isCustomImage,
  onResetDefault,
  detectedScreen,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalDragging, setIsModalDragging] = useState(false);

  if (!isOpen) return null;

  const handleModalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      id="bg-studio-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="bg-studio-modal-container"
        className="relative w-full max-w-2xl bg-[#0F1B2B] text-[#FAF6F0] rounded-2xl sm:rounded-3xl border border-[#D49B44]/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalDragging(false);
        }}
        onDrop={handleModalDrop}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-stone-800 bg-[#0B1522]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D49B44]/20 border border-[#D49B44]/50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D49B44]" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                Homepage Atmosphere & Background
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Premium adaptive visual presentation for Indian Paratha Company
              </p>
            </div>
          </div>

          <button
            id="close-bg-studio-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          {/* Active Screen Viewport Info */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-stone-800">
            <div className="flex items-center gap-2">
              {detectedScreen === 'phone' && <Smartphone className="w-4 h-4 text-amber-400" />}
              {detectedScreen === 'tablet' && <Tablet className="w-4 h-4 text-amber-400" />}
              {detectedScreen === 'laptop' && <Laptop className="w-4 h-4 text-amber-400" />}
              <span className="text-xs text-stone-300 font-medium">
                Current Viewport:{' '}
                <strong className="text-white capitalize">{detectedScreen} Display</strong>
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-wider uppercase border border-amber-500/30">
              Auto Responsive
            </span>
          </div>

          {/* Section 1: Upload Custom Image */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-widest text-[#D49B44] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Custom Background</span>
              </label>
              {isCustomImage && (
                <button
                  id="modal-reset-default-btn"
                  onClick={onResetDefault}
                  className="text-xs text-red-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Official Artwork</span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  onUploadFile(e.target.files[0]);
                }
              }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 sm:p-5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                isModalDragging
                  ? 'border-[#D49B44] bg-[#D49B44]/15'
                  : 'border-stone-700 hover:border-[#D49B44] bg-black/30 hover:bg-black/50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#9B1B1E]/30 border border-[#9B1B1E] flex items-center justify-center text-white">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-200">
                Click to browse photo or drag & drop here
              </p>
              <p className="text-[11px] text-stone-400">
                Supports JPG, PNG, WebP (high-resolution recommended for laptops & tablets)
              </p>
            </div>
          </div>

          {/* Section 2: Curated Brand Presets */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#D49B44] flex items-center gap-1.5 mb-3">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Curated Highway Atmospheres</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BACKGROUND_PRESETS.map((preset) => {
                const isActive = currentBg === preset.url;
                return (
                  <button
                    key={preset.id}
                    id={`preset-btn-${preset.id}`}
                    onClick={() => onSelectBg(preset.url)}
                    className={`group relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all overflow-hidden ${
                      isActive
                        ? 'border-[#D49B44] bg-[#D49B44]/15 ring-2 ring-[#D49B44]/40 shadow-lg'
                        : 'border-stone-800 bg-black/40 hover:border-stone-600 hover:bg-black/60'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-700/60">
                      <img
                        src={preset.previewUrl}
                        alt={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#D49B44]/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white truncate group-hover:text-[#D49B44] transition-colors">
                          {preset.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                        {preset.tagline}
                      </p>
                      {preset.badge && (
                        <span className="inline-block mt-1 text-[9px] font-semibold text-[#D49B44] tracking-wider uppercase">
                          {preset.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Adaptive Framing & Fit Modes */}
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-[#D49B44] flex items-center gap-1.5 mb-2.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Framing & Adaptability Mode</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Auto Flexible */}
              <button
                id="mode-auto-btn"
                onClick={() => onChangeFit('auto')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  bgFit === 'auto'
                    ? 'border-[#D49B44] bg-[#D49B44]/20 text-white ring-2 ring-[#D49B44]/30'
                    : 'border-stone-800 bg-black/40 text-stone-300 hover:border-stone-600'
                }`}
              >
                <Sliders className="w-4 h-4 text-[#D49B44] mb-1" />
                <span className="text-xs font-bold">Auto Adaptive</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Best for all devices</span>
              </button>

              {/* 100% Full Uncropped */}
              <button
                id="mode-contain-btn"
                onClick={() => onChangeFit('contain')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  bgFit === 'contain'
                    ? 'border-[#D49B44] bg-[#D49B44]/20 text-white ring-2 ring-[#D49B44]/30'
                    : 'border-stone-800 bg-black/40 text-stone-300 hover:border-stone-600'
                }`}
              >
                <Maximize2 className="w-4 h-4 text-[#D49B44] mb-1" />
                <span className="text-xs font-bold">100% Full View</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Zero crop loss</span>
              </button>

              {/* Cover Fill */}
              <button
                id="mode-cover-btn"
                onClick={() => onChangeFit('cover')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  bgFit === 'cover'
                    ? 'border-[#D49B44] bg-[#D49B44]/20 text-white ring-2 ring-[#D49B44]/30'
                    : 'border-stone-800 bg-black/40 text-stone-300 hover:border-stone-600'
                }`}
              >
                <Minimize2 className="w-4 h-4 text-[#D49B44] mb-1" />
                <span className="text-xs font-bold">Cinematic Cover</span>
                <span className="text-[10px] text-stone-400 mt-0.5">Edge-to-edge bleed</span>
              </button>
            </div>
          </div>

          {/* Section 4: Pure Artwork Display Mode */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-stone-800">
            <div>
              <span className="text-xs font-bold text-white block">Clean Artwork View</span>
              <span className="text-[11px] text-stone-400">
                Hide text overlays and headlines to admire pure brand photography
              </span>
            </div>
            <button
              id="modal-toggle-clean-view-btn"
              onClick={onToggleArtworkView}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isArtworkView
                  ? 'bg-[#D49B44] text-[#0B192C]'
                  : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              {isArtworkView ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Artwork Mode On</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Show Details</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-t border-stone-800 bg-[#0B1522] flex items-center justify-between">
          <p className="text-[11px] text-stone-400">
            Changes apply instantly to your homepage session.
          </p>
          <button
            id="modal-done-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#9B1B1E] hover:bg-[#801416] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
