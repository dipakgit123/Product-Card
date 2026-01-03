import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Classic Cotton Briefs',
    price: 299,
    description: 'Comfortable cotton briefs with elastic waistband. Soft, breathable fabric for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop',
    category: 'Men',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    name: 'Premium Boxer Shorts',
    price: 449,
    description: 'Relaxed fit boxer shorts made from premium cotton blend. Perfect for lounging and everyday wear.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    category: 'Men',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Sports Performance Vest',
    price: 399,
    description: 'Moisture-wicking vest designed for active lifestyles. Lightweight and quick-drying fabric.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Men',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'Seamless Cotton Bralette',
    price: 549,
    description: 'Ultra-soft seamless bralette with removable padding. Ideal for everyday comfort and support.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop',
    category: 'Women',
    subcategory: 'Innerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    name: 'Lace Trim Camisole',
    price: 499,
    description: 'Elegant camisole with delicate lace trim. Perfect layering piece with adjustable straps.',
    image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop',
    category: 'Women',
    subcategory: 'Innerwear',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    name: 'Cotton Hipster Panties (3-Pack)',
    price: 599,
    description: 'Set of 3 comfortable cotton hipster panties. Tagless design with covered elastic waistband.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
    category: 'Women',
    subcategory: 'Innerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    name: 'Kids Cotton Vest (2-Pack)',
    price: 349,
    description: 'Soft cotton vests perfect for kids. Comfortable fit with durable stitching for active play.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
    category: 'Kids',
    subcategory: 'Innerwear',
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
  },
  {
    name: 'Kids Printed Briefs (5-Pack)',
    price: 449,
    description: 'Fun printed briefs for kids in assorted colors. Soft elastic waistband for comfort.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
    category: 'Kids',
    subcategory: 'Innerwear',
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-12Y'],
  },
  {
    name: 'Thermal Long Johns',
    price: 799,
    description: 'Warm thermal long johns for cold weather. Brushed inner fabric for extra warmth and comfort.',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop',
    category: 'Unisex',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    name: 'Bamboo Fiber Tank Top',
    price: 599,
    description: 'Eco-friendly bamboo fiber tank top. Naturally antibacterial and incredibly soft on skin.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop',
    category: 'Unisex',
    subcategory: 'Innerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    name: 'Trunk Style Underwear',
    price: 379,
    description: 'Modern trunk style underwear with supportive fit. Stretchy fabric moves with you all day.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
    category: 'Men',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    name: 'High-Waist Shaping Brief',
    price: 649,
    description: 'Smoothing high-waist brief with light shaping. Comfortable compression for a streamlined look.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    category: 'Women',
    subcategory: 'Innerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
