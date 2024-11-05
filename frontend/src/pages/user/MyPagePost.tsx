import styled from "styled-components";
import MyPageHeader from "../../features/mypage/MyPageHeader";
import PostItem from "../../shared/components/postItem/PostItem";
import { useLocation } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
  gap: 30px;
`;

const MyPagePost = () => {
  const location = useLocation();
  const post = location.state?.post;
  console.log(JSON.stringify(post));
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <h2> 포스트</h2>
      </div>
      <Box>
        {post && post.length !== 0 ? (
          post.map((post: any) => {
            return <PostItem post={post} key={post._id} />;
          })
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            아직 작성한 글이 없습니다.
          </div>
        )}
      </Box>
    </div>
  );
};

export default MyPagePost;
