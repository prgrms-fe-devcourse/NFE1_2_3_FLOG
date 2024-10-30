import React, { useState } from "react";
import styled from "styled-components";
import CategoryModal from "../../../shared/components/categoryModal/CategoryModal";

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
  cursor: pointer;
`;

const PostCreateCategory = () => {
  const [onMadal, setOnModal] = useState(false);

  const onEditKeyword = () => {};
  return (
    <div>
      <CategoryButton>카테고리</CategoryButton>
      <CategoryModal onMadal={onMadal}></CategoryModal>
    </div>
  );
};

export default PostCreateCategory;
