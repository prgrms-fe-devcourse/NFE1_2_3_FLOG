import PostCreateTitle from "../../features/posts/postcreateedit/PostCreateTitle";
import PostCreateTag from "../../features/posts/postcreateedit/PostCreateTag";
import PostCreateCategory from "../../features/posts/postcreateedit/PostCreateCategory";
import PostCreateEditor from "../../features/posts/postcreateedit/PostCreateEditor";
import PostCreateButtons from "../../features/posts/postcreateedit/PostCreateButtons";
import styled from "styled-components";

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

const PostCreateEditPage = () => {
  // PostCreateTitle : 제목을 입력받기 위한 인풋창
  // PostCreateTag : 태그를 입력받기 위한 인풋창
  //
  return (
    <PostCreateContent>
      <PostCreateTitle />
      <TagCategoryBox>
        <PostCreateTag />
        <PostCreateCategory />
      </TagCategoryBox>
      <PostCreateEditor />
      <PostCreateButtons />
    </PostCreateContent>
  );
};

export default PostCreateEditPage;
