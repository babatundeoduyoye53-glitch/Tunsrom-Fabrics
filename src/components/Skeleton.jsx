/**
 * Skeleton — reusable shimmer building blocks.
 *
 * Usage:
 *   <Skeleton className="h-4 w-32 rounded-full" />
 *   <ProductCardSkeleton />
 *   <ProductGridSkeleton count={8} />
 *   <NewArrivalsSkeleton />
 */

/* ── Base shimmer block ── */
export function Skeleton({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#ede8df] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

/* ── Single product card skeleton ── */
export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm">
      {/* Image area */}
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      {/* Body */}
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24 rounded-full" />
          <Skeleton className="h-5 w-3/4 rounded-full" />
          <Skeleton className="h-3 w-1/2 rounded-full" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" />
        {/* Mobile buttons */}
        <div className="flex flex-col gap-2 sm:hidden">
          <Skeleton className="h-9 w-full rounded-full" />
          <Skeleton className="h-9 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ── Grid of product card skeletons ── */
export function ProductGridSkeleton({ count = 8, className = '' }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── Horizontal scroll row (NewArrivals style) ── */
export function NewArrivalsRowSkeleton({ count = 4 }) {
  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[78vw] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none"
        >
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}

/* ── Product detail page skeleton ── */
export function ProductDetailSkeleton() {
  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-[#f8f3ea] px-6 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-4 w-16 rounded-full" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            {/* Image */}
            <Skeleton className="aspect-square w-full rounded-[32px]" />
            {/* Info */}
            <div className="space-y-5">
              <Skeleton className="h-3 w-28 rounded-full" />
              <Skeleton className="h-10 w-3/4 rounded-2xl" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
              {/* Info cards */}
              <div className="grid gap-3 sm:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="h-28 rounded-[24px]" />
                ))}
              </div>
              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Skeleton className="h-12 w-full rounded-full sm:w-44" />
                <Skeleton className="h-12 w-full rounded-full sm:w-36" />
                <Skeleton className="h-12 w-full rounded-full sm:w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Section heading skeleton (used in ShopSection) ── */
export function SectionHeadingSkeleton() {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
      <Skeleton className="mx-auto h-3 w-24 rounded-full" />
      <Skeleton className="mx-auto mt-4 h-9 w-64 rounded-2xl" />
      <Skeleton className="mx-auto mt-4 h-4 w-80 rounded-full" />
    </div>
  );
}

/* Inject the shimmer keyframe once */
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes shimmer {
    100% { transform: translateX(200%); }
  }
`;
if (!document.head.querySelector('[data-skeleton-styles]')) {
  styleTag.setAttribute('data-skeleton-styles', '');
  document.head.appendChild(styleTag);
}
