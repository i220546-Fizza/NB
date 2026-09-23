import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productService } from '@/services/productService';
import type { Product } from '@/types';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      const data = await productService.list({ search: query });
      setResults(data.slice(0, 6));
    }, 200);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-obsidian/[0.97] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="section-pad flex items-center justify-between py-8">
            <span className="label-eyebrow">Search the Collection</span>
            <button onClick={onClose} aria-label="Close search">
              <CloseIcon className="text-ivory" />
            </button>
          </div>

          <div className="section-pad mx-auto w-full max-w-3xl flex-1">
            <motion.div
              className="flex items-center gap-4 border-b border-champagne/30 pb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <SearchIcon className="text-champagne" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search perfume, notes, or category…"
                className="w-full bg-transparent font-display text-2xl text-ivory placeholder:text-beige/30 focus:outline-none md:text-3xl"
              />
            </motion.div>

            <div className="mt-10 space-y-1">
              {results.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-cocoa/50 py-4 transition-colors hover:border-champagne/40"
                  >
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="h-14 w-14 object-contain" />
                      <div>
                        <p className="font-display text-lg text-ivory">{product.name}</p>
                        <p className="text-xs uppercase tracking-widest2 text-beige/50">
                          {product.category} · {product.gender}
                        </p>
                      </div>
                    </div>
                    <span className="font-serif text-champagne">${product.price}</span>
                  </Link>
                </motion.div>
              ))}
              {query && results.length === 0 && (
                <p className="pt-6 text-beige/50">No fragrances found for "{query}".</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
