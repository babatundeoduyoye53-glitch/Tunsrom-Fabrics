function SupportHero({ eyebrow, title, description }) {
  return (
    <section className="bg-[#11161d] px-6 py-18 text-[#f0ece4] sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#c9a84c]">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-white/70 sm:text-base">{description}</p>
      </div>
    </section>
  );
}

export default SupportHero;
