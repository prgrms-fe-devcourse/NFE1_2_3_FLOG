import { Router } from "express";
import {
  createComment,
  getCommentById,
  deleteComment,
  likeComment,
  updateComment,
  getCurationComments,
  createReplies,
  getCommentByRepliesId,
  deleteReplies,
  likeReplies,
  updateRepliesId,
} from "../controllers/commentController";
import { authMiddleware } from "./../middlewares/authMiddleware";

const router = Router();

router.post(
  "/api/comments/:commentId/replies/create",
  authMiddleware,
  createReplies
);

router.post("/api/comments/:postType/:postId/create", authMiddleware, createComment);
router.get("/api/comments/:commentId", getCommentById);
router.delete('/api/comments/:postType/:postId/:commentId', authMiddleware, deleteComment); // 경로에 postType, postId 추가
router.post("/api/comments/:commentId/like", authMiddleware, likeComment);
router.put("/api/comments/:commentId", authMiddleware, updateComment);
// 특정 큐레이션의 댓글 목록 조회
router.get("/api/curations/:curationId/comments", getCurationComments);

router.get("/api/comments/:commentId/replies/:replyId", getCommentByRepliesId);
router.delete(
  "/api/comments/:commentId/replies/:replyId",
  authMiddleware,
  deleteReplies
);
router.post(
  "/api/comments/:commentId/replies/:replyId/like",
  authMiddleware,
  likeReplies
);
router.put(
  "/api/comments/:commentId/replies/:replyId",
  authMiddleware,
  updateRepliesId
);

export default router;
