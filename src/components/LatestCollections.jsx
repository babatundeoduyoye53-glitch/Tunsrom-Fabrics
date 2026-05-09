const collections = [
  {
    title: 'Lace',
    description: 'Bridal and occasion lace with light-catching finishes.',
    image: '/fee2cb84a029d575e6a0befe6a48451a.jpg',
    category: 'lace',
  },
  {
    title: 'Jacquard',
    description: 'Bold texture and graceful form for dresses, suits, and separates.',
    image: '/c401c2b5aa82b901fa67da9e8d1311d5.jpg',
    category: 'jacquard',
  },
  {
    title: 'Wool & Caps',
    description: 'Warm wool materials and finishing accessories for polished styling.',
    image: "/Cashmere 220's wool.jpg",
    category: 'wool',
  },
];

function LatestCollections({ onShopClick }) {
  return (
    <section className="bg-white px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Collections</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">Shop by Category</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <article
              key={collection.title}
              className="group overflow-hidden rounded-[24px] bg-cream shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:rounded-[30px]"
            >
              <div className="overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72 lg:h-80"
                />
              </div>
              <div className="space-y-2 p-5 sm:p-6 lg:p-8">
                <h3 className="font-display text-2xl font-semibold text-[#1A1208] sm:text-3xl">{collection.title}</h3>
                <p className="text-sm leading-6 text-[#6B6456]">{collection.description}</p>
                <button
                  type="button"
                  onClick={() => onShopClick(collection.category)}
                  className="inline-flex pt-1 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition hover:translate-x-1"
                >
                  Shop Now →
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
