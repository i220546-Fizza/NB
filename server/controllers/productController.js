import Product from '../models/Product.js';

export async function listProducts(req, res) {
  const { category, gender, bestseller, newArrival, search } = req.query;
  const filter = {};

  if (category && category !== 'all') filter.category = category;
  if (gender && gender !== 'all') filter.gender = gender;
  if (bestseller === 'true') filter.bestseller = true;
  if (newArrival === 'true') filter.newArrival = true;
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      { name: regex },
      { category: regex },
      { gender: regex },
      { topNotes: regex },
      { heartNotes: regex },
      { baseNotes: regex },
    ];
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

export async function getProductBySlug(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json(product);
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product removed' });
}
