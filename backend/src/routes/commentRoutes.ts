import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { createCommentController, getCommentsByPostController } from '../controllers/commentController';

const router = express.Router();

// 특정 postId와 postType에 대한 댓글 생성
router.post('/api/comments/:postType/:postId', authMiddleware, createCommentController);

// 특정 postId와 postType에 대한 댓글 목록 조회
router.get('/api/comments/:postType/:postId', getCommentsByPostController);

export default router;
