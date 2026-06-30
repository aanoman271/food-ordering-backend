import express from "express";
import { registerUser, userLogin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
