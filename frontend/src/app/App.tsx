import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import SigninPage from "../pages/auth/SigninPage";
import PostCreateEditPage from "../pages/post/PostCreateEditPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/detail" element={<div>디테일페이지</div>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/post/create" element={<PostCreateEditPage />} />
      </Routes>
    </div>
  );
}

export default App;
