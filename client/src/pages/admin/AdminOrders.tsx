import { useEffect, useState } from 'react';
import { orderService } from '@/services/orderService';
import type { Order } from '@/types';

const STATUSES: Order['orderStatus'][] = ['processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    orderService
      .listAll()
      .then(setOrders)
      .catch(() => setError('Could not load orders. Ensure the backend is running.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleStatusChange = async (id: string, status: Order['orderStatus']) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o)));
    try {
      await orderService.updateStatus(id, status);
    } catch {
      setError('Could not update order status.');
      load();
    }
  };

  return (
    <div>
      <h1 className="heading-hero text-3xl text-ivory md:text-4xl">ORDERS</h1>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-10 overflow-x-auto border border-champagne/10">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-champagne/10 text-beige/50">
              <th className="px-4 py-3 font-normal">Order</th>
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Items</th>
              <th className="px-4 py-3 font-normal">Total</th>
              <th className="px-4 py-3 font-normal">Payment</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-beige/40">
                  Loading…
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-beige/40">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-b border-cocoa/30 align-top">
                  <td className="px-4 py-3 text-champagne">#{o._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3 text-beige/70">
                    <p className="text-ivory">{o.shippingAddress.fullName}</p>
                    <p className="text-xs text-beige/40">{o.shippingAddress.email}</p>
                  </td>
                  <td className="px-4 py-3 text-beige/60">
                    {o.items.map((i) => (
                      <div key={i.product}>
                        {i.name} × {i.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-ivory">${o.totalAmount.toFixed(0)}</td>
                  <td className="px-4 py-3 capitalize text-beige/60">{o.paymentStatus} · COD</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleStatusChange(o._id, e.target.value as Order['orderStatus'])}
                      className="border border-cocoa bg-obsidian px-2 py-1.5 capitalize text-ivory focus:border-champagne focus:outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
