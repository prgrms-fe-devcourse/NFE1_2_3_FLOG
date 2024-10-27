import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { likeCurationController, likeCommentController } from '../controllers/likeController';

const router = express.Router();

// 큐레이션 좋아요 토글
router.post('/api/curations/:curationId/like', authMiddleware, likeCurationController);

// 댓글 좋아요 토글
router.post('/api/comments/:commentId/like', authMiddleware, likeCommentController);

export default router;
