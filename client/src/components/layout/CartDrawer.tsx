import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon } from '@/components/ui/Icons';
import { formatCurrency } from '@/utils/currency';

export function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, subtotal, shipping, total } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-obsidian/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-espresso shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-champagne/[0.15] px-8 py-6">
              <span className="label-eyebrow">Your Bag ({items.length})</span>
              <button onClick={closeCart} aria-label="Close bag">
                <CloseIcon className="text-ivory" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-xl text-beige/60">Your bag is empty.</p>
                  <Link
                    to="/collection"
                    onClick={closeCart}
                    className="btn-ghost mt-6"
                  >
                    Explore the Collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map(({ product, quantity }) => (
                    <li key={product._id} className="flex gap-4 border-b border-cocoa/40 pb-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-24 w-20 flex-shrink-0 object-contain"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-display text-base text-ivory">{product.name}</p>
                            <p className="text-[11px] uppercase tracking-widest2 text-beige/50">
                              {product.category}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(product._id)}
                            aria-label="Remove"
                            className="text-beige/40 hover:text-champagne"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-cocoa px-3 py-1.5">
                            <button
                              onClick={() => decrement(product._id)}
                              aria-label="Decrease quantity"
                              className="text-beige/70 hover:text-champagne"
                            >
                              <MinusIcon className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-4 text-center text-sm text-ivory">{quantity}</span>
                            <button
                              onClick={() => increment(product._id)}
                              aria-label="Increase quantity"
                              className="text-beige/70 hover:text-champagne"
                            >
                              <PlusIcon className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-serif text-champagne">
                            {formatCurrency(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-champagne/[0.15] px-8 py-6">
                <div className="space-y-2 text-sm text-beige/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-ivory">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-ivory">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between border-t border-cocoa/50 pt-3 font-display text-lg text-ivory">
                    <span>Total</span>
                    <span className="text-champagne">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-luxury mt-6 w-full bg-transparent"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
