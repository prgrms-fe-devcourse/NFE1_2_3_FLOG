import Modal from "../../shared/components/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Button = styled.button`
  color: #7d7d7d;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
`;

const NoTokenModal = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal onClose={onClose}>
      <ModalBox>
        <h3>로그인이 필요합니다.</h3>
      </ModalBox>
      <ModalBox>
        <Button onClick={onClose}>취소</Button>
        <Button
          onClick={() => {
            navigate("/signIn"); // 로그인 페이지로 이동
            onClose(); // 모달 닫기
          }}
        >
          로그인
        </Button>
      </ModalBox>
    </Modal>
  );
};

export default NoTokenModal;
