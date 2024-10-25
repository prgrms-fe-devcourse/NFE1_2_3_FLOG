import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  createEntryController,
  getEntriesByCurationController,
  getEntryController,
  voteForEntryController
} from '../controllers/entryController';

const router = Router();

// 큐레이션 출품작 생성
router.post('/api/curations/:curationId/entry', authMiddleware, createEntryController);

// 큐레이션별 출품작 리스트 조회
router.get('/api/curations/:curationId/entries', getEntriesByCurationController);

// 특정 출품작 조회
router.get('/api/entries/:entryId', getEntryController);

// 출품작 투표
router.post('/api/entries/:entryId/vote', authMiddleware, voteForEntryController);

export default router;
