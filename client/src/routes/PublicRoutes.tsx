import { Route } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import HomePage from '@/pages/public/HomePage';
import ProductsPage from '@/pages/public/ProductsPage';
import ProductDetailPage from '@/pages/public/ProductDetailPage';
import AboutUsPage from '@/pages/public/AboutUsPage';
import ContactPage from '@/pages/public/ContactPage';
import CartPage from '@/pages/public/CartPage';

// This component now returns a fragment of routes
export const PublicRoutes = () => (
  <>
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="products/:id" element={<ProductDetailPage />} />
      <Route path="about" element={<AboutUsPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="profile" element={<div className="p-8 text-center">User Profile - Coming Soon</div>} />
    </Route>
  </>
);

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: "about", element: <AboutUsPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "profile", element: <div className="p-8 text-center">User Profile - Coming Soon</div> },
    ],
  },
];