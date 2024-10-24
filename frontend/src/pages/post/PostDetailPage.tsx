import PostComments from "../../features/posts/postdetail/PostComments";
import PostFooter from "../../features/posts/postdetail/PostFooter";
import PostHeader from "../../features/posts/postdetail/PostHeader";
import PostItem from "../../features/posts/postdetail/PostItem";
import styled from "styled-components";

const PostDetailPage = () => {
  const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    // background-color: #cccccc;
    width: 864px;
    margin-top: 50px;
  `;
  return (
    <div>
      <header>공통 컴포넌트</header>
      <Box>
        <PostHeader></PostHeader>
        <PostItem></PostItem>
        <PostFooter></PostFooter>
        <PostComments></PostComments>
      </Box>
    </div>
  );
};

export default PostDetailPage;
