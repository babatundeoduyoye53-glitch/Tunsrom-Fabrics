import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomerSession, signOutCustomer } from '../../api/auth';
import { fetchMyOrders } from '../../api/orders';
import { useWishlist } from '../../context/WishlistContext';
import SupportHero from '../support/SupportHero';
import SupportPageLayout from '../support/SupportPageLayout';

function CustomerAccountPage() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const sessionUser = getCurrentCustomerSession();
    if (sessionUser) setCustomer(sessionUser);
  }, []);

  useEffect(() => {
    fetchMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setOrdersLoading(false));
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Orders placed', value: ordersLoading ? '…' : orders.length },
      { label: 'Saved items', value: wishlist.length },
      { label: 'Phone', value: customer?.phone || 'Not added' },
    ],
    [customer, wishlist.length, orders.length, ordersLoading],
  );

  const handleLogout = () => {
    signOutCustomer();
    navigate('/account/login', { replace: true });
  };

  const STATUS_COLORS = {
    Paid: 'text-emerald-600 bg-emerald-50',
    Delivered: 'text-emerald-700 bg-emerald-50',
    Pending: 'text-yellow-700 bg-yellow-50',
    Processing: 'text-blue-700 bg-blue-50',
    Dispatched: 'text-purple-700 bg-purple-50',
    Cancelled: 'text-red-700 bg-red-50',
  };

  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="My Account"
        title={`Welcome back${customer?.name ? `, ${customer.name}` : ''}`}
        description="View your order history, saved items, and profile details all in one place."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-8">

          {/* Profile + Stats */}
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="rounded-[30px] border border-black/5 bg-white p-8 shadow-sm shadow-black/5">
              <h2 className="font-display text-3xl text-[#1A1208]">Profile</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-[#6B6456]">
                <p><span className="font-semibold text-[#1A1208]">Name:</span> {customer?.name || 'Customer'}</p>
                <p><span className="font-semibold text-[#1A1208]">Email:</span> {customer?.email || 'Not available'}</p>
                <p><span className="font-semibold text-[#1A1208]">Phone:</span> {customer?.phone || 'Not available'}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-8 rounded-full border border-[#dfcfaa] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1A1208] transition hover:border-gold hover:text-gold"
              >
                Log out
              </button>
            </article>

            <div className="grid grid-cols-3 gap-4 content-start">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-[26px] border border-black/5 bg-white p-5 shadow-sm shadow-black/5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{stat.label}</p>
                  <p className="mt-3 text-lg font-semibold text-[#1A1208] break-words">{stat.value}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Order History */}
          <article className="rounded-[30px] border border-black/5 bg-white p-8 shadow-sm shadow-black/5">
            <h2 className="font-display text-3xl text-[#1A1208]">Order history</h2>

            {ordersLoading && (
              <p className="mt-6 text-sm text-[#6B6456]">Loading orders…</p>
            )}

            {!ordersLoading && orders.length === 0 && (
              <div className="mt-6 rounded-[24px] bg-cream p-6 text-center">
                <p className="text-sm text-[#6B6456]">No orders yet. Once you place an order it will appear here.</p>
                <button
                  type="button"
                  onClick={() => navigate('/shop')}
                  className="mt-4 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#735610]"
                >
                  Browse Shop
                </button>
              </div>
            )}

            {!ordersLoading && orders.length > 0 && (
              <div className="mt-6 space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="rounded-[20px] border border-black/5 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#6B6456]">Reference</p>
                        <p className="mt-1 font-semibold text-gold">{order.reference}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#6B6456]">Total</p>
                        <p className="mt-1 font-semibold text-[#1A1208]">₦{order.totalAmount?.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#6B6456]">Date</p>
                        <p className="mt-1 text-sm text-[#6B6456]">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {order.items?.length > 0 && (
                      <div className="mt-3 border-t border-black/5 pt-3">
                        <p className="text-xs text-[#6B6456]">
                          {order.items.map((item) => `${item.name} x${item.quantity}`).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </article>

        </div>
      </section>
    </SupportPageLayout>
  );
}

export default CustomerAccountPage;
