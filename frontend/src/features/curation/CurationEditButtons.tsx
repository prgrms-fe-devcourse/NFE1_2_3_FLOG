import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import useCurationCreateStore from "./CurationCreateStore"; // Zustand 스토어 사용

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
  width: 220px; // 수정 완료와 나가기 버튼만 있기 때문에 더 좁음
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

const CurationEditButtons = () => {
  const navigate = useNavigate();
  const { curationId } = useParams<{ curationId: string }>();
  const { data } = useCurationCreateStore(); // Zustand 스토어에서 data 가져오기

  // 수정 완료 버튼 클릭 핸들러
  const handleUpdateCuration = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인되어 있지 않습니다.");
        return;
      }

      // 수정된 데이터를 PUT 요청으로 백엔드에 전송
      const response = await axios.put(
        `http://localhost:5000/api/curations/${curationId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("큐레이션 수정 성공", response.data);
      alert("큐레이션이 성공적으로 수정되었습니다.");
      navigate(`/curation/${curationId}`); // 수정 후 해당 큐레이션 페이지로 이동
    } catch (error) {
      console.error("큐레이션 수정 실패", error);
      alert("큐레이션 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <ButtonBox>
      <Button onClick={() => navigate(-1)}>나가기</Button>
      <RightButtons>
        <Button onClick={handleUpdateCuration}>수정 완료</Button>
      </RightButtons>
    </ButtonBox>
  );
};

export default CurationEditButtons;
