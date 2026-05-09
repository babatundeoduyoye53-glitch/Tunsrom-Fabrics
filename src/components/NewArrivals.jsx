import ProductCard from './ProductCard';
import { NewArrivalsRowSkeleton } from './Skeleton';

function NewArrivals({ onAddToCart, onShopClick, onViewProduct, products, loading }) {
  const newProducts = products.filter((product) => product.isNew);

  return (
    <section className="bg-white px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between sm:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Fresh arrivals</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">New Arrivals</h2>
            <p className="mt-3 text-sm leading-7 text-[#6B6456] sm:mt-4 sm:text-base">
              The newest pieces across lace, jacquard, wool, and accessories, ready for your next occasion or collection drop.
            </p>
          </div>
          <button
            type="button"
            onClick={onShopClick}
            className="shrink-0 rounded-full border border-[#dfcfaa] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.25em] text-[#1A1208] transition hover:border-gold hover:text-gold"
          >
            View all products
          </button>
        </div>

        {loading ? (
          <NewArrivalsRowSkeleton count={4} />
        ) : newProducts.length > 0 ? (
          <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 xl:grid-cols-4">
            {newProducts.map((product) => (
              <div key={product.id} className="w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewProduct={onViewProduct}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-full rounded-[28px] border border-[#eadcc0] bg-[#fffcf8] px-6 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Coming soon</p>
            <h3 className="mt-4 font-display text-3xl text-[#1A1208]">New arrivals dropping soon</h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6B6456]">
              Check back shortly — fresh fabrics are being added to the collection.
            </p>
            <button
              type="button"
              onClick={onShopClick}
              className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#735610]"
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewArrivals;
