import { Router } from "express";
import {
  createCurationController,
  getCurationList,
  getCuration,
  likeCurationController,
  updateCurationController,
  deleteCurationController,
  getRecommedCurationList
} from "../controllers/curationController";
import { authMiddleware, authOptionalMiddleware } from "../middlewares/authMiddleware"; // 사용자 인증 미들웨어

const router = Router();
  
// 큐레이션 관련 라우트
router.get("/api/curations", authOptionalMiddleware, getCurationList); // 큐레이션 리스트 조회
router.get("/api/curations/recommend", getRecommedCurationList); // 추천 큐레이션 리스트 조회
router.get("/api/curations/:curationId", authOptionalMiddleware, getCuration); // 특정 큐레이션 조회
router.post("/api/curations/create", authMiddleware, createCurationController); // 큐레이션 생성 (관리자만)
// 큐레이션 좋아요 토글
router.post('/api/curations/:curationId/like', authMiddleware, likeCurationController);
router.put('/api/curations/:curationId', authMiddleware, updateCurationController); // 큐레이션 수정 (관리자만)
router.delete('/api/curations/:curationId', authMiddleware, deleteCurationController); // 큐레이션 삭제 (관리자만)


// 라우터를 익스포트하여 메인 파일에서 사용
export default router;
