import { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import editIcon from "/edit.svg";
import testImg from "/testImg.png";

const Button = styled.button`
  position: absolute;
  color: #7d7d7d;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  left: 53%;
  bottom: 5%;
`;

const ImageEditBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 864px;
`;

const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

interface AddImageProps {
  isUpload: boolean;
  onChangeUpload: (isUpload: boolean) => void;
  onChangeImgDelete: (isImgDelete: boolean) => void;
  postImage: File | null;
  onChangeImage: (postImage: File | null) => void;
  isProfile?: boolean;
}

const AddImage = (props: AddImageProps) => {
  const {
    isUpload,
    onChangeUpload,
    onChangeImgDelete,
    postImage,
    onChangeImage,
    isProfile,
  } = props;

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(testImg);

  const handleAddImage = () => {
    imageInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    onChangeImage(null);
    onChangeUpload(false);
    onChangeImgDelete(true);
    setPreviewImage(testImg); // 기본 이미지로 재설정
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const maxSize = 2 * 1024 * 1024; // 파일 최대 크기

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0] || null;
    if (imgFile && imgFile.size > maxSize) {
      console.error(
        "이미지 크기가 2MB를 초과합니다. 다른 파일을 선택해주세요."
      );
      e.target.value = "";
      return;
    }

    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String); // 업로드할 이미지 미리보기

        try {
          const response = await axios.post(
            "http://localhost:5000/api/users/profile/upload",
            {
              profileImage: base64String,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.data.success) {
            const photoUrl = response.data.photoUrl;
            onChangeImage(imgFile); // 로컬 상태 업데이트
            onChangeUpload(true);
          } else {
            console.error("프로필 사진 업로드 실패:", response.data.message);
          }
        } catch (error) {
          console.error("프로필 사진 업로드 중 오류 발생:", error);
        }
      };
      reader.readAsDataURL(imgFile);
    }
  };

  return (
    <div className="add-image">
      <div className="add-image-container">
        <p className="add-image-name">{postImage?.name}</p>

        {isProfile ? (
          <ImageEditBox>
            <ImageBox src={previewImage} alt="profile image" />

            <Button
              onClick={isUpload ? handleDeleteImage : handleAddImage}
              title={isUpload ? "사진삭제" : "사진추가"}
            >
              <img src={editIcon} alt="edit icon" />
            </Button>
          </ImageEditBox>
        ) : (
          <Button
            onClick={isUpload ? handleDeleteImage : handleAddImage}
            title={isUpload ? "사진삭제" : "사진추가"}
            style={{
              position: "relative",
              marginLeft: "-454px",
              marginBottom: "80px",
            }}
          >
            인생템 이미지 업로드
          </Button>
        )}
        <input
          type="file"
          ref={imageInputRef}
          accept="image/*"
          onChange={handleChangeImage}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default AddImage;
