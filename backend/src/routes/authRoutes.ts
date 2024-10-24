import express from 'express';
import { createAdmin, login } from '../controllers/authController';

const router = express.Router();

// 관리자 생성 및 로그인, 로그아웃 경로
router.post('/admin/signup', createAdmin);  // 관리자 생성
router.post('/users/login', login);               // 로그인

export default router;
