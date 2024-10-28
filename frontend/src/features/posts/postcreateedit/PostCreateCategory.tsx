import React from "react";
import styled from "styled-components";

const black = "#212529";
const gray = "#7D7D7D";

const CategoryButton = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid ${gray};
  border-radius: 5px;
`;

const PostCreateCategory = () => {
  return <CategoryButton>카테고리</CategoryButton>;
};

export default PostCreateCategory;
