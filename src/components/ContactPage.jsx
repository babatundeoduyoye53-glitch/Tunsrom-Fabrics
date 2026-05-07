import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import LocationMap from './LocationMap';

const WHATSAPP_NUMBER = '2348034619489';

const contactDetails = [
  {
    icon: Phone,
    title: 'Call us',
    detail: '+234 8034619489',
    subtext: 'Monday to Saturday, 9am to 6pm',
  },
  {
    icon: Mail,
    title: 'Email us',
    detail: 'tunsrom.fabrics@gmail.com',
    subtext: 'For orders, inquiries, and sourcing support',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    detail: 'Olisa, Ijebu Ode, Ogun State',
    subtext: 'A welcoming destination for premium fabric buyers',
  },
];

function ContactPage({ onNavigateHome }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Build a WhatsApp message from the form data
    const text = [
      `*New Inquiry from Tunsrom Fabrics Website*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      formData.phone ? `*Phone:* ${formData.phone}` : null,
      `*Subject:* ${formData.subject}`,
      ``,
      `*Message:*`,
      formData.message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gray-900 px-6 py-14 text-white sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#8B691455,transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#f8d98a]">Contact page</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:mt-4 sm:text-5xl lg:text-6xl">
              Let&apos;s help you find the right fabric for your next occasion
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Reach out for stock questions, custom sourcing, bulk orders, and guidance on selecting lace, jacquard, wool, or finishing pieces.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 sm:mt-8">
              <button
                type="button"
                onClick={onNavigateHome}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white hover:border-gold hover:text-[#f8d98a]"
              >
                Back to Home
              </button>
            </div>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {contactDetails.map(({ detail, icon: Icon, subtext, title }) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-white">
                  <Icon size={16} />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f8d98a]">{title}</p>
                <p className="mt-2 break-words font-display text-lg font-semibold text-white sm:text-xl">
                  {detail}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">{subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          <div className="rounded-[32px] bg-cream p-6 shadow-lg shadow-black/5 sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">Send a message</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#1A1208] sm:mt-4 sm:text-4xl lg:text-5xl">
              Tell us what you need
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B6456] sm:text-base">
              Share the fabric type, event, quantity, or style direction you have in mind and we&apos;ll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-[#1A1208]">
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                    placeholder="Your full name"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-[#1A1208]">
                  Email address
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-[#1A1208]">
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                    placeholder="+234..."
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-[#1A1208]">
                  Subject
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-13 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                    placeholder="What are you looking for?"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm font-medium text-[#1A1208]">
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full rounded-[24px] border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  placeholder="Tell us about the fabric, quantity, colors, or event you are planning for."
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-green-500/20 hover:bg-[#1ebe5d]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.31 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.83 9.83 0 0 0-2.89-7Zm-7.01 15.23h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.24 8.24 0 0 1-1.27-4.37c0-4.56 3.71-8.27 8.28-8.27 2.21 0 4.29.86 5.85 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.56-3.72 8.27-8.29 8.27Z"/></svg>
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <LocationMap />
            <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-lg shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Quick support</p>
              <h3 className="mt-4 font-display text-3xl font-bold text-[#1A1208]">What you can ask us</h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#6B6456]">
                <li>Fabric recommendations for weddings, church events, and asoebi styling</li>
                <li>Bulk availability, current arrivals, and category-specific sourcing</li>
                <li>Guidance on matching caps, headwear, and finishing details to your look</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
