const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/brunch';

    if (uri && (uri.includes('localhost') || uri.includes('127.0.0.1'))) {
      process.env.MONGOMS_DOWNLOAD_DIR = '/tmp/mongodb';
      process.env.MONGOMS_PREFER_GLOBAL_PATH = 'false';
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using in-memory MongoDB server for demo purposes');
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
