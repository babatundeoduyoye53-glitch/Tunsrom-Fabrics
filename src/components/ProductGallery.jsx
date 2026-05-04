const galleryItems = [
  {
    title: 'Celebration Lace',
    image: 'https://picsum.photos/seed/gallery-lace/700/1000',
    className: 'md:row-span-2',
  },
  {
    title: 'Evening Jacquard',
    image: 'https://picsum.photos/seed/gallery-jacquard/700/480',
  },
  {
    title: 'Soft Wool Layers',
    image: 'https://picsum.photos/seed/gallery-wool/700/480',
  },
  {
    title: 'Refined Headwear',
    image: 'https://picsum.photos/seed/gallery-caps/700/480',
  },
];

function ProductGallery() {
  return (
    <section className="px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Visual edit</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">Product Gallery</h2>
        </div>
        <div className="grid auto-rows-[200px] gap-4 sm:auto-rows-[260px] sm:gap-5 md:grid-cols-3 lg:auto-rows-[300px]">
          {galleryItems.map((item) => (
            <article key={item.title} className={`group relative overflow-hidden rounded-[24px] sm:rounded-[30px] ${item.className || ''}`}>
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#f8d98a]">Collection</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white sm:mt-2 sm:text-3xl">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductGallery;

