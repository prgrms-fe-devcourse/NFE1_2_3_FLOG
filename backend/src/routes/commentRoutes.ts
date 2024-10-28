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
router.post("/comments/create", authMiddleware, createComment);
router.get("/comments/:commentId", getCommentById);
router.delete("/comments/delete", authMiddleware, deleteComment);
router.post("/comments/:commentId/like", authMiddleware, likeComment);
router.put("/comments/:commentId", authMiddleware, updateComment);

//대댓글
router.post(
  "/comments/:commentId/replies/create",
  authMiddleware,
  createReplies
);
router.get("/comments/:commentId/replies/:replyId", getCommentByRepliesId);
router.delete(
  "/comments/:commentId/replies/:replyId",
  authMiddleware,
  deleteReplies
);
router.post(
  "/comments/:commentId/replies/:replyId/like",
  authMiddleware,
  likeReplies
);
router.put(
  "/comments/:commentId/replies/:replyId",
  authMiddleware,
  updateRepliesId
);

export default router;
