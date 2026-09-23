import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';

const products = [
  {
    name: 'Noir Élégance',
    description:
      'A velvet-dark eau de parfum built around smoked amber and black vanilla — the scent of candlelight in an empty ballroom.',
    price: 185,
    category: 'oriental',
    gender: 'unisex',
    image: '/images/products/noir-elegance.svg',
    images: ['/images/products/noir-elegance.svg'],
    color: '#3A2C25',
    topNotes: ['Bergamot', 'Pink Pepper'],
    heartNotes: ['Jasmine', 'Rose'],
    baseNotes: ['Vanilla', 'Amber', 'Sandalwood'],
    stock: 42,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
  },
  {
    name: 'Champagne Silk',
    description:
      'Sparkling bergamot and white peony wrapped in warm musk — an ode to golden hour and quiet confidence.',
    price: 165,
    category: 'floral',
    gender: 'her',
    image: '/images/products/champagne-silk.svg',
    images: ['/images/products/champagne-silk.svg'],
    color: '#D6B77C',
    topNotes: ['Bergamot', 'Mandarin'],
    heartNotes: ['White Peony', 'Iris'],
    baseNotes: ['Musk', 'Cashmere Wood'],
    stock: 37,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
  },
  {
    name: 'Obsidian Oud',
    description:
      'A commanding blend of oud, leather and dark spice — for those who enter a room before they speak.',
    price: 220,
    category: 'woody',
    gender: 'him',
    image: '/images/products/obsidian-oud.svg',
    images: ['/images/products/obsidian-oud.svg'],
    color: '#0D0B0A',
    topNotes: ['Saffron', 'Black Pepper'],
    heartNotes: ['Oud', 'Leather'],
    baseNotes: ['Patchouli', 'Vetiver', 'Amber'],
    stock: 28,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
  },
  {
    name: 'Ivory Bloom',
    description: 'Delicate tuberose and creamy sandalwood — soft, luminous, and impossible to forget.',
    price: 175,
    category: 'floral',
    gender: 'her',
    image: '/images/products/ivory-bloom.svg',
    images: ['/images/products/ivory-bloom.svg'],
    color: '#F7F2E8',
    topNotes: ['Green Pear', 'Neroli'],
    heartNotes: ['Tuberose', 'Ylang Ylang'],
    baseNotes: ['Sandalwood', 'White Musk'],
    stock: 51,
    bestseller: false,
    newArrival: true,
    rating: 4.6,
  },
  {
    name: 'Golden Hour',
    description: 'Amber resin, tonka bean and a whisper of citrus — the last light of the day, bottled.',
    price: 195,
    category: 'amber',
    gender: 'unisex',
    image: '/images/products/golden-hour.svg',
    images: ['/images/products/golden-hour.svg'],
    color: '#BFA06A',
    topNotes: ['Blood Orange', 'Cardamom'],
    heartNotes: ['Tonka Bean', 'Cedar'],
    baseNotes: ['Amber', 'Benzoin', 'Musk'],
    stock: 33,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
  },
  {
    name: 'First Light',
    description: 'Crisp citrus, sea salt and driftwood — the clarity of dawn over water.',
    price: 150,
    category: 'fresh',
    gender: 'him',
    image: '/images/products/first-light.svg',
    images: ['/images/products/first-light.svg'],
    color: '#E8DED0',
    topNotes: ['Sea Salt', 'Grapefruit'],
    heartNotes: ['Fig Leaf', 'Lavender'],
    baseNotes: ['Driftwood', 'Ambergris'],
    stock: 46,
    bestseller: false,
    newArrival: true,
    rating: 4.5,
  },
  {
    name: 'Rouge Intense',
    description: 'A bold, sensual signature of red fruits, spice and dark musk — impossible to ignore.',
    price: 210,
    category: 'signature',
    gender: 'her',
    image: '/images/products/rouge-intense.svg',
    images: ['/images/products/rouge-intense.svg'],
    color: '#7A2E2E',
    topNotes: ['Blackcurrant', 'Pink Pepper'],
    heartNotes: ['Rose', 'Cinnamon'],
    baseNotes: ['Dark Musk', 'Patchouli'],
    stock: 24,
    bestseller: true,
    newArrival: false,
    rating: 4.8,
  },
  {
    name: 'Velvet Vetiver',
    description: 'Earthy vetiver and smoked cedar softened with iris — quiet power in a bottle.',
    price: 200,
    category: 'woody',
    gender: 'unisex',
    image: '/images/products/velvet-vetiver.svg',
    images: ['/images/products/velvet-vetiver.svg'],
    color: '#3A4A3A',
    topNotes: ['Bergamot', 'Elemi'],
    heartNotes: ['Iris', 'Violet Leaf'],
    baseNotes: ['Vetiver', 'Cedar', 'Musk'],
    stock: 30,
    bestseller: false,
    newArrival: false,
    rating: 4.7,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding NB Classic Scents catalogue...');

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products.`);

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@nbclassicscents.com').toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || 'NB Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'change_this_password',
      role: 'admin',
    });
    console.log(`Created admin account: ${adminEmail}`);
  } else {
    console.log('Admin account already exists, skipping.');
  }

  await mongoose.disconnect();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
