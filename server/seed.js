const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const FoodItem = require('./models/FoodItem');
const Order = require('./models/Order');

dotenv.config();

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'puneeth@gmail.com',
    password: '12345',
    role: 'admin',
  },
  {
    name: 'Student One',
    email: 'student@queueless.com',
    password: 'password123',
    role: 'student',
  },
];

const sampleFoodItems = [
  {
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza on a fresh crust.',
    price: 150,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with potato filling and fresh chutney.',
    price: 60,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Cold Coffee',
    description: 'Refreshing iced coffee blended to perfection.',
    price: 50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-0708e521d8b6?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Veg Burger',
    description: 'Crispy veggie patty with lettuce, tomatoes and mayo.',
    price: 80,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'French Fries',
    description: 'Golden salted potato fries, crispy on the outside.',
    price: 70,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Rich and creamy curry made with paneer, spices, and butter.',
    price: 120,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and spices.',
    price: 180,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Samosa',
    description: 'Crispy fried pastry filled with spiced potatoes.',
    price: 20,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Chocolate Milkshake',
    description: 'Thick and creamy chocolate milkshake topped with cocoa.',
    price: 90,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Veg Hakka Noodles',
    description: 'Wok tossed noodles with crunchy vegetables.',
    price: 110,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with hot lentil soup.',
    price: 40,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing citrus drink to beat the heat.',
    price: 30,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
  }
];

const importData = async () => {
  try {
    // Check if data already exists to prevent duplicate seeding
    const adminExists = await User.findOne({ email: 'puneeth@gmail.com' });
    if (adminExists) {
      console.log('Data already exists, skipping seed.');
      return;
    }

    await Order.deleteMany();
    await FoodItem.deleteMany();
    await User.deleteMany();

    await User.create(sampleUsers);
    await FoodItem.insertMany(sampleFoodItems);

    console.log('Sample Data Imported Successfully!');
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
  }
};

module.exports = importData;
