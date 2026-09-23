import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { SearchIcon, UserIcon, BagIcon, MenuIcon, CloseIcon } from '@/components/ui/Icons';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Fragrances', to: '/collection?category=signature' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxury ${
        scrolled ? 'glass-panel border-b border-champagne/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <nav className="section-pad flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.15em] text-ivory">NB</span>
          <span className="mt-0.5 text-[9px] tracking-widest2 text-champagne/80">CLASSIC SCENTS</span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="btn-ghost">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 text-ivory">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="transition-colors duration-300 hover:text-champagne"
          >
            <SearchIcon />
          </button>
          <button
            aria-label="Account"
            onClick={() => navigate(isAdmin ? '/admin' : '/login')}
            className="hidden transition-colors duration-300 hover:text-champagne sm:block"
            title={user ? `Signed in as ${user.name}` : 'Account'}
          >
            <UserIcon />
          </button>
          <button
            aria-label="Shopping bag"
            onClick={openCart}
            className="relative transition-colors duration-300 hover:text-champagne"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-champagne text-[9px] font-semibold text-obsidian">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian/[0.98] px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-champagne">NB Classic Scents</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <CloseIcon className="text-ivory" />
              </button>
            </div>
            <ul className="mt-16 flex flex-1 flex-col items-start gap-8">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-ivory hover:text-champagne"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
