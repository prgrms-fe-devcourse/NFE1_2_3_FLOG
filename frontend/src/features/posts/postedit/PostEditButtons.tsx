import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import usePostEditStore from "./usePostEditStore";
import { useEffect } from "react";

const pink = "#F9F4F4";
const gray = "#7D7D7D";

const ButtonBox = styled.div`
  width: 1000px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 70px auto;
`;

const RightButtons = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: right;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: ${pink};
  border: 1px solid ${gray};
`;

const PostEditButtons = (props: any) => {
  const navigate = useNavigate();
  const { isOnClick, data, setData } = usePostEditStore();

  const extractThumbnail = (text: string): string | null => {
    const imgRegex = /<img\s+src="([^"]+)"\s*\/?>/g;
    const matches: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = imgRegex.exec(text)) !== null) {
      matches.push(match[1]);
    }

    return matches.length ? matches[0] : null;
  };

  const postPublishedData = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/posts/update/${props.postId}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      navigate("/"); // 성공 시 메인페이지로 이동
    } catch (error) {
      console.error("게시물 생성 실패", error);
    }
  };

  const handlePublish = async () => {
    await isOnClick(); // onClick을 true로 설정
    await postPublishedData(); // 데이터 서버로 전송
  };

  return (
    <ButtonBox>
      <Button onClick={() => navigate(-1)}>나가기</Button>
      <RightButtons>
        <Button onClick={handlePublish}>출간하기</Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default PostEditButtons;
