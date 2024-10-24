import styled from "styled-components";

import PostItem from "../../shared/components/postItem/PostItem";
import Search from "../../shared/components/search/Search";
import Sort from "../../shared/components/search/Sort";
import SideBar from "../../shared/components/sidebar/SideBar";
import PostTemplate from "../../shared/components/postTemplate/PostTemplate";

const MainWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1304px;
  margin: 50px auto 0;
`;

const MainPage = () => {
  return (
    <MainWrapper>
      <PostTemplate />
      <SideBar />
    </MainWrapper>
  );
};

export default MainPage;
