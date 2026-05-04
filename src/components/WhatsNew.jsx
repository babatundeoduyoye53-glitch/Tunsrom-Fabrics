function WhatsNew({ onShopClick }) {
  return (
    <section className="bg-white px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 sm:gap-10">
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src="/WhatsApp Image 2026-05-01 at 7.06.29 PM.jpeg"
            alt="Fresh fabric arrivals"
            className="h-full min-h-[160px] w-full object-cover sm:min-h-[260px] lg:min-h-[340px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.4em] text-[#f8d98a]">What's new</p>
            <h2 className="mt-3 max-w-md font-display text-2xl font-bold leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
              Fresh textures designed to make every outfit feel considered
            </h2>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Our latest edit</p>
            <h3 className="mt-3 font-display text-2xl font-bold text-[#1A1208] sm:mt-4 sm:text-4xl lg:text-5xl lg:leading-tight">
              Lace and jacquard pieces with presence, polish, and movement
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B6456] sm:mt-4 sm:text-base lg:text-base">
              These two collections are leading the season: luminous lace for grand events and sculptural jacquard for confident everyday luxury.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {[
              {
                title: 'Lace Collection',
                body: 'French lace, corded lace, and embellished designs selected for bridal, owambe, and occasion styling.',
                image: '/WhatsApp Image 2026-05-01 at 7.17.55 PM.jpeg',
                category: 'lace',
              },
              {
                title: 'Jacquard Collection',
                body: 'Pattern-rich jacquard that holds shape beautifully for blazers, gowns, and standout two-piece sets.',
                image: '/WhatsApp Image 2026-05-01 at 7.21.52 PM.jpeg',
                category: 'jacquard',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-[24px] bg-cream p-4 sm:gap-5 sm:p-5 lg:p-6">
                <img src={item.image} alt={item.title} className="h-20 w-20 rounded-2xl object-cover sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
                <div>
                  <h4 className="font-display text-xl font-semibold text-[#1A1208] sm:text-2xl">{item.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-[#6B6456] sm:mt-2">{item.body}</p>
                  <button
                    type="button"
                    onClick={() => onShopClick(item.category)}
                    className="mt-3 inline-flex text-sm font-semibold text-gold hover:translate-x-1"
                  >
                    View Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatsNew;
