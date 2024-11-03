//Entire database connection is written here
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
