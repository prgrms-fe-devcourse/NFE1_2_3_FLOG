import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/detail" element={<div>디테일페이지</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/signin"
          element={<div>로그인 페이지입니다 (수정 예정)</div>}
        />
      </Routes>
    </div>
  );
}

export default App;
