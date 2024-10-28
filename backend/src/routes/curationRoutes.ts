import { Router } from "express";
import {
  createCurationController,
  getCurationList,
  getCuration,
  likeCurationController
} from "../controllers/curationController";
import { authMiddleware } from "../middlewares/authMiddleware"; // 사용자 인증 미들웨어

const router = Router();
  
// 큐레이션 관련 라우트
router.get("/api/curations", getCurationList); // 큐레이션 리스트 조회
router.get("/api/curations/:curationId", getCuration); // 특정 큐레이션 조회
router.post("/api/curations/create", authMiddleware, createCurationController); // 큐레이션 생성 (관리자만)
// 큐레이션 좋아요 토글
router.post('/api/curations/:curationId/like', authMiddleware, likeCurationController);


// 라우터를 익스포트하여 메인 파일에서 사용
export default router;
