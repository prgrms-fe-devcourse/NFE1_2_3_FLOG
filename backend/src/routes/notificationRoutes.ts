import { Router } from "express";
import { getNotificationList } from "../controllers/notificationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get('/api/notifications', authMiddleware, getNotificationList);

export default router;