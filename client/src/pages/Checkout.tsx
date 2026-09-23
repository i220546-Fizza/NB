import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { orderService } from '@/services/orderService';
import { Reveal } from '@/components/animations/Reveal';
import { SectionLabel } from '@/components/ui/GoldLine';
import type { ShippingAddress } from '@/types';

const EMPTY_ADDRESS: ShippingAddress = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPlacing(true);
    try {
      const order = await orderService.create({
        items,
        shippingAddress: form,
        subtotal,
        shipping,
        totalAmount: total,
      });
      setOrderId(order._id);
      clearCart();
    } catch {
      setError('Could not place order right now. Please try again shortly.');
    } finally {
      setPlacing(false);
    }
  };

  if (orderId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center">
        <span className="label-eyebrow">Order Confirmed</span>
        <h1 className="heading-hero mt-4 text-4xl text-ivory md:text-5xl">THANK YOU</h1>
        <p className="mt-6 max-w-md font-serif text-beige/60">
          Your order <span className="text-champagne">#{orderId.slice(-8).toUpperCase()}</span> has
          been placed and will be delivered via Cash on Delivery.
        </p>
        <Link to="/collection" className="btn-luxury mt-10">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center">
        <p className="font-display text-2xl text-ivory">Your bag is empty.</p>
        <Link to="/collection" className="btn-luxury mt-8">
          Explore the Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pb-32 pt-32">
      <div className="section-pad">
        <Reveal>
          <SectionLabel>Checkout</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="heading-hero mt-6 text-4xl text-ivory md:text-5xl">COMPLETE YOUR ORDER</h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field label="Full Name" value={form.fullName} onChange={update('fullName')} required />
              <Field label="Email" type="email" value={form.email} onChange={update('email')} required />
              <Field label="Phone" value={form.phone} onChange={update('phone')} required />
              <Field label="City" value={form.city} onChange={update('city')} required />
              <Field label="Postal Code" value={form.postalCode} onChange={update('postalCode')} required />
            </div>
            <Field label="Address" value={form.address} onChange={update('address')} required />

            <div className="border border-cocoa/60 p-6">
              <p className="label-eyebrow">Payment Method</p>
              <p className="mt-3 font-serif text-beige/70">Cash on Delivery</p>
              <p className="mt-1 text-xs text-beige/40">
                Pay when your fragrance arrives. Card payments coming soon.
              </p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={placing} className="btn-luxury w-full sm:w-auto">
              {placing ? 'Placing Order…' : 'Place Order'}
            </button>
          </form>

          <div className="lg:col-span-2">
            <div className="border border-champagne/[0.15] p-8">
              <p className="label-eyebrow mb-6">Order Summary</p>
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => (
                  <li key={product._id} className="flex items-center justify-between text-sm">
                    <span className="text-beige/70">
                      {product.name} <span className="text-beige/40">× {quantity}</span>
                    </span>
                    <span className="text-ivory">${(product.price * quantity).toFixed(0)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 border-t border-cocoa/50 pt-4 text-sm text-beige/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-ivory">${subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-ivory">{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between border-t border-cocoa/50 pt-3 font-display text-lg text-ivory">
                  <span>Total</span>
                  <span className="text-champagne">${total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
      />
    </label>
  );
}
