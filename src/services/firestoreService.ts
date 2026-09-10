import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem } from '../types';

export interface FirestoreOrder {
  id?: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  orderType: 'TAKEAWAY' | 'DINE_IN' | 'ROAD_TRIP_PICKUP';
  status: 'RECEIVED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }>;
  totalAmount: number;
  vehicleNumber?: string;
  highwayEta?: string;
  notes?: string;
  createdAt: string;
}

export interface FirestoreFranchiseInquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  highwayStretch: string;
  investmentCapacity: string;
  experience: string;
  status: 'NEW' | 'CONTACTED' | 'SHORTLISTED';
  createdAt: string;
}

export interface FirestoreStoreSettings {
  isOpen: boolean;
  prepTimeMinutes: number;
  specialNotice: string;
  highwayAlert: string;
  unavailableItemIds: string[];
  updatedAt?: string;
}

// -------------------------------------------------------------
// MENU ITEMS (Cloud Firestore Collection: 'menuItems')
// -------------------------------------------------------------

export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void): (() => void) => {
  try {
    const colRef = collection(db, 'menuItems');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const items: MenuItem[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...(docSnap.data() as Omit<MenuItem, 'id'>) });
        });
        callback(items);
      },
      (error) => {
        console.warn('Firestore menu items subscription error:', error);
      }
    );
  } catch (err) {
    console.warn('Firestore initialization error:', err);
    return () => {};
  }
};

export const saveMenuItemToFirestore = async (item: MenuItem): Promise<void> => {
  try {
    const docRef = doc(db, 'menuItems', item.id);
    const dataToSave = {
      name: item.name,
      hindiName: item.hindiName || '',
      category: item.category,
      price: item.price,
      description: item.description,
      image: item.image,
      isVegetarian: Boolean(item.isVegetarian),
      isSignature: Boolean(item.isSignature),
      isBestseller: Boolean(item.isBestseller),
      isNew: Boolean(item.isNew),
      spiceLevel: item.spiceLevel || 1,
      pairing: item.pairing || '',
      allergens: item.allergens || ['Gluten', 'Dairy'],
      updatedAt: new Date().toISOString(),
    };
    await setDoc(docRef, dataToSave, { merge: true });
  } catch (error) {
    console.error('Failed to save menu item to Firestore:', error);
    throw error;
  }
};

export const deleteMenuItemFromFirestore = async (itemId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'menuItems', itemId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Failed to delete menu item from Firestore:', error);
    throw error;
  }
};

// -------------------------------------------------------------
// ORDERS (Cloud Firestore Collection: 'orders')
// -------------------------------------------------------------

export const subscribeToOrders = (callback: (orders: FirestoreOrder[]) => void): (() => void) => {
  try {
    const ordersCol = collection(db, 'orders');
    return onSnapshot(
      ordersCol,
      (snapshot) => {
        const orders: FirestoreOrder[] = [];
        snapshot.forEach((docSnap) => {
          orders.push({ id: docSnap.id, ...(docSnap.data() as Omit<FirestoreOrder, 'id'>) });
        });
        // Sort newest first
        orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(orders);
      },
      (error) => {
        console.warn('Firestore orders subscription warning:', error);
      }
    );
  } catch (err) {
    console.warn('Firestore orders listener error:', err);
    return () => {};
  }
};

export const saveOrderToFirestore = async (order: FirestoreOrder): Promise<void> => {
  try {
    const docRef = doc(db, 'orders', order.orderId);
    await setDoc(docRef, {
      ...order,
      createdAt: order.createdAt || new Date().toISOString(),
      serverUpdated: serverTimestamp(),
    });
  } catch (error) {
    console.error('Failed to save order to Firestore:', error);
  }
};

export const updateOrderStatusInFirestore = async (
  orderId: string,
  status: FirestoreOrder['status']
): Promise<void> => {
  try {
    const docRef = doc(db, 'orders', orderId);
    await setDoc(docRef, { status, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Failed to update order status in Firestore:', error);
  }
};

// -------------------------------------------------------------
// FRANCHISE INQUIRIES (Cloud Firestore Collection: 'franchiseInquiries')
// -------------------------------------------------------------

export const subscribeToFranchiseInquiries = (
  callback: (inquiries: FirestoreFranchiseInquiry[]) => void
): (() => void) => {
  try {
    const colRef = collection(db, 'franchiseInquiries');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const inquiries: FirestoreFranchiseInquiry[] = [];
        snapshot.forEach((docSnap) => {
          inquiries.push({ id: docSnap.id, ...(docSnap.data() as Omit<FirestoreFranchiseInquiry, 'id'>) });
        });
        inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        callback(inquiries);
      },
      (error) => {
        console.warn('Firestore franchise inquiries error:', error);
      }
    );
  } catch (err) {
    console.warn('Firestore franchise inquiries error:', err);
    return () => {};
  }
};

export const saveFranchiseInquiryToFirestore = async (
  inquiry: FirestoreFranchiseInquiry
): Promise<void> => {
  try {
    const id = inquiry.id || `lead-${Date.now()}`;
    const docRef = doc(db, 'franchiseInquiries', id);
    await setDoc(docRef, {
      ...inquiry,
      createdAt: inquiry.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to save franchise inquiry to Firestore:', error);
  }
};

export const updateFranchiseInquiryStatusInFirestore = async (
  inquiryId: string,
  status: 'NEW' | 'CONTACTED' | 'SHORTLISTED'
): Promise<void> => {
  try {
    const docRef = doc(db, 'franchiseInquiries', inquiryId);
    await setDoc(docRef, { status }, { merge: true });
  } catch (error) {
    console.error('Failed to update inquiry status in Firestore:', error);
  }
};

// -------------------------------------------------------------
// STORE SETTINGS & INVENTORY (Cloud Firestore Document: 'settings/store')
// -------------------------------------------------------------

export const subscribeToStoreSettings = (
  callback: (settings: FirestoreStoreSettings) => void
): (() => void) => {
  try {
    const docRef = doc(db, 'settings', 'store');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as FirestoreStoreSettings);
        }
      },
      (error) => {
        console.warn('Firestore store settings error:', error);
      }
    );
  } catch (err) {
    console.warn('Firestore store settings error:', err);
    return () => {};
  }
};

export const updateStoreSettingsInFirestore = async (
  settings: Partial<FirestoreStoreSettings>
): Promise<void> => {
  try {
    const docRef = doc(db, 'settings', 'store');
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Failed to update store settings in Firestore:', error);
  }
};

export const toggleStockInFirestore = async (
  itemId: string,
  isAvailable: boolean,
  currentUnavailable: string[]
): Promise<void> => {
  try {
    const docRef = doc(db, 'settings', 'store');
    const updated = isAvailable
      ? currentUnavailable.filter((id) => id !== itemId)
      : Array.from(new Set([...currentUnavailable, itemId]));

    await setDoc(docRef, { unavailableItemIds: updated, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Failed to toggle stock in Firestore:', error);
  }
};
