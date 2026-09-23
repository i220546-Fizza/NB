import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['signature', 'floral', 'oriental', 'woody', 'fresh', 'amber'],
    },
    gender: { type: String, required: true, enum: ['her', 'him', 'unisex'] },
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    color: { type: String, default: '#BFA06A' },
    topNotes: { type: [String], default: [] },
    heartNotes: { type: [String], default: [] },
    baseNotes: { type: [String], default: [] },
    stock: { type: Number, default: 0, min: 0 },
    bestseller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
  },
  { timestamps: true }
);

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

productSchema.pre('validate', function generateSlug(next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name);
  }
  next();
});

export default mongoose.model('Product', productSchema);
