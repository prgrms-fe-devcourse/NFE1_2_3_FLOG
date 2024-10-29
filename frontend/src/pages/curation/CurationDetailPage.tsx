import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterItem = styled.span`
  font-size: 14px;
  color: #666;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DateRange = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 40px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

interface ICuration {
  title: string;
  startDate: string;
  endDate: string;
  content: string[];
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
}

// CurationDetailPage Component
const CurationDetailPage = (): JSX.Element => {
  const { curationId } = useParams<{ curationId: string }>();
  const [curation, setCuration] = useState<ICuration | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuration = async () => {
      if (!curationId) return;  // curationId가 없으면 API 호출 중단
  
      try {
        const response = await axios.get(`http://localhost:5000/api/curations/${curationId}`);
        setCuration(response.data.curation);
      } catch (error) {
        console.error('큐레이션 데이터를 불러오지 못했습니다.', error);
      }
    };
  
    fetchCuration();
  }, [curationId]);

  const handleSubmitClick = () => {
    // 큐레이션 제출 페이지로 이동
    navigate(`/curation/submit`);
  };
  
  if (!curation) {
    return <p>큐레이션 정보를 불러오는 중입니다...</p>;
  }

  return (
    <Container>
      {/* 필터 정보 */}
      <Filters>
        <FilterItem>Gender: {curation.genderFilter.join(', ')}</FilterItem>
        <FilterItem>Age: {curation.ageFilter.join(', ')}</FilterItem>
        <FilterItem>Style: {curation.styleFilter.join(', ')}</FilterItem>
      </Filters>

      {/* 큐레이션 제목 */}
      <Title>{curation.title}</Title>

      {/* 큐레이션 기간 */}
      <DateRange>
        {new Date(curation.startDate).toLocaleDateString()} - {new Date(curation.endDate).toLocaleDateString()}
      </DateRange>

      {/* 큐레이션 본문 */}
      <Content>
        {curation.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Content>

      {/* 큐레이션 제출 버튼 */}
      <SubmitButton onClick={handleSubmitClick}>큐레이션 제출</SubmitButton>
    </Container>
  );
};

export default CurationDetailPage;
