// ----------------- START OF CORRECTED AdminRoutes.tsx -----------------

import { Navigate, Outlet, useLocation, RouteObject } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import AdminLayout from '@/layouts/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import ProductFormPage from '@/pages/admin/ProductFormPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminInquiriesPage from '@/pages/admin/AdminInquiriesPage';

// The Gatekeeper Component (no changes here)
const AdminRouteProtection = () => {
  const { isLoggedIn, user } = useAuthStore.getState();
  const location = useLocation();

  if (!isLoggedIn || user?.role !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

// The Route Definitions as an array
export const adminRoutes: RouteObject[] = [
  {
    element: <AdminRouteProtection />, // The gatekeeper for all routes inside
    children: [
      {
        path: '/admin', // All routes inside are relative to /admin
        element: <AdminLayout />, // All routes inside render within the AdminLayout
        children: [
          {
            index: true, // This matches the exact path "/admin"
            element: <DashboardPage />
          },
          {
            path: 'products', // This matches "/admin/products"
            element: <AdminProductsPage />
          },
          {
            path: 'products/new', // This matches "/admin/products/new"
            element: <ProductFormPage />
          },
          // --- THIS IS THE FIX ---
          // This now correctly matches "/admin/products/edit/:id"
          {
            path: 'products/edit/:id',
            element: <ProductFormPage />
          },
          {
            path: 'orders', // This matches "/admin/orders"
            element: <AdminOrdersPage />
          },
          {
            path: 'users', // This matches "/admin/users"
            element: <AdminUsersPage />
          },
          {
            path: 'inquiries', // This matches "/admin/inquiries"
            element: <AdminInquiriesPage />
          },
        ],
      },
    ],
  },
];
// ----------------- END OF CORRECTED AdminRoutes.tsx -----------------