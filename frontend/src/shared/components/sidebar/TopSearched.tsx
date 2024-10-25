import styled from "styled-components";

import { searchData } from "./mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface RankColor {
  isTopRank: number;
}

interface TopSearchTypes {
  _id: string;
  query: string;
  searchCount: number;
  createdAt: string;
}

const TopSearchedTopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopSearchedTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
`;

const TopSearchedText = styled.p`
  font-size: 14px;
  color: #212529;
`;

const TopSearchedChart = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  flex-direction: column;
  margin-top: 20px;
`;

const TopSearchedKeywordWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const TopSearchedRank = styled.div<RankColor>`
  color: ${({ isTopRank }) => (isTopRank <= 3 ? "#ff0303" : "#212529")};
`;

const TopSearched = () => {
  const [searchList, setSearchList] = useState<TopSearchTypes[] | null>(null);

  // 인기 검색어 리스트 state에 return
  useEffect(() => {
    const copySearchData = [...searchData];
    const sortingData = copySearchData.sort((a, b) => {
      return b.searchCount - a.searchCount;
    });
    const slicedData = sortingData.slice(0, 5);

    return () => {
      if (searchList === null) {
        setSearchList(slicedData);
      }
    };
  }, [searchData]);

  return (
    <div style={{ width: "100%" }}>
      {/* 인기 검색어 상단 */}
      <TopSearchedTopWrapper>
        <TopSearchedTitle>인기 검색어</TopSearchedTitle>
        <TopSearchedText>10.20.18:50 기준</TopSearchedText>
      </TopSearchedTopWrapper>
      {/* 인기 검색어 리스트 */}
      <TopSearchedChart>
        <TopSearchedText>
          {/* 인기 검색어 */}
          {searchList &&
            searchList.map((search, index) => {
              return (
                <TopSearchedKeywordWrap>
                  <TopSearchedRank isTopRank={index + 1}>
                    {index + 1}
                  </TopSearchedRank>
                  <Link to={`/search/${search.query}`}>
                    <span>{search.query}</span>
                  </Link>
                </TopSearchedKeywordWrap>
              );
            })}
        </TopSearchedText>
      </TopSearchedChart>
    </div>
  );
};

export default TopSearched;
