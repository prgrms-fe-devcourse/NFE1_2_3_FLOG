import styled from "styled-components";
import starIcon from "/star.svg";
import starFilledIcon from "/starFilled.svg";
import { useState, useEffect } from "react";
import useStore from "../../../app/store";
import Modal from "../../../shared/components/Modal";
import { formatDate } from "../../../shared/utils/formatDate";
import axios from "axios";
import { useParams } from "react-router-dom";
import NoTokenModal from "../../../shared/utils/noTokenModal";
const CategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Category = styled.p`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  color: #7d7d7d;
  background-color: #f9f4f4;
  font-size: 14px;
  margin: 0px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: #212529;
  margin-block: 20px;
`;
const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px;
`;
const PostInfo = styled.p`
  display: inline-block;
  color: #7d7d7d;
  font-size: 14px;
  margin: 5px;
`;
const Button = styled.button`
  color: #7d7d7d;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;
const P = styled.p`
  margin: 5px;
`;
const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

interface PostHeaderProps {
  authorId: string;
  isUser: boolean;
  title: string;
  author: string;
  date: string;
  categories: string[];
  followers: string[];
  following: string[];
}
export const USER_ID = localStorage.getItem("userId");

const PostHeader = ({
  authorId,
  isUser,
  title,
  author,
  date,
  categories,
  followers,
  following,
}: PostHeaderProps) => {
  const { isModalOpen, openModal, closeModal } = useStore();
  const formatedDate = formatDate(date);
  const { postId } = useParams();

  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const openNoTokenModal = () => {
    setIsTokenModalOpen(true);
  };

  const closeNoTokenModal = () => {
    setIsTokenModalOpen(false);
  };

  //게시물이 본인인지 아닌지 확인
  //이거 댓글도 수정 삭제 있어서 로직 뺄 수 있으면 공통으로 빼기
  const isAuthor = isUser;

  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [isBookMark, setIsBookMark] = useState(false);

  //내 아이디로북마크한글가져오기
  const fetchBookmarkedPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/profile/${USER_ID}/bookmarks`
      );
      const bookmarkedPosts = response.data.items; // 성공적인 응답에서 글 목록 가져오기
      const isBookmarked = bookmarkedPosts.some(
        (post) => post.postId === postId
      );
      setIsBookMark(isBookmarked); // 초기값 설정
      console.log("북마크한 글 목록:", bookmarkedPosts);
    } catch (error) {
      console.error("북마크 글 목록 가져오기 오류:", error);
    }
  };
  useEffect(() => {
    fetchBookmarkedPosts();
  }, []);
  // 북마크 추가 및 삭제 함수
  const clickBookMark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      openNoTokenModal();
      return;
    }

    try {
      if (isBookMark) {
        await axios.delete(
          `http://localhost:5000/api/posts/${postId}/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/posts/${postId}/bookmark`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsBookMark((prev) => !prev); // 북마크 상태 토글
    } catch (error) {
      console.error("북마크 토글 오류:", error);
    }
  };

  // 팔로우 상태 확인
  useEffect(() => {
    if (followers && authorId) {
      setIsFollow(followers.includes(USER_ID)); // 팔로우 목록에 authorId가 포함되어 있으면 true
    } else {
      setIsFollow(false); // following이 없으면 false로 설정
    }
  }, [followers, authorId]); // following 또는 authorId가 변경될 때마다 실행
  console.log(`isFollow:${isFollow}`);
  console.log(`authorId:${authorId}`);
  console.log(following);
  const clickFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        openNoTokenModal();
      }
      const response = await axios.post(
        `http://localhost:5000/api/follow/${authorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsFollow((prev) => !prev);
      }
    } catch (error) {
      console.error("팔로우 토글 오류:", error);
    }
  };

  return (
    <div>
      <CategoryBox>
        {categories.map((category, index) => (
          <Category key={index}>{category}</Category>
        ))}
      </CategoryBox>
      <div>
        <Title>{title}</Title>
      </div>
      <PostInfoBox>
        <div>
          <PostInfo>{author}</PostInfo>
          <PostInfo>{formatedDate}</PostInfo>
        </div>
        {isAuthor ? (
          <div>
            <Button>
              <P>수정</P>
            </Button>
            <Button onClick={openModal}>
              <P>삭제</P>
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={clickFollow}>
              {isFollow ? <P>팔로잉</P> : <P>팔로우</P>}
            </Button>
            <Button
              style={{ display: "flex", alignItems: "center", height: "28px" }}
              onClick={clickBookMark}
            >
              {isBookMark ? (
                <img src={starFilledIcon} alt="starFilledIcon"></img>
              ) : (
                <img src={starIcon} alt="starIcon"></img>
              )}
            </Button>
          </div>
        )}
      </PostInfoBox>
      {/* 모달 컴포넌트*/}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalBox>
            <h3>정말 삭제하시겠습니까?</h3>
          </ModalBox>
          <ModalBox>
            <Button onClick={closeModal}>취소</Button>
            <Button
              onClick={() => {
                // 여기에서 삭제 로직 추가
                closeModal();
              }}
            >
              삭제
            </Button>
          </ModalBox>
        </Modal>
      )}
      {isTokenModalOpen && <NoTokenModal onClose={closeNoTokenModal} />}
    </div>
  );
};

export default PostHeader;
