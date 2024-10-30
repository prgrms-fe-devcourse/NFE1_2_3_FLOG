import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
`;

const TextContent = styled.div`
  flex: 1;
`;

const DateText = styled.p`
  color: #999;
  font-size: 12px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 5px 0;
`;

const Preview = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  color: #999;
  font-size: 12px;
`;

const MetaItem = styled.span`
  margin-right: 10px;
`;

const ThumbnailWrapper = styled.div`
  margin-left: 20px;
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
  participantsCount: number;  // 출품 인원 수
  likes: string[];
  commentsCount: number;
  thumbnail: string;
}

const CurationItem = ({
    curationId,
    title,
    startDate,
    endDate,
    contentPreview,
    participantsCount,
    likes,
    commentsCount,
    thumbnail,
  }: CurationItemProps) => {
    const navigate = useNavigate();

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
          <Preview>{contentPreview}</Preview>
  
          {/* 출품 인원, 좋아요, 댓글 수 */}
          <MetaInfo>
            <MetaItem>👥 {participantsCount} 명</MetaItem>
            <MetaItem>❤️ {likes.length}</MetaItem>
            <MetaItem>💬 {commentsCount}</MetaItem>
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