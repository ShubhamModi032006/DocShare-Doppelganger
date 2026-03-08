const mongoose = require('mongoose');

// Cache the connection across invocations in the same serverless instance
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            bufferCommands: false,   // fail fast — don't queue ops when disconnected
            maxPoolSize: 10,         // maintain up to 10 concurrent connections
        });
    }
    try {
        cached.conn = await cached.promise;
        console.log('MongoDB Connected successfully...');
    } catch (err) {
        cached.promise = null; // allow retry on next request
        console.error('MongoDB connection error:', err.message);
        // Do NOT exit — let the server keep running so CORS/health still work
    }
    return cached.conn;
};

module.exports = connectDB;
