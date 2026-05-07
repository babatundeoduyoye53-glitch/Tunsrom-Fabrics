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

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

const defaultSocialLinks = [
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'Facebook', href: '#', icon: FacebookIcon },
  { label: 'Twitter', href: '#', icon: TwitterIcon },
];

function TopBar() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchPublicSettings()
      .then(setSettings)
      .catch(() => {});
  }, []);

  const socialLinks = [
    { label: 'Instagram', href: settings?.instagram || '#', icon: InstagramIcon },
    { label: 'Facebook', href: settings?.facebook || '#', icon: FacebookIcon },
    { label: 'TikTok', href: settings?.tiktok || '#', icon: TwitterIcon },
  ];
  return (
    <div className="bg-gray-900 px-4 py-2 text-xs text-white sm:px-6 sm:py-1.5">
      {/* Mobile layout */}
      <div className="flex items-center justify-between md:hidden">
        <a href="tel:+2348034619489" className="hover:text-gold text-white/90 flex items-center gap-1.5 font-medium">
          <PhoneIcon className="h-[13px] w-[13px] shrink-0" />
          <span>+234 803 461 9489</span>
        </a>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="rounded-full border border-white/15 p-1.5 text-white/80 hover:border-gold hover:text-gold"
            >
              <Icon className="h-[11px] w-[11px]" />
            </a>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between gap-4 md:flex">
        <div className="flex items-center gap-4">
          <a href="mailto:tunsrom.fabrics@gmail.com" className="hover:text-gold text-white/80 flex items-center gap-1.5">
            <MailIcon className="h-[14px] w-[14px] shrink-0" />
            <span>tunsrom.fabrics@gmail.com</span>
          </a>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full border border-white/15 p-1 text-white/80 hover:border-gold hover:text-gold"
              >
                <Icon className="h-[12px] w-[12px]" />
              </a>
            ))}
          </div>
        </div>
        <a href="tel:+2348034619489" className="hover:text-gold text-white/80 flex items-center gap-1.5">
          <PhoneIcon className="h-[14px] w-[14px] shrink-0" />
          <span>+234 803 461 9489</span>
        </a>
      </div>
    </div>
  );
}

export default TopBar;
