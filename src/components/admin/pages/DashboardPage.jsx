import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminRequest } from '../../../api/client';

const salesByCategory = [
  { name: 'Lace', value: 35, color: '#8B1A1A' },
  { name: 'Jacquard', value: 25, color: '#C9A84C' },
  { name: 'Wool', value: 20, color: '#D4B566' },
  { name: 'Caps', value: 12, color: '#A07A44' },
  { name: 'Cashmere', value: 5, color: '#7C9C54' },
  { name: 'Cofflins', value: 3, color: '#5a7a8a' },
];

function AdminDashboard({ products }) {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    adminRequest('/admin/stats')
      .then((data) => setStats(data))
      .catch(() => {});

    adminRequest('/admin/stats/revenue')
      .then((data) => setRevenueData(data))
      .catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: stats ? `₦${stats.totalRevenue.toLocaleString()}` : '—' },
    { label: 'Total Orders', value: stats ? stats.totalOrders.toLocaleString() : '—' },
    { label: 'Paid Orders', value: stats ? stats.paidOrders.toLocaleString() : '—' },
    { label: 'Total Customers', value: stats ? stats.totalCustomers.toLocaleString() : '—' },
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-[#161b22] border border-white/10 rounded-xl p-6 hover:border-[#C9A84C]/30 transition"
          >
            <p className="text-white/60 text-sm font-medium mb-2">{stat.label}</p>
            <p className="font-admin-mono text-2xl font-bold text-[#f0ece4]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-[#161b22] border border-white/10 rounded-xl p-6">
          <h2 className="font-admin-display text-lg font-bold text-[#f0ece4] mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#ffffff80" />
              <YAxis stroke="#ffffff80" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#161b22',
                  border: '1px solid rgba(201, 168, 76, 0.3)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#f0ece4' }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#C9A84C" strokeWidth={2} dot={{ fill: '#C9A84C' }} />
              <Line type="monotone" dataKey="lastWeek" stroke="#ffffff40" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
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
                fill="#8884d8"
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

      {/* Top Selling Products */}
      <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
        <h2 className="font-admin-display text-lg font-bold text-[#f0ece4] mb-4">Top Selling Products</h2>
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
                  <td className="px-4 py-3 text-white/60 text-sm">{product.category}</td>
                  <td className="px-4 py-3 text-[#C9A84C] font-admin-mono">₦{product.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
