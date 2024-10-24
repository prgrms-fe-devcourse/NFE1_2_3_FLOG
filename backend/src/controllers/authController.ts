import { Request, Response } from 'express';
import { createAdmin as createAdminService, login as loginService } from '../services/authService';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const newAdmin = await createAdminService(req.body);
    res.status(201).json({ success: true, admin: newAdmin });
  } catch (error: unknown) {  // error의 타입을 unknown으로 명시
    if (error instanceof Error) {
      // error가 Error 객체일 경우
      res.status(500).json({ success: false, message: error.message });
    } else {
      // 알 수 없는 에러 처리
      res.status(500).json({ success: false, message: '관리자 생성 중 알 수 없는 오류가 발생했습니다.' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  try {
    console.log('Login Request Body:', req.body);  // 로그인 요청 데이터 로그
    const token = await loginService(userId, password);
    console.log('Login successful, token:', token);  // 로그인 성공 시 토큰 로그
    res.status(200).json({ success: true, token });
  } catch (error: unknown) {  // error의 타입을 unknown으로 명시
    if (error instanceof Error) {
      // error가 Error 객체일 경우
      console.error('Login Error:', error);  // 에러 객체 로그
      res.status(400).json({ success: false, message: error.message });
    } else {
      // 알 수 없는 에러 처리
      console.error('Unknown Error during login:', error);  // 알 수 없는 에러 로그
      res.status(400).json({ success: false, message: '로그인 중 알 수 없는 오류가 발생했습니다.' });
    }
  }
};
