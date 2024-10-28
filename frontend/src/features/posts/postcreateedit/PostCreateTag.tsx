import React from "react";
import styled from "styled-components";

const InputTag = styled.input`
  display: flex;
  width: 600px;
  height: 100%;
  border-width: 0;
`;

const PostCreateTag = () => {
  return <InputTag placeholder="#태그명 형태로 태그를 작성해주세요"></InputTag>;
};

export default PostCreateTag;
