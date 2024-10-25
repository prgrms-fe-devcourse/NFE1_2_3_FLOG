import styled from "styled-components";
import testImg from "../../../public/testImg.png";
import settingIcon from "../../../public/setting.svg";
import { useNavigate } from "react-router-dom";

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
  background-color: #cccccc;
  border-radius: 10px;
  height: 150px;
  padding-left: 30px;
  padding-right: 30px;
  gap: 30px;
`;

const UserInfo = ({ isFollow = false }) => {
  const navigate = useNavigate();

  //내 페이지인지 다른 유저 페이지인지 확인하는 로직 필요
  const mypage = true;
  return (
    <div>
      <UserInfoBox>
        <div>
          <ImageBox src={testImg} alt={testImg}></ImageBox>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <h2>닉넴머하지</h2>
            {!isFollow && mypage && (
              <Button onClick={() => navigate("/mypage/edit")}>
                <img src={settingIcon} alt="settingIcon"></img>
              </Button>
            )}
            {isFollow && <Button>팔로우</Button>}
          </div>
          <div>
            <p style={{ margin: "0px" }}>
              소개소개소개소개 소개소개 소개소개 소개 소개소개소개 소개소개
              소개소개소개소개 소개소개 소개소개 소개 소개소개소개 소개소개
              소개소개소개소개 소개소개소개소개 소개소개 소개소개
              소개소개소개소개소개
            </p>
          </div>
        </div>
      </UserInfoBox>
    </div>
  );
};
export default UserInfo;
