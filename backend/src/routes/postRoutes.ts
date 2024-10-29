import { Router } from "express";
import { getPost, Like, Bookmark } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/api/posts/:postId", getPost);
router.post("/api/posts/:postId/like", authMiddleware, Like);
router.post("/api/posts/:postId/bookmark", authMiddleware, Bookmark);
router.delete("/api/posts/:postId/bookmark", authMiddleware, Bookmark);

export default router;
