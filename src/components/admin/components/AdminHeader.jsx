import { Menu } from 'lucide-react';

function AdminHeader({ activeLabel, onOpenMenu }) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Admin workspace</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#f0ece4]">{activeLabel || 'Dashboard'}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#161b22] text-[#f0ece4] shadow-sm lg:hidden"
        >
          <Menu size={18} />
        </button>
        <span className="rounded-full border border-white/10 bg-[#161b22] px-4 py-3 text-sm text-[#f0ece4]">
          Minimal view
        </span>
      </div>
    </div>
  );
}

export default AdminHeader;
