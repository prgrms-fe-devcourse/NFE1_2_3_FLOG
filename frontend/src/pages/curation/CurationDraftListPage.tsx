import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import CurationItem from '../../features/curation/CurationItem'; 
import { useParams } from 'react-router-dom';

// Styled Components
const CurationDraftWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 100px;
`;

const DraftListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface CurationDataTypes {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  content: string;
  entries: string[];
  likes: string[];
  comments: string[];
  thumbnail: string;
  status: string;
}

const CurationDraftListPage: React.FC = () => {
  const { adminId } = useParams<{ adminId: string }>();
  const [draftList, setDraftList] = useState<CurationDataTypes[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // 무한 스크롤을 위한 Ref
  const elementRef = useRef<HTMLDivElement | null>(null);

  // API에서 임시저장된 큐레이션 데이터를 가져오는 함수
  const fetchDraftCurations = async (page: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/curations`, {
        params: {
          page,
          pageSize,
          status: 'draft',
          adminId,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = response.data.curations;

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setDraftList((prev) => {
          const uniqueData = data.filter(
            (newItem: CurationDataTypes) => !prev.some((prevItem: CurationDataTypes) => prevItem._id === newItem._id)
          );
          return [...prev, ...uniqueData];
        });
        setPage(page + 1);
      }
    } catch (err) {
      const error = err as AxiosError; 
      console.error('임시저장된 큐레이션 데이터를 불러오는 중 오류가 발생했습니다.', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태 코드:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        console.error('요청 정보:', error.request);
      } else {
        console.error('에러 메시지:', error.message);
      }
    }
  };

  // 인터섹션 옵저버 콜백 함수
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      fetchDraftCurations(page);
    }
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
  }, [onIntersection, hasMore]);

  useEffect(() => {
    fetchDraftCurations(1);
  }, []);

  return (
    <DraftListWrapper>
      <CurationDraftWrapper>
        {draftList.map((curation) => (
          <CurationItem
            key={curation._id}
            curationId={curation._id}
            title={curation.title}
            startDate={curation.startDate}
            endDate={curation.endDate}
            contentPreview={curation.content}
            entries={curation.entries}
            likes={curation.likes}
            comments={curation.comments}
            thumbnail={curation.thumbnail}
          />
        ))}
      </CurationDraftWrapper>
      {hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          더 많은 임시저장된 큐레이션을 불러오는 중...
        </div>
      )}
    </DraftListWrapper>
  );
};

export default CurationDraftListPage;
