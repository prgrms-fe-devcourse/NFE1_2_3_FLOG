import styled from "styled-components";
import settingIcon from "/setting.svg";
import { useNavigate } from "react-router-dom";
import userIcon from "/userIcon.svg";
import NoTokenModal from "../../shared/utils/noTokenModal";
import { useState, useEffect } from "react";
import axios from "axios";

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
  followers: string[];
  authorId: string;
};

const UserInfo = ({
  isFollow = false,
  nickname,
  bio,
  profileImage,
  followers,
  authorId,
}: UserInfoProps) => {
  const navigate = useNavigate();

  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const openNoTokenModal = () => {
    setIsTokenModalOpen(true);
  };
  const closeNoTokenModal = () => {
    setIsTokenModalOpen(false);
  };
  console.log(`ddddd${authorId}`);

  //팔로우 api
  const USER_ID = localStorage.getItem("userId");
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  // 팔로우 상태 확인
  useEffect(() => {
    if (followers) {
      setIsFollowing(followers.includes(USER_ID)); // 팔로우 목록에 authorId가 포함되어 있으면 true
    } else {
      setIsFollowing(false); // following이 없으면 false로 설정
    }
  }, [followers]);

  const clickFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        openNoTokenModal();
      }
      const response = await axios.post(
        `http://localhost:5000/api/follow/${authorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsFollowing((prev) => !prev);
      }
    } catch (error) {
      console.error("팔로우 토글 오류:", error);
    }
  };

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
            {!isFollow && (
              <Button onClick={() => clickFollow()}>
                {isFollowing ? "팔로우" : "팔로잉"}
              </Button>
            )}
          </div>
          <div>
            <p style={{ margin: "0px" }}>{bio}</p>
          </div>
        </div>
      </UserInfoBox>
      {isTokenModalOpen && <NoTokenModal onClose={closeNoTokenModal} />}
    </div>
  );
};
export default UserInfo;
