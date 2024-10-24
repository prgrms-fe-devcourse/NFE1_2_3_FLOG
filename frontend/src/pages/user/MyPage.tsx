import styled from "styled-components";
import MyPageItem from "../../features/mypage/MyPageItem";
import MyPageProfile from "../../features/mypage/MyPageProfile";
import MyPageAuth from "../../features/mypage/MyPageAuth";

const MyPage = () => {
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
        <MyPageProfile />
        <MyPageItem />
        <MyPageAuth />
      </Box>
    </div>
  );
};

export default MyPage;
