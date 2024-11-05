import styled from "styled-components";
import sendIcon from "/send.svg";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";

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
  width: 95%;
  height: 80%;
  border: none;
  margin-left: -20px;
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
  postId: string;
  postType: "Post" | "Curation"; // 포스트인지 큐레이션인지 구분
  setCommentLength: (length: number) => void; // 댓글 길이를 업데이트하는 함수
}

const PostComments = ({
  postId,
  postType,
  setCommentLength,
}: PostCommentsProps) => {
  const [commentIds, setCommentIds] = useState<string[]>([]);
  //댓글 input 내용 입력 상태 관리
  const [newComment, setNewComment] = useState("");

  // 특정 포스트 또는 큐레이션의 댓글 목록을 불러오는 함수
  const fetchComments = async () => {
    try {
      const url =
        postType === "Curation"
          ? `http://localhost:5000/api/curations/${postId}/comments`
          : `http://localhost:5000/api/posts/${postId}/comments`;

      const response = await axios.get(url);

      if (response.data && response.data.comments) {
        const commentsData = response.data.comments;
        const ids = commentsData.map((comment: { _id: string }) => comment._id);
        setCommentIds(ids);
      } else {
        console.error("댓글 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, postType]);

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
      const url = `http://localhost:5000/api/comments/${postType}/${postId}/create`;
      await axios.post(
        url,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } } // 헤더에 토큰 설정
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 중 오류:", error);
    }
  };

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
        commentIds.map((commentId) => (
          <Comment
            fetchComments={fetchComments}
            key={commentId}
            commentId={commentId}
            postType={postType}
            setCommentLength={setCommentLength}
          />
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </div>
  );
};
export default PostComments;
