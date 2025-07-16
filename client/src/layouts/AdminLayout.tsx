// ----------------- START OF FINAL, CORRECTED AdminLayout.tsx -----------------

import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, LogOut, UserCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  // --- Use a selector to get both the user and the logout function ---
const user = useAuthStore(state => state.user);
const logout = useAuthStore(state => state.logout);


  const handleLogout = () => {
    logout();
    navigate('/admin/login'); // Redirect to the admin login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col">
        <div className="p-6">
          <Link to="/admin" className="text-xl font-bold text-primary">
            SPF Admin
          </Link>
        </div>
        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end // Use 'end' for the Dashboard link to prevent it from matching sub-routes
              className={({ isActive }) =>
                `flex items-center px-6 py-3 hover:bg-gray-700 transition-colors ${
                  isActive ? 'bg-primary/20 text-white border-r-4 border-primary' : ''
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-3">
            <div className="flex items-center justify-end">
              <div className="flex items-center space-x-4">
                {/* --- This is now dynamic --- */}
                <span className="text-gray-600 text-sm font-medium">
                  Welcome, {user?.name || 'Admin'}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                     <DropdownMenuItem asChild>
                        <Link to="/admin/profile" className="cursor-pointer">
                            <UserCircle className="mr-2 h-4 w-4" /> Profile
                        </Link>
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                     </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// ----------------- END OF FINAL, CORRECTED AdminLayout.tsx -----------------