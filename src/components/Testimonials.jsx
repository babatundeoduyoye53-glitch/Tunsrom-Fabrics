import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const active = testimonials[currentIndex];

  const next = () => setCurrentIndex((previous) => (previous + 1) % testimonials.length);
  const previous = () =>
    setCurrentIndex((previousIndex) => (previousIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-white px-6 py-12 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Reviews</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-5xl">What Customers Say</h2>
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-cream px-6 py-10 shadow-inner shadow-black/5 sm:rounded-[36px] sm:px-14 sm:py-14 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-lg font-bold text-white shadow-lg sm:h-20 sm:w-20 sm:text-xl lg:h-24 lg:w-24 lg:text-2xl"
              style={{ backgroundColor: active.color }}
            >
              {active.initials}
            </div>
            <p className="mt-6 font-display text-xl leading-snug text-[#1A1208] sm:mt-8 sm:text-3xl lg:text-4xl lg:leading-snug">"{active.quote}"</p>
            <h3 className="mt-5 text-base font-semibold text-[#1A1208] sm:mt-8 sm:text-lg">{active.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#6B6456] sm:text-sm">{active.title}</p>
          </div>

          <button
            onClick={previous}
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1A1208] shadow-lg transition hover:text-gold sm:left-6 sm:h-11 sm:w-11"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1A1208] shadow-lg transition hover:text-gold sm:right-6 sm:h-11 sm:w-11"
          >
            <ChevronRight size={16} />
          </button>

          <div className="mt-8 flex justify-center gap-3 sm:mt-10">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${index === currentIndex ? 'w-10 bg-gold' : 'w-2.5 bg-[#d9cfbd] hover:bg-[#b8ae9e]'}`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
