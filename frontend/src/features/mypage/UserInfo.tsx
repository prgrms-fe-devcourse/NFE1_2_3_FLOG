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
  followers: { id: string }[]; // followers가 객체 배열이라고 가정합니다.
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
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null); // 초기 상태를 null로 설정해 로딩 상태 확인 가능

  useEffect(() => {
    const USER_ID = localStorage.getItem("Id");
    if (USER_ID) {
      setIsFollowing(followers.some((follower) => follower.userId === USER_ID));
    }
  }, [followers]);
  console.log(followers);
  const openNoTokenModal = () => {
    setIsTokenModalOpen(true);
  };
  const closeNoTokenModal = () => {
    setIsTokenModalOpen(false);
  };

  const clickFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        openNoTokenModal();
        return;
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
      // 팔로우 상태를 토글
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
              <Button onClick={clickFollow}>
                {isFollowing ? "팔로잉" : "팔로우"}
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
