import styled from "styled-components";

import Like from "../asset/Like.svg";
import Comment from "../asset/Comment.svg";

import { postData } from "../postItem/mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
`;

const RecommendPost = () => {
  // 렌더링 할 추천 포스트 리스트 state
  const [postList, setPostList] = useState<PostDataTypes[] | null>(null);

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

  // api에서 추천 포스트 리스트 불러오는 함수
  const loadPostList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/recommend')
      setPostList([...response.data.postList]);
    } catch (err) {
      console.error('추천 포스트 로드중 오류발생', err)
    }
  }

  // postList에 api에서 불러온 값 할당
  useEffect(() => {
    return () => {
      loadPostList();
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {/* 추천 포스트 상단 */}
      <RecommendPostTitle>추천 포스트</RecommendPostTitle>

      {postList &&
        postList.map((post) => {
          return (
            <Link to={`/detail/${post._id}`}>
              <RecommendPostWrap>
                {/* 추천 포스트 제목 */}
                <RecommendPostHeader>{post.title}</RecommendPostHeader>

                {/* 추천 포스트 내용 */}
                <RecommendPostDescription>
                  {post.content.map((postContent) => {
                    return <>{ postContent.replace(/<[^>]*>?/gm, ' ') }</>
                  })}
                </RecommendPostDescription>

                {/* 추천 포스트 좋아요 & 댓글 & 작성시간 */}
                <RecommendPostInfo style={{ gap: "10px" }}>
                  {/* 좋아요 */}
                  <RecommendPostInfo className="like">
                    <RecommendPostButton>
                      <img src={Like} alt="좋아요 아이콘" />
                    </RecommendPostButton>
                    <RecommendPostText>{post.likes.length}</RecommendPostText>
                  </RecommendPostInfo>

                  {/* 댓글 */}
                  <RecommendPostInfo className="comment">
                    <RecommendPostButton>
                      <img src={Comment} alt="댓글 아이콘" />
                    </RecommendPostButton>
                    <RecommendPostText>
                      {post.comments.length}
                    </RecommendPostText>
                  </RecommendPostInfo>

                  {/* 작성시간 */}
                  <RecommendPostText>{timeForToday(post)}</RecommendPostText>
                </RecommendPostInfo>
              </RecommendPostWrap>
            </Link>
          );
        })}
    </div>
  );
};

export default RecommendPost;
