import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongo DB conectado');
  } catch (err) {
    console.error('mongoDB sin conexion:', err);
    process.exit(1);
  }
};