import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, CartItem } from '@/types';
import type { Product } from '@/lib/mockData';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { 
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: 1 
            }],
          });
        }
      },

      addItem: (productId: string, price: number) => {
        // Legacy function for backward compatibility
        const { items } = get();
        const existingItem = items.find(item => item.productId === productId);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { productId, quantity: 1, price, name: '', imageUrl: '' }],
          });
        }
      },

      removeFromCart: (productId: string) => {
        const { items } = get();
        set({
          items: items.filter(item => item.productId !== productId),
        });
      },

      removeItem: (productId: string) => {
        // Legacy function for backward compatibility
        get().removeFromCart(productId);
      },

      updateQuantity: (productId: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          items: items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);