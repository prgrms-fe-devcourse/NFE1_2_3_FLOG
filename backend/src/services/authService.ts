// src/services/authService.ts
import User, { IUser } from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 사용자 등록 로직을 처리하는 서비스
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: IUser = req.body; // 요청 본문에서 사용자 데이터를 가져옴
    // 비밀번호 해싱 코드
    const hashedPassword = await bcrypt.hash(userData.password, 10); // salt rounds : 10회
    userData.password = hashedPassword;

    const user = new User(userData); // 회원가입 데이터 객체 생성
    await user.save(); // 회원가입 데이터 객체를 저장한다.

    res.status(201).json({ message: "회원가입을 성공하였습니다" }); // 성공 응답
  } catch (error) {
    next(error); // 오류 발생 시 다음 미들웨어로 전달
  }
};

// Admin 계정을 만드는 로직 - 민주님
export const createAdmin = async (userData: any) => {
  const { userId, password, nickname, profileImage, blogName, bio } = userData;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 관리자 유저 생성
  const newAdmin = await User.create({
    userId,
    password: hashedPassword,
    nickname,
    profileImage,
    blogName,
    bio,
    isAdmin: true, // 관리자로 설정
  });

  return newAdmin;
};

export const login = async (userId: string, password: string) => {
  // 사용자 확인
  const user = await User.findOne({ userId });
  if (!user) {
    throw new Error("잘못된 사용자 ID입니다.");
  }

  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("잘못된 비밀번호입니다.");
  }

  // JWT 토큰 생성
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: { _id: user._id, userId: user.userId, nickname: user.nickname },
  };
};
