import { BrowserRouter, useRoutes } from 'react-router-dom';

// Import the route arrays
import { adminRoutes } from './AdminRoutes';
import { publicRoutes } from './PublicRoutes';
import { authRoutes } from './AuthRoutes';

const AppRoutes = () => {
  // The useRoutes hook takes an array of route objects and renders the appropriate one
  const routes = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...adminRoutes,
    // Add 404 Not Found route at the end
    { path: '*', element: <h1>404 - Page Not Found</h1> },
  ]);

  return routes;
};

// The main router component wraps everything in BrowserRouter
export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}