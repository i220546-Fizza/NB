import { api } from './api';
import { fallbackProducts } from '@/data/products';
import type { Product } from '@/types';

export interface ProductQuery {
  category?: string;
  gender?: string;
  bestseller?: boolean;
  newArrival?: boolean;
  search?: string;
}

function filterLocally(products: Product[], query: ProductQuery = {}): Product[] {
  let result = [...products];
  if (query.category && query.category !== 'all') {
    result = result.filter((p) => p.category === query.category);
  }
  if (query.gender && query.gender !== 'all') {
    result = result.filter((p) => p.gender === query.gender);
  }
  if (query.bestseller) result = result.filter((p) => p.bestseller);
  if (query.newArrival) result = result.filter((p) => p.newArrival);
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter((p) =>
      [p.name, p.category, p.gender, ...p.topNotes, ...p.heartNotes, ...p.baseNotes]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
  return result;
}

export const productService = {
  async list(query: ProductQuery = {}): Promise<Product[]> {
    try {
      const { data } = await api.get<Product[]>('/products', { params: query });
      return data;
    } catch {
      return filterLocally(fallbackProducts, query);
    }
  },

  async getBySlug(slug: string): Promise<Product | undefined> {
    try {
      const { data } = await api.get<Product>(`/products/${slug}`);
      return data;
    } catch {
      return fallbackProducts.find((p) => p.slug === slug);
    }
  },

  async create(payload: Partial<Product>) {
    const { data } = await api.post('/products', payload);
    return data;
  },

  async update(id: string, payload: Partial<Product>) {
    const { data } = await api.put(`/products/${id}`, payload);
    return data;
  },

  async remove(id: string) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};
