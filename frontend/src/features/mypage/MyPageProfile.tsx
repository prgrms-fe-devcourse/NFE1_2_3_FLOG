import styled from "styled-components";
import UserInfo from "./UserInfo";

const MyPageProfile = () => {
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
    background-color: #cccccc;
    cursor: pointer;
    width: 410px;
    height: 70px;
    border-radius: 10px;
  `;
  const MoveText = styled.p`
    font-size: 18px;
    font-weight: bold;
  `;
  return (
    <div>
      <UserInfo />
      <FollowBox>
        <Button>
          <p>0</p>팔로워
        </Button>
        <Button>
          <p>0</p>팔로우
        </Button>
      </FollowBox>
      <MoveBox>
        <MoveButton>
          <MoveText>내가 작성한 글</MoveText>
        </MoveButton>
        <MoveButton>
          <MoveText>북마크</MoveText>
        </MoveButton>
      </MoveBox>
      <Hr />
    </div>
  );
};
export default MyPageProfile;
