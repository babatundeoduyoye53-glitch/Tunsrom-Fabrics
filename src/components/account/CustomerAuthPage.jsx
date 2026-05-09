import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentCustomerSession, registerCustomer, signInCustomer } from '../../api/auth';
import SupportPageLayout from '../support/SupportPageLayout';
import SupportHero from '../support/SupportHero';

function CustomerAuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('signin');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const redirectTo = useMemo(() => location.state?.from || '/account', [location.state]);

  useEffect(() => {
    const sessionUser = getCurrentCustomerSession();
    if (sessionUser) {
      navigate('/account', { replace: true });
    }
  }, [navigate]);

  const isSignIn = mode === 'signin';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (isSignIn) {
        await signInCustomer({ email: form.email, password: form.password });
      } else {
        await registerCustomer(form);
      }
      navigate(redirectTo, { replace: true });
    } catch (authError) {
      setError(authError.message);
    }
  };

  return (
    <SupportPageLayout>
      <SupportHero
        eyebrow="My Account"
        title="Sign in or create an account"
        description="Save your details and track orders. No account needed to browse or buy."
      />

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-sm shadow-black/5 lg:grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#11161d] px-8 py-10 text-[#f0ece4] sm:px-10 lg:px-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a84c]/10 text-[#c9a84c]">
              <LockKeyhole size={24} />
            </div>
            <h2 className="mt-6 font-display text-3xl">Your account</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Accounts are optional — browse and order freely without one.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/50">
              <li>· Saved contact details</li>
              <li>· Order history</li>
              <li>· Faster follow-up</li>
            </ul>
          </div>

          <div className="px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
            <div className="inline-flex rounded-full bg-cream p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isSignIn ? 'bg-white text-[#1A1208] shadow-sm' : 'text-[#6B6456]'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  !isSignIn ? 'bg-white text-[#1A1208] shadow-sm' : 'text-[#6B6456]'
                }`}
              >
                Create account
              </button>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {!isSignIn && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#1A1208]">Full name</span>
                  <input className="w-full rounded-2xl border border-[#dbcba7] bg-[#fcfaf6] px-4 py-3 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" name="name" onChange={handleChange} value={form.name} />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1208]">Email</span>
                <input className="w-full rounded-2xl border border-[#dbcba7] bg-[#fcfaf6] px-4 py-3 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" name="email" onChange={handleChange} type="email" value={form.email} />
              </label>

              {!isSignIn && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#1A1208]">Phone number</span>
                  <input className="w-full rounded-2xl border border-[#dbcba7] bg-[#fcfaf6] px-4 py-3 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" name="phone" onChange={handleChange} value={form.phone} />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#1A1208]">Password</span>
                <input className="w-full rounded-2xl border border-[#dbcba7] bg-[#fcfaf6] px-4 py-3 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" name="password" onChange={handleChange} type="password" value={form.password} />
              </label>

              {!isSignIn && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#1A1208]">Confirm password</span>
                  <input className="w-full rounded-2xl border border-[#dbcba7] bg-[#fcfaf6] px-4 py-3 text-base text-[#1A1208] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20" name="confirmPassword" onChange={handleChange} type="password" value={form.confirmPassword} />
                </label>
              )}

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 shrink-0" size={18} />
                  <p>{error}</p>
                </div>
              )}

              <button className="inline-flex w-full items-center justify-center rounded-full bg-[#1A1208] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2d1f10]" type="submit">
                {isSignIn ? 'Sign in' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SupportPageLayout>
  );
}

export default CustomerAuthPage;
