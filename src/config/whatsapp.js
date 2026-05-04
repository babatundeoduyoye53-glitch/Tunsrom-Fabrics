// ─── WhatsApp config ───────────────────────────────────────────────
// Update this number to change the WhatsApp order destination.
// Format: country code + number, no spaces, no + sign.
export const WHATSAPP_NUMBER = '2348034619489';

/**
 * Build a wa.me URL for a single product order.
 */
export function buildSingleProductMessage(product) {
  const price = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(product.price);

  const text = `Hi, I'd like to order:\n${product.name} - ${price}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Build a wa.me URL for a full cart order.
 * items: [{ name, price, quantity }]
 */
export function buildCartMessage(items) {
  const lines = items.map((item, index) => {
    const price = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(item.price);

    return `${index + 1}. ${item.name} x${item.quantity} - ${price}`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalFormatted = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(total);

  const text = `Hi, I'd like to order the following:\n\n${lines.join('\n')}\n\nTotal: ${totalFormatted}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
