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
    name: 'Veg Burger',
    description: 'Crispy veggie patty with lettuce, tomatoes and mayo.',
    price: 80,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Cold Coffee',
    description: 'Refreshing iced coffee blended to perfection.',
    price: 50,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
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
    name: 'Grilled Sandwich',
    description: 'Toasted sandwich loaded with fresh veggies and cheese.',
    price: 60,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Chicken Kabab',
    description: 'Juicy and spicy grilled chicken kababs.',
    price: 140,
    category: 'Snacks',
    image: 'https://placehold.co/800x800/8B1A1A/D4A017?text=Chicken+Kabab&font=raleway',
  },
  {
    name: 'Egg Roll',
    description: 'Crispy paratha rolled with a spiced egg omelette and veggies.',
    price: 70,
    category: 'Snacks',
    image: 'https://placehold.co/800x800/8B1A1A/D4A017?text=Egg+Roll&font=raleway',
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
