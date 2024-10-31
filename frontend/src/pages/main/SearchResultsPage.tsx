import styled from "styled-components";
import PostItem from "../../shared/components/postItem/PostItem";
import SearchIcon from "./asset/BlackSearch.svg";
import CategoryModal from "../../shared/components/categoryModal/CategoryModal";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface KeywordTypes {
  gender: string
  age: string
  style: string
}
interface PostDataTypes {
  _id: string;
  title: string;
  authorId: {
    _id: string;
    nickname: string;
    userId: string;
    profileImage?: string;
  };
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

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SearchResultsPage = () => {

  const location = useLocation();
  const query = useQuery();
  const navigate = useNavigate();

  // 카테고리 모달 상태 관리
  const [modalStatus, setModalStatus] = useState(false);

  // 렌더링할 포스트 리스트 저장
  const [postList, setPostList] = useState<PostDataTypes[]>([]);

  // 재 검색을 위한 포스트 타입 저장
  const [postType, setPostType] = useState(query.get('postType'));

  // 검색 키워드 카테고리에서 따로 설정한거 저장 (초기값은 쿼리에서)
  const [keyword, setKeyword] = useState<KeywordTypes>({
    age: query.get('age') || '',
    gender: query.get('gender') || '',
    style: query.get('style') || ''
  })

  // 검색창 인풋 onchange하면 받는 값
  const [searchValue, setSearchValue] = useState('')

  // 카테고리 모달 핸들 함수
  const handleModal = () => {
    setModalStatus(true);
  };

  // 카테고리 모달 props 함수
  const onModal = () => {
    setModalStatus(false);
  };

  // 키워드 지정
  const onEditKeyword = (key: keyof KeywordTypes, value: string) => {
    setKeyword((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // 검색 기능 함수
  const loadData = async (queryString: string, genderString: string, ageString: string, styleString: string) => {
    try {
      const response = await axios.get<{ posts: PostDataTypes[] }>('http://localhost:5000/search/posts', {
        params: {
          query: queryString,
          gender: genderString,
          age: ageString,
          style: styleString,
          postType: postType
        }
      });
      setPostList(response.data.posts)
    } catch (err) {
      console.error("API 호출 에러", err)
    }
  }

  // 재 검색 기능 함수 (FormEvent)
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPostList([]);
    loadData(searchValue, keyword.gender, keyword.age, keyword.style)

    // URL 재설정
    let searchUrl = '/search/posts/'
    searchUrl += `?query=${searchValue}`;
    if (keyword.gender && keyword.gender !== '') { searchUrl += `&gender=${keyword.gender}` }
    if (keyword.age) { searchUrl += `&age=${keyword.age}` }
    if (keyword.style) { searchUrl += `&style=${keyword.style}` }
    searchUrl += `&postType=${postType}`
    navigate(searchUrl)
  }

  // 검색한 쿼리 기반 데이터 로드
  useEffect(() => {
    return () => {
      if (query.get('query')) {
        loadData(query.get('query')!, query.get('gender')!, query.get('age')!, query.get('style')!)
      }
    }
  }, []);

  return (
    <SearchResultsPageWrap>
      {/* 상단 검색창 폼 */}
      <form onSubmit={(e) => handleSearchSubmit(e)}>
        <SearchResultSearchWrap>
          {/* 상단 검색창 인풋 */}
          <SearchResultsPageInput
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setSearchValue(e.target.value)}
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
        {
          modalStatus
          ? <CategoryModal onModal={onModal} onEditKeyword={onEditKeyword} />
          : null
        }
      </form>
      <SearchResultListWrap>
        {
          postList && postList.length !== 0 ? postList.map((post) => {
            return <PostItem post={post} key={post._id} />;
          })
          : <div>검색결과가 없습니다.</div>
        }
      </SearchResultListWrap>
    </SearchResultsPageWrap>
  );
};

export default SearchResultsPage;
