// src/services/authService.ts
import User, { IUser } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

// 사용자 등록 로직을 처리하는 서비스
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: IUser = req.body; // 요청 본문에서 사용자 데이터를 가져옴
    const user = new User(userData); // 회원가입 데이터 객체 생성
    await user.save(); // 회원가입 데이터 객체를 저장한다.
    res.status(201).json({ message: "회원가입을 성공하였습니다" }); // 성공 응답
  } catch (error) {
    next(error); // 오류 발생 시 다음 미들웨어로 전달
  }
};
