import styled from "styled-components";
import { useState } from "react";
import Modal from "../../shared/components/Modal";
import useStore from "../../app/store";

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
  const { isModalOpen, openModal, closeModal } = useStore();

  // 비밀번호 변경 상태 관리
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    const storedPassword = "현재비밀번호"; // 실제로는 서버에서 관리하는 비밀번호로 교체해야 함

    if (currentPassword !== storedPassword) {
      setError("현재 비밀번호가 맞지 않습니다.");
    } else {
      console.log("비밀번호 변경:", newPassword);
      closeModal(); // 모달 닫기
      // 비밀번호 변경 로직 추가 (예: API 호출)
    }
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
          <Button>로그아웃</Button>
        </div>
      </AuthBox>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ModalBox>
            <h3>비밀번호 변경</h3>
          </ModalBox>
          <div>
            <Input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setError(""); // 오류 메시지 초기화
              }}
            />
            <Input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
