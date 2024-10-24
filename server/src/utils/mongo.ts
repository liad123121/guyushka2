import mongoose from "mongoose";

export const mongo_connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bot");
  } catch (error) {
    console.error(error);
  }
};
