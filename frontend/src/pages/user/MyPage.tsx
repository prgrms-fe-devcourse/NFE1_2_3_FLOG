import styled from "styled-components";
import MyPageItem from "../../features/mypage/MyPageItem";
import MyPageProfile from "../../features/mypage/MyPageProfile";
import MyPageAuth from "../../features/mypage/MyPageAuth";
import MyPageHeader from "../../features/mypage/MyPageHeader";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
`;

const MyPage = () => {
  //내 페이지인지 다른 유저 페이지인지 확인하는 로직 필요
  const mypage = true;

  return (
    <div>
      <MyPageHeader></MyPageHeader>
      <Box>
        <MyPageProfile />
        <MyPageItem />
        {mypage && <MyPageAuth />}
      </Box>
    </div>
  );
};

export default MyPage;
