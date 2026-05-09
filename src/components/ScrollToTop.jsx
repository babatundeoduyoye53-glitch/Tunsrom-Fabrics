import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop has two jobs:
 * 1. Scroll to the top of the page on every route change.
 * 2. Show a "back to top" button when the user has scrolled down.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  // ── Scroll to top on every navigation ──
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // ── Show/hide the back-to-top button ──
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
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}

export default ScrollToTop;
