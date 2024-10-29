import { authMiddleware } from "../middlewares/authMiddleware";
import { Router } from "express";
import {
  updatePassword,
  updateProfile,
  getProfile,
  getUserItems,
} from "../controllers/userController";

const router = Router();

router.put("/api/users/profile/password", authMiddleware, updatePassword);
router.put("/api/users/profile/edit", authMiddleware, updateProfile);
router.get("/api/users/profile/:userId", getProfile);
router.get("/api/users/profile/:userId/:type", getUserItems);

export default router;
