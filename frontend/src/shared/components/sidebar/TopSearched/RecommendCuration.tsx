import styled from "styled-components";

const RecommendCurationTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

const RecommendCurationWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;

  margin-top: 20px;
`;

const RecommendCurationHeader = styled.p`
  font-size: 14px;
  color: #212529;
  margin: 0;
  
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const RecommendCuration = () => {
  return (
    <div style={{ width: '100%' }}>
      {/* 추천 큐레스트 타이틀 */}
      <RecommendCurationTitle>
        추천 큐레스트
      </RecommendCurationTitle>

      {/* 추천 큐레스트 래퍼 */}
      <RecommendCurationWrap>
        {/* 추천 큐레스트 목록 */}
        <RecommendCurationHeader>
          코디랑 관련한 큐레스트임 이응
        </RecommendCurationHeader>

        {/* 추천 큐레스트 목록 */}
        <RecommendCurationHeader>
          이 큐레스트 참여해도 좋고 투표해도 좋고 ㄱㄱrrrrrrrrrrrrrrrrrrrrrrrrrr
        </RecommendCurationHeader>

        {/* 추천 큐레스트 목록 */}
        <RecommendCurationHeader>
          큐레스트 큐레스트 큐레스트 아파트 아파트
        </RecommendCurationHeader>
      </RecommendCurationWrap>
    </div>
  );
};

export default RecommendCuration;