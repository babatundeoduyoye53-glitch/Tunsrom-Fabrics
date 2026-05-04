import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/adminAuth';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginAdmin({ email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-[#f0ece4] mb-3">
            Tunsrom Fabrics
          </h1>
          <p className="text-[#C9A84C] font-display text-lg">Admin Portal</p>
          <p className="text-white/50 text-sm mt-2">Exclusive Access Only</p>
        </div>

        {/* Login card */}
        <div className="bg-[#161b22] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-display text-[#f0ece4] mb-8 text-center">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#f0ece4] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tunsromfabrics.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f0ece4] placeholder-white/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#f0ece4] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[#f0ece4] placeholder-white/30 focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition pr-12"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-[#C9A84C] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#C9A84C] to-[#d4b566] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C9A84C]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs text-center mb-3">Demo Credentials:</p>
            <div className="bg-black/30 rounded-lg p-3 space-y-1 font-mono text-xs text-white/60">
              <p>Email: <span className="text-[#C9A84C]">admin@tunsromfabrics.com</span></p>
              <p>Password: <span className="text-[#C9A84C]">tunsrom@admin2025</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
