import styled from "styled-components";

import SearchIcon from '../asset/Search.svg'
import CategoryModal from "../categoryModal/CategoryModal";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface KeywordTypes {
  gender: string
  age: string
  style: string
}

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

  const navigate = useNavigate();

  // 카테고리 모달 상태 관리
  const [modalStatus, setModalStatus] = useState(false);
  const [keyword, setKeyword] = useState<KeywordTypes>({
    gender: '',
    age: '',
    style: ''
  })
  const [searchValue, setSearchValue] = useState('');

  // 카테고리 모달 핸들 함수
  const handleModal = () => {
    setModalStatus(true)
  }

  // 카테고리 모달 props 함수
  const onModal = () => {
    setModalStatus(false)
  }

  // 폼 이벤트 (검색) 함수
  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search/?${searchValue}`)
  }

  const onEditKeyword = (key: keyof KeywordTypes, value: string) => {
    setKeyword((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    console.log(keyword)
  }, [keyword])

  return (
    <form onSubmit={(e) => handleForm(e)}>
      <SearchInputWrap>
        <SearchInputInner>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchButton type="submit">
            <img src={SearchIcon} alt="검색 아이콘" />
          </SearchButton>
        </SearchInputInner>
        <SearchCategory onClick={handleModal}>카테고리 설정</SearchCategory>
        {
          modalStatus
          ? <CategoryModal onModal={onModal} onEditKeyword={onEditKeyword}/>
          : null
        }
      </SearchInputWrap>
    </form>
  );
};

export default Search;