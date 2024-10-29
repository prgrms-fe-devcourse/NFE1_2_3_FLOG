import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const ImageBox = styled.label`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f8f8f8;
  cursor: pointer;
  font-size: 24px;
  color: #aaa;
  
  & input {
    display: none;
  }
`;

const DescriptionInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// Interface for Curation data
interface CurationData {
  title: string;
  images: File[];
  description: string;
}

const CurationSubmissionPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState('');

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((image, index) => formData.append(`image${index}`, image));

    try {
      await axios.post('/api/curations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('큐레이션이 성공적으로 제출되었습니다.');
    } catch (error) {
      console.error('큐레이션 제출 중 오류 발생:', error);
      alert('큐레이션 제출에 실패했습니다.');
    }
  };

  return (
    <Container>

      {/* 제목 입력 */}
      <TitleInput
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 사진 업로드 */}
      <ImageUploadWrapper>
        {[0, 1, 2].map((index) => (
          <ImageBox key={index}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
            {images[index] ? (
              <img src={URL.createObjectURL(images[index])} alt="큐레이션 이미지" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span>+</span>
            )}
          </ImageBox>
        ))}
      </ImageUploadWrapper>

      {/* 한 줄 설명 입력 */}
      <DescriptionInput
        type="text"
        placeholder="20자 이내로 작성하세요"
        maxLength={20}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* 제출 버튼 */}
      <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
    </Container>
  );
};

export default CurationSubmissionPage;
