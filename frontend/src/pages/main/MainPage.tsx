import styled from "styled-components";

import PostItem from "../../shared/components/postItem/PostItem";
import TopSearched from "../../shared/components/sidebar/TopSearched";
import RecommendPost from "../../shared/components/sidebar/RecommendPost";
import RecommendCuration from "../../shared/components/sidebar/RecommendCuration";
import Search from "../../shared/components/search/Search";
import Sort from "../../shared/components/search/Sort";

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 50px auto 0;
`;

const MainPostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const MainSideBar = styled.section`
  width: 309px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`;

const MainRightWrap = styled.section`
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: #7d7d7d;
    position: absolute;
    top: 30px;
    right: -65px;
  }
`;

const SearchSortWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const MainPage = () => {
  return (
    <main>
      <MainWrapper>
        <MainRightWrap>
          <SearchSortWrap>
            <Search />
            <Sort />
          </SearchSortWrap>
          <MainPostWrapper>
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </MainPostWrapper>
        </MainRightWrap>

        <MainSideBar>
          <TopSearched />
          <RecommendPost />
          <RecommendCuration />
        </MainSideBar>
      </MainWrapper>
    </main>
  );
};

export default MainPage;
