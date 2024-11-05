import styled from "styled-components";
import SearchIcon from '../asset/Search.svg'
import CategoryModal from "../categoryModal/CategoryModal";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchCurationsProps {
    onUpdateFilters: (newFilters: { style: string; gender: string; age: string; searchQuery: string }) => void;
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

const SearchCurations:  React.FC<SearchCurationsProps> = ({ onUpdateFilters }) => {
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<KeywordTypes>({
    gender: [],
    age: [],
    style: []
  });
  const [searchValue, setSearchValue] = useState('');

  // 카테고리 모달 핸들러
  const handleModal = () => setModalStatus(true);

  // 모달 닫기
  const onModal = () => setModalStatus(false);

  // 검색 폼 제출 핸들러
  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    // 최소 2글자 이상 입력 확인
    if (!searchValue || searchValue.length <= 2) {
      return alert('검색어는 최소 두 글자 이상 입력해주세요');
    }

    let searchString = `/search/curations/?query=${searchValue}`;

    // URL에 필터링 조건 추가
    if (selectedCategories.gender.length) {
      searchString += `&gender=${selectedCategories.gender.join(",")}`;
    }
    if (selectedCategories.age.length) {
      searchString += `&age=${selectedCategories.age.join(",")}`;
    }
    if (selectedCategories.style.length) {
      searchString += `&style=${selectedCategories.style.join(",")}`;
    }

    // 설정된 URL로 이동
    navigate(searchString);
  };

  // 선택된 카테고리 업데이트
  const onEditKeyword = (key: keyof KeywordTypes, value: string[]) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <form onSubmit={handleForm}>
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
        {modalStatus && (
          <CategoryModal
            onModal={onModal}
            onEditKeyword={onEditKeyword}
            selectedCategories={selectedCategories}
          />
        )}
      </SearchInputWrap>
    </form>
  );
};

export default SearchCurations;
