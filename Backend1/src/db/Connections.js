import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDb Connected!! DB HOST:${connect.connection.host}`);
  } catch (error) {
    console.error("MongoDb Connection error:", error);
    process.exit(1);
  }
};
export default connectDb;
