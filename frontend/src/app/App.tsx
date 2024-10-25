import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import PostDetailPage from "../pages/post/PostDetailPage";
import MyPage from "../pages/user/MyPage";
import MyPageEdit from "../pages/user/MyPageEdit";
import MyPageFollow from "../pages/user/MyPageFollow";
import MyPageBook from "../pages/user/MyPageBook";
import MyPagePost from "../pages/user/MyPagePost";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/detail" element={<PostDetailPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage/edit" element={<MyPageEdit />}></Route>
        <Route path="/mypage/follow" element={<MyPageFollow />}></Route>
        <Route path="/mypage/book" element={<MyPageBook />}></Route>
        <Route path="/mypage/post" element={<MyPagePost />}></Route>
      </Routes>
    </div>
  );
}

export default App;
