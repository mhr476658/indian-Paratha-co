import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme, ThemePalette } from '../context/ThemeContext';

interface ThemePaletteSelectorProps {
  variant?: 'navbar' | 'floating' | 'inline';
  className?: string;
  onSelect?: () => void;
}

export const ThemePaletteSelector: React.FC<ThemePaletteSelectorProps> = ({
  variant = 'navbar',
  className = '',
  onSelect,
}) => {
  const { currentTheme, setTheme, activePalette, palettes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (palette: ThemePalette) => {
    setTheme(palette.id);
    setIsOpen(false);
    if (onSelect) onSelect();
  };

  // Inline variant: direct grid of theme cards
  if (variant === 'inline') {
    return (
      <div className={`space-y-2 ${className}`}>
        {palettes.map((p) => {
          const isSelected = p.id === currentTheme;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                isSelected
                  ? 'bg-black/60 border-[var(--color-gold)] shadow-md text-stone-100'
                  : 'bg-black/30 border-white/10 hover:border-white/25 text-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full border border-white/30 shrink-0 shadow-sm"
                  style={{ backgroundColor: p.dotColor }}
                />
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    <span>{p.name}</span>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-stone-400 line-clamp-1">{p.tagline}</div>
                </div>
              </div>
              {isSelected ? (
                <Check className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
              ) : (
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: p.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Floating variant: bottom-right button with popover
  if (variant === 'floating') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          id="floating-theme-palette-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-[#14100E]/90 hover:bg-[#14100E] border border-[#D4AF77]/50 text-[#D4AF77] shadow-2xl backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
          title="Change 3D Theme Palette"
          aria-label="Change 3D Theme Palette"
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
            style={{ backgroundColor: activePalette.dotColor }}
          />
          <Palette className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        </button>

        {isOpen && (
          <div
            id="floating-theme-palette-dropdown"
            className="absolute bottom-16 right-0 w-72 rounded-2xl bg-[#14100E]/95 border border-[#D4AF77]/40 shadow-2xl p-3 z-50 animate-fadeIn space-y-2 backdrop-blur-2xl"
          >
            <div className="px-2 py-1 text-[11px] uppercase tracking-widest text-[#D4AF77] font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Atmosphere &amp; Theme</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-200 text-xs font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto no-scrollbar">
              {palettes.map((p) => {
                const isSelected = p.id === currentTheme;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-black/60 border border-[#D4AF77] text-stone-100'
                        : 'bg-black/20 hover:bg-black/40 border border-white/5 hover:border-white/15 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: p.dotColor }}
                      />
                      <div className="truncate">
                        <div className="text-xs font-semibold truncate">{p.name}</div>
                        <div className="text-[10px] text-stone-400 truncate">{p.tagline}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF77] shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default "navbar" variant: sleek pill button matching Silver Oak Cafe's navbar
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id="navbar-theme-palette-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-white/15 hover:border-[#D4AF77]/60 bg-black/40 hover:bg-black/60 text-xs font-medium text-[#F8F4EC] transition-all cursor-pointer shadow-sm group"
        title="Change 3D Theme Palette"
        aria-label="Change 3D Theme Palette"
      >
        <span
          className="w-3 h-3 rounded-full border border-white/30 shadow-sm shrink-0"
          style={{ backgroundColor: activePalette.dotColor }}
        />
        <Palette className="w-3.5 h-3.5 text-[#D4AF77] group-hover:rotate-12 transition-transform shrink-0" />
        <span className="hidden xl:inline text-[11px] uppercase tracking-wider font-semibold truncate max-w-[120px]">
          {activePalette.name.split('&')[0].trim()}
        </span>
        <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-stone-200 transition-transform" />
      </button>

      {isOpen && (
        <div
          id="navbar-theme-palette-dropdown"
          className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#14100E]/95 border border-[#D4AF77]/40 shadow-2xl p-2.5 z-50 animate-fadeIn space-y-1.5 backdrop-blur-2xl"
        >
          <div className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#D4AF77] font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Color &amp; Atmosphere</span>
            </div>
            <span className="text-[9px] font-mono text-stone-400">3D PERSPECTIVE</span>
          </div>

          <div className="space-y-1">
            {palettes.map((p) => {
              const isSelected = p.id === currentTheme;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelect(p)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black/60 border border-[#D4AF77]/80 text-stone-100 shadow-sm'
                      : 'hover:bg-black/30 border border-transparent hover:border-white/10 text-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0 shadow-sm"
                      style={{ backgroundColor: p.dotColor }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate text-stone-200">{p.name}</div>
                      <div className="text-[10px] text-stone-400 truncate">{p.tagline}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF77] shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
