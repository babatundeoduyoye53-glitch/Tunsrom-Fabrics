import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
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
  { label: 'Wool', category: 'wool' },
  { label: 'Caps', category: 'caps' },
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
  const { wishlist } = useWishlist();

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isSearchOpen]);

  const handleNavClick = (item) => {
    if (item.action === 'home') {
      onNavigateHome();
    }

    if (item.action === 'shop') {
      onNavigateToShop('all');
    }

    if (item.action === 'section') {
      onNavigateToSection(item.target);
    }

    if (item.action === 'contact') {
      onNavigateToContact();
    }

    setIsMenuOpen(false);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearchShop(searchValue);
    setIsSearchOpen(false);
    setIsMenuOpen(false);
  };

  const getNavState = (item) => {
    if (item.action === 'shop') {
      return currentPage === 'shop';
    }

    if (item.action === 'home') {
      return currentPage === 'home';
    }

    if (item.action === 'contact') {
      return currentPage === 'contact';
    }

    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <button
            type="button"
            onClick={onNavigateHome}
            className="font-display text-lg font-bold tracking-wide text-[#1A1208] sm:text-2xl lg:text-3xl"
          >
            Tunsrom Fabrics
          </button>

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.slice(0, 1).map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium ${
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
              <button type="button" className="flex items-center gap-1 text-sm font-medium text-[#1A1208] hover:text-gold">
                Collections <ChevronDown size={16} />
              </button>
              <div
                className={`absolute left-0 top-full mt-4 w-52 rounded-2xl border border-black/5 bg-white p-3 shadow-xl transition-all ${
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
                    className="block w-full rounded-xl px-4 py-2 text-left text-sm text-[#6B6456] hover:bg-cream hover:text-[#1A1208]"
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
                className={`text-sm font-medium ${
                  getNavState(item) ? 'text-gold' : 'text-[#1A1208] hover:text-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen((current) => !current);
                setIsMenuOpen(false);
              }}
              className="rounded-full border border-black/10 p-2 text-[#1A1208] hover:border-gold hover:text-gold"
            >
              <Search size={18} />
            </button>
            <button type="button" className="relative rounded-full border border-black/10 p-2 text-[#1A1208] hover:border-gold hover:text-gold">
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onCartClick}
              className="relative rounded-full border border-black/10 p-2 text-[#1A1208] hover:border-gold hover:text-gold lg:flex"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((current) => !current);
                setIsSearchOpen(false);
              }}
              className="rounded-full border border-black/10 p-2 text-[#1A1208] hover:border-gold hover:text-gold lg:hidden"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)}>
            <div
              className="fixed right-0 top-[72px] z-50 w-full max-w-xs max-h-[calc(100vh-72px)] overflow-y-auto bg-gradient-to-b from-[#1A1208] to-[#2d1f10] shadow-2xl shadow-black/50 transform transition-transform duration-300 ease-out"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-end border-b border-white/20 px-6 py-4 flex-shrink-0">
                  <button type="button" onClick={() => setIsMenuOpen(false)} className="rounded-full border border-white/30 p-2 text-white hover:border-gold hover:text-gold">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-0 border-t border-white/20 px-0">
                    <button
                      type="button"
                      onClick={() => {
                        onAccountClick();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-4 text-left text-sm font-medium text-white hover:text-gold hover:bg-white/10 border-b border-white/20 transition"
                    >
                      My Account
                    </button>
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className="w-full px-6 py-4 text-left text-sm font-medium text-white hover:text-gold hover:bg-white/10 border-b border-white/20 transition"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/20 px-6 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">Collections</p>
                    <div className="grid grid-cols-2 gap-3">
                      {collections.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => {
                            onNavigateToShop(item.category);
                            setIsMenuOpen(false);
                          }}
                          className="rounded-lg border border-white/30 px-3 py-2 text-left text-sm text-white hover:border-gold hover:text-gold hover:bg-white/10 transition"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <form
            onSubmit={(event) => {
              event.stopPropagation();
              handleSearchSubmit(event);
            }}
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
                className="flex-1 rounded-full border border-[#dfcfaa] bg-[#fcfaf6] px-5 py-3.5 text-sm text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
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
                className="rounded-full border border-black/10 p-2.5 text-[#1A1208] hover:border-gold hover:text-gold"
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
