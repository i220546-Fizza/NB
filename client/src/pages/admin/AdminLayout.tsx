import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-obsidian pt-24 text-ivory">
      <div className="section-pad grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="border-r border-champagne/10 pb-10 lg:pr-8">
          <p className="label-eyebrow">NB Admin</p>
          <p className="mt-1 text-sm text-beige/50">{user?.name}</p>
          <nav className="mt-10 flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm uppercase tracking-widest2 transition-colors ${
                    isActive ? 'border-l-2 border-champagne text-champagne' : 'border-l-2 border-transparent text-beige/60 hover:text-ivory'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="mt-6 px-3 py-3 text-left text-sm uppercase tracking-widest2 text-beige/40 hover:text-champagne"
            >
              Log Out
            </button>
          </nav>
        </aside>

        <main className="pb-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
