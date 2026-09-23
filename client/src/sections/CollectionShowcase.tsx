import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';
import { ProductCard } from '@/components/ui/ProductCard';
import { productService } from '@/services/productService';
import type { Product } from '@/types';

export function CollectionShowcase() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.list({ bestseller: true }).then((data) =>
      setProducts(data.length ? data.slice(0, 4) : [])
    );
  }, []);

  return (
    <section className="section-pad bg-obsidian py-28 md:py-36">
      <Reveal>
        <SectionLabel>Bestsellers</SectionLabel>
      </Reveal>
      <div className="mt-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <Reveal delay={0.1}>
          <h2 className="heading-hero text-4xl text-ivory md:text-6xl">THE COLLECTION</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="max-w-sm font-serif italic text-beige/60">
            Distinctive fragrances. Unforgettable impressions.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <Reveal key={product._id} delay={0.05 * i}>
            <ProductCard product={product} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-16 flex justify-center">
          <Link to="/collection" className="btn-luxury">
            View Full Collection
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
