const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit with failure
    }
};

// write all db function here

const database = {
    connectDB
}

module.exports = database