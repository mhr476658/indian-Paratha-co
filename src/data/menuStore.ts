import { ALL_MENU_ITEMS } from './menu';
import { MenuItem } from '../types';
import {
  subscribeToMenuItems,
  saveMenuItemToFirestore,
  deleteMenuItemFromFirestore,
} from '../services/firestoreService';

const STORAGE_KEY = 'ipc_custom_menu_items';
const DELETED_STORAGE_KEY = 'ipc_deleted_menu_items';

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

const loadDeletedItems = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
};

let customItems: MenuItem[] = loadInitialCustomItems();
let deletedItemIds: string[] = loadDeletedItems();
let listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const menuStore = {
  // Get combined menu items: custom items first + active base menu items
  getAllItems(): MenuItem[] {
    const customIds = new Set(customItems.map((i) => i.id));
    const activeBaseItems = ALL_MENU_ITEMS.filter(
      (i) => !customIds.has(i.id) && !deletedItemIds.includes(i.id)
    );
    return [...customItems, ...activeBaseItems];
  },

  getCustomItems(): MenuItem[] {
    return customItems;
  },

  setCustomItems(items: MenuItem[], deletedIds?: string[]) {
    customItems = items;
    if (deletedIds) {
      deletedItemIds = deletedIds;
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        if (deletedIds) {
          localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedIds));
        }
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
    if (!deletedItemIds.includes(itemId)) {
      deletedItemIds = [...deletedItemIds, itemId];
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customItems));
        localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedItemIds));
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
        // Ideally we also sync deleted items from firestore if we extend it,
        // but for now we just sync custom items.
        this.setCustomItems(firestoreItems);
      }
    });
  },
};

// Initialize real-time Cloud Firestore listener
if (typeof window !== 'undefined') {
  menuStore.initFirestoreSync();
}
