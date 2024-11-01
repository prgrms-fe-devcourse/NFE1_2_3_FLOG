import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import curationRoutes from "./routes/curationRoutes"; // 큐레이션 라우트 임포트
import authRoutes from "./routes/authRoutes"; // 인증 라우트 임포트
import entryRoutes from "./routes/entryRoutes"; // 출품작 관련 라우트 임포트
import postRoutes from "./routes/postRoutes"; //포스트 상세 관련 라우트
import commentRoutes from "./routes/commentRoutes"; //댓글 관련 라우트
import userRoutes from "./routes/userRoutes"; //마이페이지 관련 라우트
import followRoutes from "./routes/followRoutes";
import searchRoutes from "./routes/searchRoutes"; //검색 관련 라우트
import notificationRoutes from './routes/notificationRoutes' //알림 관련 라우트
import setupWebSocket from "./socket/setupWebSocket";

// 환경변수 로드
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb"; // 기본값 설정
const server = http.createServer(app); // WebSocket 서버 생성

// 웹 소켓 서버 기본설정과 연결
const wss = setupWebSocket(server)

// 미들웨어
app.use(cors());
app.use(express.json());

// 기본 라우트 (테스트용)
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 작동 중입니다!");
});

// 큐레이션 관련 라우트 추가
app.use("/", curationRoutes); // '/api/curations' 경로로 큐레이션 관련 라우트 등록

// 인증 관련 라우트 추가
app.use("/", authRoutes); // 인증 라우트 등록

// 큐레이션 출품작 관련 라우트 추가
app.use("/", entryRoutes); // '/api/curations/:curationId/entry' 등의 경로로 출품작 관련 라우트 등록

//포스트 관련 라우트 추가
app.use("/", postRoutes);

//댓글 관련 라우트 추가
app.use("/", commentRoutes);

app.use("/", userRoutes);

//팔로우 관련 라우트
app.use("/", followRoutes);
//검색 관련 라우트 추가
app.use('/', searchRoutes)

// 알림 관련 라우트 추가
app.use('/', notificationRoutes)

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

export { wss };