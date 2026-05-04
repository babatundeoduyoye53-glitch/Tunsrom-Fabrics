function AdminInsightsPage() {
  const topProducts = [
    { id: 1, name: 'Premium Lace', category: 'Lace', price: 85000 },
    { id: 2, name: 'Ankara Gold', category: 'Ankara', price: 65000 },
    { id: 3, name: 'Cord Elite', category: 'Cord', price: 95000 },
  ];

  const suggestions = [
    {
      title: 'Push Lace Collection',
      description: 'Lace products are showing strong engagement. Consider featuring them on the homepage.',
    },
    {
      title: 'Stock Up on Ankara',
      description: 'Ankara patterns are trending. Ensure adequate inventory for the upcoming season.',
    },
    {
      title: 'Run Flash Sales',
      description: 'Flash sales could boost conversion rates for mid-tier products.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-[#f0ece4] mb-2">Insights</h1>
        <p className="text-white/50">Business intelligence and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Products */}
        <div className="lg:col-span-1">
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-[#f0ece4] mb-4">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="pb-4 border-b border-white/10 last:border-0">
                  <h3 className="text-[#f0ece4] font-semibold">{product.name}</h3>
                  <p className="text-white/40 text-sm">{product.category}</p>
                  <p className="text-[#C9A84C] font-medium mt-2">₦{product.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="lg:col-span-2">
          <div className="bg-[#161b22] border border-white/10 rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-[#f0ece4] mb-4">Recommendations</h2>
            <div className="space-y-4">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition"
                >
                  <h3 className="text-[#f0ece4] font-semibold">{item.title}</h3>
                  <p className="text-white/60 text-sm mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInsightsPage;
