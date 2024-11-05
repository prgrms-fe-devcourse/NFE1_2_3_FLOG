import styled from "styled-components";
import { useState } from "react";
import Modal from "../../shared/components/Modal";
import useStore from "../../app/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Button = styled.button`
  display: flex;
  align-items: center;
  color: #7d7d7d;
  font-size: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
`;
const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const IdBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const IdText = styled.p`
  color: #7d7d7d;
  font-size: 18px;
  margin: 0px;
`;

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
`;

const Input = styled.input`
  border: 2px solid #7d7d7d;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
  margin-left: -3px;
`;

const MyPageAuth = ({ Id }: any) => {
  const navigate = useNavigate();
  const { isModalOpen, openModal, closeModal } = useStore();
  const USER_Id = localStorage.getItem("userId");

  // 비밀번호 변경 상태 관리
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  // 헤더 알림 모달 상태 관리
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("userRole") === "admin"
  ); // 어드민 여부 상태

  const handleChangePassword = async () => {
    // 비밀번호 변경 API 호출
    if (newPassword !== confirmNewPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/profile/${USER_Id}/password`,
        {
          currentPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message); // 성공 메시지 표시
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setError("");
        closeModal();
      } else {
        setError(response.data.message); // 서버에서 전달된 오류 메시지 표시
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };
  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("userId");
    localStorage.removeItem("Id");
    localStorage.removeItem("userRole"); // 어드민 여부 데이터도 삭제
    setIsLogin(false); // 로그인 상태를 false로 설정
    setIsAdmin(false);
    navigate("/"); // 로그아웃 후 홈으로 리디렉션
  };

  return (
    <div>
      <div>
        <h2>회원 정보</h2>
      </div>
      <AuthBox>
        <IdBox>
          <IdText>아이디</IdText>
          <IdText>{Id}</IdText>
        </IdBox>
        <div>
          <Button onClick={openModal}>비밀번호 변경</Button>
        </div>
        <div>
          <Button onClick={handleLogout} style={{ cursor: "pointer" }}>
            로그아웃
          </Button>
        </div>
      </AuthBox>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalBox>
            <h3>비밀번호 변경</h3>
          </ModalBox>
          <div>
            <Input
              type="text"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="text"
              placeholder="새 비밀번호 확인"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
          <ModalBox>
            <Button onClick={closeModal}>취소</Button>
            <Button onClick={handleChangePassword}>확인</Button>
          </ModalBox>
        </Modal>
      )}
    </div>
  );
};

export default MyPageAuth;
