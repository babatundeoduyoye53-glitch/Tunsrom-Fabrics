import ShopSection from './ShopSection';

function ShopPage({
  activeCategory,
  loading,
  onAddToCart,
  onCategoryChange,
  onNavigateHome,
  onViewProduct,
  products,
  searchQuery,
}) {
  return (
    <div className="bg-white">
      <div className="border-b border-black/5 bg-[#faf8f5] px-6 py-6 sm:py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Shop</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#1A1208] sm:text-3xl">
              Tunsrom Fabrics Collection
            </h1>
          </div>
          <button
            type="button"
            onClick={onNavigateHome}
            className="shrink-0 rounded-full border border-[#dfcfaa] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] text-[#1A1208] transition hover:border-gold hover:text-gold"
          >
            ← Home
          </button>
        </div>
      </div>

      <ShopSection
        activeCategory={activeCategory}
        enablePagination
        itemsPerPage={8}
        loading={loading}
        onAddToCart={onAddToCart}
        onCategoryChange={onCategoryChange}
        onViewProduct={onViewProduct}
        products={products}
        searchQuery={searchQuery}
        title="Browse Our Shop"
        subtitle="Shop the store"
        description="Everything in our current edit — from occasion lace to polished wool and headwear."
      />
    </div>
  );
}

export default ShopPage;
