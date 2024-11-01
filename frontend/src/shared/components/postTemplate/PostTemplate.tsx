import styled from "styled-components";
import Search from "../search/Search";
import Sort from "../search/Sort";
import PostItem from "../postItem/PostItem";

import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

interface PostTemplatePropTypes {
  postType: "post"  | "promotion" | "event" 
}
interface PostDataTypes {
  _id: string
  title: string
  authorId: {
    _id: string;
    nickname: string;
    userId: string;
    profileImage?: string
  }
  thumbnail: string
  content: string[]
  tags: string[]
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
  status: string
  postType: string
  genderFilter: string[]
  ageFilter: string[]
  styleFilter: string[]
}

const PostTemplatePostWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 100px;
`;

const PostTemplateRightWrap = styled.section`
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: #7d7d7d;
    position: absolute;
    top: 30px;
    right: -65px;
  }
`;

const SearchSortWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PostTemplate: React.FC<PostTemplatePropTypes> = ({ postType }) => {

  const [postData, setPostData] = useState<PostDataTypes[]>([]);
  const [postList, setPostList] = useState<PostDataTypes[]>([]);
  const [sortType, setSortType] = useState('new');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 무한스크롤 Ref
  const elementRef = useRef<HTMLDivElement | null>(null);

  // 인터섹션 함수
  const onIntersection = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const firstEntry = entries[0]

    if (firstEntry.isIntersecting && hasMore) {
      observer.unobserve(firstEntry.target)
      loadMorePosts();
      observer.observe(firstEntry.target)
    }
  }, [hasMore, postData, postList, page])

  // 포스트 로드함수
  const loadMorePosts = () => {
    // 더이상 로드할게 없을시 스크롤 종료, 그게 아니라면 로드
    // api에 맞게 수정예정
    console.log(postData)
    console.log(postList)
    console.log(elementRef)
    console.log(page)
    console.log(hasMore)
    if (postData.length !== 0) {
      if (postData.length === postList.length) {
        setHasMore(false)
      } else {
        setHasMore(true)
        setPostList((prev) => [...prev, ...postData.slice((page - 1) * 4, page * 4)])

        setPage((prev) => prev + 1);
      }
    }
  }

  // 솔트 전달 함수
  const onSortingPost = (value: string) => {
    setSortType(value)
  }

  type SetFunctionType = (setFunc: Dispatch<SetStateAction<PostDataTypes[]>>) => void

  // 솔트타입 별 정렬 함수
  const sortPostList = useCallback<SetFunctionType>((setFunc) => {
    switch (sortType) {
      case 'new':
        setFunc([...postData.sort((a, b) => {
          return new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
        })]);
        break;

      case 'like':
        setFunc([...postData.sort((a, b) => {
          return b.likes.length - a.likes.length
        })]);
        break;

      case 'comment':
        setFunc([...postData.sort((a, b) => {
          return b.comments.length - a.comments.length
        })]);
        break;
    }
  }, [postData, sortType])

  // 리스트 받아오기 함수
  const fetchPostList = async () => {
    let listURL = 'http://localhost:5000/api/posts'
    try {
      const response = await axios.get<{ postList: PostDataTypes[] }>(listURL, {
        params: { postType }
      });
      setPostData(response.data.postList)
    } catch(err) {
      console.error("API 호출 에러", err)
    }
  }

  // 무한스크롤 실행 구문
  useEffect(() => {
    if(postData.length !== postList.length && elementRef.current !== null) {
      const observer = new IntersectionObserver(onIntersection, {
        threshold: 1,
      });
  
      if (elementRef.current) {
        observer.observe(elementRef.current)
      }
  
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    } else {
      setHasMore(false)
    }
  }, [onIntersection])

  // 리스트 받아오기
  useEffect(() => {
    fetchPostList();
  }, [postType])

  // 받아온 리스트를 렌더링할 데이터로 정제
  useEffect(() => {
    const copyPostData = [...postData]
    if(Array.isArray(copyPostData)) {
      setPostList([])
      setPostList(copyPostData.slice(0, 4))
    }
    setPage(2)
    setHasMore(true)
    console.log(postData)
  }, [postData])

  // sortType이 정의 될때 postData 재 할당
  useEffect(() => {
    setPostList([])
    sortPostList(setPostData)
  }, [sortType])

  return (
    <div>
      <PostTemplateRightWrap>
        <SearchSortWrap>
          <Search postType={postType} />
          <Sort
            onSortingPost={onSortingPost}
          />
        </SearchSortWrap>
        <PostTemplatePostWrapper>
          {
            postList && postList.length !== 0 ? postList.map((post, index) => {
              return (
                <PostItem post={post} key={index} /> // 추후 post._id로 수정바람
              )
            })
            : <div style={{ 
                width: '864px',
                height: '80vh',
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center'
              }}>데이터가 없습니다</div>
          }
        </PostTemplatePostWrapper>
      </PostTemplateRightWrap>
      {
        postList && postList.length !== 0 ? 
        ( hasMore
          ? (
            <div ref={elementRef} style={{ textAlign: 'center' }}>
              새로운 포스트를 불러오는 중...
            </div>
          )
          : (
            <div style={{ textAlign: 'center', width: '864px' }}>더 이상 포스트가 없습니다.</div>
          ) 
        ) 
        : null
      }
    </div>
  );
};

export default PostTemplate;