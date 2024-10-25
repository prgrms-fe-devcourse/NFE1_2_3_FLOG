import styled from "styled-components";
import PostItem from "../../shared/components/postItem/PostItem";
import SearchIcon from "./asset/BlackSearch.svg";
import CategoryModal from "../../shared/components/categoryModal/CategoryModal";
import { useState } from "react";
import { postData } from "../../shared/components/postItem/mockData";

interface PostDataTypes {
  _id: string;
  title: string;
  authorId: string;
  thumbnail: string;
  content: string[];
  tags: string[];
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  status: string;
  postType: string;
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
}

const SearchResultsPageWrap = styled.section`
  width: 997px;
  margin: 50px auto 0;
`;

const SearchResultSearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 20px 20px 36px;

  border: 1px solid #7d7d7d;
  border-radius: 20px;

  width: 100%;

  box-sizing: border-box;
`;

const SearchResultsPageInput = styled.input`
  appearance: none;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;

  font-size: 28px;
  color: #212529;
  letter-spacing: -0.025em;

  &::placeholder {
    color: #ccc;
  }
`;

const SearchResultsPageButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

const SearchResultSetCategoryText = styled.p`
  font-size: 14px;
  color: #7d7d7d;
  text-align: right;
  margin: 25px 35px 0 0;
  cursor: pointer;
`;

const SearchResultListWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

const SearchResultsPage = () => {
  // 카테고리 모달 상태 관리
  const [modalStatus, setModalStatus] = useState(false);

  const [postList, setPostList] = useState<PostDataTypes[]>(postData);

  // 카테고리 모달 핸들 함수
  const handleModal = () => {
    setModalStatus(true);
  };

  // 카테고리 모달 props 함수
  const onModal = () => {
    setModalStatus(false);
  };

  return (
    <SearchResultsPageWrap>
      {/* 상단 검색창 폼 */}
      <form>
        <SearchResultSearchWrap>
          {/* 상단 검색창 인풋 */}
          <SearchResultsPageInput
            type="text"
            placeholder="검색어를 입력해주세요"
          />

          {/* 상단 검색창 검색 버튼 */}
          <SearchResultsPageButton>
            <img src={SearchIcon} alt="검색" />
          </SearchResultsPageButton>
        </SearchResultSearchWrap>

        {/* 상단 검색창 카테고리 설정 */}
        <SearchResultSetCategoryText onClick={handleModal}>
          카테고리 설정
        </SearchResultSetCategoryText>
        {modalStatus ? <CategoryModal onModal={onModal} /> : null}
      </form>
      <SearchResultListWrap>
        {
          postList.map((post) => {
            return <PostItem post={post} key={post._id} />;
          })
        }
      </SearchResultListWrap>
    </SearchResultsPageWrap>
  );
};

export default SearchResultsPage;
