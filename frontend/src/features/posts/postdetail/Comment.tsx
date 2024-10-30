import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from 'axios';
import useStore from "../../../app/store";
import Modal from "../../../shared/components/Modal";
import testImg from "/testImg.png";
import heartIcon from "/heart.svg";
import heartFilledIcon from "/heartFilled.svg";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko"; // 한국어 로케일 가져오기


const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 20px;
  gap: 10px;
`;

const Button = styled.button`
  color: #7d7d7d;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
`;

const ImageBox = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 23px;
`;

const CommentInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  font-color: #212529;
  font-size: 14px;
`;

const BestBox = styled.div`
  display: flex;
  height: 18px;
  padding: 0px 10px;
  border-radius: 10px;
  background-color: #ff2c2c;
  align-items: center;
`;

const EditDeleteBox = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentText = styled.p`
  font-color: #212529;
  font-size: 14px;
  margin: 0px;
  line-height: 1.5;
`;

const ReactionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 0px;
  justify-content: space-between;
  align-items: center;
  color: #7d7d7d;
  font-size: 14px;
`;

const ReactionItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  color: #7d7d7d;
  font-size: 14px;
`;

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

interface EditableCommentTextProps {
  isEditing: boolean;
}

const EditableCommentText = styled.textarea<EditableCommentTextProps>`
  width: 100%;
  border: 2px solid #7d7d7d;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #eeeeee; /* 수정할 때 배경색 변경 */
  margin: 0;
  resize: none;
  overflow: hidden;
  display: ${({ isEditing }) => (isEditing ? "block" : "none")};
`;

const AddCommentText = styled.textarea`
  width: 100%;
  border: 2px solid #7d7d7d;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #eeeeee; /* 답글 작성 시 배경색 */
  margin: 10px 0;
  resize: none;
  overflow: hidden;
`;

interface CommentProps {
  commentId: string;
}

interface CommentData {
  _id: string;
  authorId: { nickname?: string; profileImage?: string };
  createdAt: string;
  content: string;
  likes: string[];
  postId: string;
}


const Comment = ({ commentId }: CommentProps) => {
  const { isModalOpen, openModal, closeModal } = useStore();
  const [commentData, setCommentData] = useState<CommentData | null>(null);
  const [relativeTime, setRelativeTime] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalComment, setOriginalComment] =useState("");
  const [isAddComment, setIsAddComment] = useState(false);
  const [replyText, setReplyText] = useState(""); // 답글 내용
  const isAuthor = true; // 작성자 확인 로직
  const popularComment = commentData && commentData.likes?.length >= 30; // BEST를 위해 좋아요 개수 검사

  // 댓글 데이터를 API로부터 가져오기
  const fetchComment = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/${commentId}`);
      setCommentData(response.data);
      setCommentText(response.data.content);
      setOriginalComment(response.data.content);
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [commentId]);

  useEffect(() => {
    if (commentData?.createdAt) {
      const timeAgo = formatDistanceToNow(new Date(commentData.createdAt), { addSuffix: true, locale: ko });
      setRelativeTime(timeAgo);
    }
  }, [commentData?.createdAt]);


  const handleLike = async () => {
    try {
      await axios.post(`/api/comments/${commentData?._id}/like`);
      // 서버 요청 후 좋아요 상태를 반영하기 위해 수동으로 데이터 업데이트
      setCommentData((prevData) => 
        prevData ? { ...prevData, likes: [...prevData.likes, "newUserId"] } : prevData
      );
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  const handleEdit = () => {
    setOriginalComment(commentText); // 수정 시작 시 원래 댓글 내용 저장
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/comments/${commentData?._id}`, { content: commentText });
      setCommentData((prevData) => prevData ? { ...prevData, content: commentText } : prevData);
      setIsEditing(false);
    } catch (error) {
      console.error("댓글 수정 중 오류:", error);
    }
  };

  const handleCancel = () => {
    setCommentText(originalComment); // 원래 댓글 내용으로 복원
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/comments/curation/${commentData?.postId}/${commentData?._id}`);
      closeModal();
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };

  return (
    <Box>
      <CommentInfoBox>
        <CommentInfo>
          <Button>
            <ImageBox src={commentData?.authorId?.profileImage || testImg} alt="프로필 이미지" />
          </Button>
          <p>랭킹</p>
          <p style={{ fontWeight: "bold" }}>{commentData?.authorId?.nickname || "Unknown User"}</p>
          {popularComment && (
            <BestBox>
              <p style={{ margin: "0px", fontSize: "12px", color: "#ffffff" }}>BEST</p>
            </BestBox>
          )}
          <p style={{ color: "#7d7d7d" }}>{relativeTime}</p>
        </CommentInfo>
        {isAuthor && !isEditing ? (
          <EditDeleteBox>
            <Button onClick={handleEdit}>
              <CommentText>수정</CommentText>
            </Button>
            <Button onClick={openModal}>
              <CommentText>삭제</CommentText>
            </Button>
          </EditDeleteBox>
        ) : (
          <EditDeleteBox>
            <Button onClick={handleCancel}>
              <CommentText>취소</CommentText>
            </Button>
            <Button onClick={handleSave}>
              <CommentText>수정완료</CommentText>
            </Button>
          </EditDeleteBox>
        )}
      </CommentInfoBox>

      {/* 수정 모드 */}
      <EditableCommentText
        isEditing={isEditing}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      {/* 일반 모드 */}
      {!isEditing && <CommentText>{commentText}</CommentText>}

      <ReactionBox>
        <Button onClick={() => setIsAddComment((prev) => !prev)}>답글 달기</Button>
        <ReactionItem>
          <Button onClick={handleLike} style={{ width: "20px", height: "20px" }}>
            <img src={
        commentData?.likes && commentData.likes.includes("userId")
          ? heartFilledIcon
          : heartIcon
      } alt="좋아요 아이콘" />
          </Button>
          <p style={{ margin: "0px" }}>{commentData?.likes ? commentData.likes.length : 0}개</p>
        </ReactionItem>
      </ReactionBox>

      {/* 답글 입력란 */}
      {isAddComment && (
        <div>
          <AddCommentText
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답글을 입력하세요..."
          />
          <Button onClick={() => setReplyText("")}>답글 달기</Button>
        </div>
      )}

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalBox>
            <h3>정말 삭제하시겠습니까?</h3>
          </ModalBox>
          <ModalBox>
            <Button onClick={closeModal}>취소</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </ModalBox>
        </Modal>
      )}
    </Box>
  );
};

export default Comment;
