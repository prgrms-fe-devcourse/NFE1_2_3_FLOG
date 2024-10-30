// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel"; // User 모델 import
import { IUser } from "../models/userModel";

// 회원가입 입력 검증 미들웨어
export const validateSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, password, passwordCheck, nickname } = req.body;
    const idRegex = /^[a-zA-Z0-9]{8,16}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`])[a-zA-Z\d!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]{8,16}$/;
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,16}$/;

    if (!idRegex.test(userId) || typeof userId !== "string") {
      res.status(400).json({ message: "userId가 올바르지 않습니다" });
      return; // 응답 후 함수 종료
    }

    // 중복된 아이디가 있는지 확인하는 코드
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      res.status(400).json({ message: "이미 존재하는 userId입니다." });
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
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "알 수 없는 오류가 발생했습니다",
      에러내용: `${error}`,
    });
  }
};

// 로그인 미들웨어 - 민주님
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Request 인터페이스 확장
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser & { _id: mongoose.Types.ObjectId }; // _id를 ObjectId로 설정
  }
}

interface DecodedToken {
  userId: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, message: "인증 토큰이 필요합니다." });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer <token> 형식에서 토큰 부분만 추출

  try {
    // 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret") as DecodedToken;

    // 데이터베이스에서 사용자 찾기
    const user = await User.findById(decoded.userId).select("-password"); // 비밀번호 제외
    if (!user) {
      res.status(401).json({ success: false, message: "유효하지 않은 사용자입니다." });
      return;
    }

    // req.user에 사용자 정보 추가, _id는 ObjectId 타입으로 지정
    req.user = {
      ...user.toObject(),
      _id: user._id, // ObjectId를 명확하게 포함
    } as IUser & { _id: mongoose.Types.ObjectId };

    next(); // 다음 미들웨어 또는 라우트로 이동
  } catch (error) {
    console.error("Authentication error:", error); // 에러 로깅
    res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다." });
  }
};

// 로그인 선택 미들웨어
export const authOptionalMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = undefined; // 비로그인 상태로 통과
    next();
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret"
    ) as DecodedToken;

    // user 타입을 IUser | null로 설정하여 타입 추론 명확히
const user: IUser | null = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "유효하지 않은 사용자입니다." });
      return;
    }

    req.user = {
      ...user.toObject(),
      _id: user._id, // ObjectId를 명확하게 포함
    } as IUser & { _id: mongoose.Types.ObjectId };

    next();
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "유효하지 않은 토큰입니다." });
  }
};
