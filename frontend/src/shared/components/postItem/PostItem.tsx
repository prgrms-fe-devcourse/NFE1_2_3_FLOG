import styled from "styled-components";

import Like from "../asset/Like.svg";
import Comment from "../asset/Comment.svg";
import { Link } from "react-router-dom";

interface PostDataTypes {
  _id: string;
  title: string;
  authorId: string;
  thumbnail: string;
  content: string[];
  tags: string[];
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  status: string;
  postType: string;
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
}

interface PostDataPropsTypes {
  post: PostDataTypes;
}

const baseCss = {
  width: "864px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const PostWrap = styled.div`
  width: 673px;
`;

const PostPreview = styled.div`
  width: 167px;
  height: 141px;
  border-radius: 8px;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const PostFlexStartWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #212529;
  margin: 6px auto 0;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
`;

const PostButton = styled.button`
  appearance: none;
  width: auto;
  height: auto;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  margin-right: 5px;
`;

const PostInfoText = styled.span`
  font-size: 14px;
  color: #7d7d7d;
`;

const PostItem: React.FC<PostDataPropsTypes> = ({ post }) => {
  // 시간 계산 함수
  const timeForToday = (value: PostDataTypes) => {
    const today = new Date();
    const timeValue = new Date(value.createdAt);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );

    if (betweenTime < 1) {
      return "방금 전";
    }
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일 전`;
    }

    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    if (betweenTimeWeek < 4) {
      return `${betweenTimeWeek}주 전`;
    }

    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  console.log(post)

  return (
    // 링크로 대체 예정
    <div style={baseCss}>
      <PostWrap>
        {/* 포스트 작성자 프로필 */}
        <Link to={'/'}>
          <PostFlexStartWrap>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
              }}
            ></div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#7d7d7d",
                marginLeft: "10px",
              }}
            >
              {post.authorId}
            </p>
          </PostFlexStartWrap>
        </Link>

        <Link to={"/"}>
          {/* 포스트 제목 */}
          <PostTitle>{post.title}</PostTitle>

          {/* 포스트 내용 */}
          <PostDescription>
            {post.content.map((postContent) => {
              return <>{postContent}</>;
            })}
          </PostDescription>

          {/* 포스트 좋아요 & 댓글 & 작성시간 */}
          <PostFlexStartWrap style={{ marginTop: "10px", gap: "10px" }}>
            {/* 좋아요 */}
            <PostFlexStartWrap className="like">
              <PostButton>
                <img
                  src={Like}
                  style={{ display: "block" }}
                  alt="좋아요 아이콘"
                />
              </PostButton>
              <PostInfoText>{ post.likes ? post.likes.length : 0}</PostInfoText>
            </PostFlexStartWrap>

            {/* 댓글 */}
            <PostFlexStartWrap className="comment">
              <PostButton>
                <img
                  src={Comment}
                  style={{ display: "block" }}
                  alt="댓글 아이콘"
                />
              </PostButton>
              <PostInfoText>{ post.comments ? post.comments.length : 0}</PostInfoText>
            </PostFlexStartWrap>

            {/* 작성시간 */}
            <PostInfoText>{timeForToday(post)}</PostInfoText>
          </PostFlexStartWrap>
        </Link>
      </PostWrap>

      {/* 포스트 사진 미리보기 */}
      <Link to={"/"}>
        <PostPreview>
          <img src={post.thumbnail} alt={post.title} />
        </PostPreview>
      </Link>
    </div>
  );
};

export default PostItem;
