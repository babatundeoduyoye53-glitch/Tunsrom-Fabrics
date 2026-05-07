import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-white shadow-lg shadow-gold/30 transition-all duration-300 hover:bg-[#735610] hover:-translate-y-0.5 sm:bottom-8 sm:right-6 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default ScrollToTop;
