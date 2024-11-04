import PostComments from "../../features/posts/postdetail/PostComments";
import PostFooter from "../../features/posts/postdetail/PostFooter";
import PostHeader from "../../features/posts/postdetail/PostHeader";
import PostDetailText from "../../features/posts/postdetail/PostDetailText";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  // background-color: #cccccc;
  width: 864px;
  margin-top: 50px;
`;

//유저아이디 가져옴
export const USER_ID = localStorage.getItem("userId");

const PostDetailPage = () => {
  const { postId } = useParams();
  const [totalCommentLength, setTotalCommentLength] = useState(0);
  const handleCommentLengthUpdate = (length) => {
    setTotalCommentLength((prevLength) => prevLength + length);
  };
  console.log(`totalCommentLength${totalCommentLength}`);
  handleCommentLengthUpdate;
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
    authorId: {
      nickname: string;
      _id: string;
      followers: string[];
      following: string[];
    };
    createdAt: string;
    genderFilter: string[];
    ageFilter: string[];
    styleFilter: string[];
    tags: string[];
    likes: string[];
    comments: string[];
  } | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        console.log("Response data:", response.data); // API 응답 데이터 확인

        setPostData(response.data.post);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostData();
  }, [postId]);
  console.log(postData);

  //로그인 한 유저 아이디와 포스트 작성자 아이디가 같은지
  const isUser = USER_ID === postData?.authorId._id;
  //팔로우했는지, 북마크 했는지
  return (
    <div>
      <Box>
        <PostHeader
          authorId={postData?.authorId._id || ""}
          Id={postData?.authorId.userId}
          isUser={isUser}
          followers={postData?.authorId?.followers || []}
          following={postData?.authorId?.following || []}
          title={postData?.title || "제목 없음"}
          author={postData?.authorId.nickname || "작성자 없음"}
          date={postData?.createdAt || "날짜 없음"}
          categories={[
            ...(postData?.genderFilter || []),
            ...(postData?.ageFilter || []),
            ...(postData?.styleFilter || []),
          ]}
        ></PostHeader>
        <PostDetailText
          content={postData?.content || "내용 없음"}
        ></PostDetailText>
        <PostFooter
          tags={postData?.tags || []}
          likes={postData?.likes || []}
          comments={postData?.comments || []}
          commentLength={totalCommentLength}
        ></PostFooter>
        <PostComments
          setCommentLength={handleCommentLengthUpdate}
          postId={postId}
          postType="Post"
        />{" "}
      </Box>
    </div>
  );
};

export default PostDetailPage;
