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
import { useNavigate } from "react-router-dom";

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

const PostInfoButton = styled.button`
  border: none;
  background-color: #ffffff;
  cursor: pointer;
  padding: 0px;
  padding-right: 10px;
  margin: 0px;
  height: 16px;
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
  color: #7d7d7d;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
`;
const Button = styled.button`
  color: #7d7d7d;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;
const P = styled.p`
  margin: 0px;
  padding: 0px;
`;
const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

interface PostHeaderProps {
  authorId: string;
  Id: string;
  isAuthor: boolean;
  title: string;
  author: string;
  date: string;
  categories: string[];
  followers: string[];
}

export const USER_ID: string | null = localStorage.getItem("userId");

const PostHeader = ({
  authorId,
  Id,
  isAuthor,
  title,
  author,
  date,
  categories,
  followers,
}: PostHeaderProps) => {
  const { isModalOpen, closeModal } = useStore();
  const formatedDate = formatDate(date);
  const { postId } = useParams();
  const navigate = useNavigate();

  //북마크 상태 관리
  const [isBookMark, setIsBookMark] = useState(false);
  //팔로우 상태 관리
  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  //로그인 후 이용하는지
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const openNoTokenModal = () => {
    setIsTokenModalOpen(true);
  };
  const closeNoTokenModal = () => {
    setIsTokenModalOpen(false);
  };

  //포스트 삭제
  const deletePost = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("포스트 삭제 요청 API:", res);
    } catch (err) {
      console.error("포스트 삭제 요청 실패:", err);
    }
  };

  //북마크 관련 코드
  const fetchBookmarkedPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/profile/${USER_ID}/bookmarks`
      );
      const bookmarkedPosts = response.data.items;
      //현재 게시물이 북마크 한 글인지 판단하기 위한 변수
      const isBookmarked = bookmarkedPosts.some(
        (post: any) => post.postId === postId
      );
      setIsBookMark(isBookmarked);
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
      setIsBookMark((prev) => !prev);
    } catch (error) {
      console.error("북마크 토글 오류:", error);
    }
  };

  // 팔로우 관련 함수
  useEffect(() => {
    if (followers && authorId) {
      setIsFollow(followers.includes(USER_ID || ""));
    } else {
      setIsFollow(false);
    }
  }, [followers]);
  //팔로우 또는 언팔로우
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <PostInfoButton>
            <PostInfo
              onClick={() => {
                navigate(`/user/${Id}`);
              }}
              style={{ color: "#000000" }}
            >
              {author}
            </PostInfo>
          </PostInfoButton>
          <PostInfo>{formatedDate}</PostInfo>
        </div>
        {isAuthor ? (
          <div>
            <Button onClick={() => navigate(`/post/edit?postId=${postId}`)}>
              <P>수정</P>
            </Button>
            <Button
              onClick={() => {
                deletePost();
                navigate("/");
                alert("포스트 삭제 완료");
              }}
            >
              <P>삭제</P>
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
            }}
          >
            <Button onClick={clickFollow}>
              {isFollow ? <P>팔로잉</P> : <P>팔로우</P>}
            </Button>
            <Button
              style={{ display: "flex", alignItems: "center", height: "28px" }}
              onClick={clickBookMark}
            >
              {isBookMark ? (
                <img
                  style={{ marginTop: "-1.5px" }}
                  src={starFilledIcon}
                  alt="star"
                ></img>
              ) : (
                <img
                  style={{ marginTop: "-1.5px" }}
                  src={starIcon}
                  alt="starIcon"
                ></img>
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
              onClick={(e) => {
                e.preventDefault();
                deletePost();
                closeModal();
                navigate("/");
                alert("포스트 삭제 완료");
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
