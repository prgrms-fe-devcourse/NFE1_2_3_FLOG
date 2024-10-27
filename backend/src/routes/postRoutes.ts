import { Router } from "express";
import { getPost, Like, Bookmark } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/posts/:postId", getPost);
router.post("/posts/:postId/like", authMiddleware, Like);
router.post("/posts/:postId/bookmark", authMiddleware, Bookmark);
router.delete("/posts/:postId/bookmark", authMiddleware, Bookmark);

export default router;
