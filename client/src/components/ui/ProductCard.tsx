import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { GoldLine } from '@/components/ui/GoldLine';
import { formatCurrency } from '@/utils/currency';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden bg-cocoa/20">
        <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-0 blur-2xl transition-opacity duration-700 ease-luxury group-hover:opacity-60"
            style={{ background: `radial-gradient(circle at 50% 40%, ${product.color}55, transparent 70%)` }}
          />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`relative z-10 h-[80%] object-contain transition-transform duration-700 ease-luxury ${
              hovered ? 'scale-110 -rotate-2' : 'scale-100'
            }`}
          />
          {product.bestseller && (
            <span className="absolute left-4 top-4 z-20 text-[10px] uppercase tracking-widest2 text-champagne">
              Bestseller
            </span>
          )}
          {product.newArrival && (
            <span className="absolute right-4 top-4 z-20 text-[10px] uppercase tracking-widest2 text-beige/70">
              New
            </span>
          )}
        </div>
      </Link>

      <div className="mt-6 flex flex-col items-start gap-2">
        <GoldLine className={`transition-all duration-500 ease-luxury ${hovered ? 'w-16' : 'w-8'}`} />
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-xl text-ivory transition-colors group-hover:text-champagne">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] uppercase tracking-widest2 text-beige/50">
          {product.category} · Eau de Parfum
        </p>
        <p className="line-clamp-2 font-serif text-sm text-beige/60">{product.description}</p>

        <div className="mt-2 flex w-full items-center justify-between">
          <span className="font-serif text-lg text-champagne">{formatCurrency(product.price)}</span>
          <div className="flex items-center gap-4">
            <Link to={`/product/${product.slug}`} className="btn-ghost">
              View
            </Link>
            <button
              onClick={() => addItem(product)}
              className="text-[11px] uppercase tracking-widest2 text-ivory/80 underline decoration-champagne/40 underline-offset-4 hover:text-champagne"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
