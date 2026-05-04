import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { buildNavItems } from './constants';
import { logoutAdmin } from '../../api/adminAuth';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersPage from './pages/OrdersPage';
import ReportPage from './pages/ReportPage';
import SettingsPage from './pages/SettingsPage';

function AdminPage({ onDeleteProduct, onSaveProduct, products }) {
  const location = useLocation();
  const [editorMessage, setEditorMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = location.pathname.replace(/\/$/, '');
  const activeSection = pathname.split('/')[2] || 'dashboard';

  const navItems = buildNavItems(products.length);
  const activeNav = navItems.find((item) => item.id === activeSection) || navItems[0];

  const handleLogout = () => {
    logoutAdmin();
    window.location.href = '/admin/login';
  };

  const handleSaveProduct = (product) => {
    onSaveProduct(product);
    setEditorMessage(`Saved "${product.name}" successfully.`);
  };

  const handleDeleteProduct = (productId, productName) => {
    onDeleteProduct(productId);
    setEditorMessage(productName ? `Removed "${productName}".` : 'Product removed.');
  };

  return (
    <section className="min-h-screen bg-[#0d1117]">
      <div className="min-h-screen lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar
          isOpen={isSidebarOpen}
          navItems={navItems}
          onLogout={handleLogout}
          onToggle={setIsSidebarOpen}
        />

        <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <AdminHeader activeLabel={activeNav.label} onOpenMenu={() => setIsSidebarOpen(true)} />

          {editorMessage && (
            <div className="mb-6 rounded-3xl border border-[#4a522a] bg-[#202714] px-5 py-4 text-sm text-[#d7d8c4] shadow-sm">
              {editorMessage}
            </div>
          )}

          <Routes>
            <Route path="dashboard" element={<DashboardPage products={products} />} />
            <Route path="products" element={<ProductsPage products={products} onDelete={handleDeleteProduct} />} />
            <Route path="products/add" element={<AddProductPage onSave={handleSaveProduct} />} />
            <Route
              path="products/:productId"
              element={<ProductDetailsPage products={products} onDelete={handleDeleteProduct} onSave={handleSaveProduct} />}
            />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="*" element={<Navigate replace to="dashboard" />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
