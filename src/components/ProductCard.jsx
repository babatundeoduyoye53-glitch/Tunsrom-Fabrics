import { Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import { buildSingleProductMessage } from '../config/whatsapp';

const categoryLabels = {
  lace: 'Lace fabrics',
  jacquard: 'Jacquard fabrics',
  caps: 'Caps and headwear',
  cashmere: 'Cashmere materials',
  cofflins: 'Cofflins',
  wool: 'Wool materials',
};

function ProductCard({ onAddToCart, onViewProduct, product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
  };

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    window.open(buildSingleProductMessage(product), '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <article className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      {/* ── Image area ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f1ece2]">
        <button type="button" onClick={() => onViewProduct?.(product)} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </button>

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {product.isNew && (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
              New
            </span>
          )}
          {product.isSale && (
            <span className="rounded-full bg-burgundy px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#1A1208] shadow-lg backdrop-blur hover:bg-white"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} className={isWishlisted ? 'fill-burgundy text-burgundy' : ''} />
        </button>

        {/* ── Desktop hover overlay ── */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-2 flex-col gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg transition hover:bg-[#1ebe5d]"
          >
            <MessageCircle size={14} />
            WhatsApp to Order
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1208] shadow-lg backdrop-blur transition hover:bg-white"
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#6B6456]">
            {product.brand || categoryLabels[product.category]}
          </p>
          <button
            type="button"
            onClick={() => onViewProduct?.(product)}
            className="text-left font-display text-base font-semibold text-[#1A1208] transition hover:text-gold sm:text-lg lg:text-xl"
          >
            {product.name}
          </button>
          <p className="text-sm text-[#6B6456]">{categoryLabels[product.category]}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-semibold text-[#1A1208]">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-[#6B6456] line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* ── Mobile always-visible buttons ── */}
        <div className="flex flex-col gap-2 sm:hidden">
          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1ebe5d]"
          >
            <MessageCircle size={14} />
            WhatsApp to Order
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-white"
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
