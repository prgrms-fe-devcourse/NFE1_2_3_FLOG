import { Router } from "express";
import { getPost, Like, Bookmark, getPostList, getRecommendPostList } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/postMiddleware";
import { createPost, editPost, saveDraft, getDraftedPost, deletePost, saveImg } from "../controllers/postController";

const router = Router();

router.get("/api/posts", getPostList); // 각 페이지 별 리스트 렌더링
router.get("/api/posts/draftedpost", authMiddleware, getDraftedPost); // 임시저장된 포스트 불러오기 API
router.get("/api/posts/recommend", getRecommendPostList); // 추천 포스트 리스트 조회
router.get("/api/posts/:postId", getPost);
router.post("/api/posts/:postId/like", authMiddleware, Like);
router.post("/api/posts/:postId/bookmark", authMiddleware, Bookmark);
router.delete("/api/posts/:postId/bookmark", authMiddleware, Bookmark);
router.post("/api/posts/create", authMiddleware, createPost); // 포스트 생성 API
router.post("/api/posts/draft", authMiddleware, saveDraft); // 포스트 임시저장 API
router.put("/api/posts/update/:postId", authMiddleware, editPost); // 포스트 수정 API
router.delete("/api/posts/:postId", authMiddleware, deletePost); // 포스트 수정 API
router.post("/api/posts/img", upload.single("image"), saveImg); // 포스트 사진 저장 API

export default router;
