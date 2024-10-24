import { Router } from 'express';
import { createCurationController, getCurationList, getCuration } from '../controllers/curationController';
import { authMiddleware } from '../middlewares/authMiddleware';  // 사용자 인증 미들웨어

const router = Router();
  
// 큐레이션 관련 라우트
router.get('/curations', getCurationList);  // 큐레이션 리스트 조회
router.get('/curations/:curationId', getCuration);  // 특정 큐레이션 조회
router.post('/curations/create', authMiddleware, createCurationController);  // 큐레이션 생성 (관리자만)

// 라우터를 익스포트하여 메인 파일에서 사용
export default router;