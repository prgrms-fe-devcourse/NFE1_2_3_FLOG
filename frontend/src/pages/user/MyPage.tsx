import styled from "styled-components";
import MyPageItem from "../../features/mypage/MyPageItem";
import MyPageProfile from "../../features/mypage/MyPageProfile";
import MyPageAuth from "../../features/mypage/MyPageAuth";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
`;

const LOGINNED_ID = localStorage.getItem("Id");
type LifetimeItemType = {
  brandName: string;
  productName: string;
  description: string;
  photoUrl: string;
};

type ProfileDataType = {
  bio: string;
  userId: string;
  nickname: string;
  blogName: string;
  followers: string[];
  following: string[];
  posts: string[];
  profileImage: string;
  bookmarkedPosts: string[];
  points: number;
  lifetimeItem: LifetimeItemType;
  Id: string;
} | null;

const MyPage = () => {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState<ProfileDataType>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );
        setProfileData(response.data);
        // followers 배열에 USER_ID가 포함되어 있는지 확인
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);
  //내 페이지인지 다른 유저 페이지인지 확인하는 로직 필요
  const mypage = userId === LOGINNED_ID;
  console.log(profileData?.bookmarkedPosts);
  return (
    <div>
      <div
        style={{ display: "flex", marginTop: "50px", justifyContent: "center" }}
      >
        <h3 style={{ margin: "0px" }}>
          {profileData?.blogName || "아직 블로그 이름이 없어요!"}
        </h3>
      </div>
      <Box>
        <MyPageProfile
          Id={profileData?.Id || ""}
          authorId={profileData?.userId || ""}
          isFollow={mypage}
          followers={profileData?.followers || []}
          following={profileData?.following || []}
          nickname={profileData?.nickname || ""}
          bio={profileData?.bio || "아직 블로그 소개가 없어요!"}
          profileImage={profileData?.profileImage || "기본"}
          post={profileData?.posts || []}
          bookmark={profileData?.bookmarkedPosts || []}
        />
        <MyPageItem lifetimeItem={profileData?.lifetimeItem || undefined} />
        {mypage && <MyPageAuth Id={profileData?.Id} />}
      </Box>
    </div>
  );
};

export default MyPage;
