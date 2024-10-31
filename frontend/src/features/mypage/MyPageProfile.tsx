import styled from "styled-components";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";

const Hr = styled.hr`
  border: none;
  height: 0.1px;
  background: #cccccc;
  margin-top: 50px;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  color: #212529;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;
const FollowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const MoveBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MoveButton = styled.button`
  align-items: center;
  color: #212529;
  font-size: 14px;
  border: none;
  background-color: #ece7e7;
  cursor: pointer;
  width: 410px;
  height: 70px;
  border-radius: 10px;
`;
const MoveText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

type ProfileProps = {
  Id: string;
  followers: string[];
  following: string[];
  nickname: string;
  bio: string;
  profileImage: string;
  isFollow: boolean;
  authorId: string;
};

const MyPageProfile = ({
  Id,
  isFollow,
  followers,
  following,
  nickname,
  bio,
  profileImage,
  authorId,
}: ProfileProps) => {
  const navigate = useNavigate();
  console.log(following);
  return (
    <div>
      <UserInfo
        isFollow={isFollow}
        nickname={nickname}
        bio={bio}
        profileImage={profileImage}
        followers={followers}
        authorId={authorId}
      />
      <FollowBox>
        {" "}
        <Button
          onClick={() =>
            navigate(`/user/${Id}/follow`, { state: { followers } })
          }
        >
          <p>{followers.length}</p>팔로워
        </Button>
        <Button
          onClick={() =>
            navigate(`/user/${authorId}/follow`, { state: { following } })
          }
        >
          {" "}
          <p>{following.length}</p>팔로우
        </Button>
      </FollowBox>
      <MoveBox>
        <MoveButton onClick={() => navigate("post")}>
          <MoveText>포스트</MoveText>
        </MoveButton>
        <MoveButton onClick={() => navigate("book")}>
          <MoveText>북마크</MoveText>
        </MoveButton>
      </MoveBox>
      <Hr />
    </div>
  );
};
export default MyPageProfile;
