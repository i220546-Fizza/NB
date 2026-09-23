import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import type { Product } from '@/types';
import { AdminProductForm, type ProductFormValues } from './AdminProductForm';
import { formatCurrency } from '@/utils/currency';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    productService.list().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    setError(null);
    const payload = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category,
      gender: values.gender,
      image: values.image || '/images/products/noir-elegance.svg',
      images: values.image ? [values.image] : [],
      color: values.color,
      topNotes: values.topNotes.split(',').map((s) => s.trim()).filter(Boolean),
      heartNotes: values.heartNotes.split(',').map((s) => s.trim()).filter(Boolean),
      baseNotes: values.baseNotes.split(',').map((s) => s.trim()).filter(Boolean),
      stock: values.stock,
      bestseller: values.bestseller,
      newArrival: values.newArrival,
    };
    try {
      if (editing) {
        await productService.update(editing._id, payload);
      } else {
        await productService.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      load();
    } catch {
      setError('Could not save this product. Make sure the backend/admin session is active.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this fragrance from the catalogue?')) return;
    try {
      await productService.remove(id);
      load();
    } catch {
      setError('Could not delete this product.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="heading-hero text-3xl text-ivory md:text-4xl">PRODUCTS</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="btn-luxury"
        >
          Add Perfume
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {showForm && (
        <div className="mt-8">
          <AdminProductForm
            initial={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            submitting={submitting}
          />
        </div>
      )}

      <div className="mt-10 overflow-x-auto border border-champagne/10">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-champagne/10 text-beige/50">
              <th className="px-4 py-3 font-normal">Product</th>
              <th className="px-4 py-3 font-normal">Category</th>
              <th className="px-4 py-3 font-normal">Price</th>
              <th className="px-4 py-3 font-normal">Stock</th>
              <th className="px-4 py-3 font-normal">Flags</th>
              <th className="px-4 py-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-beige/40">
                  Loading…
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-b border-cocoa/30">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 object-contain" />
                    <span className="text-ivory">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 capitalize text-beige/60">{p.category}</td>
                  <td className="px-4 py-3 text-champagne">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3 text-beige/60">{p.stock}</td>
                  <td className="px-4 py-3 text-xs text-beige/50">
                    {p.bestseller && <span className="mr-2">Bestseller</span>}
                    {p.newArrival && <span>New</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setShowForm(true);
                      }}
                      className="mr-4 text-champagne hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-beige/50 hover:text-red-400"
                    >
                      Delete
                    </button>
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
