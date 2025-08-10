import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = global._mongoose || { conn: null, promise: null };
global._mongoose = cached;

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) throw new Error('MONGODB_URI is missing');

    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // 10s fail-fast
    }).then(m => m).catch(err => {
      // Reset so we can retry on next request instead of hanging forever
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
