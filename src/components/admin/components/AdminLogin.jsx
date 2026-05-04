import { useEffect, useState } from 'react';
import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, loginAdmin } from '../../../api/adminAuth';

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await loginAdmin(form);
      navigate('/admin/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#090b10] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-[36px] border border-white/10 bg-[#141923] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] lg:flex-row lg:p-12">
        <div className="flex-1 rounded-[32px] bg-[#111827] p-8 text-white/90">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#C9A84C]/15 text-[#C9A84C]">
            <LockKeyhole size={24} />
          </div>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight text-[#f0ece4]">Tunsrom Fabrics Admin</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
            A clean, secure admin workspace for inventory, orders, and analytics. Sign in with your admin credentials to continue.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#C9A84C]">Inventory</p>
              <p className="mt-3 text-3xl font-semibold text-white">Catalog ready</p>
              <p className="mt-2 text-sm text-white/50">Access product management, stock control, and detailed views.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-[#C9A84C]">Analytics</p>
              <p className="mt-3 text-3xl font-semibold text-white">Realtime style</p>
              <p className="mt-2 text-sm text-white/50">The admin portal includes charts, reports, and order performance summaries.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md rounded-[32px] bg-[#0f111a] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          <h2 className="text-3xl font-semibold text-[#f0ece4]">Admin sign in</h2>
          <p className="mt-3 text-sm text-white/50">Enter your admin credentials to continue.</p>

          {error && (
            <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm text-red-200">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} />
                <p>{error}</p>
              </div>
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Email</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="admin@tunsromfabrics.com"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-[#f0ece4]">Password</span>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••••"
                className="mt-3 w-full rounded-3xl border border-white/10 bg-[#0d1117] px-4 py-3 text-[#f0ece4] outline-none transition focus:border-[#C9A84C]"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-3xl bg-[#C9A84C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f0f0f] transition hover:bg-[#d4b566]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
