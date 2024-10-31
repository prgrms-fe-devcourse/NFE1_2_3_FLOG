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

  // 큐레이션 출간 요청
  const publishCuration = async () => {

     // 로그인 시 저장된 adminId를 localStorage에서 가져오기
     const adminId = localStorage.getItem("userId");

     // adminId가 없는 경우, 출간 요청을 막음
     if (!adminId) {
       alert("어드민 사용자만 큐레이션을 생성할 수 있습니다.");
       return;
     }
 
     // `data`를 복사하여 새로운 객체에 adminId와 status 값을 추가
  const updatedData = { ...data, adminId, status: "published" };

  // 상태 업데이트가 완료되기 전에 `updatedData`를 사용해 서버로 전송
  try {
    const res = await axios.post(
      "http://localhost:5000/api/curations/create",
      updatedData, // 수정된 데이터를 요청 본문에 포함
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("큐레이션 출간 성공", res.data);
    alert("큐레이션이 성공적으로 출간되었습니다!");
    navigate("/curations");
  } catch (error: any) {
    if (error.response) {
      console.error("큐레이션 출간 실패:", error.response.data.message);
    } else {
      console.error("큐레이션 출간 실패:", error.message);
    }
  }
  };

  // 큐레이션 임시저장 요청
  const saveDraftCuration = async () => {
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
