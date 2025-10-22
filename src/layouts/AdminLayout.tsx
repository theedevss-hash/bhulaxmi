// src/layouts/AdminLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle } from "lucide-react";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div className="p-4 text-xl font-bold text-amber-600 border-b border-gray-200 dark:border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-amber-50"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-amber-50"
              }`
            }
          >
            <Package className="w-5 h-5" />
            Products
          </NavLink>

          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-100 text-amber-700 font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:bg-amber-50"
              }`
            }
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
