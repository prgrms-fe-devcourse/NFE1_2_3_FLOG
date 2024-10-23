import './Header.css'
import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

import Logo from './asset/Logo.svg'
import { useState } from 'react';

interface HeaderFlexWrapProps {
  isEnd?: boolean;
}

const HeaderFlexWrap = styled.div<HeaderFlexWrapProps>`
  display: flex;
  justify-content: ${ ({isEnd}) => isEnd ? 'flex-end' : 'flex-start' };
  align-items: center;
`

const HeaderCate = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin-left: 40px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`

const Header = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <header id='header'>
      <HeaderFlexWrap isEnd={false}>
        <div id="logoImg">
          <img src={Logo} alt="Flog" />
        </div>
        <HeaderCate>
          <span>일정</span>
          <span>큐레이션</span>
          <span>가게홍보</span>
        </HeaderCate>
      </HeaderFlexWrap>
      <HeaderFlexWrap isEnd={true}>
        {
          isLogin
          ? <HeaderCate>
              <span>글쓰기</span>
              <span>로그아웃</span>
              <span>알림</span>
              <span>마이페이지</span>
            </HeaderCate>
          : <HeaderCate>
              로그인
            </HeaderCate>
        }
      </HeaderFlexWrap>
    </header>
  );
};

export default Header;