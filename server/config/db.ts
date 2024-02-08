import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MongoDB connection URI is not defined in the environment variables.");
        }

        const conn = await mongoose.connect(mongoURI, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;