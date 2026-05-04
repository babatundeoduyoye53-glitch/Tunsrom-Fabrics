import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentCustomerSession, signOutCustomer } from '../../api/auth';
import { useWishlist } from '../../context/WishlistContext';
import SupportHero from '../support/SupportHero';
import SupportPageLayout from '../support/SupportPageLayout';

function CustomerAccountPage() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const sessionUser = getCurrentCustomerSession();
    if (sessionUser) {
      setCustomer(sessionUser);
    }
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Saved items', value: wishlist.length },
      { label: 'Profile email', value: customer?.email || 'Not available' },
      { label: 'Phone', value: customer?.phone || 'Add later' },
    ],
    [customer, wishlist.length],
  );

  const handleLogout = () => {
    signOutCustomer();
    navigate('/account/login', { replace: true });
  };

  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="My Account"
        title={`Welcome back${customer?.name ? `, ${customer.name}` : ''}`}
        description="This account area is designed to grow with your store. Today it holds your local session and profile details, and later it can support order history, saved addresses, and account-level order tracking."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-[30px] border border-black/5 bg-white p-8 shadow-sm shadow-black/5">
            <h2 className="font-display text-3xl text-[#1A1208]">Profile summary</h2>
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

          <div className="grid gap-6">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <article key={stat.label} className="rounded-[26px] border border-black/5 bg-white p-5 shadow-sm shadow-black/5">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{stat.label}</p>
                  <p className="mt-3 text-lg font-semibold text-[#1A1208] break-words">{stat.value}</p>
                </article>
              ))}
            </div>

            <article className="rounded-[30px] bg-cream p-8">
              <h3 className="font-display text-3xl text-[#1A1208]">What comes next</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#6B6456]">
                <li>Order history can be added once backend order records are connected.</li>
                <li>Saved addresses can be attached to checkout later.</li>
                <li>Wishlist sync across devices can be upgraded from local storage to API persistence.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default CustomerAccountPage;
