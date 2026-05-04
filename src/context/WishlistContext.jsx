import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const WishlistContext = createContext(undefined);
const STORAGE_KEY = 'tunsrom-fabrics-wishlist';

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return state.includes(action.payload) ? state : [...state, action.payload];
    case 'REMOVE_FROM_WISHLIST':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

function getInitialWishlist() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], getInitialWishlist);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist: (id) => dispatch({ type: 'ADD_TO_WISHLIST', payload: id }),
      removeFromWishlist: (id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id }),
      isInWishlist: (id) => wishlist.includes(id),
    }),
    [wishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}

