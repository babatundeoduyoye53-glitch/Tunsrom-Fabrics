import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    // Stacked colorful patterned fabrics - matches the folded bolt display
    image: '/WhatsApp Image 2026-05-01 at 10.45.59 AM.jpeg',
    label: 'Luxury edit',
    headline: 'Curated fabrics for unforgettable Nigerian celebrations',
    subtext:
      'Shop richly textured lace, jacquard, wool, and refined finishing pieces selected to feel premium from first glance to final stitch.',
  },
  {
    id: 2,
    // Stack of colorful patterned fabrics flat lay
    image: '/WhatsApp Image 2026-05-01 at 10.54.40 AM.jpeg',
    label: 'New season',
    headline: 'Statement jacquard and lace with graceful structure',
    subtext:
      'Build occasionwear that holds shape, catches light, and feels made for memorable entrances.',
  },
  {
    id: 3,
    // Colorful african fabrics displayed for sale
    image: '/WhatsApp Image 2026-05-01 at 6.44.35 PM.jpeg',
    label: 'Finishing touch',
    headline: 'From soft wool layers to polished caps, every detail counts',
    subtext:
      'Bring warmth, elegance, and balance into your wardrobe with fabrics and accessories that style effortlessly together.',
  },
];

function HeroSlider({ onShopClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((previous) => (previous + 1) % slides.length);
  const previousSlide = () =>
    setCurrentSlide((previous) => (previous - 1 + slides.length) % slides.length);

  return (
    <section
      id="home"
      className="relative h-[70vh] min-h-[500px] overflow-hidden sm:h-[85vh] sm:min-h-[620px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
        >
          <img src={slide.image} alt={slide.headline} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#8B691455,transparent_38%)]" />
          <div className="mx-auto flex h-full max-w-7xl items-center px-8 lg:px-12">
            <div className="max-w-2xl text-white">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-[#f8d98a]">
                {slide.label}
              </p>
              <h1 className="font-display text-2xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl xl:text-6xl">
                {slide.headline}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 sm:mt-5 lg:text-base">
                {slide.subtext}
              </p>
              <button
                type="button"
                onClick={onShopClick}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-gold/30 transition hover:-translate-y-0.5 hover:bg-[#735610] sm:mt-8"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-8"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-8"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? 'w-10 bg-gold' : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
