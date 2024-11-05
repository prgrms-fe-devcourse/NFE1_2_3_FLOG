import React from "react";
import SignupPage from "../pages/auth/SignupPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import SearchResultsPage from "../pages/main/SearchResultsPage";
import Header from "../shared/components/header/Header";
import StorePromotionPage from "../pages/promotion/StorePromotionPage";
import EventSchedulePage from "../pages/event/EventSchedulePage";
import SigninPage from "../pages/auth/SigninPage";
import PostCreatePage from "../pages/post/PostCreatePage";
import PostEditPage from "../pages/post/PostEditPage";
import PostDetailPage from "../pages/post/PostDetailPage";
import MyPage from "../pages/user/MyPage";
import MyPageEdit from "../pages/user/MyPageEdit";
import MyPageFollow from "../pages/user/MyPageFollow";
import MyPageBook from "../pages/user/MyPageBook";
import MyPagePost from "../pages/user/MyPagePost";
import CurationPage from "../pages/curation/CurationPage";
import SearchCurationsPage from "../pages/curation/SearchCurationsPage"; 
import CurationDetailPage from "../pages/curation/CurationDetailPage";
import CurationSubmissionPage from "../pages/curation/CurationSubmissionPage";
import CurationCreateEditPage from "../pages/curation/CurationCreateEditPage";
import CurationDraftListPage from "../pages/curation/CurationDraftListPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:postId" element={<PostDetailPage />} />
        <Route path="/search/posts" element={<SearchResultsPage />} />
        <Route path="/event" element={<EventSchedulePage />} />
        <Route path="/promotion" element={<StorePromotionPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/post/edit" element={<PostEditPage />} />
        <Route path="/user/:userId" element={<MyPage />}></Route>
        <Route path="/user/:userId/follow" element={<MyPageFollow />}></Route>
        <Route path="/user/:userId/bookmark" element={<MyPageBook />}></Route>
        <Route path="/user/:userId/post" element={<MyPagePost />}></Route>
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/curations" element={<CurationPage />} />
        <Route path="/search/curations" element={<SearchCurationsPage />} />
        <Route path="/curation/:curationId" element={<CurationDetailPage />} />
        <Route path="/curation/:curationId/submit" element={<CurationSubmissionPage />} />
        <Route path="/curation/create" element={<CurationCreateEditPage />} />
        <Route path="/curations/drafts/:adminId" element={<CurationDraftListPage />} />

        {/* 404페이지는 항상 맨 아래에 작성해야합니다. - 최하위에 위치하도록 해주세요. */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
