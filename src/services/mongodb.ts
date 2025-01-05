import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI!;

if (!MONGODB_URI) {
  throw new Error('.env variable for MongoDB is WRONG!!!!!!!!!!!! FIX IT NOW!!!!!!!!!');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
