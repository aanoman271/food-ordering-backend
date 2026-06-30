import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./mongodb/db.js";
import router from "./routes/authRoutes.js";
import foodRouter from "./routes/foodRouter.js";
import orderRouter from "./routes/orderRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database Connection
dbConnect();

// routes
app.use("/api/auth", router);
app.use("/api/foods", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);
app.get("/", (req, res) => {
  res.send("Backend is working");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
