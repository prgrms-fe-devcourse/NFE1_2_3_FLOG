import { authMiddleware } from "../middlewares/authMiddleware";
import { Router } from "express";
import { updatePassword } from "../controllers/userController";

const router = Router();

router.put("/api/users/profile/password", authMiddleware, updatePassword);

export default router;
