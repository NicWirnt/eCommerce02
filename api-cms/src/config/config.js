import mongoose from "mongoose";

export const dbCon = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_CLIENT);
    con ? console.log("MongoDb connected") : console.log("Mongoose error");
  } catch (error) {
    console.log(error);
  }
};
