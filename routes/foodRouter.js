import express from "express";
import {
  createFood,
  deleteFood,
  getFoods,
} from "../controllers/foodController.js";

import { admin, protect } from "../middleware/authMiddleWare.js";
const router = express.Router();

router.get("/", getFoods);

router.post("/", protect, admin, createFood);

router.delete("/:id", protect, admin, deleteFood);

export default router;
