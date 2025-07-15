export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stockStatus: 'In Stock' | 'Out of Stock';
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export interface CartItem {
  product: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: IProduct, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  // Other cart-related properties and functions can be added here
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  user: User; // Reference the User interface
  orderItems: CartItem[]; // Reference the CartItem interface
  shippingAddress: IShippingAddress;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInquiry {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdAt: string;
}