import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GoldLine } from '@/components/ui/GoldLine';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-champagne/10 bg-obsidian pt-20">
      <div className="section-pad grid gap-14 pb-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl tracking-[0.15em] text-ivory">NB CLASSIC SCENTS</span>
          <p className="mt-4 font-serif italic text-beige/60">Leave an impression.</p>
          <div className="mt-6 flex gap-5 text-beige/50">
            {['Instagram', 'Facebook', 'TikTok'].map((s) => (
              <a key={s} href="#" className="text-xs uppercase tracking-widest2 hover:text-champagne">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="label-eyebrow mb-5">Shop</p>
          <ul className="space-y-3 text-sm text-beige/70">
            <li><Link to="/collection" className="hover:text-champagne">All Fragrances</Link></li>
            <li><Link to="/collection?category=signature" className="hover:text-champagne">Signature</Link></li>
            <li><Link to="/collection?newArrival=true" className="hover:text-champagne">New Arrivals</Link></li>
            <li><Link to="/collection?bestseller=true" className="hover:text-champagne">Bestsellers</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-eyebrow mb-5">The House</p>
          <ul className="space-y-3 text-sm text-beige/70">
            <li><Link to="/our-story" className="hover:text-champagne">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-champagne">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-champagne">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-champagne">Terms</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-eyebrow mb-5">Newsletter</p>
          <p className="mb-4 text-sm text-beige/60">Receive the latest from NB Classic Scents.</p>
          {subscribed ? (
            <p className="text-sm text-champagne">Thank you — welcome to the house.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-cocoa focus-within:border-champagne">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-transparent py-2 text-sm text-ivory placeholder:text-beige/30 focus:outline-none"
              />
              <button type="submit" className="text-xs uppercase tracking-widest2 text-champagne">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="section-pad flex justify-center py-4">
        <GoldLine className="w-24" />
      </div>

      <div className="section-pad flex flex-col items-center justify-between gap-3 py-8 text-xs text-beige/40 md:flex-row">
        <span>© {new Date().getFullYear()} NB Classic Scents. All rights reserved.</span>
        <span>Crafted for those who leave an impression.</span>
      </div>
    </footer>
  );
}
