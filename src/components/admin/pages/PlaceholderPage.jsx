function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 lg:p-8">
      <div className="bg-[#161b22] border border-white/10 rounded-xl p-8 max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-[#f0ece4] mb-2">{title}</h1>
        <p className="text-white/50 mb-6">Coming soon</p>
        {description && (
          <p className="text-white/60">{description}</p>
        )}
      </div>
    </div>
  );
}

export default PlaceholderPage;
