import { useMemo, useState, useEffect, useRef } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const navItems = [
  { label: 'Home', action: 'home' },
  { label: 'Shop', action: 'shop' },
  { label: 'About', action: 'section', target: 'about' },
  { label: 'Blog', action: 'section', target: 'blog' },
  { label: 'Contact', action: 'contact' },
];

const collections = [
  { label: 'Lace', category: 'lace' },
  { label: 'Jacquard', category: 'jacquard' },
  { label: 'Caps', category: 'caps' },
  { label: 'Cashmere', category: 'cashmere' },
  { label: 'Cofflins', category: 'cofflins' },
  { label: 'Wool', category: 'wool' },
];

function Header({
  cartCount,
  currentPage,
  onAccountClick,
  onCartClick,
  onNavigateHome,
  onNavigateToContact,
  onNavigateToSection,
  onNavigateToShop,
  onSearchShop,
  searchQuery,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery || '');
  const [collectionsExpanded, setCollectionsExpanded] = useState(false);
  const { wishlist } = useWishlist();
  const menuRef = useRef(null);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  // Body scroll lock
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [isMenuOpen, isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleNavClick = (item) => {
    if (item.action === 'home') onNavigateHome();
    if (item.action === 'shop') onNavigateToShop('all');
    if (item.action === 'section') onNavigateToSection(item.target);
    if (item.action === 'contact') onNavigateToContact();
    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchValue.trim();
    if (!query) return;
    // Release scroll lock before navigating so the new page renders correctly
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    setIsSearchOpen(false);
    setIsMenuOpen(false);
    onSearchShop(query);
  };

  const getNavState = (item) => {
    if (item.action === 'shop') return currentPage === 'shop';
    if (item.action === 'home') return currentPage === 'home';
    if (item.action === 'contact') return currentPage === 'contact';
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo */}
          <button
            type="button"
            onClick={onNavigateHome}
            className="font-display text-base font-bold tracking-wide text-[#1A1208] sm:text-2xl lg:text-3xl"
          >
            Tunsrom Fabrics
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.slice(0, 1).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition ${
                  getNavState(item) ? 'text-gold' : 'text-[#1A1208] hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button type="button" className="flex items-center gap-1 text-sm font-medium text-[#1A1208] transition hover:text-gold">
                Collections <ChevronDown size={16} />
              </button>
              <div
                className={`absolute left-0 top-full mt-4 w-52 rounded-2xl border border-black/5 bg-white p-3 shadow-xl transition-all duration-200 ${
                  isCollectionsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                }`}
              >
                {collections.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      onNavigateToShop(item.category);
                      setIsCollectionsOpen(false);
                    }}
                    className="block w-full rounded-xl px-4 py-2 text-left text-sm text-[#6B6456] transition hover:bg-cream hover:text-[#1A1208]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            {navItems.slice(1).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition ${
                  getNavState(item) ? 'text-gold' : 'text-[#1A1208] hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Icon row */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((c) => !c);
                setIsMenuOpen(false);
              }}
              className="rounded-full border border-black/10 p-1.5 text-[#1A1208] transition hover:border-gold hover:text-gold sm:p-2"
              aria-label="Search"
            >
              <Search size={17} />
            </button>
            <button
              type="button"
              onClick={onAccountClick}
              className="hidden rounded-full border border-black/10 p-1.5 text-[#1A1208] transition hover:border-gold hover:text-gold sm:p-2 lg:flex"
              aria-label="My account"
            >
              <User size={17} />
            </button>
            <button
              type="button"
              className="relative hidden rounded-full border border-black/10 p-1.5 text-[#1A1208] transition hover:border-gold hover:text-gold sm:flex sm:p-2"
              aria-label="Wishlist"
            >
              <Heart size={17} className={wishlistCount > 0 ? 'fill-burgundy text-burgundy' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[9px] font-semibold text-white sm:h-5 sm:w-5 sm:text-[10px]">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onCartClick}
              className="relative rounded-full border border-black/10 p-1.5 text-[#1A1208] transition hover:border-gold hover:text-gold sm:p-2"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-white sm:h-5 sm:w-5 sm:text-[10px]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Animated hamburger button */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((c) => !c);
                setIsSearchOpen(false);
              }}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] rounded-full border border-black/10 p-1.5 text-[#1A1208] transition hover:border-gold hover:text-gold sm:p-2 lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 origin-center ${
                  isMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 rounded-full bg-current transition-all duration-300 origin-center ${
                  isMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer — always mounted, CSS-driven slide ── */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Drawer panel */}
        <div
          ref={menuRef}
          className={`fixed right-0 top-0 z-50 flex h-full w-[300px] flex-col bg-[#1A1208] shadow-2xl transition-transform duration-300 ease-in-out sm:w-[320px] ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
            <button
              type="button"
              onClick={() => { onNavigateHome(); setIsMenuOpen(false); }}
              className="font-display text-sm font-bold tracking-wide text-white"
            >
              Tunsrom Fabrics
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
              aria-label="Close menu"
            >
              <X size={15} />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto">
            {/* Account link */}
            <button
              type="button"
              onClick={() => { onAccountClick(); setIsMenuOpen(false); }}
              className="flex w-full items-center gap-3 border-b border-white/10 px-5 py-4 text-sm font-semibold text-[#C9A84C] transition hover:bg-white/5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/15 text-[#C9A84C]">
                <User size={13} />
              </span>
              My Account
            </button>

            {/* Nav items with staggered entrance */}
            {navItems.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                style={{ transitionDelay: isMenuOpen ? `${i * 35 + 50}ms` : '0ms' }}
                className={`flex w-full items-center justify-between border-b border-white/10 px-5 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5 ${
                  getNavState(item) ? 'text-[#C9A84C]' : 'text-white/85 hover:text-white'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'}`}
              >
                <span>{item.label}</span>
                {getNavState(item) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
                )}
              </button>
            ))}

            {/* Collections accordion */}
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setCollectionsExpanded((v) => !v)}
                style={{ transitionDelay: isMenuOpen ? `${navItems.length * 35 + 50}ms` : '0ms' }}
                className={`flex w-full items-center justify-between px-5 py-4 text-sm font-medium transition-all duration-300 hover:bg-white/5 text-white/85 hover:text-white ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  size={15}
                  className={`text-white/40 transition-transform duration-300 ${collectionsExpanded ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Accordion body */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  collectionsExpanded ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-2 px-5 pb-4 pt-1">
                  {collections.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => { onNavigateToShop(item.category); setIsMenuOpen(false); }}
                      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-left text-sm text-white/80 transition hover:border-[#C9A84C]/50 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="shrink-0 border-t border-white/10 px-5 py-4">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/25">
              Premium Fabrics · Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* ── Search modal ── */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <form
            onSubmit={handleSearchSubmit}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-3">
              <input
                autoFocus
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search for lace, jacquard, wool, caps..."
                className="flex-1 rounded-full border border-[#dfcfaa] bg-[#fcfaf6] px-5 py-3.5 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              <button
                type="submit"
                className="rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#735610]"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="rounded-full border border-black/10 p-2.5 text-[#1A1208] transition hover:border-gold hover:text-gold"
              >
                <X size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Header;
