import styled from "styled-components";

interface RankColor {
  isTopRank: number
}

const TopSearchedTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TopSearchedTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`

const TopSearchedText = styled.p`
  font-size: 14px;
  color: #212529;
`

const TopSearchedChart = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  flex-direction: column;
  margin-top: 20px;
`

const TopSearchedKeywordWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  &:not(:first-child) {
    margin-top: 20px;
  }
`

const TopSearchedRank = styled.div<RankColor>`
  color: ${ ({isTopRank}) => isTopRank <= 3 ? '#ff0303' : '#212529' };
`

const TopSearched = () => {
  return (
    <div style={{ width: '100%' }}>
      {/* 인기 검색어 상단 */}
      <TopSearchedTopWrapper>
        <TopSearchedTitle>인기 검색어</TopSearchedTitle>
        <TopSearchedText>10.20.18:50 기준</TopSearchedText>
      </TopSearchedTopWrapper>
      {/* 인기 검색어 리스트 */}
      <TopSearchedChart>
        <TopSearchedText>
          {/* 인기 검색어 */}
          <TopSearchedKeywordWrap>
            <TopSearchedRank isTopRank={1}>1</TopSearchedRank>
            <span>후드티</span>
          </TopSearchedKeywordWrap>

          <TopSearchedKeywordWrap>
            <TopSearchedRank isTopRank={2}>2</TopSearchedRank>
            <span>맨투맨</span>
          </TopSearchedKeywordWrap>

          <TopSearchedKeywordWrap>
            <TopSearchedRank isTopRank={3}>3</TopSearchedRank>
            <span>무신사 스탠다드</span>
          </TopSearchedKeywordWrap>

          <TopSearchedKeywordWrap>
            <TopSearchedRank isTopRank={4}>4</TopSearchedRank>
            <span>니트</span>
          </TopSearchedKeywordWrap>
          
          <TopSearchedKeywordWrap>
            <TopSearchedRank isTopRank={5}>5</TopSearchedRank>
            <span>바람막이</span>
          </TopSearchedKeywordWrap>
        </TopSearchedText>
      </TopSearchedChart>
    </div>
  );
};

export default TopSearched;