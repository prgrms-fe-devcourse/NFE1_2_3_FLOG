import styled from "styled-components";
import Search from "../search/Search";
import Sort from "../search/Sort";
import PostItem from "../postItem/PostItem";

import { useState } from "react";

import { postData } from "../postItem/mockData";

interface PageTypes {
  pageType: "post"  | "promotion" | "event" 
}
interface PostDataTypes {
  _id: string
  title: string
  authorId: string
  thumbnail: string
  content: string[]
  tags: string[]
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
  status: string
  postType: string
  genderFilter: string[]
  ageFilter: string[]
  styleFilter: string[]
}

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

  const [postList, setPostList] = useState<PostDataTypes[]>(postData.slice(0, 2));

  return (
    <div>
      <PostTemplateRightWrap>
        <SearchSortWrap>
          <Search />
          <Sort />
        </SearchSortWrap>
        <PostTemplatePostWrapper>
          {
            postList.map((post) => {
              return (
                <PostItem post={post} key={post._id} />
              )
            })
          }
        </PostTemplatePostWrapper>
      </PostTemplateRightWrap>
    </div>
  );
};

export default PostTemplate;