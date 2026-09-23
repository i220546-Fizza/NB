import { api } from './api';
import type { Order, ShippingAddress, CartItem } from '@/types';

export const orderService = {
  async create(payload: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    subtotal: number;
    shipping: number;
    totalAmount: number;
  }): Promise<Order> {
    const { data } = await api.post('/orders', {
      items: payload.items.map((i) => ({
        product: i.product._id,
        name: i.product.name,
        image: i.product.image,
        price: i.product.price,
        quantity: i.quantity,
      })),
      shippingAddress: payload.shippingAddress,
      subtotal: payload.subtotal,
      shipping: payload.shipping,
      totalAmount: payload.totalAmount,
      paymentMethod: 'cod',
    });
    return data;
  },

  async listMine(): Promise<Order[]> {
    const { data } = await api.get('/orders/mine');
    return data;
  },

  async listAll(): Promise<Order[]> {
    const { data } = await api.get('/orders');
    return data;
  },

  async updateStatus(id: string, orderStatus: Order['orderStatus']): Promise<Order> {
    const { data } = await api.put(`/orders/${id}/status`, { orderStatus });
    return data;
  },
};
