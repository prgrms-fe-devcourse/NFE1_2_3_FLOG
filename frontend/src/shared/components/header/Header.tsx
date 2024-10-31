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
const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 10;
`;

const DropdownItem = styled.p`
  padding: 10px 20px;
  margin: 0;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Header = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
  // 헤더 알림 모달 상태 관리
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("userRole") === "admin");// 어드민 여부 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태
  const [alarmStatus, setAlarmStatus] = useState(false);
  const navigate = useNavigate();


  // 헤더 알림 모달 핸들 함수
  const handleAlarmModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    // 이벤트 버블링 때문에 내로잉 했어요
    if (e.target instanceof HTMLSpanElement) {
      setAlarmStatus(true)
    }
  };

   // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLogin(!!localStorage.getItem("token"));
      setIsAdmin(localStorage.getItem("userRole") === "admin"); // 어드민 여부 확인
    };
    // 컴포넌트 마운트 시 로그인 상태 확인
    checkLoginStatus();
    // 스토리지 변경 시 이벤트 리스너 등록
    window.addEventListener("storage", checkLoginStatus);
    
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);
  
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

   // 로그인 클릭 핸들러
   const onLoginClick = () => {
    navigate("/signin"); // 로그인 페이지로 이동
  };

  // 헤더 알림 모달 props 함수
  const onAlarmModal = () => {
    setAlarmStatus(false)
  };

    // 드롭다운 메뉴 토글
    const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
    };
  
    const handleDropdownItemClick = (path: string) => {
      navigate(path);
      setIsDropdownOpen(false);
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
            {isAdmin ? (
              <p onClick={toggleDropdown} style={{ cursor: "pointer", position: "relative" }}>
                글쓰기
                {isDropdownOpen && (
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleDropdownItemClick("/post/create")}>포스트</DropdownItem>
                    <DropdownItem onClick={() => handleDropdownItemClick("/curation/create")}>큐레이션</DropdownItem>
                  </DropdownMenu>
                )}
              </p>
            ) : (
              <p onClick={() => navigate("/post/create")} style={{ cursor: "pointer" }}>
                글쓰기
              </p>
            )}
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>로그아웃</p>
            <p onClick={handleAlarmModal} style={{ position: "relative" }}>
              <span style={{ cursor: "pointer" }}>알림</span>
              {alarmStatus ? <AlarmModal onAlarm={onAlarmModal} /> : null}
            </p>
            <p>마이페이지</p>
          </HeaderCate>
        ) : (
          <HeaderCate>
            <p onClick={onLoginClick} style={{ cursor: "pointer" }}>로그인</p>
          </HeaderCate>
        )}
      </HeaderFlexWrap>
    </HeaderWrap>
  );
};

export default Header;
