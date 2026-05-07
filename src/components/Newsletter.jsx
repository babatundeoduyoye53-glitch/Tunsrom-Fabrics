import { useState } from 'react';

const WHATSAPP_NUMBER = '2348034619489';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send subscriber email to WhatsApp so you can follow up
    const text = `New newsletter subscriber: ${email}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
    setMessage('Thank you for subscribing!');
    setEmail('');
    window.setTimeout(() => setMessage(''), 3000);
  };

  return (
    <section className="bg-gray-900 px-6 py-12 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f8d98a]">Stay connected</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:mt-4 sm:text-5xl">Join Our Community</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70 sm:mt-5 sm:text-base">
          Get first access to fresh drops, styling inspiration, and fabric picks tailored for premium African fashion buyers.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            required
            className="h-14 flex-1 rounded-full border border-white/10 bg-white/5 px-6 text-sm text-white outline-none placeholder:text-white/40 transition focus:border-gold focus:bg-white/8"
          />
          <button
            type="submit"
            className="h-14 shrink-0 rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[#735610]"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <div className="mx-auto mt-6 inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-2 text-sm font-medium text-emerald-200">
            {message}
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;

