import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import SearchResultsPage from "../pages/main/SearchResultsPage";
import Header from "../shared/components/header/Header";
import StorePromotionPage from "../pages/promotion/StorePromotionPage";
import EventSchedulePage from "../pages/event/EventSchedulePage";
import SigninPage from "../pages/auth/SigninPage";
import PostCreateEditPage from "../pages/post/PostCreateEditPage";
import PostDetailPage from "../pages/post/PostDetailPage";
import MyPage from "../pages/user/MyPage";
import MyPageEdit from "../pages/user/MyPageEdit";
import MyPageFollow from "../pages/user/MyPageFollow";
import MyPageBook from "../pages/user/MyPageBook";
import MyPagePost from "../pages/user/MyPagePost";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<PostDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/event" element={<EventSchedulePage />} />
        <Route path="/promotion" element={<StorePromotionPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/post/create" element={<PostCreateEditPage />} />
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
