import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import usePostCreateStore from "./PostCreateStore";
import { useDraftPostStore } from "./PostCreateStore";

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
  width: 330px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: ${pink};
  border: 1px solid ${gray};
`;

const PostCreateButtons = () => {
  const navigate = useNavigate();
  const { data, setData } = usePostCreateStore();
  const { isDraftedPost, setIsDraftedPost } = useDraftPostStore();

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
    const thumbnail = extractThumbnail(data.content || "");
    if (thumbnail) {
      setData({ thumbnail });
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      navigate("/"); // 성공 시 메인페이지로 이동
    } catch (error) {
      console.error("게시물 생성 실패", error);
    }
  };

  const postDraftedData = async () => {
    setData({ status: "draft" });
    const thumbnail = extractThumbnail(data.content || "");
    if (thumbnail) {
      setData({ thumbnail });
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts/draft", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data);
      alert("임시저장 완료");
    } catch (error) {
      console.error("게시물 생성 실패", error);
    }
  };

  const getUserPostData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts/draftedpost", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        const draftedPost = response.data;
        setData(draftedPost); // 데이터를 저장
        setIsDraftedPost(true); // 드래프트 상태 업데이트
        console.log(draftedPost);
      }
    } catch (err) {
      console.error("불러오기 버튼 클릭 후 에러 :", err);
    }
  };

  return (
    <ButtonBox>
      <Button onClick={() => navigate(-1)}>나가기</Button>
      <RightButtons>
        <Button onClick={getUserPostData}>불러오기</Button>
        <Button onClick={postDraftedData}>임시저장</Button>
        <Button onClick={postPublishedData}>출간하기</Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default PostCreateButtons;
