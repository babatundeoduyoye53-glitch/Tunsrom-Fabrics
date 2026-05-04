const collections = [
  {
    title: 'Lace Collection',
    description: 'Elegant lace fabrics with beautiful embroidery and light-catching finishes for bridal and event wear.',
    image: 'https://picsum.photos/seed/latest-lace/700/800',
    category: 'lace',
  },
  {
    title: 'Jacquard Collection',
    description: 'Structured jacquard pieces that bring bold texture and graceful form to dresses, suits, and separates.',
    image: 'https://picsum.photos/seed/latest-jacquard/700/800',
    category: 'jacquard',
  },
  {
    title: 'Wool and Caps',
    description: 'A refined mix of warm wool materials and finishing accessories for polished everyday styling.',
    image: 'https://picsum.photos/seed/latest-woolcaps/700/800',
    category: 'wool',
  },
];

function LatestCollections({ onShopClick }) {
  return (
    <section className="bg-white px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Curated categories</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">Latest Collections</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <article key={collection.title} className="group overflow-hidden rounded-[24px] bg-cream shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:rounded-[30px]">
              <div className="overflow-hidden">
                <img src={collection.image} alt={collection.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 lg:h-80" />
              </div>
              <div className="space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
                <h3 className="font-display text-2xl font-semibold text-[#1A1208] sm:text-3xl">{collection.title}</h3>
                <p className="text-sm leading-7 text-[#6B6456]">{collection.description}</p>
                <button
                  type="button"
                  onClick={() => onShopClick(collection.category)}
                  className="inline-flex text-sm font-semibold uppercase tracking-[0.24em] text-gold hover:translate-x-1"
                >
                  View All Collections
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestCollections;
