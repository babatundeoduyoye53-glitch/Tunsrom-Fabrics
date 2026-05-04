import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import TopBar from './components/TopBar';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import WhatsNew from './components/WhatsNew';
import FeatureBanner from './components/FeatureBanner';
import ProductGallery from './components/ProductGallery';
import LatestCollections from './components/LatestCollections';
import NewArrivals from './components/NewArrivals';
import BlogSection from './components/BlogSection';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import AdminPage from './components/admin';
import AdminLogin from './components/admin/components/AdminLogin';
import ProductDetailsPage from './components/ProductDetailsPage';
import WhatsAppChatButton from './components/WhatsAppChatButton';
import DeliveryPolicyPage from './components/support/DeliveryPolicyPage';
import ReturnsPage from './components/support/ReturnsPage';
import FAQsPage from './components/support/FAQsPage';
import OrderTrackingPage from './components/support/OrderTrackingPage';
import CustomerAuthPage from './components/account/CustomerAuthPage';
import CustomerAccountPage from './components/account/CustomerAccountPage';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from './api/products';
import { isAdminAuthenticated } from './api/adminAuth';
import { isCustomerAuthenticated } from './api/auth';

function RequireAdminAuth({ children }) {
  const location = useLocation();
  if (!isAdminAuthenticated()) {
    return <Navigate replace to="/admin/login" state={{ from: location.pathname }} />;
  }
  return children;
}

function RequireCustomerAuth({ children }) {
  const location = useLocation();
  if (!isCustomerAuthenticated()) {
    return <Navigate replace to="/account/login" state={{ from: location.pathname }} />;
  }
  return children;
}

// ─── Shared cart state lives here so it persists across page navigations ───
const CART_STORAGE_KEY = 'tunsrom-cart';

function getSavedCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function useCart(products) {
  const [cartItems, setCartItems] = useState(getSavedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const normalisedProducts = useMemo(
    () => products.map((p) => ({ ...p, id: p._id ?? p.id })),
    [products],
  );

  const cartProducts = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = normalisedProducts.find((p) => p.id === item.productId);
          if (!product) return null;
          return { ...product, quantity: item.quantity };
        })
        .filter(Boolean),
    [cartItems, normalisedProducts],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  // Add to cart AND open the drawer immediately
  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { productId: product.id, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const changeQuantity = (productId, quantity) => {
    setCartItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          ),
    );
  };

  const removeItem = (productId) => {
    setCartItems((current) => current.filter((item) => item.productId !== productId));
  };

  return {
    cartProducts,
    cartCount,
    addToCart,
    changeQuantity,
    removeItem,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  };
}

// ─── Storefront layout wrapper (header + footer + cart) ───
function StorefrontLayout({ products, loading, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cartProducts,
    cartCount,
    addToCart,
    changeQuantity,
    removeItem,
    isCartOpen,
    openCart,
    closeCart,
  } = useCart(products);

  // Derive current page from URL for header active state
  const currentPage = useMemo(() => {
    if (location.pathname === '/shop') return 'shop';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname.startsWith('/products/')) return 'product';
    return 'home';
  }, [location.pathname]);

  const handleNavigateHome = () => navigate('/');
  const handleNavigateToShop = (category = 'all') => navigate(category && category !== 'all' ? `/shop?category=${category}` : '/shop');
  const handleSearchShop = (query) => navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
  const handleNavigateToContact = () => navigate('/contact');
  const handleNavigateToAccount = () => navigate(isCustomerAuthenticated() ? '/account' : '/account/login');
  const handleNavigateToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/?section=${sectionId}`);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p className="text-[#6B6456]">Loading products…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-[#1A1208]">
      <TopBar />
      <Header
        cartCount={cartCount}
        currentPage={currentPage}
        onAccountClick={handleNavigateToAccount}
        onCartClick={openCart}
        onNavigateHome={handleNavigateHome}
        onNavigateToContact={handleNavigateToContact}
        onNavigateToSection={handleNavigateToSection}
        onNavigateToShop={handleNavigateToShop}
        onSearchShop={handleSearchShop}
        searchQuery=""
      />
      <main>
        {/* Pass addToCart down via cloneElement so child pages can use it */}
        {typeof children === 'function' ? children({ addToCart }) : children}
      </main>
      <Footer />
      <WhatsAppChatButton />
      <CartDrawer
        isOpen={isCartOpen}
        items={cartProducts}
        onClose={closeCart}
        onQuantityChange={changeQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}

// ─── Home page ───
function HomePage({ products, addToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Handle ?section= scroll after navigating from another page
  useEffect(() => {
    const section = searchParams.get('section');
    if (!section) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const normalisedProducts = useMemo(
    () => products.map((p) => ({ ...p, id: p._id ?? p.id })),
    [products],
  );

  return (
    <>
      <HeroSlider onShopClick={() => navigate('/shop')} />
      <WhatsNew onShopClick={(cat) => navigate(cat && cat !== 'all' ? `/shop?category=${cat}` : '/shop')} />
      <FeatureBanner onShopClick={() => navigate('/shop')} />
      <ProductGallery />
      <LatestCollections onShopClick={(cat) => navigate(cat && cat !== 'all' ? `/shop?category=${cat}` : '/shop')} />
      <NewArrivals
        onAddToCart={addToCart}
        onShopClick={() => navigate('/shop')}
        onViewProduct={(product) => navigate(`/products/${product.id}`)}
        products={normalisedProducts}
      />
      <BlogSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}

// ─── Shop page wrapper (reads ?category and ?search from URL) ───
function ShopPageWrapper({ products, addToCart }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const normalisedProducts = useMemo(
    () => products.map((p) => ({ ...p, id: p._id ?? p.id })),
    [products],
  );

  const handleCategoryChange = (cat) => {
    setSearchParams(cat && cat !== 'all' ? { category: cat } : {});
  };

  return (
    <ShopPage
      activeCategory={activeCategory}
      onAddToCart={addToCart}
      onCategoryChange={handleCategoryChange}
      onNavigateHome={() => navigate('/')}
      onViewProduct={(product) => navigate(`/products/${product.id}`)}
      products={normalisedProducts}
      searchQuery={searchQuery}
    />
  );
}

// ─── Product detail page wrapper (reads :productId from URL) ───
function ProductPageWrapper({ products, addToCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = location.pathname.split('/products/')[1];

  const normalisedProducts = useMemo(
    () => products.map((p) => ({ ...p, id: p._id ?? p.id })),
    [products],
  );

  const product = normalisedProducts.find((p) => p.id === productId) ?? null;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return normalisedProducts
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [normalisedProducts, product]);

  if (!product) return <Navigate replace to="/shop" />;

  return (
    <ProductDetailsPage
      onAddToCart={addToCart}
      onBack={() => navigate(-1)}
      onViewProduct={(p) => navigate(`/products/${p.id}`)}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}

// ─── Root App ───
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProduct = async (productDraft) => {
    try {
      const formData = new FormData();
      Object.entries(productDraft).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      if (productDraft._id) {
        const updated = await updateProduct(productDraft._id, formData);
        setProducts((current) => current.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await createProduct(formData);
        setProducts((current) => [created, ...current]);
      }
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      setProducts((current) => current.filter((p) => (p._id ?? p.id) !== productId));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <Routes>
      {/* ── Storefront routes ── */}
      <Route
        path="/"
        element={
          <StorefrontLayout products={products} loading={loading}>
            {({ addToCart }) => <HomePage products={products} addToCart={addToCart} />}
          </StorefrontLayout>
        }
      />
      <Route
        path="/shop"
        element={
          <StorefrontLayout products={products} loading={loading}>
            {({ addToCart }) => <ShopPageWrapper products={products} addToCart={addToCart} />}
          </StorefrontLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <StorefrontLayout products={products} loading={loading}>
            {() => <ContactPage onNavigateHome={() => {}} />}
          </StorefrontLayout>
        }
      />
      <Route
        path="/products/:productId"
        element={
          <StorefrontLayout products={products} loading={loading}>
            {({ addToCart }) => <ProductPageWrapper products={products} addToCart={addToCart} />}
          </StorefrontLayout>
        }
      />

      {/* ── Support pages ── */}
      <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />
      <Route path="/returns" element={<ReturnsPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/order-tracking" element={<OrderTrackingPage />} />

      {/* ── Account pages ── */}
      <Route path="/account/login" element={<CustomerAuthPage />} />
      <Route
        path="/account"
        element={
          <RequireCustomerAuth>
            <CustomerAccountPage />
          </RequireCustomerAuth>
        }
      />

      {/* ── Admin pages ── */}
      <Route path="/admin/login" element={<AdminLogin totalProducts={products.length} totalRevenue="₦1,456,000" />} />
      <Route
        path="/admin"
        element={
          <RequireAdminAuth>
            <Navigate replace to="/admin/dashboard" />
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/*"
        element={
          <RequireAdminAuth>
            <AdminPage
              onDeleteProduct={handleDeleteProduct}
              onSaveProduct={handleSaveProduct}
              products={products}
            />
          </RequireAdminAuth>
        }
      />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;
