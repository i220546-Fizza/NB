import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Reveal } from '@/components/animations/Reveal';
import { ProductBottleExperience } from '@/components/3d/ProductBottleExperience';
import { StarIcon, MinusIcon, PlusIcon } from '@/components/ui/Icons';
import { GoldLine } from '@/components/ui/GoldLine';
import { productService } from '@/services/productService';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/types';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setProduct(null);
    setQuantity(1);
    productService.getBySlug(slug).then((p) => {
      if (p) setProduct(p);
      else setNotFound(true);
    });
  }, [slug]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian text-center">
        <p className="font-display text-3xl text-ivory">Fragrance not found</p>
        <Link to="/collection" className="btn-ghost mt-6">
          Back to Collection
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-obsidian">
        <p className="text-beige/50">Loading…</p>
      </div>
    );
  }

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-obsidian pb-32 pt-32">
      <div className="section-pad grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="h-[50vh] lg:sticky lg:top-32 lg:h-[70vh]">
          <ProductBottleExperience
            liquidColor={product.color}
            image={product.image}
            alt={product.name}
          />
          <p className="mt-4 text-center text-[11px] uppercase tracking-widest2 text-beige/40">
            Drag to rotate
          </p>
        </div>

        <div>
          <Reveal>
            <span className="label-eyebrow">{product.category} · {product.gender}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="heading-hero mt-4 text-4xl text-ivory md:text-5xl">
              {product.name.toUpperCase()}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-2 text-beige/50">Eau de Parfum</p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-4 flex items-center gap-1 text-champagne">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < Math.round(product.rating)} />
              ))}
              <span className="ml-2 text-sm text-beige/50">{product.rating.toFixed(1)}</span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-2xl text-champagne">${product.price}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-beige/70">
              {product.description}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 space-y-6">
              <NoteRow label="Top Notes" notes={product.topNotes} />
              <NoteRow label="Heart Notes" notes={product.heartNotes} />
              <NoteRow label="Base Notes" notes={product.baseNotes} />
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex items-center gap-4 border border-cocoa px-4 py-2.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-beige/70 hover:text-champagne"
                >
                  <MinusIcon />
                </button>
                <span className="w-5 text-center text-ivory">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-beige/70 hover:text-champagne"
                >
                  <PlusIcon />
                </button>
              </div>
              <span className="text-xs uppercase tracking-widest2 text-beige/40">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => addItem(product, quantity)}
                className="btn-luxury"
                disabled={product.stock === 0}
              >
                Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="btn-ghost"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <GoldLine className="w-8" />
        <span className="text-[11px] uppercase tracking-widest2 text-champagne">{label}</span>
      </div>
      <p className="mt-2 pl-12 font-serif text-beige/70">{notes.join(' · ')}</p>
    </div>
  );
}
