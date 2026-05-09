import { useEffect, useMemo, useRef, useState } from 'react';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import StyledSelect from './StyledSelect';
import { ProductGridSkeleton, SectionHeadingSkeleton } from './Skeleton';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'lace', label: 'Lace' },
  { id: 'jacquard', label: 'Jacquard' },
  { id: 'caps', label: 'Caps' },
  { id: 'cashmere', label: 'Cashmere' },
  { id: 'cofflins', label: 'Cofflins' },
  { id: 'wool', label: 'Wool' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low → High' },
  { id: 'price-high', label: 'Price: High → Low' },
  { id: 'newest', label: 'Newest first' },
  { id: 'sale', label: 'Sale first' },
];

const priceOptions = [
  { id: 'all', label: 'All prices' },
  { id: 'under-30000', label: 'Under ₦30k' },
  { id: '30000-70000', label: '₦30k – ₦70k' },
  { id: '70000-120000', label: '₦70k – ₦120k' },
  { id: '120000-plus', label: 'Above ₦120k' },
];

function matchesPriceRange(product, priceRange) {
  if (priceRange === 'all') return true;
  if (priceRange === 'under-30000') return product.price < 30000;
  if (priceRange === '30000-70000') return product.price >= 30000 && product.price <= 70000;
  if (priceRange === '70000-120000') return product.price > 70000 && product.price <= 120000;
  return product.price > 120000;
}

function ShopSection({
  activeCategory,
  description,
  enablePagination = false,
  itemsPerPage = 8,
  loading = false,
  onAddToCart,
  onCategoryChange,
  onViewProduct,
  products,
  searchQuery = '',
  subtitle = 'Shop',
  title = 'Our Collection',
}) {
  const [internalTab, setInternalTab] = useState(activeCategory || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [saleOnly, setSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const drawerRef = useRef(null);

  const selectedTab = activeCategory ?? internalTab;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const activeFilterCount = [
    sortBy !== 'featured',
    priceRange !== 'all',
    saleOnly,
    newOnly,
  ].filter(Boolean).length;

  useEffect(() => {
    if (activeCategory) setInternalTab(activeCategory);
  }, [activeCategory]);

  // Lock body scroll when filter drawer is open on mobile
  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [filterOpen]);

  const filteredProducts = useMemo(() => {
    let next = [...products];
    if (selectedTab !== 'all') next = next.filter((p) => p.category === selectedTab);
    if (normalizedQuery) next = next.filter((p) =>
      [p.name, p.brand, p.category].join(' ').toLowerCase().includes(normalizedQuery)
    );
    if (saleOnly) next = next.filter((p) => p.isSale);
    if (newOnly) next = next.filter((p) => p.isNew);
    next = next.filter((p) => matchesPriceRange(p, priceRange));
    if (sortBy === 'price-low') next.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') next.sort((a, b) => b.price - a.price);
    if (sortBy === 'newest') next.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
    if (sortBy === 'sale') next.sort((a, b) => Number(b.isSale) - Number(a.isSale) || a.price - b.price);
    return next;
  }, [newOnly, normalizedQuery, priceRange, products, saleOnly, selectedTab, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, normalizedQuery, sortBy, priceRange, saleOnly, newOnly]);

  const totalPages = enablePagination ? Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage)) : 1;

  const visibleProducts = useMemo(() => {
    if (!enablePagination) return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [currentPage, enablePagination, filteredProducts, itemsPerPage]);

  const handleTabChange = (tabId) => {
    setInternalTab(tabId);
    setCurrentPage(1);
    if (onCategoryChange) onCategoryChange(tabId);
  };

  const clearFilters = () => {
    setSortBy('featured');
    setPriceRange('all');
    setSaleOnly(false);
    setNewOnly(false);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section id="shop" className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        {loading ? (
          <SectionHeadingSkeleton />
        ) : (
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{subtitle}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#1A1208] sm:mt-3 sm:text-5xl">{title}</h2>
            {description && (
              <p className="mt-3 text-sm leading-7 text-[#6B6456]">{description}</p>
            )}
          </div>
        )}

        {/* ── Category tabs (horizontal scroll) ── */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex min-w-max gap-2 pb-1 sm:min-w-0 sm:flex-wrap sm:justify-center sm:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition sm:px-5 sm:py-2.5 ${
                  selectedTab === tab.id
                    ? 'bg-gold text-white shadow-lg shadow-gold/20'
                    : 'bg-white text-[#1A1208] ring-1 ring-black/10 hover:bg-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="mt-5 mb-6 flex items-center justify-between gap-3">
          {/* Left: result count */}
          <p className="text-sm text-[#6B6456]">
            {loading ? (
              <span className="inline-block h-4 w-28 animate-pulse rounded-full bg-[#ede8df]" />
            ) : (
              <>
                <span className="font-semibold text-[#1A1208]">{filteredProducts.length}</span>
                {' '}product{filteredProducts.length !== 1 ? 's' : ''}
                {normalizedQuery && <span className="text-[#8b6914]"> for "{searchQuery}"</span>}
              </>
            )}
          </p>

          {/* Right: desktop selects + mobile filter button */}
          <div className="flex items-center gap-2">
            {/* Desktop-only selects inline */}
            <div className="hidden gap-2 sm:flex">
              <StyledSelect
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                className="w-44"
              />
              <StyledSelect
                value={priceRange}
                onChange={setPriceRange}
                options={priceOptions}
                className="w-40"
              />
              {(saleOnly || newOnly) && (
                <div className="flex gap-1.5">
                  {saleOnly && (
                    <span className="flex items-center gap-1 rounded-full bg-burgundy/10 px-3 py-1.5 text-xs font-semibold text-burgundy">
                      Sale
                      <button onClick={() => setSaleOnly(false)} className="ml-0.5 hover:text-burgundy/70"><X size={11} /></button>
                    </span>
                  )}
                  {newOnly && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      New
                      <button onClick={() => setNewOnly(false)} className="ml-0.5 hover:text-emerald-500"><X size={11} /></button>
                    </span>
                  )}
                </div>
              )}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border border-[#dfcfaa] px-4 py-2 text-xs font-semibold text-[#1A1208] transition hover:border-gold hover:text-gold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="relative flex items-center gap-2 rounded-full border border-[#dfcfaa] bg-white px-4 py-2.5 text-sm font-semibold text-[#1A1208] transition hover:border-gold hover:text-gold sm:hidden"
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile filter drawer ── */}
        <div className="sm:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setFilterOpen(false)}
            className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
              filterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          />
          {/* Drawer */}
          <div
            ref={drawerRef}
            className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
              filterOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-black/10" />
            </div>

            <div className="flex items-center justify-between border-b border-black/5 px-5 py-3">
              <h3 className="font-display text-lg font-semibold text-[#1A1208]">Filters</h3>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-[#1A1208]"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-5 space-y-6">
              {/* Sort */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Sort by</p>
                <div className="grid grid-cols-2 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSortBy(opt.id)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                        sortBy === opt.id
                          ? 'border-gold bg-[#fdf6e8] text-[#8b6914]'
                          : 'border-black/10 text-[#1A1208] hover:border-gold/50'
                      }`}
                    >
                      {opt.label}
                      {sortBy === opt.id && <Check size={13} className="shrink-0 text-[#8b6914]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Price range</p>
                <div className="grid grid-cols-2 gap-2">
                  {priceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPriceRange(opt.id)}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                        priceRange === opt.id
                          ? 'border-gold bg-[#fdf6e8] text-[#8b6914]'
                          : 'border-black/10 text-[#1A1208] hover:border-gold/50'
                      }`}
                    >
                      {opt.label}
                      {priceRange === opt.id && <Check size={13} className="shrink-0 text-[#8b6914]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Filter by</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSaleOnly((v) => !v)}
                    className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      saleOnly ? 'border-burgundy bg-burgundy text-white' : 'border-black/10 text-[#1A1208] hover:border-burgundy/40'
                    }`}
                  >
                    Sale only
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewOnly((v) => !v)}
                    className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${
                      newOnly ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-black/10 text-[#1A1208] hover:border-emerald-400'
                    }`}
                  >
                    New only
                  </button>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex gap-3 border-t border-black/5 px-5 py-4">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 rounded-full border border-[#dfcfaa] py-3 text-sm font-semibold text-[#1A1208] transition hover:border-gold hover:text-gold"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="flex-1 rounded-full bg-gold py-3 text-sm font-semibold text-white transition hover:bg-[#735610]"
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </div>

        {/* ── Product grid ── */}
        {loading ? (
          <ProductGridSkeleton count={enablePagination ? itemsPerPage : 8} />
        ) : visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-[#eadcc0] bg-[#fffcf8] px-6 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">No results</p>
            <h3 className="mt-4 font-display text-2xl text-[#1A1208]">No products match your filters</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#6B6456]">
              Try adjusting your filters or browse all products.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#735610]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {enablePagination && totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => {
                  if (page >= 1 && page <= totalPages) setCurrentPage(page);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                  currentPage === page
                    ? 'bg-gold text-white shadow-lg shadow-gold/20'
                    : 'bg-white text-[#1A1208] ring-1 ring-black/10 hover:bg-cream'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShopSection;
