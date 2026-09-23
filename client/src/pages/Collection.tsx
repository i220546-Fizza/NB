import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';
import { ProductCard } from '@/components/ui/ProductCard';
import { productService } from '@/services/productService';
import type { Product } from '@/types';

interface CategoryFilter {
  key: string;
  label: string;
  type?: 'gender' | 'category' | 'flag';
}

const CATEGORY_FILTERS: CategoryFilter[] = [
  { key: 'all', label: 'All Fragrances' },
  { key: 'her', label: 'For Her', type: 'gender' },
  { key: 'him', label: 'For Him', type: 'gender' },
  { key: 'unisex', label: 'Unisex', type: 'gender' },
  { key: 'signature', label: 'Signature', type: 'category' },
  { key: 'newArrival', label: 'New Arrivals', type: 'flag' },
  { key: 'bestseller', label: 'Bestsellers', type: 'flag' },
];

export default function Collection() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const active = params.get('filter') || params.get('category') || (params.get('newArrival') ? 'newArrival' : params.get('bestseller') ? 'bestseller' : 'all');

  useEffect(() => {
    setLoading(true);
    const filterMeta = CATEGORY_FILTERS.find((f) => f.key === active);
    const query: Record<string, string | boolean> = {};
    if (filterMeta?.type === 'gender') query.gender = filterMeta.key;
    if (filterMeta?.type === 'category') query.category = filterMeta.key;
    if (filterMeta?.key === 'newArrival') query.newArrival = true;
    if (filterMeta?.key === 'bestseller') query.bestseller = true;

    productService.list(query).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [active]);

  const setFilter = (key: string) => {
    if (key === 'all') {
      setParams({});
    } else {
      setParams({ filter: key });
    }
  };

  const heading = useMemo(
    () => CATEGORY_FILTERS.find((f) => f.key === active)?.label ?? 'All Fragrances',
    [active]
  );

  return (
    <div className="min-h-screen bg-obsidian pb-32 pt-40">
      <div className="section-pad">
        <Reveal>
          <SectionLabel>Full Catalogue</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="heading-hero mt-6 text-4xl text-ivory md:text-6xl">{heading.toUpperCase()}</h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-widest2 transition-all duration-400 ease-luxury ${
                active === f.key
                  ? 'border border-champagne bg-champagne text-obsidian'
                  : 'border border-cocoa text-beige/60 hover:border-champagne hover:text-champagne'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="col-span-full text-center text-beige/50">Loading the collection…</p>
          ) : products.length === 0 ? (
            <p className="col-span-full text-center text-beige/50">No fragrances match this filter.</p>
          ) : (
            products.map((product, i) => (
              <Reveal key={product._id} delay={0.04 * i}>
                <ProductCard product={product} index={i} />
              </Reveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
