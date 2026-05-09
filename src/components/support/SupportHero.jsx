function SupportHero({ eyebrow, title, description }) {
  return (
    <section className="bg-[#11161d] px-6 py-12 text-[#f0ece4] sm:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#c9a84c]">{eyebrow}</p>
        <h1 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">{description}</p>
        )}
      </div>
    </section>
  );
}

export default SupportHero;
