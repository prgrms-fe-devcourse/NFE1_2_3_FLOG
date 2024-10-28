import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import usePostCreateStore from "./PostCreateStore";

const pink = "#F9F4F4";
const black = "#212529";
const gray = "#7D7D7D";

const ButtonBox = styled.div`
  width: 1000px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 70px auto;
`;

const RightButtons = styled.div`
  width: 230px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: ${pink};
  border: 1px solid ${gray};
`;

const PostCreateButtons = () => {
  const navigate = useNavigate();
  const { data, setData } = usePostCreateStore();

  // 서버로 POST 요청하는 함수
  const postData = async () => {
    try {
      const res = await axios.post("api/posts/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // "출간하기" 버튼 클릭 시 status:"published" 상태로 전달
  const postCreateButton = () => {
    setData({ ...data, status: "published" });
    console.log(data);
    postData();
  };

  // "임시저장" 버튼 클릭 시 status:"draft" 상태로 전달
  const temporarySave = () => {
    setData({ ...data, status: "draft" });
    postData();
  };

  return (
    <ButtonBox>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        나가기
      </Button>
      <RightButtons>
        <Button
          onClick={() => {
            temporarySave();
          }}
        >
          임시저장
        </Button>
        <Button
          onClick={() => {
            postCreateButton();
            navigate("/"); // 추후에 마이페이지 or 상세페이지로 이동
          }}
        >
          출간하기
        </Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default PostCreateButtons;
