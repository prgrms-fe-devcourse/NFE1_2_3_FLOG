import styled from "styled-components";
import Search from "../search/Search";
import Sort from "../search/Sort";
import PostItem from "../postItem/PostItem";

const PostTemplatePostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const PostTemplateRightWrap = styled.section`
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

const PostTemplate = () => {
  return (
    <div>
      <PostTemplateRightWrap>
        <SearchSortWrap>
          <Search />
          <Sort />
        </SearchSortWrap>
        <PostTemplatePostWrapper>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </PostTemplatePostWrapper>
      </PostTemplateRightWrap>
    </div>
  );
};

export default PostTemplate;