import styled from "styled-components";
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
  const bookmark = location.state?.bookmark;

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <h2> 북마크</h2>
      </div>
      <Box>
        {bookmark && bookmark.length !== 0 ? (
          bookmark.map((bookmark: any) => {
            return <PostItem post={bookmark} key={bookmark._id} />;
          })
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            아직 북마크 한 글이 없습니다.
          </div>
        )}
      </Box>
    </div>
  );
};

export default MyPagePost;
