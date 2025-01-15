import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Ensure the environment variable is always checked
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in your .env file. Please check your setup.');
}

// Define a proper type for the mongoose cache
interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

// Correctly extend the global object for TypeScript compatibility
const globalWithMongooseCache = global as typeof global & {
    mongooseCache?: MongooseCache;
};

// Ensure the cache is always initialized
if (!globalWithMongooseCache.mongooseCache) {
    globalWithMongooseCache.mongooseCache = { conn: null, promise: null };
}

// Connect to the database with proper types and ensure initialization
export async function connectToDatabase(): Promise<mongoose.Connection> {
    const { mongooseCache } = globalWithMongooseCache;

    if (!mongooseCache) {
        throw new Error('Mongoose cache was not initialized properly.');
    }

    if (mongooseCache.conn) {
        return mongooseCache.conn;
    }

    // ✅ Explicit non-null assertion since we checked earlier
    if (!mongooseCache.promise) {
        mongooseCache.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => mongoose.connection);
    }

    mongooseCache.conn = await mongooseCache.promise;
    return mongooseCache.conn;
}
