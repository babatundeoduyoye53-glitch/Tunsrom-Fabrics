import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * StyledSelect — a fully themed replacement for <select>.
 *
 * Props:
 *   value        — current selected value
 *   onChange     — (value: string) => void
 *   options      — [{ id: string, label: string }]
 *   label        — optional label shown above
 *   className    — wrapper class override
 */
function StyledSelect({ value, onChange, options, label, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = options.find((o) => o.id === value) || options[0];

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={containerRef} className={`relative block ${className}`}>
      {label && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6914]">
          {label}
        </span>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-base text-[#1A1208] outline-none transition ${
          isOpen
            ? 'border-gold ring-2 ring-gold/20'
            : 'border-[#eadcc0] hover:border-gold/60'
        }`}
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          size={16}
          className={`ml-2 shrink-0 text-[#8b6914] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-2xl border border-[#eadcc0] bg-white shadow-xl shadow-black/10 transition-all duration-200 origin-top ${
          isOpen
            ? 'scale-y-100 opacity-100 pointer-events-auto'
            : 'scale-y-95 opacity-0 pointer-events-none'
        }`}
      >
        <ul className="max-h-60 overflow-y-auto py-1.5">
          {options.map((option) => {
            const isSelected = option.id === value;
            return (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition ${
                    isSelected
                      ? 'bg-[#fdf6e8] font-semibold text-[#8b6914]'
                      : 'text-[#1A1208] hover:bg-[#fdf6e8] hover:text-[#8b6914]'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={14} className="shrink-0 text-[#8b6914]" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default StyledSelect;
