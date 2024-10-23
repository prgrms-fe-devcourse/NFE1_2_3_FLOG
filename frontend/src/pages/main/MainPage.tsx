import styled from "styled-components";
import PostItem from "../../shared/components/postItem/PostItem";
import TopSearched from "../../shared/components/TopSearched/TopSearched";

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 0 auto;
`

const MainPostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`

const MainSideBar = styled.section`
  width: 309px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`

const MainPage = () => {
  return (
    <main>
      <MainWrapper>
        <MainPostWrapper>
          <PostItem />
        </MainPostWrapper>

        <MainSideBar>
          <TopSearched></TopSearched>
        </MainSideBar>
      </MainWrapper>
    </main>
  );
};

export default MainPage;