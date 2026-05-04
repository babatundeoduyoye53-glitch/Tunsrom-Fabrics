import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'lace', label: 'Lace' },
  { id: 'jacquard', label: 'Jacquard' },
  { id: 'wool', label: 'Wool' },
  { id: 'caps', label: 'Caps' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'newest', label: 'New arrivals first' },
  { id: 'sale', label: 'Sale items first' },
];

function matchesPriceRange(product, priceRange) {
  if (priceRange === 'all') {
    return true;
  }

  if (priceRange === 'under-30000') {
    return product.price < 30000;
  }

  if (priceRange === '30000-70000') {
    return product.price >= 30000 && product.price <= 70000;
  }

  if (priceRange === '70000-120000') {
    return product.price > 70000 && product.price <= 120000;
  }

  return product.price > 120000;
}

function ShopSection({
  activeCategory,
  description,
  enablePagination = false,
  itemsPerPage = 8,
  onAddToCart,
  onCategoryChange,
  onViewProduct,
  products,
  searchQuery = '',
  subtitle = 'Shop the store',
  title = 'You May Be Looking For',
}) {
  const [internalTab, setInternalTab] = useState(activeCategory || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [saleOnly, setSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);
  const selectedTab = activeCategory ?? internalTab;
  const normalizedQuery = searchQuery.trim().toLowerCase();

  useEffect(() => {
    if (activeCategory) {
      setInternalTab(activeCategory);
    }
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let nextProducts = [...products];

    if (selectedTab !== 'all') {
      nextProducts = nextProducts.filter((product) => product.category === selectedTab);
    }

    if (normalizedQuery) {
      nextProducts = nextProducts.filter((product) => {
        const searchableText = [product.name, product.brand, product.category].join(' ').toLowerCase();
        return searchableText.includes(normalizedQuery);
      });
    }

    if (saleOnly) {
      nextProducts = nextProducts.filter((product) => product.isSale);
    }

    if (newOnly) {
      nextProducts = nextProducts.filter((product) => product.isNew);
    }

    nextProducts = nextProducts.filter((product) => matchesPriceRange(product, priceRange));

    if (sortBy === 'price-low') {
      nextProducts.sort((first, second) => first.price - second.price);
    }

    if (sortBy === 'price-high') {
      nextProducts.sort((first, second) => second.price - first.price);
    }

    if (sortBy === 'newest') {
      nextProducts.sort((first, second) => Number(second.isNew) - Number(first.isNew) || second.id - first.id);
    }

    if (sortBy === 'sale') {
      nextProducts.sort((first, second) => Number(second.isSale) - Number(first.isSale) || first.price - second.price);
    }

    return nextProducts;
  }, [newOnly, normalizedQuery, priceRange, products, saleOnly, selectedTab, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, normalizedQuery, sortBy, priceRange, saleOnly, newOnly]);

  const totalPages = enablePagination ? Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage)) : 1;

  const visibleProducts = useMemo(() => {
    if (!enablePagination) {
      return filteredProducts;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, enablePagination, filteredProducts, itemsPerPage]);

  const handleTabChange = (tabId) => {
    setInternalTab(tabId);
    setCurrentPage(1);

    if (onCategoryChange) {
      onCategoryChange(tabId);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSortBy('featured');
    setPriceRange('all');
    setSaleOnly(false);
    setNewOnly(false);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section id="shop" className="px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{subtitle}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#6B6456] sm:mt-4 sm:text-base">
            {description ||
              'Browse the categories our customers come back for most, from intricate occasion lace to polished finishing caps.'}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium ${
                selectedTab === tab.id
                  ? 'bg-gold text-white shadow-lg shadow-gold/20'
                  : 'bg-white text-[#1A1208] ring-1 ring-black/10 hover:bg-cream'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-8 rounded-[28px] border border-[#eadcc0] bg-[#fffcf8] p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_auto]">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Search result</span>
              <div className="rounded-2xl border border-[#eadcc0] bg-white px-4 py-3 text-sm text-[#1A1208]">
                {normalizedQuery ? `Showing results for "${searchQuery}"` : 'Browse all available products'}
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-2xl border border-[#eadcc0] bg-white px-4 py-3 text-sm text-[#1A1208] outline-none transition focus:border-gold"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">Price range</span>
              <select
                value={priceRange}
                onChange={(event) => setPriceRange(event.target.value)}
                className="w-full rounded-2xl border border-[#eadcc0] bg-white px-4 py-3 text-sm text-[#1A1208] outline-none transition focus:border-gold"
              >
                <option value="all">All prices</option>
                <option value="under-30000">Under ?30,000</option>
                <option value="30000-70000">?30,000 - ?70,000</option>
                <option value="70000-120000">?70,000 - ?120,000</option>
                <option value="120000-plus">Above ?120,000</option>
              </select>
            </label>

            <button
              type="button"
              onClick={clearFilters}
              className="self-end rounded-full border border-[#dfcfaa] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1A1208] transition hover:border-gold hover:text-gold"
            >
              Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setSaleOnly((current) => !current)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                saleOnly ? 'bg-burgundy text-white' : 'bg-white text-[#1A1208] ring-1 ring-black/10 hover:bg-cream'
              }`}
            >
              Sale only
            </button>
            <button
              type="button"
              onClick={() => setNewOnly((current) => !current)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                newOnly ? 'bg-emerald-600 text-white' : 'bg-white text-[#1A1208] ring-1 ring-black/10 hover:bg-cream'
              }`}
            >
              New arrivals only
            </button>
          </div>
        </div>

        {enablePagination && (
          <div className="mb-8 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-sm text-[#6B6456]">
              Showing <span className="font-semibold text-[#1A1208]">{visibleProducts.length}</span> of{' '}
              <span className="font-semibold text-[#1A1208]">{filteredProducts.length}</span> products
            </p>
            <p className="text-sm text-[#6B6456]">
              Page <span className="font-semibold text-[#1A1208]">{currentPage}</span> of{' '}
              <span className="font-semibold text-[#1A1208]">{totalPages}</span>
            </p>
          </div>
        )}

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">No matching products</p>
            <h3 className="mt-4 font-display text-3xl text-[#1A1208]">Try another search or filter</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6B6456]">
              We could not find products that match your current combination. Reset the filters or search with a broader term.
            </p>
          </div>
        )}

        {enablePagination && totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
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
