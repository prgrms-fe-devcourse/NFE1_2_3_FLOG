import styled from "styled-components";
import Logo from "./asset/Logo.svg";
import { useEffect, useState } from "react";
import AlarmModal from "./AlarmModal";
import { Link, useNavigate } from "react-router-dom";

interface HeaderScrollbar {
  scrollbarWidth?: string;
}

interface HeaderFlexWrapProps {
  isEnd?: boolean;
}

const HeaderWrap = styled.header<HeaderScrollbar>`
  box-sizing: border-box;
  width: 100%;
  padding: 0 70px;
  height: 92px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #393939;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
`;

const HeaderFlexWrap = styled.div<HeaderFlexWrapProps>`
  display: flex;
  justify-content: ${({ isEnd }) => (isEnd ? "flex-end" : "flex-start")};
  align-items: center;
`;

const HeaderCate = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;

const HeaderLogo = styled.div`
  width: 100px;
  & > a > img {
    width: 100%;
    display: block;
  }
`

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  // 헤더 알림 모달 상태 관리
  const [alarmStatus, setAlarmStatus] = useState(false);
  const navigate = useNavigate();


  // 헤더 알림 모달 핸들 함수
  const handleAlarmModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    // 이벤트 버블링 때문에 내로잉 했어요
    if (e.target instanceof HTMLSpanElement) {
      setAlarmStatus(true)
    }
  };

   // 로그인 상태 체크 함수
   useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token); // 토큰이 있으면 true, 없으면 false로 설정
  }, []);

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 제거
    setIsLogin(false); // 로그인 상태를 false로 설정
    navigate("/"); // 로그아웃 후 홈으로 리디렉션
  };

  // 헤더 알림 모달 props 함수
  const onAlarmModal = () => {
    setAlarmStatus(false)
  };

  return (
    <HeaderWrap id="header">
      {/* 헤더 좌측 로고, 카테고리 */}
      <HeaderFlexWrap isEnd={false}>
        <HeaderLogo id="logoImg">
          <Link to={'/'} >
            <img src={Logo} alt="Flog" />
          </Link>
        </HeaderLogo>
        <HeaderCate>
          <Link to={'/event'}>일정</Link>
          <Link to="/curations">큐레이션</Link>
          <Link to={'/promotion'}>가게홍보</Link>
        </HeaderCate>
      </HeaderFlexWrap>
      {/* 헤더 우측 기능관련 */}
      <HeaderFlexWrap isEnd={true}>
        {isLogin ? (
          <HeaderCate>
            <p>글쓰기</p>
            <p onClick={handleLogout} style={{ cursor: 'pointer' }}>로그아웃</p>
            <p
              onClick={handleAlarmModal}
              style={{ position: 'relative' }}
            >
              <span style={{ cursor: 'pointer' }}>알림</span>
              {
                alarmStatus
                ? <AlarmModal onAlarm={onAlarmModal} />
                : null
              }
            </p>
            <p>마이페이지</p>
          </HeaderCate>
        ) : (
          <HeaderCate>로그인</HeaderCate>
        )}
      </HeaderFlexWrap>
    </HeaderWrap>
  );
};

export default Header;
