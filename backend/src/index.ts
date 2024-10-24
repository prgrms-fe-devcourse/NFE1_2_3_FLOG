import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb"; // 기본값 설정

// 미들웨어
app.use(cors());
app.use(express.json());

// 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 작동 중입니다!");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB 연결 성공");
    // 서버 시작
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error("MongoDB 연결 실패:", err);
  });
