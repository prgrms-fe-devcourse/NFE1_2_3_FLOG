import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

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
    throw new Error('잘못된 사용자 ID입니다.');
  }

  // 비밀번호 확인
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('잘못된 비밀번호입니다.');
  }

  // JWT 토큰 생성
  const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  return token;
};