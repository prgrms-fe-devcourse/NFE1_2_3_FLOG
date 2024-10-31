import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const CurationCreateEditPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSaveCuration = async () => {
    if (!title || !startDate || !endDate || !description) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/curations", {
        title,
        startDate,
        endDate,
        description,
      });
      if (response.data.success) {
        alert("큐레이션이 성공적으로 생성되었습니다.");
        navigate("/curations"); // 큐레이션 목록 페이지로 이동
      } else {
        alert("큐레이션 생성 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("큐레이션 생성 오류:", error);
      alert("큐레이션 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Title>큐레이션 생성</Title>
      <Label>제목</Label>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="큐레이션 제목을 입력하세요"
      />
      
      <Label>시작 날짜</Label>
      <Input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <Label>종료 날짜</Label>
      <Input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <Label>설명</Label>
      <TextArea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="큐레이션 설명을 입력하세요"
      />

      <Button onClick={handleSaveCuration}>저장</Button>
    </Container>
  );
};

export default CurationCreateEditPage;
