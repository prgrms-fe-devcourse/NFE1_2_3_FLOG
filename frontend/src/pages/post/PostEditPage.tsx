import PostEditTitle from "../../features/posts/postedit/PostEditTitle";
import PostEditTag from "../../features/posts/postedit/PostEditTag";
import PostEditCategory from "../../features/posts/postedit/PostEditCategory";
import PostEditEditor from "../../features/posts/postedit/PostEditEditor";
import usePostEditStore from "../../features/posts/postedit/usePostEditStore";
import PostEditButtons from "../../features/posts/postedit/PostEditButtons";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";

// 가운데 정렬을 하기 위한 css 코드
const PostCreateContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

// <PostCreateTag>와 <PostCreateCategory>를 한줄로 정렬하기 위한 css코드
const TagCategoryBox = styled.div`
  width: 1000px;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 5px;
  justify-content: space-between;
  align-items: center;
`;
const PostEditPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const { data, setData } = usePostEditStore();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        const respondedData = res.data.post;
        setData({
          title: respondedData.title,
          content: respondedData.content[0],
          thumbnail: respondedData.thumbanil,
          tags: respondedData.tags,
          genderFilter: respondedData.genderFilter,
          ageFilter: respondedData.ageFilter,
          styleFilter: respondedData.styleFilter,
          postType: respondedData.postType,
          status: "published",
        });
        console.log(respondedData.content);
        console.log("PostEditPage:", data);
      } catch (err) {
        console.error(err);
      }
    };
    getPost();
  }, [postId, setData]);

  return (
    <PostCreateContent>
      <PostEditTitle />
      <TagCategoryBox>
        <PostEditTag />
        <PostEditCategory />
      </TagCategoryBox>
      <PostEditEditor />
      <PostEditButtons postId={postId} />
    </PostCreateContent>
  );
};

export default React.memo(PostEditPage);
