import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void; // New delete trigger action
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),

      // Filters out the target item completely from global state
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
      })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-cart-storage',
    }
  )
);