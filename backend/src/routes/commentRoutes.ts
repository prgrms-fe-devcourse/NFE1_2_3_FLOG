import { Router } from "express";
import {
  createComment,
  getCommentById,
  deleteComment,
  likeComment,
  updateComment,
  createReplies,
  getCommentByRepliesId,
  deleteReplies,
  likeReplies,
  updateRepliesId,
} from "../controllers/commentController";
import { authMiddleware } from "./../middlewares/authMiddleware";

const router = Router();

//댓글
router.post("/api/comments/:postType/:postId/create", authMiddleware, createComment);
router.get("/api/comments/:commentId", getCommentById);
router.delete("/api/comments/delete", authMiddleware, deleteComment);
router.post("/api/comments/:commentId/like", authMiddleware, likeComment);
router.put("/api/comments/:commentId", authMiddleware, updateComment);

//대댓글
router.post(
  "/api/comments/:commentId/replies/create",
  authMiddleware,
  createReplies
);
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
