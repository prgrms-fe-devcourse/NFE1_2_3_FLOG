import { useEffect, useState } from "react";
import styled from "styled-components";
import AddImage from "../../features/mypage/AddImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const ImagePreview = styled.div`
  position: relative;
  margin-top: -90px;
  margin-left: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const DeleteButton = styled.button`
  color: #7d7d7d;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 20px;
  font-size: 16px;
`;

const MyPageEdit = () => {
  const navigate = useNavigate();
  const [blogName, setBlogName] = useState("");
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [lifetimeItem, setLifetimeItem] = useState({
    brandName: "",
    productName: "",
    description: "",
    photoUrl: "",
  });

  const [lifetimeItemPreview, setLifetimeItemPreview] = useState<string>("");

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
      setLifetimeItemPreview(reader.result as string); // base64 문자열로 미리보기 이미지 설정
      setLifetimeItem((prevItem) => ({
        ...prevItem,
        photoUrl: reader.result, // 아이템 이미지를 base64 문자열로 설정
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 함수
  const handleItemImageDelete = () => {
    setLifetimeItemPreview(""); // 미리보기 이미지 삭제
    setLifetimeItem((prevItem) => ({
      ...prevItem,
      photoUrl: "", // 아이템 이미지 삭제
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );

        const user = response.data;

        setBlogName(user.blogName || "");
        setNickname(user.nickname || "");
        setIntroduction(user.bio || "");
        setProfileImage(user.profileImage || "");

        if (user.lifetimeItem) {
          setLifetimeItem({
            brandName: user.lifetimeItem.brandName || "",
            productName: user.lifetimeItem.productName || "",
            description: user.lifetimeItem.description || "",
            photoUrl: user.lifetimeItem.photoUrl || "",
          });
          setLifetimeItemPreview(user.lifetimeItem.photoUrl || ""); // 기존 아이템 이미지 URL 설정
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleUpdateProfile = async () => {
    if (
      lifetimeItem.brandName === "" ||
      lifetimeItem.productName === "" ||
      lifetimeItem.description === ""
    ) {
      alert("브랜드 이름, 아이템 이름, 아이템 설명을 모두 입력해 주세요.");
      return;
    }
    const token = localStorage.getItem("token");
    const profileData = {
      blogName,
      nickname,
      bio: introduction,
      profileImage, // 프로필 이미지 URL 추가
      lifetimeItem, // lifetimeItem 객체를 바로 보냄
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
        navigate(-1);
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
          setProfileImage(isUpload ? "profileImage" : "")
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
        />
      </div>
      <div>
        <h3>소개</h3>
        <Input
          type="text"
          placeholder="소개"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </div>
      <div>
        <h3>인생템</h3>
        <Input
          type="text"
          placeholder="브랜드 이름"
          value={lifetimeItem.brandName}
          onChange={(e) =>
            setLifetimeItem({ ...lifetimeItem, brandName: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="아이템 이름"
          value={lifetimeItem.productName}
          onChange={(e) =>
            setLifetimeItem({ ...lifetimeItem, productName: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="아이템 설명"
          value={lifetimeItem.description}
          onChange={(e) =>
            setLifetimeItem({ ...lifetimeItem, description: e.target.value })
          }
        />
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

        {/* 이미지 미리보기 및 삭제 버튼 */}
        {lifetimeItemPreview && (
          <ImagePreview>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0px",
              }}
            >
              <ImageBox src={lifetimeItemPreview} alt="lifetime item preview" />
              <DeleteButton onClick={handleItemImageDelete}>
                이미지 삭제
              </DeleteButton>{" "}
            </div>{" "}
          </ImagePreview>
        )}
      </div>

      <Button onClick={handleUpdateProfile}>수정 완료</Button>
    </Box>
  );
};

export default MyPageEdit;
