const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        require('@/models/userModel');

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log('MongoDB Connecting:', error);
        process.exit(1);
    }
}

module.exports = connectDB;