import { ALL_MENU_ITEMS } from './menu';
import { MenuItem } from '../types';
import {
  subscribeToMenuItems,
  saveMenuItemToFirestore,
  deleteMenuItemFromFirestore,
} from '../services/firestoreService';

const STORAGE_KEY = 'ipc_custom_menu_items';

// Load saved custom items from localStorage as instant fallback
const loadInitialCustomItems = (): MenuItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading custom menu items:', err);
    return [];
  }
};

let customItems: MenuItem[] = loadInitialCustomItems();
let listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const menuStore = {
  // Get combined menu items: custom items first + base menu items
  getAllItems(): MenuItem[] {
    return [...customItems, ...ALL_MENU_ITEMS];
  },

  getCustomItems(): MenuItem[] {
    return customItems;
  },

  setCustomItems(items: MenuItem[]) {
    customItems = items;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (err) {
        console.error('Error saving custom menu items to localStorage:', err);
      }
    }
    notifyListeners();
  },

  async addCustomItem(item: MenuItem) {
    // Update local state immediately for snappy UI
    customItems = [item, ...customItems.filter((i) => i.id !== item.id)];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
      } catch (err) {
        console.error('Error saving custom menu items:', err);
      }
    }
    notifyListeners();

    // Persist to Cloud Firestore
    try {
      await saveMenuItemToFirestore(item);
    } catch (err) {
      console.warn('Firestore menu save warning (saved locally):', err);
    }
  },

  async removeCustomItem(itemId: string) {
    // Update local state immediately
    customItems = customItems.filter((i) => i.id !== itemId);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
      } catch (err) {
        console.error('Error saving custom menu items:', err);
      }
    }
    notifyListeners();

    // Remove from Cloud Firestore
    try {
      await deleteMenuItemFromFirestore(itemId);
    } catch (err) {
      console.warn('Firestore menu delete warning:', err);
    }
  },

  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  // Real-time Cloud Firestore Listener
  initFirestoreSync() {
    if (typeof window === 'undefined') return;

    subscribeToMenuItems((firestoreItems) => {
      if (firestoreItems && Array.isArray(firestoreItems)) {
        this.setCustomItems(firestoreItems);
      }
    });
  },
};

// Initialize real-time Cloud Firestore listener
if (typeof window !== 'undefined') {
  menuStore.initFirestoreSync();
}
