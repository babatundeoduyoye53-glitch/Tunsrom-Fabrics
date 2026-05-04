import { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../../api/orders';

const STATUS_COLORS = {
  Paid: 'bg-emerald-500/20 text-emerald-300',
  Pending: 'bg-yellow-500/20 text-yellow-300',
  Processing: 'bg-blue-500/20 text-blue-300',
  Dispatched: 'bg-purple-500/20 text-purple-300',
  Delivered: 'bg-emerald-700/20 text-emerald-200',
  Cancelled: 'bg-red-500/20 text-red-300',
};

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchAllOrders()
      .then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((current) =>
        current.map((o) => (o._id === updated._id ? updated : o)),
      );
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const paidCount = orders.filter((o) => o.status === 'Paid' || o.status === 'Delivered').length;
  const pendingCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#f0ece4] mb-2">Orders</h1>
        <p className="text-white/50">Manage and track customer orders</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
          <p className="text-white/60 text-sm font-medium mb-2">Total Orders</p>
          <p className="font-display text-2xl font-bold text-[#f0ece4]">{total}</p>
        </div>
        <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
          <p className="text-white/60 text-sm font-medium mb-2">Paid / Delivered</p>
          <p className="font-display text-2xl font-bold text-emerald-400">{paidCount}</p>
        </div>
        <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
          <p className="text-white/60 text-sm font-medium mb-2">Pending / Processing</p>
          <p className="font-display text-2xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
        <h2 className="font-display text-lg font-bold text-[#f0ece4] mb-4">
          Recent Orders {total > 0 && <span className="text-white/40 text-sm font-normal">({total} total)</span>}
        </h2>

        {loading && (
          <p className="text-white/40 py-8 text-center">Loading orders…</p>
        )}

        {error && (
          <p className="text-red-400 py-8 text-center">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <p className="text-white/40 py-8 text-center">No orders yet. Orders will appear here once customers check out.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Reference</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Customer</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Items</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Amount</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Status</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Date</th>
                  <th className="text-left px-4 py-3 text-white/60 font-medium text-sm">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="px-4 py-3 text-[#C9A84C] font-medium">{order.reference}</td>
                    <td className="px-4 py-3 text-[#f0ece4]">
                      {order.customer?.name || order.customerName || 'Guest'}
                    </td>
                    <td className="px-4 py-3 text-white/60 text-sm">{order.items?.length ?? 0} item(s)</td>
                    <td className="px-4 py-3 text-[#f0ece4]">₦{order.totalAmount?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-white/10 text-white/60'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        disabled={updatingId === order._id}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="rounded-lg border border-white/10 bg-[#0d1117] px-2 py-1 text-xs text-[#f0ece4] outline-none focus:border-[#C9A84C] disabled:opacity-50"
                      >
                        {['Pending', 'Processing', 'Paid', 'Dispatched', 'Delivered', 'Cancelled'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
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

export default AdminOrdersPage;
