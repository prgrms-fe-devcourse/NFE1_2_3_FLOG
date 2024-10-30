import { Router } from "express";
import { getPost, Like, Bookmark, getPostList } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { postCreateEdit } from "../controllers/postController";

const router = Router();

router.get("/api/posts", getPostList); // 각 페이지 별 리스트 렌더링
router.get("/api/posts/:postId", getPost);
router.post("/api/posts/:postId/like", authMiddleware, Like);
router.post("/api/posts/:postId/bookmark", authMiddleware, Bookmark);
router.delete("/api/posts/:postId/bookmark", authMiddleware, Bookmark);
router.post("/api/posts/create", authMiddleware, postCreateEdit);

export default router;
