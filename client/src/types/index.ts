export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: import('@/lib/mockData').Product) => void;
  addItem: (productId: string, price: number) => void; // Legacy
  removeFromCart: (productId: string) => void;
  removeItem: (productId: string) => void; // Legacy
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}