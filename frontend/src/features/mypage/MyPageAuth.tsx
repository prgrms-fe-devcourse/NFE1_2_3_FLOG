import styled from "styled-components";

const MyPageAuth = () => {
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
  return (
    <div>
      <div>
        <h2>회원 정보</h2>
      </div>
      <AuthBox>
        <IdBox>
          <IdText>아이디</IdText>
          <IdText>idididid1234</IdText>
        </IdBox>
        <div>
          <Button>비밀번호 변경</Button>
        </div>
        <div>
          <Button>로그아웃</Button>
        </div>
      </AuthBox>
    </div>
  );
};

export default MyPageAuth;
