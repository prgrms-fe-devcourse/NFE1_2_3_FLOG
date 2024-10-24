// src/routes/authRoutes.ts

import express from "express";
import { signupUser } from "../services/authService";
import { validateSignup } from "../middlewares/authMiddleware";

const router = express.Router();

// 회원가입 라우트 - 재현
router.post("/api/users/signup", validateSignup, signupUser);

// 관리자 생성 및 로그인, 로그아웃 경로 - 민주님
import { createAdmin, login } from "../controllers/authController";
router.post("/api/admin/signup", createAdmin); // 관리자 생성
router.post("/api/users/login", login); // 로그인

export default router;
