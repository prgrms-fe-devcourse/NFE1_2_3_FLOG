import { useRef } from "react";
import styled from "styled-components";

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
  direction: flex;
  width: 100px;
  height: 100px;
  border-radius: 50px;
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
  const editIcon = "/edit.svg";
  const testImg = "/testImg.png";

  const {
    isUpload,
    onChangeUpload,
    onChangeImgDelete,
    postImage,
    onChangeImage,
    isProfile,
  } = props;

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const handleAddImage = () => {
    imageInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    onChangeImage(null);
    onChangeUpload(false);
    onChangeImgDelete(true);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  const maxSize = 2 * 1024 * 1024; //파일 최대 크기
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0] || null;
    if (imgFile && imgFile.size > maxSize) {
      console.error(
        "이미지 크기가 2MB를 초과합니다. 다른 파일을 선택해주세요."
      );
      e.target.value = "";
      return;
    }

    if (imgFile) {
      onChangeImage(imgFile);
      onChangeUpload(true);
    }
  };
  return (
    <div className="add-image">
      <div className="add-image-container">
        <p className="add-image-name">{postImage?.name}</p>

        {isProfile ? (
          <ImageEditBox>
            <ImageBox src={testImg} alt={testImg}></ImageBox>
            <Button
              onClick={isUpload ? handleDeleteImage : handleAddImage}
              title={isUpload ? "사진삭제" : "사진추가"}
            >
              <img src={editIcon} alt="editIcon"></img>
            </Button>
          </ImageEditBox>
        ) : (
          <button
            onClick={isUpload ? handleDeleteImage : handleAddImage}
            title={isUpload ? "사진삭제" : "사진추가"}
          >
            이미지 업로드
          </button>
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
