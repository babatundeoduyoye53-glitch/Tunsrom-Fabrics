import { useEffect, useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminRequest } from '../../../api/client';
import { formatPrice } from '../../../utils/formatters';

const salesByCategory = [
  { name: 'Lace', value: 35, color: '#8B1A1A' },
  { name: 'Jacquard', value: 25, color: '#C9A84C' },
  { name: 'Wool', value: 20, color: '#D4B566' },
  { name: 'Caps', value: 12, color: '#A07A44' },
  { name: 'Cashmere', value: 5, color: '#7C9C54' },
  { name: 'Cofflins', value: 3, color: '#5a7a8a' },
];

function StatCardSkeleton() {
  return (
    <div className="bg-[#161b22] border border-white/10 rounded-xl p-6 animate-pulse">
      <div className="h-3 w-24 rounded bg-white/10 mb-4" />
      <div className="h-7 w-32 rounded bg-white/10" />
    </div>
  );
}

function AdminDashboard({ products }) {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    Promise.all([
      adminRequest('/admin/stats'),
      adminRequest('/admin/stats/revenue'),
    ])
      .then(([statsData, revenueRes]) => {
        setStats(statsData);
        setRevenueData(revenueRes);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard data.');
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'Total Revenue',
      value: stats ? formatPrice(stats.totalRevenue) : null,
      color: '#C9A84C',
    },
    {
      label: 'Total Orders',
      value: stats ? stats.totalOrders.toLocaleString() : null,
      color: '#f0ece4',
    },
    {
      label: 'Paid Orders',
      value: stats ? stats.paidOrders.toLocaleString() : null,
      color: '#7C9C54',
    },
    {
      label: 'Total Customers',
      value: stats ? stats.totalCustomers.toLocaleString() : null,
      color: '#f0ece4',
    },
  ];

  const topProducts = products.slice(0, 5).map((p) => ({
    id: p._id ?? p.id,
    name: p.name,
    category: p.category,
    price: p.price,
  }));

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-admin-display text-3xl font-bold text-[#f0ece4] mb-2">Dashboard</h1>
        <p className="text-white/50">Welcome to Tunsrom Admin Panel</p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
          <span className="font-semibold">Could not load stats:</span> {error}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="ml-4 underline hover:text-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          : statCards.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#161b22] border border-white/10 rounded-xl p-6 hover:border-[#C9A84C]/30 transition"
              >
                <p className="text-white/60 text-sm font-medium mb-2">{stat.label}</p>
                <p
                  className="font-admin-mono text-2xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value ?? '—'}
                </p>
              </div>
            ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#161b22] border border-white/10 rounded-xl p-6">
          <h2 className="font-admin-display text-lg font-bold text-[#f0ece4] mb-4">Revenue Trend</h2>
          {loading ? (
            <div className="h-[300px] animate-pulse rounded-lg bg-white/5" />
          ) : revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#161b22',
                    border: '1px solid rgba(201, 168, 76, 0.3)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#f0ece4' }}
                  formatter={(value) => [formatPrice(value), 'Revenue']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#C9A84C"
                  strokeWidth={2}
                  dot={{ fill: '#C9A84C' }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[300px] items-center justify-center text-white/30 text-sm">
              No revenue data yet
            </div>
          )}
        </div>

        {/* Sales by Category */}
        <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
          <h2 className="font-admin-display text-lg font-bold text-[#f0ece4] mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b22',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f0ece4' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
        <h2 className="font-admin-display text-lg font-bold text-[#f0ece4] mb-4">Top Products</h2>
        {topProducts.length === 0 ? (
          <p className="text-white/30 text-sm py-4">No products yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Product</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Category</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Price</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3 text-[#f0ece4]">{product.name}</td>
                    <td className="px-4 py-3 text-white/60 text-sm capitalize">{product.category}</td>
                    <td className="px-4 py-3 text-[#C9A84C] font-admin-mono">{formatPrice(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
