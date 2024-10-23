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

// 회원가입 라우트 - 재현 =======================================================
interface IUser {
  id: string;
  password: string;
  nickname: string;
}

const exDB: IUser[] = [
  {
    id: "test1234",
    password: "test1234!",
    nickname: "테스트",
  },
];

app.post("/api/users/signup", (req, res) => {
  const { id, password, nickname } = req.body;
  let [_id, token] = [1234, 4567]; // 더미 데이터 -> 변경 예정!!!!!!!!!!!!!!!1
  // 데이터 누락 없는지 확인하는 코드
  if (!id || !password || !nickname) {
    res
      .status(400)
      .send({ message: "[id, password, nickname] 필수 입력 사항입니다." });
  }

  function validation(id: string, password: string, nickname: string): void {
    // 유효성 검사 하는 코드 (예정)
    // ID 유효성 검사
    const idRegex = /^[a-zA-Z0-9]{8,16}$/;
    const validId = idRegex.test(id);

    // PW 유효성 검사
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`])[a-zA-Z\d!@#$%^&*()_+\-={}\[\]:;"'<>,.?/~`]{8,16}$/;
    const validPassword = passwordRegex.test(password);

    // Nickname 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,16}$/;
    const validNickname = nicknameRegex.test(nickname);
    if (validId && validPassword && validNickname) {
      res.send({ userId: _id, token: token });
    } else {
      res.send("message : 유효성 검사에서 실패하였습니다.");
    }
  }
  validation(id, password, nickname);

  // DB에 중복된 아이디가 없는지 확인하는 코드
  const user = exDB.find((user: IUser) => user.id === id);

  // 문제가 있다면 400으로 응답  // 문제가 없다면 success
  if (user) {
    res.status(400).send({ message: "이미 존재하는 아이디입니다" });
    return;
  } else {
    exDB.push(req.body);
    res.send({ message: "회원가입이 완료 되었습니다" });
  }
});

// ===============================================================================

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
