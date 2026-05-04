import { LogOut, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function AdminSidebar({ isOpen, navItems, onLogout, onToggle }) {
  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-40 bg-[#121924]/70 transition lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => onToggle(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#232833] bg-[#161b22] px-6 py-8 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 lg:block">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c9a84c]">Admin panel</p>
            <h2 className="text-2xl font-semibold text-[#f0ece4]">Tunsrom Fabrics</h2>
          </div>
          <button
            className="rounded-full border border-white/10 p-2 text-[#f0ece4] lg:hidden"
            onClick={() => onToggle(false)}
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => onToggle(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#8b1a1a]/20 text-[#f0ece4] shadow-sm'
                      : 'text-[#9ca3af] hover:bg-[#0f0f0f] hover:text-[#f0ece4]'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-[#f0ece4]">{item.count}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f1117] px-4 py-3 text-sm font-medium text-[#9ca3af] transition hover:bg-[#0f0f0f] hover:text-[#f0ece4]"
        >
          <LogOut size={18} />
          Log out
        </button>
      </aside>
    </>
  );
}

export default AdminSidebar;
