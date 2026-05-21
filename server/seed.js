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
    description: 'Classic cheese and tomato pizza.',
    price: 150,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3',
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with potato filling.',
    price: 60,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1630409351241-1939103e3a47?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3',
  },
  {
    name: 'Cold Coffee',
    description: 'Refreshing iced coffee.',
    price: 50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-0708e521d8b6?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3',
  },
  {
    name: 'Veg Burger',
    description: 'Crispy veggie patty with lettuce and mayo.',
    price: 80,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1965&ixlib=rb-4.0.3',
  },
  {
    name: 'French Fries',
    description: 'Golden salted potato fries.',
    price: 70,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3',
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
