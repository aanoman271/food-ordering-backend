import express from "express";
import { payhereNotify } from "../controllers/paymentController.js";
const router = express.Router();

router.post("/notify", payhereNotify);

export default router;
