import styled from "styled-components";
import MyPageHeader from "../../features/mypage/MyPageHeader";
import UserInfo from "../../features/mypage/UserInfo";
import { useState } from "react";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
`;

const FollowBox = styled.div`
  display: flex;
  width: 864;
  justify-content: center;
  height: 80px;
  margin-bottom: 50px;
`;

const Button = styled.button`
  border: none;
  font-weight: bold;
  background: none;
  cursor: pointer;
  font-size: 20px;
  width: 250px;
  border-bottom: 2px solid ${(props) => (props.active ? "#212529" : "#7d7d7d")};
  color: ${(props) => (props.active ? "#212529" : "#7d7d7d")};
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyPageFollow = ({ isFollow = true }) => {
  //부모 컴포넌트에서 isFollower 상태관리 해야 함
  const [isFollowActive, setIsFollowActive] = useState(isFollow);
  const [isFollowerOrIng, setIsFollowerOrIng] = useState("팔로워");

  return (
    <div>
      <MyPageHeader />
      <Box>
        <FollowBox>
          <Button
            active={isFollowerOrIng === "팔로워"}
            onClick={() => setIsFollowerOrIng("팔로워")}
          >
            팔로워
          </Button>
          <Button
            active={isFollowerOrIng === "팔로잉"}
            onClick={() => setIsFollowerOrIng("팔로잉")}
          >
            팔로잉
          </Button>
        </FollowBox>
        <UserInfoBox>
          {/* userinfo에 팔로워 누르면 팔로워 목록들 출력, 
          팔로잉 누르면 팔로잉 목록들로 필터링되도록 추가
          isFollowerOrIng로 관리
          */}
          <UserInfo isFollow={isFollowActive} />
          <UserInfo isFollow={isFollowActive} />
          <UserInfo isFollow={isFollowActive} />
          <UserInfo isFollow={isFollowActive} />
          <UserInfo isFollow={isFollowActive} />
        </UserInfoBox>
      </Box>
    </div>
  );
};

export default MyPageFollow;
