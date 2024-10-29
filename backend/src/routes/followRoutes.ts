import {
  toggleFollow,
  getFollowersAndFollowing,
} from "./../controllers/followContoller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.post("/api/follow/:userId", authMiddleware, toggleFollow);
router.get(
  "/api/follow/:userId/getFollow",
  authMiddleware,
  getFollowersAndFollowing
);
export default router;
