import { IUser } from "./../../models/userModel";
// backend/src/types/express/index.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // 사용자 정보 타입 확장
    }
  }
}
