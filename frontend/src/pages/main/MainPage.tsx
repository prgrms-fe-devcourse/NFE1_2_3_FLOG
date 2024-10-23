import styled from "styled-components";
import PostItem from "../../shared/components/postItem/PostItem";
import TopSearched from "../../shared/components/sidebar/TopSearched/TopSearched";
import RecommendPost from "../../shared/components/sidebar/TopSearched/RecommendPost";

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 0 auto;
`;

const MainPostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background-color: #393939;
    position: absolute;
    top: 30px;
    right: -65px;
  }
`;

const MainSideBar = styled.section`
  width: 309px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`;

const MainPage = () => {
  return (
    <main>
      <MainWrapper>
        <MainPostWrapper>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </MainPostWrapper>

        <MainSideBar>
          <TopSearched></TopSearched>
          <RecommendPost></RecommendPost>
        </MainSideBar>
      </MainWrapper>
    </main>
  );
};

export default MainPage;