import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, User } from '@/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,

      login: async (email: string, password: string) => {
        try {
          // Mock authentication - replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'customer',
          };

          set({
            isLoggedIn: true,
            user: mockUser,
          });
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
        });
      },

      register: async (email: string, password: string, name: string) => {
        try {
          // Mock registration - replace with actual API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role: 'customer',
          };

          set({
            isLoggedIn: true,
            user: mockUser,
          });
        } catch (error) {
          throw new Error('Registration failed');
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);