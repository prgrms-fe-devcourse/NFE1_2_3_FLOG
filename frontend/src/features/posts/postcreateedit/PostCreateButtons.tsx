import React from "react";
import styled from "styled-components";

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
`;

const PostCreateButtons = () => {
  return (
    <ButtonBox>
      <Button>나가기</Button>
      <RightButtons>
        <Button>임시저장</Button>
        <Button>출간하기</Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default PostCreateButtons;
