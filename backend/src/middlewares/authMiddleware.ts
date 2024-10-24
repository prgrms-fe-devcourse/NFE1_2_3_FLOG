// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";

// 회원가입 입력 검증 미들웨어
export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId, password, nickname } = req.body;

  if (!userId || typeof userId !== "string" || userId.length < 3) {
    res.status(400).json({ message: "Invalid userId" });
    return; // 응답 후 함수 종료
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    res.status(400).json({ message: "Invalid password" });
    return; // 응답 후 함수 종료
  }

  if (!nickname || typeof nickname !== "string" || nickname.length < 2) {
    res.status(400).json({ message: "Invalid nickname" });
    return; // 응답 후 함수 종료
  }

  next(); // 검증 성공 시 다음 미들웨어로 이동
};
