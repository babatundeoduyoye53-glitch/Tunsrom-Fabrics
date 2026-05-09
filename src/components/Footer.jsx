import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPublicSettings } from '../api/settings';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.2-.8.5-1.7.9-2.6 1.1A4 4 0 0 0 12 8.2c0 .3 0 .6.1.9-3.3-.2-6.2-1.8-8.2-4.3-.4.6-.6 1.3-.6 2 0 1.4.7 2.6 1.8 3.3-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.6 3.2 4-.3.1-.7.1-1 .1-.2 0-.5 0-.8-.1.5 1.7 2.1 2.9 4 2.9A8.1 8.1 0 0 1 2 18.3 11.4 11.4 0 0 0 8.2 20c7.4 0 11.5-6.3 11.5-11.7v-.5c.8-.6 1.6-1.3 2.2-2Z" />
    </svg>
  );
}

const footerColumns = [
  {
    title: 'Information',
    links: [
      { label: 'About Us', href: '/?section=about', type: 'internal' },
      { label: 'Fabric Care', href: '/faqs', type: 'internal' },
      { label: 'Delivery Policy', href: '/delivery-policy', type: 'internal' },
      { label: 'Returns', href: '/returns', type: 'internal' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'My Account', href: '/account', type: 'internal' },
      { label: 'Wishlist', href: '/account', type: 'internal' },
      { label: 'Order Tracking', href: '/order-tracking', type: 'internal' },
      { label: 'FAQs', href: '/faqs', type: 'internal' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Lace Fabrics', href: '/shop?category=lace', type: 'internal' },
      { label: 'Jacquard', href: '/shop?category=jacquard', type: 'internal' },
      { label: 'Wool Materials', href: '/shop?category=wool', type: 'internal' },
      { label: 'Caps', href: '/shop?category=caps', type: 'internal' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { label: '+234 8034619489', href: 'tel:+2348034619489' },
      { label: 'tunsrom.fabrics@gmail.com', href: 'mailto:tunsrom.fabrics@gmail.com' },
      { label: 'Olisa, Ijebu Ode, Ogun State', href: '/contact', type: 'internal' },
      { label: 'Mon - Sat, 9am - 6pm', href: '#' },
    ],
  },
];

const socials = [InstagramIcon, FacebookIcon, TwitterIcon];

function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchPublicSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  const socialLinks = [
    { icon: InstagramIcon, href: settings?.instagram || '#', label: 'Instagram' },
    { icon: FacebookIcon, href: settings?.facebook || '#', label: 'Facebook' },
    { icon: TwitterIcon, href: settings?.tiktok || '#', label: 'TikTok' },
  ];

  return (
    <footer id="contact" className="bg-gray-900 px-6 py-14 text-white sm:py-20">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Tunsrom Fabrics</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Premium fabrics for celebrations, tailoring, and everyday dressing across Nigeria.
            </p>
          </div>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-full border border-white/15 p-3 text-white/70 transition hover:border-gold hover:text-gold">
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#f8d98a]">{column.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-white/60">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.type === 'internal' ? (
                      <Link to={link.href} className="transition hover:text-white">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="transition hover:text-white">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Tunsrom Fabrics. All rights reserved.</p>
          <div className="flex flex-wrap gap-3">
            {['Visa', 'Mastercard', 'PayPal'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
