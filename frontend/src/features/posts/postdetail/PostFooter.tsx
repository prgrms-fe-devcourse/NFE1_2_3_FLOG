import styled from "styled-components";
import commentIcon from "/comment.svg";
import heartIcon from "/heart.svg";
import heartFilledIcon from "/heartFilled.svg";
import NoTokenModal from "../../../shared/utils/noTokenModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.button`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  color: #7d7d7d;
  background-color: #f9f4f4;
  font-size: 14px;
  margin: 0px;
  cursor: pointer;
  border: none;
`;

const ReactionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
`;

const ReactionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: #7d7d7d;
  font-size: 14px;
`;

interface PostFooterProps {
  tags: string[];
  likes: string[];
  commentLength: number;
}

const PostFooter = ({ tags, likes, commentLength }: PostFooterProps) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  //좋아요 누를 때 로그인 안 되어있으면 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openNoTokenModal = () => {
    setIsModalOpen(true);
  };
  const closeNoTokenModal = () => {
    setIsModalOpen(false);
  };

  // 사용자 ID 가져오기
  const isAuthor = localStorage.getItem("userId") || "";
  //사용자가 좋아요 눌렀는지 확인하는 상태 관리
  const [isUserLiked, setIsUserLiked] = useState(likes.includes(isAuthor));
  //포스트 좋아요 개수 상태 관리
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setLikeCount(likes.length); // likes 배열이 변경되면 개수를 업데이트
    setIsUserLiked(likes.includes(isAuthor)); // 좋아요 상태 업데이트
  }, [likes]);

  const clickLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        openNoTokenModal();
      }
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsUserLiked((prev) => !prev);
        setLikeCount((prev) => (isUserLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("좋아요 토글 오류:", error);
    }
  };

  return (
    <Box>
      <TagBox>
        {tags.map((tag, index) => (
          <Tag
            key={index}
            onClick={() => navigate(`/search/posts?query=${tag}`)}
          >
            {tag}
          </Tag>
        ))}
      </TagBox>
      <ReactionBox>
        <ReactionItem>
          <Button onClick={clickLike} style={{ width: "20px", height: "20px" }}>
            {isUserLiked ? (
              <img src={heartFilledIcon} alt="heartFilledIcon" />
            ) : (
              <img src={heartIcon} alt="heartIcon" />
            )}
          </Button>
          <p>{likeCount}개</p>
        </ReactionItem>
        <ReactionItem>
          <img src={commentIcon} alt="commentIcon" />
          <p>{commentLength}개</p>
        </ReactionItem>
      </ReactionBox>
      {isModalOpen && <NoTokenModal onClose={closeNoTokenModal} />}
    </Box>
  );
};

export default PostFooter;
