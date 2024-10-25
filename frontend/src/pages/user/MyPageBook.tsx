import styled from "styled-components";
import MyPageHeader from "../../features/mypage/MyPageHeader";
import PostItem from "../../shared/components/postItem/PostItem";
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

const MyPageBook = () => {
  //해당 마이페이지의 유저가 북마크 한 글만
  return (
    <div>
      <MyPageHeader />
      <Box>
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </Box>
    </div>
  );
};

export default MyPageBook;
