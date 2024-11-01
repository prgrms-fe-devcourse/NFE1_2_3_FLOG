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
import CurationDetailPage from "../pages/curation/CurationDetailPage";
import CurationSubmissionPage from "../pages/curation/CurationSubmissionPage";
import CurationCreateEditPage from "../pages/curation/CurationCreateEditPage";

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
        {/* <Route path="/:userId/edit" element={<MyPageEdit />}></Route> */}
        <Route path="/user/:userId/follow" element={<MyPageFollow />}></Route>
        <Route path="/:userId/book" element={<MyPageBook />}></Route>
        <Route path="/user/:userId/post" element={<MyPagePost />}></Route>
        <Route path="/curations" element={<CurationPage />} />
        <Route path="/curation/:curationId" element={<CurationDetailPage />} />
        <Route path="/curation/submit" element={<CurationSubmissionPage />} />
        <Route path="/curation/create" element={<CurationCreateEditPage />} />
      </Routes>
    </div>
  );
}

export default App;
