import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addReplyController, createCommentController, getCommentsByPostController } from '../controllers/commentController';

const router = express.Router();

// 특정 postId와 postType에 대한 댓글 생성
router.post('/api/comments/:postType/:postId', authMiddleware, createCommentController);

// 댓글 또는 대댓글에 대댓글 추가 라우트
router.post('/api/comments/:commentId/reply', authMiddleware, addReplyController);

// 특정 postId와 postType에 대한 댓글 목록 조회
router.get('/api/comments/:postType/:postId', getCommentsByPostController);

export default router;
