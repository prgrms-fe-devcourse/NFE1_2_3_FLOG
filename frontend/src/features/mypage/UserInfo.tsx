import styled from "styled-components";
import testImg from "/testImg.png";
import settingIcon from "/setting.svg";
import { useNavigate } from "react-router-dom";
import userIcon from "/userIcon.svg";

const Button = styled.button`
  display: flex;
  align-items: center;
  color: #7d7d7d;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;
const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const UserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ece7e7;
  border-radius: 10px;
  height: 150px;
  padding-left: 30px;
  padding-right: 30px;
  gap: 30px;
`;

type UserInfoProps = {
  isFollow: boolean;
  nickname: string;
  bio: string;
  profileImage: string;
};
const UserInfo = ({
  isFollow = false,
  nickname,
  bio,
  profileImage,
}: UserInfoProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <UserInfoBox>
        <div>
          <ImageBox
            src={profileImage === "기본" ? userIcon : profileImage}
            alt={"Profile"}
          ></ImageBox>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "90%" }}
        >
          <div
            style={{
              display: "flex",
              width: "674px",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>{nickname}</h2>
            {isFollow && (
              <Button onClick={() => navigate("/mypage/edit")}>
                <img src={settingIcon} alt="settingIcon"></img>
              </Button>
            )}
            {!isFollow && <Button>팔로우</Button>}
          </div>
          <div>
            <p style={{ margin: "0px" }}>{bio}</p>
          </div>
        </div>
      </UserInfoBox>
    </div>
  );
};
export default UserInfo;
