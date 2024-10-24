import styled from "styled-components";

import SearchIcon from '../asset/Search.svg'
import CategoryModal from "../categoryModal/CategoryModal";
import { useState } from "react";

const SearchInputWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const SearchInputInner = styled.div`
  width: 274px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #7d7d7d;
  border-radius: 10px;
  padding: 8px 10px;
`;

const SearchInput = styled.input`
  appearance: none;
  border: none;
  outline: none;

  font-size: 16px;
  font-weight: 400;
  color: #212529;

  &::placeholder {
    color: #ccc;
  }
`;

const SearchButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  width: auto;
  height: auto;
  padding: 0;
  background-color: transparent;
  & > img {
    display: block;
  }
`;

const SearchCategory = styled.p`
  font-size: 16px;
  color: #7d7d7d;
  cursor: pointer;
`;


const Search = () => {

  // 카테고리 모달 상태 관리
  const [modalStatus, setModalStatus] = useState(false);

  // 카테고리 모달 핸들 함수
  const handleModal = () => {
    setModalStatus(true)
  }

  // 카테고리 모달 props 함수
  const onModal = () => {
    setModalStatus(false)
  }

  return (
    <form>
      <SearchInputWrap>
        <SearchInputInner>
          <SearchInput type="text" placeholder="검색어를 입력해주세요" />
          <SearchButton type="submit">
            <img src={SearchIcon} alt="검색 아이콘" />
          </SearchButton>
        </SearchInputInner>
        <SearchCategory onClick={handleModal}>카테고리 설정</SearchCategory>
        {
          modalStatus
          ? <CategoryModal onModal={onModal} />
          : null
        }
      </SearchInputWrap>
    </form>
  );
};

export default Search;