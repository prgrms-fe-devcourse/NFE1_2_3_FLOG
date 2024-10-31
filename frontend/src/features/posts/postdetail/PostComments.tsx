import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import sendIcon from "/send.svg";
import Comment from "./Comment";

const InputBox = styled.div`
  position: relative;
  width: 864px;
  height: 125px;
  border-radius: 20px;
  border: 1px solid #cccccc;
  margin: 10px auto;
`;

const Input = styled.textarea`
  position: flex;
  margin: 0 auto;
  width: 90%;
  height: 80%;
  border: none;
  line-height: 1.5;
  transform: translate(5%, 10%);
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
    border: none;
  }
`;
const Button = styled.button`
  position: absolute;
  color: #7d7d7d;
  right: 10px;
  bottom: 0px;
  font-size: 14px;
  border: none;
  background: none;
  cursor: pointer;
`;

interface PostCommentsProps {
  curationId: string;
}

const PostComments = ({ curationId }: PostCommentsProps) => {
  const [commentIds, setCommentIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

    // 특정 큐레이션의 댓글 목록을 불러오는 함수
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/curations/${curationId}/comments`);
    
        if (response.data && response.data.comments) { 
          const commentsData = response.data.comments;
          const ids = commentsData.map((comment: { _id: string }) => comment._id);
          setCommentIds(ids);
        } else {
          console.error("댓글 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("댓글 데이터를 가져오는 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    
  useEffect(() => {
    fetchComments();
  }, [curationId]);

   // 댓글 작성 핸들러
   const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // 내용이 없으면 무시
    try {
      await axios.post(`/api/comments/${curationId}/create`, { content: newComment });
      setNewComment(""); // 입력 필드 초기화
      fetchComments(); // 새 댓글을 불러와 업데이트
    } catch (error) {
      console.error("댓글 작성 중 오류:", error);
    }
  };

  if (loading) return <p>댓글을 불러오는 중입니다...</p>;

  return (
    <div>
      <p>댓글 작성하기</p>
      <InputBox>
      <Input
          placeholder="댓글을 입력하세요"
          maxLength={208}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleCommentSubmit}>
          <img src={sendIcon} alt={sendIcon}></img>
        </Button>
      </InputBox>
     {/* 댓글 리스트 */}
     {commentIds.length > 0 ? (
        commentIds.map((commentId) => <Comment key={commentId} commentId={commentId} />)
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};
export default PostComments;
