import styled from "styled-components";
import NotFoundImage from "../../shared/assets/NotFound-image/NotFoundImage.png";
import { useNavigate } from "react-router-dom";

const black = "#212529";
const gray = "#7D7D7D";

const NotFoundImg = styled.img`
  display: flex;
  margin: 0 auto;
  margin-top: 200px;
  width: 400px;
`;

const ToMainButton = styled.button`
  display: flex;
  margin: 0 auto;
  width: 150px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid ${gray};
  cursor: pointer;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NotFoundImg src={NotFoundImage}></NotFoundImg>
      <ToMainButton
        onClick={() => {
          navigate("/");
        }}
      >
        메인페이지
      </ToMainButton>
    </div>
  );
};

export default NotFoundPage;
