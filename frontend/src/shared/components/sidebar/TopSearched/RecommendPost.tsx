import styled from "styled-components";

import Like from '../../asset/Like.svg'
import Comment from '../../asset/Comment.svg'

const RecommendPostTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

const RecommendPostWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const RecommendPostHeader = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: #212529;
  margin: 0;
`;

const RecommendPostDescription = styled.p`
  font-size: 12px;
  color: #7d7d7d;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;

  margin: 0;
`;

const RecommendPostInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RecommendPostText = styled.span`
  font-size: 10px;
  color: #7d7d7d;
`;

const RecommendPostButton = styled.button`
  appearance: none;
  width: 13px;
  height: auto;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  margin-right: 3px;
  & > img {
    width: 100%;
    display: block;
  }
`

const RecommendPost = () => {
  return (
    <div style={{ width: '100%' }}>
      {/* 추천 포스트 상단 */}
        <RecommendPostTitle>추천 포스트</RecommendPostTitle>

      {/* 인기 검색어 리스트 */}
      <RecommendPostWrap>

        {/* 추천 포스트 제목 */}
        <RecommendPostHeader>
          이거 읽ㅇ어보지않을래재밌을걸
        </RecommendPostHeader>

        {/* 추천 포스트 내용 */}
        <RecommendPostDescription>
          내요냉내열내ㅓㄹ너래누채ㅑ다ㅜ채ㅑ느ㅜㅊ냐ㅐ추ㅑ눝트챈추츠니ㅐㅓㅑ챠너ㅑ대ㅜ래ㅑㅈ루츠ㅏㄷ차재루츠ㅐ쟈이
        </RecommendPostDescription>

        {/* 추천 포스트 좋아요 & 댓글 & 작성시간 */}
        <RecommendPostInfo style={{ gap: '10px' }}>

          {/* 좋아요 */}
          <RecommendPostInfo className="like">
            <RecommendPostButton>
              <img src={Like} alt="좋아요 아이콘" />
            </RecommendPostButton>
            <RecommendPostText>33</RecommendPostText>
          </RecommendPostInfo>

          {/* 댓글 */}
          <RecommendPostInfo className="comment">
            <RecommendPostButton>
              <img src={Comment} alt="댓글 아이콘" />
            </RecommendPostButton>
            <RecommendPostText>33</RecommendPostText>
          </RecommendPostInfo>

          {/* 작성시간 */}
          <RecommendPostText>1일전</RecommendPostText>
        </RecommendPostInfo>
      </RecommendPostWrap>
      
    </div>
  );
};

export default RecommendPost;