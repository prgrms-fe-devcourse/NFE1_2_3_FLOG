import { Router } from "express";
import { 
  deleteNotification,
  getNotificationList,
  setNotificationRead
} from "../controllers/notificationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get('/api/notifications', authMiddleware, getNotificationList);
router.put('/api/notifications/read/:id', authMiddleware, setNotificationRead)
router.delete('/api/notifications/delete/:id', authMiddleware, deleteNotification)

export default router;