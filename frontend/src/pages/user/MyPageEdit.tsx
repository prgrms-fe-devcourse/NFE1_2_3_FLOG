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
  const [lifeItems, setLifeItems] = useState(["", "", ""]);

  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchData = async () => {
      console.log("User ID:", userId);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );

        const user = response.data;

        setBlogName(user.blogName || "블로그 이름을 입력하세요");
        setNickname(user.nickname || "닉네임을 입력하세요");
        setIntroduction(user.bio || "소개를 입력하세요");
        setLifeItems(
          user.lifetimeItem
            ? [
                `${user.lifetimeItem.brandName}`,
                `${user.lifetimeItem.productName}`,
                `${user.lifetimeItem.description}`,
              ]
            : [
                "브랜드 이름을 입력하세요",
                "아이템 이름을 입력하세요",
                "아이템을 소개해주세요",
              ]
        );
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
      lifetimeItem: {
        brandName: lifeItems[0],
        productName: lifeItems[1],
        description: lifeItems[2],
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
        alert("프로필 업데이트에 실패했습니다: " + response.data.message);
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <MyPageHeader />
      <Box>
        <AddImage
          isUpload={false}
          onChangeUpload={false}
          onChangeImgDelete={false}
          postImage={null}
          onChangeImage={null}
          isProfile={true}
        />
        <div>
          <h3>블로그 이름</h3>
          <Input
            placeholder={blogName}
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
          />
        </div>
        <div>
          <h3>닉네임</h3>
          <Input
            placeholder={nickname}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div>
          <h3>소개</h3>
          <Input
            placeholder={introduction}
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </div>
        <div>
          <h3>인생템</h3>
          <div>
            {lifeItems.map((item, index) => (
              <Input
                key={index}
                placeholder={item || `인생템 ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const newLifeItems = [...lifeItems];
                  newLifeItems[index] = e.target.value;
                  setLifeItems(newLifeItems);
                }}
              />
            ))}
            <AddImage
              isUpload={false}
              onChangeUpload={false}
              onChangeImgDelete={false}
              postImage={null}
              onChangeImage={null}
              isProfile={false}
            />
          </div>
        </div>
        <Button onClick={handleUpdateProfile}>수정 완료</Button>
      </Box>
    </div>
  );
};

export default MyPageEdit;
