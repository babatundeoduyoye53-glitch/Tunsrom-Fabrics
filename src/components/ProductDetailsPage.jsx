import { ArrowLeft, Heart, MessageCircle, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatters';
import ProductCard from './ProductCard';
import { buildSingleProductMessage } from '../config/whatsapp';

const categoryLabels = {
  lace: 'Lace fabrics',
  jacquard: 'Jacquard fabrics',
  caps: 'Caps and headwear',
  cashmere: 'Cashmere materials',
  cofflins: 'Cofflins',
  wool: 'Wool materials',
};

const detailCopy = {
  lace:
    'Elegant lace fabrics curated for bridal looks, asoebi styling, and statement occasion pieces with a premium drape.',
  jacquard:
    'Rich jacquard textures designed for structured silhouettes, ceremonial outfits, and elevated special-event tailoring.',
  caps:
    'Finishing accessories that complete a polished look, from everyday styling to festive wardrobe accents.',
  cashmere:
    'Luxuriously soft cashmere materials selected for premium comfort, warmth, and refined everyday dressing.',
  cofflins:
    'Distinctive cofflins fabrics curated for bold, statement-making occasion and celebration wear.',
  wool:
    'Soft, refined wool materials that balance comfort, polish, and durability for premium ready-to-wear or suiting.',
};

function ProductDetailsPage({ onAddToCart, onBack, onViewProduct, product, relatedProducts }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      return;
    }
    addToWishlist(product.id);
  };

  const handleWhatsAppOrder = () => {
    window.open(buildSingleProductMessage(product), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-[#f8f3ea] px-6 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#1A1208] transition hover:text-gold"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
            <div className="overflow-hidden rounded-[32px] bg-[#efe6d5] shadow-sm">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">
                {product.brand || categoryLabels[product.category]}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-[#1A1208] sm:mt-4 sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#6B6456] sm:text-base">
                {detailCopy[product.category]}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-display text-4xl font-bold text-[#1A1208]">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="text-lg text-[#6B6456] line-through">{formatPrice(product.oldPrice)}</span>
                )}
                {product.isSale && (
                  <span className="rounded-full bg-burgundy px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    Sale item
                  </span>
                )}
                {product.isNew && (
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    New arrival
                  </span>
                )}
              </div>

              <div className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-3">
                <div className="rounded-[24px] border border-[#eadcc0] bg-white p-5">
                  <Truck className="text-gold" size={22} />
                  <p className="mt-3 text-sm font-semibold text-[#1A1208]">Nationwide delivery</p>
                  <p className="mt-2 text-sm leading-6 text-[#6B6456]">Dispatch support for Lagos, Ogun, Abuja, and interstate orders.</p>
                </div>
                <div className="rounded-[24px] border border-[#eadcc0] bg-white p-5">
                  <ShieldCheck className="text-gold" size={22} />
                  <p className="mt-3 text-sm font-semibold text-[#1A1208]">Quality assurance</p>
                  <p className="mt-2 text-sm leading-6 text-[#6B6456]">Each fabric is selected for finish, texture, and occasion-ready presentation.</p>
                </div>
                <div className="rounded-[24px] border border-[#eadcc0] bg-white p-5">
                  <ShoppingBag className="text-gold" size={22} />
                  <p className="mt-3 text-sm font-semibold text-[#1A1208]">Fast order support</p>
                  <p className="mt-2 text-sm leading-6 text-[#6B6456]">Need bulk or styling help? Our team can guide your purchase quickly.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#1ebe5d]"
                >
                  <MessageCircle size={16} />
                  WhatsApp to Order
                </button>
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#735610]"
                >
                  <ShoppingBag size={16} />
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={toggleWishlist}
                  className="inline-flex items-center gap-2 rounded-full border border-[#dfcfaa] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.24em] text-[#1A1208] transition hover:border-gold hover:text-gold"
                >
                  <Heart size={16} className={isWishlisted ? 'fill-burgundy text-burgundy' : ''} />
                  {isWishlisted ? 'Saved' : 'Save item'}
                </button>
              </div>

              <div className="mt-8 rounded-[28px] border border-[#eadcc0] bg-white p-6 lg:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Product notes</p>
                <div className="mt-4 grid gap-3 text-sm text-[#6B6456] sm:grid-cols-2">
                  <p><span className="font-semibold text-[#1A1208]">Category:</span> {categoryLabels[product.category]}</p>
                  <p><span className="font-semibold text-[#1A1208]">Brand:</span> {product.brand}</p>
                  <p><span className="font-semibold text-[#1A1208]">Availability:</span> In stock</p>
                  <p><span className="font-semibold text-[#1A1208]">Returns:</span> Exchange guidance available before dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between sm:mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">More to explore</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-4xl">Related Products</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={onAddToCart}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailsPage;
