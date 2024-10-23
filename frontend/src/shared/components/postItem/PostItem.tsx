import styled from "styled-components";

import Like from '../asset/Like.svg'
import Comment from '../asset/Comment.svg'

const baseCss = {
  width: '864px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end'
}

const PostWrap = styled.div`
  width: 673px;
`

const PostPreview = styled.div`
  width: 167px;
  height: 141px;
`

const PostFlexStartWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 8px auto 0;
`

const PostDescription = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;

  font-size: 16px;
  font-weight: 400;
  color: #212529;
  letter-spacing: -0.025em;
  line-height: 1.4;

  margin: 20px auto 0;
`

const PostButton = styled.button`
  appearance: none;
  width: auto;
  height: auto;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  margin-right: 5px;
`

const PostInfoText = styled.span`
  font-size: 14px;
  color: #7d7d7d;
`

const PostItem = () => {
  return (
    // 링크로 대체 예정
    <div style={baseCss}>
      <PostWrap>
        {/* 링크로 대체 예정 */}
        <div>
          <PostFlexStartWrap>
            <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ddd'}}></div>
            <p style={{fontSize: '12px', fontWeight: '400', color: '#7d7d7d', marginLeft: '10px'}}>닉넴이지롱</p>
          </PostFlexStartWrap>
        </div>

        {/* 포스트 제목 */}
        <PostTitle>
          제목제목 제목제목제목 제목제목
        </PostTitle>

        {/* 포스트 내용 */}
        <PostDescription>
          내용인데요 안ㄴ여핫요 안녕ㅇ안녕안녕ㅇㅇ ㅜ라누ㅏㄹ두라재ㅜ래자ㅜ라ㅐ즈채쟈ㅡ랴다즈래ㅏ먀ㅜㅡㅐㅑ
          ㅍ둘내용인데요 안ㄴ여핫요 안녕ㅇ안녕안녕ㅇㅇ ㅜ라누ㅏㄹ두라재ㅜ래자ㅜ라ㅐ즈채쟈ㅡ랴다즈래ㅏ먀ㅜㅡㅐ
          ㅑㅍ둘내용 내용인데요 안ㄴ여핫요 안녕ㅇ안녕안녕ㅇㅇ ㅜ라누ㅏㄹ두라재ㅜ래자ㅜ라ㅐ즈채쟈ㅡ랴다즈래ㅏ먀ㅜㅡㅐㅑ
          ㅍ둘내용인데요 안ㄴ여핫요 안녕ㅇ안녕안녕ㅇㅇ ㅜ라누ㅏㄹ두라재ㅜ래자ㅜ라ㅐ즈채쟈ㅡ랴다즈래ㅏ먀ㅜㅡㅐ
          ㅑㅍ둘내용
        </PostDescription>

        {/* 포스트 좋아요 & 댓글 & 작성시간 */}
        <PostFlexStartWrap style={{ marginTop: '10px', gap: '10px' }}>

          {/* 좋아요 */}
          <PostFlexStartWrap className="like">
            <PostButton>
              <img src={Like} style={{ display: 'block' }} alt="좋아요 아이콘" />
            </PostButton>
            <PostInfoText>33</PostInfoText>
          </PostFlexStartWrap>

          {/* 댓글 */}
          <PostFlexStartWrap className="comment">
            <PostButton>
              <img src={Comment} style={{ display: 'block' }} alt="댓글 아이콘" />
            </PostButton>
            <PostInfoText>33</PostInfoText>
          </PostFlexStartWrap>

          {/* 작성시간 */}
          <PostInfoText>1일전</PostInfoText>
        </PostFlexStartWrap>
      </PostWrap>

      {/* 포스트 사진 미리보기 */}
      <PostPreview>
        <div style={{width: '100%', height: '100%', backgroundColor: '#ddd'}}></div>
      </PostPreview>
    </div>
  );
};

export default PostItem;