import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import type { Order, Product } from '@/types';
import { formatCurrency } from '@/utils/currency';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([productService.list(), orderService.listAll().catch(() => [])])
      .then(([p, o]) => {
        setProducts(p);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, []);

  const revenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div>
      <h1 className="heading-hero text-3xl text-ivory md:text-4xl">DASHBOARD</h1>
      <p className="mt-2 text-beige/50">An overview of the house.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products" value={products.length} />
        <StatCard label="Orders" value={orders.length} />
        <StatCard label="Revenue" value={Math.round(revenue)} prefix="Rs. " />
        <StatCard label="Bestsellers" value={products.filter((p) => p.bestseller).length} />
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between">
          <p className="label-eyebrow">Recent Orders</p>
          <Link to="/admin/orders" className="btn-ghost">
            View All
          </Link>
        </div>

        <div className="mt-6 overflow-x-auto border border-champagne/10">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-champagne/10 text-beige/50">
                <th className="px-4 py-3 font-normal">Order</th>
                <th className="px-4 py-3 font-normal">Customer</th>
                <th className="px-4 py-3 font-normal">Total</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-beige/40">
                    Loading…
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-beige/40">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 6).map((o) => (
                  <tr key={o._id} className="border-b border-cocoa/30">
                    <td className="px-4 py-3 text-champagne">#{o._id.slice(-6).toUpperCase()}</td>
                    <td className="px-4 py-3 text-beige/70">{o.shippingAddress.fullName}</td>
                    <td className="px-4 py-3 text-ivory">{formatCurrency(o.totalAmount)}</td>
                    <td className="px-4 py-3 capitalize text-beige/60">{o.orderStatus}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, prefix }: { label: string; value: number; prefix?: string }) {
  return (
    <div className="border border-champagne/10 p-6">
      <p className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</p>
      <p className="mt-3 font-display text-3xl text-champagne">
        <AnimatedCounter value={value} prefix={prefix} />
      </p>
    </div>
  );
}
