import { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';

function AdminLayout({ children, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={onLogout}
      />

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile header with toggle */}
        <div className="lg:hidden border-b border-white/10 bg-[#161b22] px-4 py-3 flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#f0ece4] hover:text-[#C9A84C]"
          >
            ☰
          </button>
          <h1 className="ml-4 text-lg font-display text-[#f0ece4]">Tunsrom Admin</h1>
        </div>

        {/* Content area */}
        <main className="overflow-auto">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
