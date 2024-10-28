import styled from "styled-components";

import { curationData } from "./mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CurationTypes {
  _id: string
  title: string
  adminId: string
  thumbnail: string
  startDate: string
  endDate: string
  content: string[]
  tags: string[]
  likes: string[]
  comments: string[]
  entries: string[]
  createdAt: string
  updatedAt: string
  status: string
  genderFilter: string[]
  ageFilter: string[]
  styleFilter: string[]
}

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

  const [curationList, setCurationList] = useState<CurationTypes[] | null>(null)

  useEffect(() => {
    const copyCurationList = [...curationData];
    const slicedCurationList = copyCurationList.slice(0, 3)

    return () => {
      setCurationList([...slicedCurationList])
    }
  }, [])

  return (
    <div style={{ width: "100%" }}>
      {/* 추천 큐레스트 타이틀 */}
      <RecommendCurationTitle>추천 큐레스트</RecommendCurationTitle>

      {/* 추천 큐레스트 래퍼 */}
      <RecommendCurationWrap>
        {
          curationList && curationList.map((curation) => {
            return (
              <Link to={`/curation/${curation._id}`} key={curation._id}>
                <RecommendCurationHeader>
                  { curation.title }
                </RecommendCurationHeader>
              </Link>
            )
          })
        }
      </RecommendCurationWrap>
    </div>
  );
};

export default RecommendCuration;
