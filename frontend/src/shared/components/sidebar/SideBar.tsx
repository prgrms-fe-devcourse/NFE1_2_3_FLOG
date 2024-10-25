import styled from "styled-components";
import TopSearched from "./TopSearched";
import RecommendPost from "./RecommendPost";
import RecommendCuration from "./RecommendCuration";

const SideBarWrap = styled.section`
  width: 309px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 70px;
`;

const SideBar = () => {
  return (
    <SideBarWrap>
      <TopSearched />
      <RecommendPost />
      <RecommendCuration />
    </SideBarWrap>
  );
};

export default SideBar;