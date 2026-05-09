function FeatureBanner({ onShopClick }) {
  return (
    <section id="about" className="bg-cream px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#efe7db] shadow-lg shadow-black/5 sm:rounded-[36px] lg:grid-cols-2">
        <div className="min-h-[260px] sm:min-h-[420px] lg:min-h-[560px]">
          <img
            src="/raymond-menswear.jpg"
            alt="Premium fabric display"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-8 sm:px-12 sm:py-12 lg:px-16 lg:py-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">About us</p>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-[#1A1208] sm:text-4xl lg:text-5xl">
              Fabrics chosen for drape, finish, and confidence
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#6B6456] sm:mt-5">
              Every piece is selected with a premium wardrobe in mind — jacquard, wool, lace, and finishing accessories.
            </p>
            <button
              type="button"
              onClick={onShopClick}
              className="mt-6 inline-flex rounded-full border border-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.25em] text-gold transition hover:bg-gold hover:text-white sm:mt-8"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureBanner;
