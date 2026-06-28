import express from "express";
import { admin, protect } from "../middleware/authMiddleWare";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/ordercontroler";
const router = express.Router();
// cusomer
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

// admin
router.get("/", protect, admin, getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);
export default router;
