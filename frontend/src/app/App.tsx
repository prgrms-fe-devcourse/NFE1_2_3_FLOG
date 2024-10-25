import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import SearchResultsPage from "../pages/main/SearchResultsPage";
import Header from "../shared/components/header/Header";
import StorePromotionPage from "../pages/promotion/StorePromotionPage";
import EventSchedulePage from "../pages/event/EventSchedulePage";
import SigninPage from "../pages/auth/SigninPage";

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
        <Route path="/signin" element={<SigninPage />} />
      </Routes>
    </div>
  );
}

export default App;
