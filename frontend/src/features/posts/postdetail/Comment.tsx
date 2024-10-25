import styled from "styled-components";
import { useState } from "react";
import useStore from "../../../app/store";
import Modal from "../../../shared/components/Modal";

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

const EditableCommentText = styled.textarea`
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

const Comment = () => {
  const { isModalOpen, openModal, closeModal } = useStore();

  const testImg = "/testImg.png";
  const heartIcon = "/heart.svg";
  const heartFilledIcon = "/heartFilled.svg";

  // 좋아요
  const [isLike, setIsLike] = useState(false);
  const clickLike = () => {
    setIsLike((prev) => !prev);
  };

  // 내가 쓴 댓글인지 확인하는 로직 필요
  const isAuthor = true;

  // BEST를 위해 좋아요 개수가 30개가 넘는지 검사
  const popularComment = true;

  // 댓글 내용과 수정 상태 관리
  const [commentText, setCommentText] = useState(
    "댓글 내용입니다 댓글내용입니다 댓글내용입니다"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [originalComment, setOriginalComment] = useState(commentText); // 원래 댓글 내용 저장
  const [isAddComment, setIsAddComment] = useState(false);
  const [replyText, setReplyText] = useState(""); // 답글 내용

  const handleEdit = () => {
    setOriginalComment(commentText); // 수정 시작 시 원래 댓글 내용 저장
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // 여기에서 수정 로직 추가 (예: API 호출)
  };

  const handleCancel = () => {
    setCommentText(originalComment); // 원래 댓글 내용으로 복원
    setIsEditing(false);
  };

  // 답글 달기
  const addComment = () => {
    setIsAddComment((prev) => !prev);
  };

  const handleReplySubmit = () => {
    // 여기에서 답글 제출 로직 추가 (예: API 호출)
    console.log("답글 내용:", replyText);
    setReplyText(""); // 제출 후 입력 필드 비우기
    setIsAddComment(false); // 답글 입력란 닫기
  };

  return (
    <Box>
      <CommentInfoBox>
        <CommentInfo>
          <Button>
            <ImageBox src={testImg} alt={testImg}></ImageBox>
          </Button>
          <p>랭킹</p>
          <p style={{ fontWeight: "bold" }}>닉넴머하지</p>
          {popularComment && (
            <BestBox>
              <p style={{ margin: "0px", fontSize: "12px", color: "#ffffff" }}>
                BEST
              </p>
            </BestBox>
          )}
          <p style={{ color: "#7d7d7d" }}>1시간 전</p>
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
        <Button onClick={addComment}>답글 달기</Button>
        <ReactionItem>
          <Button onClick={clickLike} style={{ width: "20px", height: "20px" }}>
            {isLike ? (
              <img src={heartFilledIcon} alt="heartFilledIcon"></img>
            ) : (
              <img src={heartIcon} alt="heartIcon"></img>
            )}
          </Button>
          <p style={{ margin: "0px" }}>33개</p>
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
          <Button onClick={handleReplySubmit}>답글 달기</Button>
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
    </Box>
  );
};

export default Comment;
