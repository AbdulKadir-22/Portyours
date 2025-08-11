const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB database connected');
  } catch (error) {
    console.error(`There is some error connecting to MongoDB`);
    process.exit(1);
  }
};

module.exports = connectDB;