import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <div className="px-6 py-3 hover:bg-gray-800">
            <a href="/admin" className="block">Dashboard</a>
          </div>
          <div className="px-6 py-3 hover:bg-gray-800">
            <a href="/admin/products" className="block">Products</a>
          </div>
          <div className="px-6 py-3 hover:bg-gray-800">
            <a href="/admin/orders" className="block">Orders</a>
          </div>
          <div className="px-6 py-3 hover:bg-gray-800">
            <a href="/admin/users" className="block">Users</a>
          </div>
          <div className="px-6 py-3 hover:bg-gray-800">
            <a href="/admin/inquiries" className="block">Inquiries</a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Admin Header Placeholder */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, Admin</span>
                <button className="text-gray-600 hover:text-primary">
                  Profile
                </button>
                <button className="text-gray-600 hover:text-primary">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}