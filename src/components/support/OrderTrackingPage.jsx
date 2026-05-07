import { useState } from 'react';
import SupportHero from './SupportHero';
import SupportPageLayout from './SupportPageLayout';
import { trackOrder } from '../../api/orders';

function OrderTrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const result = await trackOrder(trackingId.trim());
      setOrder(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="Order Tracking"
        title="Track the progress of your fabric order"
        description="Enter your order reference number to check the current status of your order."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm shadow-black/5 sm:p-10">
            <h2 className="font-display text-3xl text-[#1A1208]">Track your order</h2>
            <p className="mt-4 text-sm leading-7 text-[#6B6456]">
              Enter your order reference (e.g., ORD-00001) to check the current status and details of your order.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1208]">Order reference</span>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(event) => setTrackingId(event.target.value)}
                  placeholder="Example: ORD-00001"
                  className="w-full rounded-2xl border border-black/10 bg-[#fcfaf6] px-4 py-3 text-sm text-[#1A1208] outline-none focus:border-gold"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#735610] disabled:opacity-60"
              >
                {loading ? 'Checking…' : 'Check status'}
              </button>
            </form>

            {searched && order && (
              <div className="mt-6 rounded-[24px] border border-[#eadcc0] bg-cream p-5 text-sm leading-7 text-[#6B6456]">
                <p className="font-semibold text-[#1A1208]">Order {order.reference}</p>
                <p>Status: <span className="font-semibold text-gold">{order.status}</span></p>
                <p>Total: ₦{order.totalAmount?.toLocaleString()}</p>
                <p>Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            )}

            {searched && error && (
              <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm leading-7 text-red-700">
                {error}
              </div>
            )}
          </article>

          <div className="space-y-6">
            <article className="rounded-[28px] bg-cream p-6">
              <h3 className="font-display text-2xl text-[#1A1208]">How tracking works now</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#6B6456]">
                <li>Orders are confirmed after payment review.</li>
                <li>Dispatch updates are shared once delivery movement is available.</li>
                <li>Customers can contact us directly for priority order-status checks.</li>
              </ul>
            </article>
            <article className="rounded-[28px] bg-cream p-6">
              <h3 className="font-display text-2xl text-[#1A1208]">Need help faster?</h3>
              <p className="mt-4 text-sm leading-7 text-[#6B6456]">
                Use the WhatsApp button on the site or contact us with your order reference and we will help you confirm the latest update.
              </p>
            </article>
          </div>
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default OrderTrackingPage;
