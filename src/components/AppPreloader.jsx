import { useEffect, useState } from 'react';

/**
 * Full-screen branded preloader shown on initial app load.
 * Fades out once `ready` becomes true.
 */
function AppPreloader({ ready }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (ready) {
      // Small extra delay so the fade feels intentional, not abrupt
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#faf8f5] transition-opacity duration-500 ${
        ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Wordmark */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Outer spinning ring */}
          <svg
            className="absolute h-20 w-20 animate-spin"
            style={{ animationDuration: '2.4s' }}
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#8B6914"
              strokeWidth="1.5"
              strokeDasharray="56 170"
              strokeLinecap="round"
            />
          </svg>
          {/* Inner pulsing dot */}
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#8B6914]/10 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-[#8B6914]/40" />
          </div>
        </div>

        <div className="text-center">
          <p className="font-display text-2xl font-bold tracking-wide text-[#1A1208]">
            Tunsrom Fabrics
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.45em] text-[#8B6914]">
            Premium · Nigeria
          </p>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-[#e8dcc8]">
          <div
            className={`h-full rounded-full bg-[#8B6914] transition-all duration-700 ease-out ${
              ready ? 'w-full' : 'w-2/3'
            }`}
            style={{
              animation: ready ? 'none' : 'preloader-bar 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes preloader-bar {
          0%   { width: 0%;   margin-left: 0; }
          50%  { width: 60%;  margin-left: 20%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default AppPreloader;
