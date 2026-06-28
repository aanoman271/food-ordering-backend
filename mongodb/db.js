import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("DB connected successfully");
    console.log("Database:", conn.connection.name);
    console.log("Host:", conn.connection.host);
  } catch (err) {
    console.log("Failed to connect DB:", err.message);
    process.exit(1);
  }
};

export default dbConnect;
