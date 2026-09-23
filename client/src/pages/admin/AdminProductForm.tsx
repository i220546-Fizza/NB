import { useEffect, useState } from 'react';
import type { Category, Gender, Product } from '@/types';
import { uploadService } from '@/services/uploadService';

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  category: Category;
  gender: Gender;
  image: string;
  color: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  stock: number;
  bestseller: boolean;
  newArrival: boolean;
}

const CATEGORIES: Category[] = ['signature', 'floral', 'oriental', 'woody', 'fresh', 'amber'];
const GENDERS: Gender[] = ['her', 'him', 'unisex'];

function toFormValues(p?: Product): ProductFormValues {
  return {
    name: p?.name ?? '',
    description: p?.description ?? '',
    price: p?.price ?? 0,
    category: p?.category ?? 'signature',
    gender: p?.gender ?? 'unisex',
    image: p?.image ?? '',
    color: p?.color ?? '#BFA06A',
    topNotes: p?.topNotes.join(', ') ?? '',
    heartNotes: p?.heartNotes.join(', ') ?? '',
    baseNotes: p?.baseNotes.join(', ') ?? '',
    stock: p?.stock ?? 0,
    bestseller: p?.bestseller ?? false,
    newArrival: p?.newArrival ?? false,
  };
}

export function AdminProductForm({
  initial,
  onSubmit,
  onCancel,
  submitting,
}: {
  initial?: Product;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<ProductFormValues>(toFormValues(initial));
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setValues(toFormValues(initial));
  }, [initial]);

  const set = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadService.uploadImage(file);
      set('image', url);
    } catch {
      // upload endpoint may be unavailable in this environment; keep manual URL entry available
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6 border border-champagne/[0.15] p-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <TextField label="Name" value={values.name} onChange={(v) => set('name', v)} required />
        <TextField
          label="Price ($)"
          type="number"
          value={String(values.price)}
          onChange={(v) => set('price', Number(v))}
          required
        />
        <SelectField
          label="Category"
          value={values.category}
          options={CATEGORIES}
          onChange={(v) => set('category', v as Category)}
        />
        <SelectField
          label="Gender"
          value={values.gender}
          options={GENDERS}
          onChange={(v) => set('gender', v as Gender)}
        />
        <TextField
          label="Stock"
          type="number"
          value={String(values.stock)}
          onChange={(v) => set('stock', Number(v))}
        />
        <TextField label="Liquid Color (hex)" value={values.color} onChange={(v) => set('color', v)} />
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-widest2 text-beige/50">Description</span>
        <textarea
          required
          rows={3}
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
        />
      </label>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <TextField label="Top Notes (comma separated)" value={values.topNotes} onChange={(v) => set('topNotes', v)} />
        <TextField label="Heart Notes" value={values.heartNotes} onChange={(v) => set('heartNotes', v)} />
        <TextField label="Base Notes" value={values.baseNotes} onChange={(v) => set('baseNotes', v)} />
      </div>

      <div>
        <span className="text-[11px] uppercase tracking-widest2 text-beige/50">Product Image</span>
        <div className="mt-2 flex items-center gap-4">
          {values.image && <img src={values.image} alt="preview" className="h-16 w-16 object-contain" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="text-xs text-beige/60 file:mr-3 file:border file:border-cocoa file:bg-transparent file:px-3 file:py-1.5 file:text-beige/70"
          />
          {uploading && <span className="text-xs text-beige/40">Uploading…</span>}
        </div>
        <input
          type="text"
          placeholder="or paste an image URL"
          value={values.image}
          onChange={(e) => set('image', e.target.value)}
          className="mt-3 w-full border-b border-cocoa bg-transparent py-2 text-sm text-ivory focus:border-champagne focus:outline-none"
        />
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-beige/70">
          <input
            type="checkbox"
            checked={values.bestseller}
            onChange={(e) => set('bestseller', e.target.checked)}
          />
          Bestseller
        </label>
        <label className="flex items-center gap-2 text-sm text-beige/70">
          <input
            type="checkbox"
            checked={values.newArrival}
            onChange={(e) => set('newArrival', e.target.checked)}
          />
          New Arrival
        </label>
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={submitting} className="btn-luxury">
          {submitting ? 'Saving…' : 'Save Product'}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-cocoa bg-transparent py-2 text-ivory focus:border-champagne focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest2 text-beige/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-cocoa bg-obsidian py-2 capitalize text-ivory focus:border-champagne focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
