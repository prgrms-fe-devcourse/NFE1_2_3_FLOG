import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
  max-width: 800px; // 전체 카드의 가로 너비 고정
  max-height: 140px; // 각 아이템의 최대 높이 고정
  overflow: hidden;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 제목, 날짜, 내용이 일정한 간격으로 배치되도록 설정
  height: 100%; // 부모 컨테이너에 맞춰 높이 고정
`;

const DateText = styled.p`
  color: #999;
  font-size: 12px;
  margin: 0;
  flex-shrink: 0; // 날짜의 위치 고정
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; // 긴 제목이 잘리지 않게 처리
  flex-shrink: 0; // 제목의 위치 고정
`;

const Preview = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0 10px 0;
  line-height: 1.2;
  max-height: 2.4em; // 텍스트 줄 수 제한 (2줄)
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
  margin-top: auto; // 아래쪽으로 고정
`;

const MetaItem = styled.span`
  margin-right: 10px;
`;

const ThumbnailWrapper = styled.div`
  width: 100px; // 썸네일의 고정 너비
  height: 100px; // 썸네일의 고정 높이
  margin-left: 20px;
  flex-shrink: 0; // 썸네일 위치 고정
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;
interface CurationItemProps {
  curationId: string;
  title: string;
  startDate: string;
  endDate: string;
  contentPreview: string;
  entries: string[];  // 출품 인원 수
  likes: string[];
  comments: string[];
  thumbnail: string;
}

const CurationItem = ({
    curationId,
    title,
    startDate,
    endDate,
    contentPreview,
    entries,
    likes,
    comments,
    thumbnail,
  }: CurationItemProps) => {
    const navigate = useNavigate();

    const stripHtmlTags = (html: string) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };    

  const handleItemClick = () => {
    navigate(`/curation/${curationId}`); // curationId 기반으로 상세 페이지 이동
  };

    return (
      <ItemContainer onClick={handleItemClick}>
        <TextContent>
          {/* 시작일 및 종료일 */}
          <DateText>{startDate} - {endDate}</DateText>
  
          {/* 큐레이션 제목 */}
          <Title>{title}</Title>
  
          {/* 내용 미리보기 */}
          <Preview>{stripHtmlTags(contentPreview)}</Preview>
  
          {/* 출품 인원, 좋아요, 댓글 수 */}
          <MetaInfo>
            <MetaItem>👥 {entries.length} 명</MetaItem>
            <MetaItem>❤️ {likes.length}</MetaItem>
            <MetaItem>💬 {comments.length}</MetaItem>
          </MetaInfo>
        </TextContent>
  
        {/* 썸네일 이미지 */}
        <ThumbnailWrapper>
          <Thumbnail src={thumbnail} alt={`${title} 썸네일`} />
        </ThumbnailWrapper>
      </ItemContainer>
    );
};

export default CurationItem;