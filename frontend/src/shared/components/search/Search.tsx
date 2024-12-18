import styled from "styled-components";

import SearchIcon from '../asset/Search.svg'
import CategoryModal from "../categoryModal/CategoryModal";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchPropTypes {
  postType: "post"  | "promotion" | "event" 
}
interface KeywordTypes {
  gender: string[];
  age: string[];
  style: string[];
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


const Search: React.FC<SearchPropTypes> = ({ postType }) => {

  const navigate = useNavigate();

  // 카테고리 모달 상태 관리
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<KeywordTypes>({
    gender: [],
    age: [],
    style: []
  });
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

    // 최소 2글자 이상 검색
    if(!searchValue || searchValue.length <= 2) {
      return alert('검색어는 최소 두글자 이상 입력해주세요')
    }

    let searchString = `/search/posts/?query=${searchValue}`

    // URL 설정
    if (selectedCategories.gender.length) {
      searchString += `&gender=${selectedCategories.gender.join(",")}`;
    }
    if (selectedCategories.age.length) {
      searchString += `&age=${selectedCategories.age.join(",")}`;
    }
    if (selectedCategories.style.length) {
      searchString += `&style=${selectedCategories.style.join(",")}`;
    }
    if (postType) {
      searchString += `&postType=${postType}`;
    }
    navigate(searchString);
  };

  // 키워드 설정 함수
  const onEditKeyword = (key: keyof KeywordTypes, value: string[]) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: value
    }));
  };

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
          ? <CategoryModal onModal={onModal} onEditKeyword={onEditKeyword}  selectedCategories={selectedCategories} />
          : null
        }
      </SearchInputWrap>
    </form>
  );
};

export default Search;