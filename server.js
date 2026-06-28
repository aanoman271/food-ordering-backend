import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./mongodb/db.js";
import router from "./routes/authRoutes.js";
import foodRouter from "./routes/foodRouter.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
dbConnect();

// routes
app.use("/api/auth", router);
app.use("/api/foods", foodRouter);

app.get("/", (req, res) => {
  res.send("Backend is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
