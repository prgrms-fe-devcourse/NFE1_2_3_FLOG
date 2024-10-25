import PostComments from "../../features/posts/postdetail/PostComments";
import PostFooter from "../../features/posts/postdetail/PostFooter";
import PostHeader from "../../features/posts/postdetail/PostHeader";
import PostDetailText from "../../features/posts/postdetail/PostDetailText";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
`;

const PostDetailPage = () => {
  return (
    <div>
      <header>공통 컴포넌트</header>
      <Box>
        <PostHeader></PostHeader>
        <PostDetailText></PostDetailText>
        <PostFooter></PostFooter>
        <PostComments></PostComments>
      </Box>
    </div>
  );
};

export default PostDetailPage;
