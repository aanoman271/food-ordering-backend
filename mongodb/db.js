import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected succesfully");
  } catch (err) {
    console.log(" failed to connect bd", err.message);
    process.exit(1);
  }
};
export default dbConnect;
