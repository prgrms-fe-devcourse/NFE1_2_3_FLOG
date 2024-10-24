// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";

// 회원가입 입력 검증 미들웨어
export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId, password, passwordCheck, nickname } = req.body;
  const idRegex = /^[a-zA-Z0-9]{8,16}$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`])[a-zA-Z\d!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]{8,16}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,16}$/;

  if (!idRegex.test(userId) || typeof userId !== "string") {
    res.status(400).json({ message: "userId가 올바르지 않습니다" });
    return; // 응답 후 함수 종료
  }

  if (!passwordRegex.test(password) || typeof password !== "string") {
    res.status(400).json({ message: "비밀번호가 올바르지 않습니다" });
    return; // 응답 후 함수 종료
  }

  if (password !== passwordCheck) {
    res.status(400).json({ message: "비밀번호가 서로 일치하지 않습니다" });
    return; // 응답 후 함수 종료
  }

  if (!nicknameRegex.test(nickname) || typeof nickname !== "string") {
    res.status(400).json({ message: "닉네임이 올바르지 않습니다" });
    return; // 응답 후 함수 종료
  }

  next(); // 검증 성공 시 다음 미들웨어로 이동
};
