// backend/src/types/express/index.d.ts

import { IUser } from '../models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // 사용자 정보 타입 확장
    }
  }
}