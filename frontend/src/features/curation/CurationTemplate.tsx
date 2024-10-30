import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Search from "../../shared/components/search/Search";
import Sort from "../../shared/components/search/Sort";
import CurationItem from "./CurationItem"; // CurationItem import

// Styled Components
const CurationTemplateWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 100px;
`;

const CurationTemplateRightWrap = styled.section`
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: #7d7d7d;
    position: absolute;
    top: 30px;
    right: -65px;
  }
`;

const SearchSortWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

interface CurationDataTypes {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  content: string;
  participantsCount: number;
  likes: string[];
  commentsCount: number;
  thumbnail: string;
}

const CurationTemplate = () => {
  const [curationList, setCurationList] = useState<CurationDataTypes[]>([]);
  const [sortType, setSortType] = useState('new');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [filters, setFilters] = useState({
    style: '전체',
    gender: '전체',
    age: '전체',
    searchQuery: ''
  });

  // 무한 스크롤을 위한 Ref
  const elementRef = useRef(null);

   // API에서 큐레이션 데이터를 가져오는 함수
   const fetchCurations = async (page: number, sortType: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/curations`, {
        params: {
          page,
          sortType,
          ...filters, // 필터 파라미터 포함
        },
      });
      const data = response.data.curations;

      // 추가할 데이터가 없으면 로딩 종료
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setCurationList((prev) => [...prev, ...data]);
        setPage(page + 1); // 다음 페이지로 증가
      }
    } catch (error) {
      console.error("큐레이션 데이터를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  // 인터섹션 옵저버 콜백 함수
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
        fetchCurations(page, sortType);
    }
  };

   // 정렬 방식 변경 시 큐레이션 리스트 초기화 후 재조회
   const onSortingCuration = (value: string) => {
    setSortType(value);
    setCurationList([]); // 기존 리스트 초기화
    setPage(1); // 페이지 번호 초기화
    setHasMore(true); // 로드 가능 상태로 변경
  };

  // 무한 스크롤 설정
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      threshold: 1,
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [onIntersection]);

  useEffect(() => {
    // 필터나 정렬이 변경될 때마다 초기화하고 새로 로드
    fetchCurations(1, sortType);
  }, [filters, sortType]);

  return (
    <div>
      <CurationTemplateRightWrap>
        <SearchSortWrap>
          {/* <Search /> */}
          <Sort onSortingPost={onSortingCuration} />
        </SearchSortWrap>
        <CurationTemplateWrapper>
          {curationList.map((curation) => (
            <CurationItem
              key={curation._id}
              curationId={curation._id} 
              title={curation.title}
              startDate={curation.startDate}
              endDate={curation.endDate}
              contentPreview={curation.content}
              participantsCount={curation.participantsCount}
              likes={curation.likes}
              commentsCount={curation.commentsCount}
              thumbnail={curation.thumbnail}
            />
          ))}
        </CurationTemplateWrapper>
      </CurationTemplateRightWrap>
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          새로운 큐레이션을 불러오는 중...
        </div>
      )}
    </div>
  );
};

export default CurationTemplate;
