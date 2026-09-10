import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'espresso' | 'caramel' | 'noir' | 'chalet' | 'linen';

export interface ThemePalette {
  id: ThemeId;
  name: string;
  tagline: string;
  dotColor: string;
  accentColor: string;
  bgBase: string;
  bgSurface: string;
  isDark: boolean;
  atmosphereId: string;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'espresso',
    name: 'Espresso & Tandoor Roast',
    tagline: 'Warm roasted mocha, bronze tawa & golden glow',
    dotColor: '#0E0C0A',
    accentColor: '#D4AF77',
    bgBase: '#0E0C0A',
    bgSurface: '#181411',
    isDark: true,
    atmosphereId: 'premium-resort-horizon',
  },
  {
    id: 'caramel',
    name: 'Amber Caramel & Hearth',
    tagline: 'Toasted butterscotch, saffron embers & rich tawa',
    dotColor: '#140E0A',
    accentColor: '#E5A95D',
    bgBase: '#140E0A',
    bgSurface: '#1F1712',
    isDark: true,
    atmosphereId: 'warm-chalet',
  },
  {
    id: 'noir',
    name: 'Obsidian Noir Highway',
    tagline: 'Midnight charcoal minimal with brushed champagne brass',
    dotColor: '#08080A',
    accentColor: '#D4AF77',
    bgBase: '#08080A',
    bgSurface: '#111216',
    isDark: true,
    atmosphereId: 'starlit-sanctuary',
  },
  {
    id: 'chalet',
    name: 'Devanahalli Pine & Chalet',
    tagline: 'Architectural cedar timber, slate & suspended atrium',
    dotColor: '#0F1420',
    accentColor: '#C89D58',
    bgBase: '#0F1420',
    bgSurface: '#171B26',
    isDark: true,
    atmosphereId: 'grand-emily-atrium',
  },
  {
    id: 'linen',
    name: 'Artisan Linen & Daylight',
    tagline: 'Sunlit highway veranda, warm travertine & terracotta',
    dotColor: '#F8F5EE',
    accentColor: '#8C5824',
    bgBase: '#F8F5EE',
    bgSurface: '#EFE9DF',
    isDark: false,
    atmosphereId: 'premium-resort-horizon',
  },
];

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  activePalette: ThemePalette;
  palettes: ThemePalette[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'ipc_website_theme_palette';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId;
      if (saved && THEME_PALETTES.some((p) => p.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'espresso';
  });

  const activePalette =
    THEME_PALETTES.find((p) => p.id === currentTheme) || THEME_PALETTES[0];

  const setTheme = (theme: ThemeId) => {
    setCurrentThemeState(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // Apply data-theme to root html element
    const root = document.documentElement;
    root.setAttribute('data-theme', currentTheme);
    if (!activePalette.isDark) {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
    }
  }, [currentTheme, activePalette]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        activePalette,
        palettes: THEME_PALETTES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
