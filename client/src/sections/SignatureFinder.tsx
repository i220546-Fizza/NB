import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';
import { productService } from '@/services/productService';
import { moodRecommendations } from '@/data/products';
import type { Mood, Product } from '@/types';
import { formatCurrency } from '@/utils/currency';

const MOODS: { key: Mood; label: string }[] = [
  { key: 'mysterious', label: 'Mysterious' },
  { key: 'elegant', label: 'Elegant' },
  { key: 'romantic', label: 'Romantic' },
  { key: 'bold', label: 'Bold' },
  { key: 'fresh', label: 'Fresh' },
  { key: 'powerful', label: 'Powerful' },
];

export function SignatureFinder() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [result, setResult] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mood) {
      setResult(null);
      return;
    }
    setLoading(true);
    const slugOrId = moodRecommendations[mood];
    productService
      .list()
      .then((all) => {
        const match =
          all.find((p) => p._id === slugOrId) ||
          all.find((p) => p.slug === slugOrId) ||
          all[Math.floor(Math.random() * all.length)];
        setResult(match ?? null);
      })
      .finally(() => setLoading(false));
  }, [mood]);

  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-obsidian py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-champagne/10 blur-[100px] animate-drift" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-beige/5 blur-[120px] animate-drift" style={{ animationDelay: '3s' }} />
      </div>

      <div className="section-pad relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel>Signature Fragrance</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-hero mt-6 text-4xl text-ivory md:text-6xl">FIND YOUR SIGNATURE</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 font-serif text-lg italic text-beige/60">
            What mood defines you?
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {MOODS.map((m) => (
              <button
                key={m.key}
                onClick={() => setMood(m.key)}
                className={`px-7 py-3 text-xs uppercase tracking-widest2 transition-all duration-500 ease-luxury ${
                  mood === m.key
                    ? 'border border-champagne bg-champagne text-obsidian'
                    : 'border border-champagne/30 text-beige/70 hover:border-champagne hover:text-champagne'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {mood && (
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-16 max-w-md"
            >
              {loading || !result ? (
                <p className="text-beige/50">Finding your scent…</p>
              ) : (
                <div className="flex flex-col items-center border border-champagne/20 bg-cocoa/10 p-10">
                  <span className="label-eyebrow">Recommended For You</span>
                  <img src={result.image} alt={result.name} className="my-6 h-40 object-contain" />
                  <h3 className="font-display text-2xl text-ivory">{result.name}</h3>
                  <p className="mt-2 max-w-xs font-serif text-beige/60">{result.description}</p>
                  <span className="mt-4 font-serif text-xl text-champagne">{formatCurrency(result.price)}</span>
                  <Link to={`/product/${result.slug}`} className="btn-luxury mt-8">
                    Discover {result.name}
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
