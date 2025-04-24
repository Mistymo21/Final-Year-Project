
import mongoose from "mongoose";

let isConnected = false;

export default async function connect() {
  if (isConnected) {
    // Already connected
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error. Please make sure MongoDB is running. ", err);
    });

    connection.on("disconnected", () => {
      console.log("MongoDB connection closed");
    });

    isConnected = true;

    return db;
  } catch (error) {
    console.log("Mongo connection error:", error);
    throw new Error("Mongo connection failed");
  }
}
