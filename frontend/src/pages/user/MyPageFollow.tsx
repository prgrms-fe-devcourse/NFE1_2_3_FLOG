import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userIcon from "/userIcon.svg";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 864px;
  margin-top: 50px;
`;

const ImageBox = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ece7e7;
  border-radius: 10px;
  height: 100px;
  padding-left: 30px;
  padding-right: 30px;
  gap: 30px;
  margin-bottom: 20px;
`;

const FollowBox = styled.div`
  display: flex;
  width: 864px;
  justify-content: center;
  height: 80px;
  margin-bottom: 50px;
`;

const Button = styled.button<{ active: boolean }>`
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

const NicknameButton = styled.button`
  background: none;
  border: none;
  color: #212529;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
  font-weight: bold;
`;

const MyPageFollow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tab, followers = [], following = [] } = location.state || {};

  const [isFollowerOrIng, setIsFollowerOrIng] = useState<string>(
    tab || "팔로워"
  );

  useEffect(() => {
    setIsFollowerOrIng(tab || "팔로워"); // 페이지 로드 시 tab 상태에 맞게 초기화
  }, [tab]);

  const handleNavigate = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div>
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
          {isFollowerOrIng === "팔로워" ? (
            followers.length > 0 ? (
              <ul>
                {followers.map((follower, index) => (
                  <UserInfo key={index}>
                    <ImageBox
                      src={follower.profileImage || userIcon}
                      alt={"Profile"}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        height: "50px",
                        width: "700px",
                        justifyContent: "center",
                      }}
                    >
                      <NicknameButton
                        onClick={() => handleNavigate(follower.userId)}
                      >
                        {follower.nickname}
                      </NicknameButton>
                      <div>{follower.bio}</div>
                    </div>
                  </UserInfo>
                ))}
              </ul>
            ) : (
              <p style={{ paddingLeft: "340px" }}>
                팔로워가 존재하지 않습니다.
              </p>
            )
          ) : following.length > 0 ? (
            <ul>
              {following.map((follow, index) => (
                <UserInfo key={index}>
                  <ImageBox
                    src={follow.profileImage || userIcon}
                    alt={"Profile"}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      height: "50px",
                      width: "700px",
                      justifyContent: "center",
                    }}
                  >
                    <NicknameButton
                      onClick={() => handleNavigate(follow.userId)}
                    >
                      {follow.nickname}
                    </NicknameButton>
                    <div>{follow.bio}</div>
                  </div>
                </UserInfo>
              ))}
            </ul>
          ) : (
            <p style={{ paddingLeft: "340px" }}>팔로잉이 존재하지 않습니다.</p>
          )}
        </UserInfoBox>
      </Box>
    </div>
  );
};

export default MyPageFollow;
