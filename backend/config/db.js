import mongoose from "mongoose";
import { config } from "./env-config.js";

export const connectDB = async () => {
  try {
    // REGISTER EVENT IF DB CONNECT SUCCESSFULLY
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully.");
    });

    // REGISTER EVENT IF DB HAS ERROR WHILE CONNETION
    mongoose.connection.on("error", (err) => {
      console.log(`Caught Error while connected with database: ${err}`);
    });

    // CONNECT WITH DATABASE
    mongoose.connect(config.mongodb_url);
  } catch (error) {
    console.log(`Failed to connect with database: ${error}`);
  }
};
