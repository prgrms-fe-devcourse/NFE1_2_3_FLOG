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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 토글 함수
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onEditKeyword = () => {};
  return (
    <div>
      {/* 카테고리 버튼 클릭 시 모달이 열림 */}
      <CategoryButton onClick={toggleModal}>카테고리</CategoryButton>
      {isModalOpen && (
        <CategoryModal onModal={toggleModal} onEditKeyword={onEditKeyword} />
      )}
    </div>
  );
};

export default PostCreateCategory;
