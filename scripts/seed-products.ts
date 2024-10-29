const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
 
};

// Initialize Firebase directly in the script
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  // Market 1 - Downtown Market Products
  {
    name: 'Fresh Tomatoes',
    price: 2.99,
    category: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=800',
    description: 'Locally grown fresh tomatoes',
    unit: 'kg',
    marketId: '1',
  },
  {
    name: 'Red Onions',
    price: 1.99,
    category: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800',
    description: 'Fresh red onions',
    unit: 'kg',
    marketId: '1',
  },
  {
    name: 'Carrots',
    price: 1.49,
    category: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800',
    description: 'Fresh organic carrots',
    unit: 'kg',
    marketId: '1',
  },
  {
    name: 'Bananas',
    price: 3.99,
    category: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800',
    description: 'Fresh yellow bananas',
    unit: 'kg',
    marketId: '1',
  },
  {
    name: 'Chicken Breast',
    price: 9.99,
    category: 'Meat & Fish',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    description: 'Fresh chicken breast',
    unit: 'kg',
    marketId: '1',
  },
  {
    name: 'Ground Beef',
    price: 11.99,
    category: 'Meat & Fish',
    image: 'https://images.unsplash.com/photo-1588347785102-2944ba66a9ad?w=800',
    description: 'Fresh ground beef',
    unit: 'kg',
    marketId: '1',
  },

  // Market 2 - Kimisagara Market Products
  {
    name: 'Sweet Potatoes',
    price: 2.49,
    category: 'Fruits & Vegetables',
    image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c16?w=800',
    description: 'Fresh sweet potatoes',
    unit: 'kg',
    marketId: '2',
  },
  {
    name: 'Rice',
    price: 4.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    description: 'Premium jasmine rice',
    unit: 'kg',
    marketId: '2',
  },
  {
    name: 'Pasta',
    price: 2.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=800',
    description: 'Italian spaghetti pasta',
    unit: 'pack',
    marketId: '2',
  },
  {
    name: 'Lamb Chops',
    price: 15.99,
    category: 'Meat & Fish',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800',
    description: 'Fresh lamb chops',
    unit: 'kg',
    marketId: '2',
  },

  // Market 3 - Kimironko Market Products
  {
    name: 'Prepared Salad',
    price: 6.99,
    category: 'Ready Meals',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    description: 'Fresh garden salad',
    unit: 'portion',
    marketId: '3',
  },
  {
    name: 'Chicken Curry',
    price: 8.99,
    category: 'Ready Meals',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
    description: 'Homestyle chicken curry',
    unit: 'portion',
    marketId: '3',
  },
  {
    name: 'Coffee Beans',
    price: 12.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
    description: 'Premium Arabica coffee beans',
    unit: 'kg',
    marketId: '3',
  },
  {
    name: 'Fresh Juice',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    description: 'Freshly squeezed orange juice',
    unit: 'liter',
    marketId: '3',
  },
];

async function seedProducts() {
  try {
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
    }
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

seedProducts();
