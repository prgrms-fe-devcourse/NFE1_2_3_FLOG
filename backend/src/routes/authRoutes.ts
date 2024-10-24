// src/routes/authRoutes.ts

import express from "express";
import { signupUser } from "../services/authService";
import { validateSignup } from "../middlewares/authMiddleware";

const router = express.Router();

// 회원가입 라우트
router.post("/api/users/signup", validateSignup, signupUser);

export default router;
