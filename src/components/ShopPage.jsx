import ShopSection from './ShopSection';

function ShopPage({
  activeCategory,
  onAddToCart,
  onCategoryChange,
  onNavigateHome,
  onViewProduct,
  products,
  searchQuery,
}) {
  const highlights = [
    'Premium lace for bridal and celebration styling',
    'Jacquard and wool textures for structured silhouettes',
    'Finishing caps and headwear for polished wardrobe details',
  ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gray-900 px-6 py-14 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#8B691455,transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f8d98a]">Shop page</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:mt-4 sm:text-5xl lg:text-6xl">
              Explore the full Tunsrom fabrics collection in one place
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Filter by category, discover fresh arrivals, and add your favorite fabrics straight to cart from the dedicated shop page.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
              <button
                type="button"
                onClick={onNavigateHome}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-gold hover:text-[#f8d98a]"
              >
                Back to Home
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f8d98a]">Curated</p>
                <p className="mt-3 text-sm leading-7 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ShopSection
        activeCategory={activeCategory}
        enablePagination
        itemsPerPage={8}
        onAddToCart={onAddToCart}
        onCategoryChange={onCategoryChange}
        onViewProduct={onViewProduct}
        products={products}
        searchQuery={searchQuery}
        title="Browse Our Shop"
        subtitle="Shop the store"
        description="Everything in our current edit, from occasion lace to polished wool and headwear, now lives on its own dedicated shop page."
      />
    </div>
  );
}

export default ShopPage;
