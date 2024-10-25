import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import SearchResultsPage from "../pages/main/SearchResultsPage";
import Header from "../shared/components/header/Header";
import StorePromotionPage from "../pages/promotion/StorePromotionPage";
import EventSchedulePage from "../pages/event/EventSchedulePage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail" element={<div>디테일페이지</div>} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/event" element={<EventSchedulePage />} />
        <Route path="/promotion" element={<StorePromotionPage />} />
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
