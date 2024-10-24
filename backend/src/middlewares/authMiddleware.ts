import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel'; // User 모델 임포트

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ success: false, message: '인증 토큰이 필요합니다.' });
    return;
  }

  const token = authHeader.split(' ')[1];  // Bearer <token> 형식에서 토큰 부분만 추출

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret') as any;
    
    // 사용자 정보를 가져와 req.user에 추가
    User.findById(decoded.userId).then(user => {
      if (!user) {
        res.status(401).json({ success: false, message: '유효하지 않은 사용자입니다.' });
        return;
      }
      
      req.user = user;  // req.user에 사용자 정보 추가
      next();  // 다음 미들웨어 또는 라우트로 이동
    }).catch(err => {
      res.status(500).json({ success: false, message: '사용자 인증 중 오류가 발생했습니다.' });
    });
  } catch (err) {
    res.status(403).json({ success: false, message: '유효하지 않은 토큰입니다.' });
    return;
  }
};