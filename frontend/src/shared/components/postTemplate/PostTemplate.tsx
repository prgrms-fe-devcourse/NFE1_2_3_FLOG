import styled from "styled-components";
import Search from "../search/Search";
import Sort from "../search/Sort";
import PostItem from "../postItem/PostItem";

import { useEffect, useRef, useState } from "react";

import { postData } from "../postItem/mockData";

interface PageTypes {
  pageType: "post"  | "promotion" | "event" 
}
interface PostDataTypes {
  _id: string
  title: string
  authorId: string
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

const PostTemplate = () => {

  const [postList, setPostList] = useState<PostDataTypes[]>(postData.slice(0, 4));
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(4);

  // 무한스크롤 Ref
  const elementRef = useRef(null);

  // 인터섹션 함수
  const onIntersection = (entries: IntersectionObserverEntry[]) => {
    const firstEntry = entries[0]

    if (firstEntry.isIntersecting && hasMore) {
      loadMorePosts();
    }
  }

  // 포스트 로드함수
  const loadMorePosts = () => {
    // 더이상 로드할게 없을시 스크롤 종료, 그게 아니라면 로드
    // api에 맞게 수정예정
    if (postData.length === postList.length) {
      setHasMore(false)
    } else {
      setPostList((prev) => [...prev, ...postData.slice(page, page + 4)])

      setPage((prev) => prev + 4);
    }
  }

  // 무한스크롤 실행 구문
  useEffect(() => {
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
  }, [onIntersection])

  return (
    <div>
      <PostTemplateRightWrap>
        <SearchSortWrap>
          <Search />
          <Sort />
        </SearchSortWrap>
        <PostTemplatePostWrapper>
          {
            postList && postList.map((post) => {
              return (
                <PostItem post={post} key={post._id} />
              )
            })
          }
        </PostTemplatePostWrapper>
      </PostTemplateRightWrap>
      { hasMore && (
        <div ref={elementRef} style={{ textAlign: 'center' }}>
          새로운 포스트를 불러오는 중...
        </div>
      ) }
    </div>
  );
};

export default PostTemplate;