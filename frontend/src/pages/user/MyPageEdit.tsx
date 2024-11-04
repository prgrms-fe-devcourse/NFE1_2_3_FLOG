import { useEffect, useState } from "react";
import styled from "styled-components";
import MyPageHeader from "../../features/mypage/MyPageHeader";
import AddImage from "../../features/mypage/AddImage";
import axios from "axios";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 864px;
  margin-top: 50px;
`;

const Button = styled.button`
  color: #000000;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  line-height: 1.5;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  color: #7d7d7d;
  padding: 5px;
`;

const MyPageEdit = () => {
  const [blogName, setBlogName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [lifeItems, setLifeItems] = useState(["", "", ""]); // Initialize as an array
  const [profileImage, setProfileImage] = useState("");
  const [lifetimeItem, setLifetimeItem] = useState({
    brandName: "",
    productName: "",
    description: "",
    photoUrl: "",
  });

  const userId = localStorage.getItem("Id");

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result); // base64 문자열로 설정
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 아이템 이미지 업로드 핸들러
  const handleItemImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setLifetimeItem((prevItem) => ({
        ...prevItem,
        photoUrl: reader.result, // 아이템 이미지를 base64 문자열로 설정
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );

        const user = response.data;

        setBlogName(user.blogName || "블로그 이름을 입력하세요");
        setNickname(user.nickname || "닉네임을 입력하세요");
        setIntroduction(user.bio || "소개를 입력하세요");
        setProfileImage(user.profileImage || "");

        // Ensure lifeItems is set correctly
        if (user.lifetimeItem) {
          setLifeItems([
            user.lifetimeItem.brandName || "브랜드 이름을 입력하세요",
            user.lifetimeItem.productName || "아이템 이름을 입력하세요",
            user.lifetimeItem.description || "아이템을 소개해주세요",
          ]);
          setLifetimeItem({
            brandName: user.lifetimeItem.brandName,
            productName: user.lifetimeItem.productName,
            description: user.lifetimeItem.description,
            photoUrl: user.lifetimeItem.photoUrl || "",
          });
        } else {
          setLifeItems([
            "브랜드 이름을 입력하세요",
            "아이템 이름을 입력하세요",
            "아이템을 소개해주세요",
          ]);
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
    const profileData = {
      blogName,
      nickname,
      bio: introduction,
      profileImage, // 프로필 이미지 URL 추가
      lifetimeItem: {
        brandName: lifeItems[0],
        productName: lifeItems[1],
        description: lifeItems[2],
        photoUrl: lifetimeItem.photoUrl, // photoUrl 추가
      },
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/edit`,
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("프로필이 성공적으로 업데이트되었습니다.");
      } else {
        alert("프로필 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
    }
  };

  return (
    <Box>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3> 내 프로필 수정</h3>
      </div>
      <AddImage
        isUpload={!!profileImage}
        onChangeUpload={(isUpload) =>
          setProfileImage(isUpload ? profileImage : "")
        }
        onChangeImgDelete={() => setProfileImage("")}
        postImage={null}
        onChangeImage={handleImageUpload} // 파일 업로드 시 호출
        isProfile={true}
      />
      <div>
        <h3>블로그 이름</h3>
        <Input
          type="text"
          placeholder="블로그 이름"
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
        />
      </div>
      <div>
        <h3>닉네임</h3>
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />{" "}
      </div>
      <div>
        <h3>소개</h3>
        <Input
          type="text"
          placeholder="소개"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />{" "}
      </div>
      <div>
        <h3>인생템</h3>
        <div>
          {lifeItems.length === 0 ? (
            <p>인생템이 아직 없어요!</p>
          ) : (
            lifeItems.map((item, index) => (
              <Input
                key={index}
                type="text"
                placeholder={
                  index === 0
                    ? "브랜드 이름"
                    : index === 1
                      ? "아이템 이름"
                      : "아이템 설명"
                }
                value={item}
                onChange={(e) => {
                  const newLifeItems = [...lifeItems];
                  newLifeItems[index] = e.target.value;
                  setLifeItems(newLifeItems);
                }}
              />
            ))
          )}
        </div>
        <AddImage
          isUpload={!!lifetimeItem.photoUrl}
          onChangeUpload={(isUpload) => {
            if (!isUpload) {
              setLifetimeItem((prevItem) => ({
                ...prevItem,
                photoUrl: "", // 아이템 이미지 삭제 시 초기화
              }));
            }
          }}
          onChangeImgDelete={() =>
            setLifetimeItem((prevItem) => ({
              ...prevItem,
              photoUrl: "", // 아이템 이미지 삭제 시 초기화
            }))
          }
          postImage={null}
          onChangeImage={handleItemImageUpload} // 아이템 이미지 핸들러 호출
          isProfile={false} // 또는 필요에 따라 설정
        />
      </div>

      <Button onClick={handleUpdateProfile}>수정 완료</Button>
    </Box>
  );
};

export default MyPageEdit;
