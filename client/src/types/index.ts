export type Gender = 'her' | 'him' | 'unisex';

export type Category =
  | 'signature'
  | 'floral'
  | 'oriental'
  | 'woody'
  | 'fresh'
  | 'amber';

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  gender: Gender;
  image: string;
  images: string[];
  color: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  stock: number;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  token: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  user?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  totalAmount: number;
  paymentMethod: 'cod';
  paymentStatus: 'pending' | 'paid';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export type Mood =
  | 'mysterious'
  | 'elegant'
  | 'romantic'
  | 'bold'
  | 'fresh'
  | 'powerful';
