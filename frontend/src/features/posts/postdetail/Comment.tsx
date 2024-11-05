import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../../../app/store";
import Modal from "../../../shared/components/Modal";
import testImg from "/testImg.png";
import heartIcon from "/heart.svg";
import heartFilledIcon from "/heartFilled.svg";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale/ko"; // 한국어 로케일 가져오기
import { useNavigate } from "react-router-dom";

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
const NameButton = styled.button`
  color: #000000;
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
  margin-right: 10px;
`;

const CommentText = styled.p`
  font-color: #212529;
  font-size: 14px;
  margin: 0px;
  line-height: 1.5;
  margin-left: 10px;
`;

const ReactionBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-right: 10px;
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
  width: 95%;
  border: 2px solid #7d7d7d;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #eeeeee; /* 수정할 때 배경색 변경 */
  margin: 0;
  margin-left: 13px;
  resize: none;
  overflow: hidden;
  display: ${({ isEditing }) => (isEditing ? "block" : "none")};
`;

const EditableReplyText = styled.textarea<EditableCommentTextProps>`
  width: 95%;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f5f5f5;
  resize: none;
  overflow: hidden;
  display: ${({ isEditing }) => (isEditing ? "block" : "none")};
  margin: 0;
  margin-left: 13px;
`;

const AddCommentText = styled.textarea`
  width: 95%;
  border: 2px solid #7d7d7d;
  border-radius: 4px;
  padding: 5px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #eeeeee; /* 답글 작성 시 배경색 */
  margin: 10px 0;
  resize: none;
  overflow: hidden;
  margin-left: 13px;
`;

interface ReplyData {
  _id: string;
  authorId: { _id?: string; nickname?: string; profileImage?: string };
  content: string;
  likes: string[];
  createAt: string;
}

interface CommentData {
  _id: string;
  authorId: { nickname?: string; profileImage?: string; _id?: string };
  createAt: string;
  content: string;
  likes: string[];
  replies: ReplyData[]; // 대댓글 리스트 추가
  postId: string;
}

interface PostCommentsProps {
  commentId: string;
  postType: "Post" | "Curation"; // 포스트인지 큐레이션인지 구분
  fetchComments: () => Promise<void>; // fetchComments 함수 추가
  setCommentLength: (length: number) => void; // 댓글 길이를 업데이트하는 함수
}

const Comment = ({
  commentId,
  postType,
  fetchComments,
  setCommentLength,
}: PostCommentsProps) => {
  const { isModalOpen, openModal, closeModal } = useStore();
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 대댓글 삭제 모달 상태
  const [replyToDeleteId, setReplyToDeleteId] = useState<string | null>(null); // 삭제할 대댓글 ID
  const [commentData, setCommentData] = useState<CommentData | null>(null);
  const [relativeTime, setRelativeTime] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalComment, setOriginalComment] = useState("");
  const [isAddComment, setIsAddComment] = useState(false);
  const [replyText, setReplyText] = useState(""); // 답글 내용
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState("");
  const popularComment = commentData && commentData.likes?.length >= 3; // BEST를 위해 좋아요 개수 검사
  const [isLiked, setIsLiked] = useState(false); // 댓글 좋아요 상태
  const [likedReplies, setLikedReplies] = useState<boolean[]>([]); //대댓글 좋아요 상태

  const navigate = useNavigate();

  // 댓글 데이터를 API로부터 가져오기
  const fetchComment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${commentId}`
      );
      const currentUserId = localStorage.getItem("userId");
      // 댓글 좋아요 상태 확인
      if (response.data.likes.includes(currentUserId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
      // 대댓글 좋아요 상태 확인
      const newLikedReplies = response.data.replies.map((reply: any) => {
        return reply.likes.includes(currentUserId);
      });
      setLikedReplies(newLikedReplies); // 상태 업데이트
      console.log(response.data.replies);
      setCommentData(response.data);
      setCommentText(response.data.content);
      setOriginalComment(response.data.content);

      // 댓글 + 대댓글 수 계산
      const singleCommentCount =
        1 + (response.data.replies ? response.data.replies.length : 0);
      setCommentLength(singleCommentCount / 2); // 부모 컴포넌트에 댓글 수 전달
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류:", error);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [commentId]);

  useEffect(() => {
    if (commentData && commentData.createAt) {
      const timeAgo = formatDistanceToNow(new Date(commentData.createAt), {
        addSuffix: true,
        locale: ko,
      });
      setRelativeTime(timeAgo);
    } else {
      console.log("No createdAt found in commentData.");
    }
  }, [commentData?.createAt]);

  //댓글 수정, 저장, 취소, 삭제, 좋아요
  const handleEdit = () => {
    setOriginalComment(commentText); // 수정 시작 시 원래 댓글 내용 저장
    setIsEditing(true);
  };
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/comments/${commentData?._id}`,
        {
          content: commentText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommentData((prevData) =>
        prevData ? { ...prevData, content: commentText } : prevData
      );
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
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:5000/api/comments/${postType}/${commentData?.postId}/${commentData?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchComments();
      closeModal();
    } catch (error) {
      console.error("댓글 삭제 중 오류:", error);
    }
  };
  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/comments/${commentData?._id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComment();
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("좋아요 처리 중 오류:", error);
    }
  };

  // 대댓글 생성
  const handleAddReply = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        ` http://localhost:5000/api/comments/${commentId}/replies/create`,
        {
          content: replyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // 헤더에 토큰 설정
        }
      );
      setReplyText(""); // 입력 필드 초기화
      setIsAddComment(false); // 답글 창 닫기
      fetchComment(); // 대댓글 생성 후 업데이트
    } catch (error) {
      console.error("대댓글 작성 중 오류:", error);
    }
  };
  //대댓글 수정, 저장, 취소, 삭제, 좋아요
  const handleEditReply = (replyId: string, currentContent: string) => {
    setEditingReplyId(replyId);
    setEditingReplyText(currentContent);
  };
  const handleSaveReply = async (replyId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/comments/${commentId}/replies/${replyId}`,
        {
          content: editingReplyText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingReplyId(null);
      fetchComment();
    } catch (error) {
      console.error("대댓글 수정 중 오류:", error);
    }
  };
  const handleCancelReplyEdit = () => {
    setEditingReplyId(null);
    setEditingReplyText("");
  };
  const handleConfirmDeleteReply = async (replyId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/comments/${commentId}/replies/${replyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReplyToDeleteId(null);
      setIsReplyModalOpen(false);
      console.log(`${commentId}///////${replyId}`);
      await fetchComments();
    } catch (error) {
      console.error("대댓글 삭제 중 오류:", error);
    }
  };
  const handleLikeReply = async (replyId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/comments/${commentId}/replies/${replyId}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchComment(); // 좋아요 후 대댓글 데이터 업데이트
    } catch (error) {
      console.error("대댓글 좋아요 처리 중 오류:", error);
    }
  };
  const currentUserId = localStorage.getItem("userId");
  const Id = localStorage.getItem("Id");
  return (
    <Box>
      <CommentInfoBox>
        <CommentInfo>
          <Button>
            <ImageBox
              src={commentData?.authorId?.profileImage || testImg}
              alt="프로필 이미지"
            />
          </Button>
          <p>랭킹</p>
          <NameButton
            onClick={() => navigate(`/user/${Id}`)}
            style={{ fontWeight: "bold" }}
          >
            {commentData?.authorId?.nickname || "Unknown User"}
          </NameButton>
          {/* BEST 뱃지 */}
          {popularComment && (
            <BestBox>
              <p style={{ margin: "0px", fontSize: "12px", color: "#ffffff" }}>
                BEST
              </p>
            </BestBox>
          )}
          <p style={{ color: "#7d7d7d" }}>{relativeTime}</p>
        </CommentInfo>
        {commentData?.authorId?._id === currentUserId ? (
          !isEditing ? (
            <EditDeleteBox>
              <Button onClick={handleEdit}>
                <CommentText>수정</CommentText>
              </Button>
              <Button
                onClick={() => {
                  alert("댓글이 삭제되었습니다"), handleDelete();
                }}
              >
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
          )
        ) : null}
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
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => setIsAddComment((prev) => !prev)}
        >
          답글 달기
        </Button>
        <ReactionItem>
          <Button
            onClick={handleLike}
            style={{ width: "20px", height: "20px" }}
          >
            <img
              src={isLiked ? heartFilledIcon : heartIcon}
              alt="좋아요 아이콘"
            />
          </Button>
          <p style={{ margin: "0px" }}>
            {commentData?.likes ? commentData.likes.length : 0}개
          </p>
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
          <Button
            style={{ fontSize: "14px", marginLeft: "780px" }}
            onClick={handleAddReply}
          >
            답글 작성
          </Button>
        </div>
      )}
      {/* 대댓글 리스트 */}
      {commentData?.replies.map((reply, index) => (
        <Box
          key={reply._id}
          style={{
            marginLeft: "40px",
            background: "#eeeeee",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "0px",
          }}
        >
          <CommentInfoBox>
            <CommentInfo>
              <Button>
                <ImageBox
                  src={reply.authorId.profileImage || testImg}
                  alt="프로필 이미지"
                />
              </Button>
              <NameButton
                onClick={() => navigate(`/user/${Id}`)}
                style={{ fontWeight: "bold" }}
              >
                {reply.authorId.nickname || "Unknown User"}
              </NameButton>
              <p style={{ color: "#7d7d7d" }}>{relativeTime}</p>
            </CommentInfo>
            {reply.authorId?._id === currentUserId ? (
              editingReplyId === reply._id ? (
                <EditDeleteBox>
                  <Button
                    style={{ fontSize: "14px" }}
                    onClick={handleCancelReplyEdit}
                  >
                    취소
                  </Button>
                  <Button
                    style={{ fontSize: "14px" }}
                    onClick={() => handleSaveReply(reply._id)}
                  >
                    수정완료
                  </Button>
                </EditDeleteBox>
              ) : (
                <EditDeleteBox>
                  <Button
                    style={{ fontSize: "14px" }}
                    onClick={() => handleEditReply(reply._id, reply.content)}
                  >
                    수정
                  </Button>
                  <Button
                    style={{ fontSize: "14px" }}
                    onClick={() => {
                      handleConfirmDeleteReply(reply._id);
                      alert("댓글이 삭제되었습니다.");
                    }}
                  >
                    삭제
                  </Button>
                </EditDeleteBox>
              )
            ) : null}
          </CommentInfoBox>
          {/* 대댓글 수정중 */}
          {editingReplyId === reply._id ? (
            <EditableReplyText
              isEditing={true}
              value={editingReplyText}
              onChange={(e) => setEditingReplyText(e.target.value)}
            />
          ) : (
            <CommentText>{reply.content}</CommentText>
          )}
          <ReactionBox style={{ marginLeft: "745px" }}>
            <ReactionItem>
              <Button
                onClick={() => handleLikeReply(reply._id)}
                style={{ width: "20px", height: "20px" }}
              >
                <img
                  src={likedReplies[index] ? heartFilledIcon : heartIcon}
                  alt="좋아요 아이콘"
                />
              </Button>
              <p style={{ margin: "0px" }}>{reply.likes.length}개</p>
            </ReactionItem>
          </ReactionBox>
        </Box>
      ))}
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
      {/* 대댓글 삭제 모달 */}
      {isReplyModalOpen && (
        <Modal onClose={() => setIsReplyModalOpen(false)}>
          <ModalBox>
            <h3>정말 대댓글을 삭제하시겠습니까?</h3>
          </ModalBox>
          <ModalBox>
            <Button onClick={() => setIsReplyModalOpen(false)}>취소</Button>
            <Button
              onClick={() => {
                if (replyToDeleteId) {
                  handleConfirmDeleteReply(replyToDeleteId); // replyToDeleteId가 null이 아닐 때만 호출
                  setReplyToDeleteId(null); // ID 초기화
                }
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
