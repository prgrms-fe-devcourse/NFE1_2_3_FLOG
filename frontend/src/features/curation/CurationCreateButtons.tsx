import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import axios from "axios";
import useCurationCreateStore from "./CurationCreateStore"; // 큐레이션 생성 상태 관리 훅

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

const CurationCreateButtons = () => {
  const navigate = useNavigate();
  const { data, setData } = useCurationCreateStore(); // Curation 데이터를 가져옴

  // 컨텐츠에서 첫 번째 이미지 추출
  const extractThumbnail = (content: string[]): string | null => {
    const imgRegex = /<img\s+src="([^"]+)"\s*\/?>/g;
    const matches: string[] = [];
    content.forEach((text) => {
      let match: RegExpExecArray | null;
      while ((match = imgRegex.exec(text)) !== null) {
        matches.push(match[1]);
      }
    });
    return matches.length ? matches[0] : null;
  };

  // 큐레이션 출간 요청
  const publishCuration = async () => {
    const thumbnail = extractThumbnail(data.content || []);
    if (thumbnail) {
      setData({ ...data, thumbnail });
    }

    try {
      const res = await axios.post("http://localhost:5000/api/curations/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("큐레이션 출간 성공", res.data);
      navigate("/curations"); // 성공 시 큐레이션 리스트 페이지로 이동
    } catch (error) {
      console.error("큐레이션 출간 실패", error);
    }
  };

  // 큐레이션 임시저장 요청
  const saveDraftCuration = async () => {
    const thumbnail = extractThumbnail(data.content || []) || "";
    setData({ ...data, thumbnail, status: "draft" }); // 상태를 draft로 설정

    try {
      const res = await axios.post("http://localhost:5000/api/curations/create", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("큐레이션 임시저장 성공", res.data);
      alert("큐레이션이 임시 저장되었습니다.");
    } catch (error) {
      console.error("큐레이션 임시저장 실패", error);
    }
  };

  return (
    <ButtonBox>
      <Button onClick={() => navigate(-1)}>나가기</Button>
      <RightButtons>
        <Button onClick={saveDraftCuration}>임시저장</Button>
        <Button onClick={publishCuration}>출간하기</Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default CurationCreateButtons;
