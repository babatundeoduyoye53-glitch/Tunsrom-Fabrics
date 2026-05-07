import { Minus, MessageCircle, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';
import { buildCartMessage } from '../config/whatsapp';

function CartDrawer({ isOpen, items, onClose, onQuantityChange, onRemoveItem }) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderViaWhatsApp = () => {
    if (items.length === 0) return;
    const url = buildCartMessage(items);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Drawer */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 sm:max-w-md ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Your bag</p>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-[#1A1208] sm:mt-2 sm:text-3xl">Shopping Bag</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 p-2 text-[#1A1208] hover:border-gold hover:text-gold"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {items.length === 0 ? (
            <div className="rounded-[28px] bg-cream p-8 text-center">
              <ShoppingBag className="mx-auto text-[#6B6456]" size={32} />
              <h3 className="mt-4 font-display text-2xl font-semibold text-[#1A1208]">Your bag is empty</h3>
              <p className="mt-3 text-sm leading-6 text-[#6B6456]">
                Add fabrics you love and they will appear here for a quick WhatsApp order.
              </p>
              <button
                type="button"
                onClick={handleContinueShopping}
                className="mt-6 rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#735610]"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <article key={item.id} className="flex gap-4 rounded-[24px] border border-black/5 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#6B6456]">{item.category}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-[#1A1208]">{item.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-gold">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#6B6456] hover:text-burgundy"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full bg-cream px-3 py-2">
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        className="text-[#1A1208] hover:text-gold"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold text-[#1A1208]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        className="text-[#1A1208] hover:text-gold"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-[#1A1208]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-black/5 px-5 py-4 space-y-3 sm:px-6 sm:py-5">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm text-[#6B6456]">
              <span>Subtotal ({items.reduce((n, i) => n + i.quantity, 0)} item{items.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''})</span>
              <span className="text-lg font-semibold text-[#1A1208]">{formatPrice(total)}</span>
            </div>

            {/* WhatsApp order button */}
            <button
              type="button"
              onClick={handleOrderViaWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </button>

            {/* Continue shopping */}
            <button
              type="button"
              onClick={handleContinueShopping}
              className="flex w-full items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1A1208] transition hover:border-gold hover:text-gold"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
