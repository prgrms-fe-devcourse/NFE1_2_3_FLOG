import '../animation.css'

import styled from "styled-components";

import Exit from '../asset/Exit.svg';
import { useEffect, useState } from 'react';

interface AlarmPropTypes {
  onAlarm: () => void
}

const AlarmWrap = styled.div`
  width: 400px;
  height: 576px;
  background-color: #d9d9d9;
  padding: 30px 20px 25px;
  overflow: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  box-sizing: border-box;

  position: absolute;
  top: 35px;
  right: -30px;
  z-index: 99;
  border-radius: 12px;
  box-shadow: 2px 2px 20px #00000040;
`;

const AlarmTitle = styled.p`
  font-size: 20px;
  color: #212529;
  text-align: center;
  margin: 0;
`;

const AlarmButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
`;

const AlarmInnerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 25px;
  gap: 10px;
`;

const AlarmInner = styled.div`
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  position: relative;

  background-color: #fff;
  border-radius: 8px;
`;

const AlarmLink = styled.p`
  font-size: 14px;
  color: #212529;
  letter-spacing: -0.025em;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

const AlarmGrayText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #757575;
  margin: 0;
`;

const AlarmInnerBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 8px;
`;

const NewAlarmPoint = styled.div`
  width: 5px;
  height: 5px;
  background-color: #eb4242;
  border-radius: 50%;

  position: absolute;
  top: 5px;
  left: 5px;
`;

const AlarmModal: React.FC<AlarmPropTypes> = ({ onAlarm }) => {

  const [fade, setFade] = useState('');

  useEffect(() => {
    const fadeTimer = setTimeout(() => { setFade('end') }, 50);
    return () => {
      clearTimeout(fadeTimer);
      setFade('')
    }
  }, [onAlarm])

  return (
    <AlarmWrap className={`start ${fade}`}>
      {/* 알림 모달 타이틀 */}
      <AlarmTitle>
        알림
      </AlarmTitle>

      {/* 알림 모달 닫기 버튼 */}
      <AlarmButton
        onClick={onAlarm} 
        style={{ 
          position: 'absolute',
          top: '30px',
          right: '20px'
        }}
      >
        <img src={Exit} alt="알림 닫기" />
      </AlarmButton>

       {/* 알림 내부 래퍼 */}
      <AlarmInnerWrap>

        {/* 알림 내용 부분 */}
        <AlarmInner>

          {/* 새로운 알림 */}
          <NewAlarmPoint />

          {/* 알림 링크 */}
          <AlarmLink>
            fromUserId님이 type을 남겼습니다.
          </AlarmLink>

          {/* 알림 하단 삭제 시간 래퍼 */}
          <AlarmInnerBottom>

            {/* 알림 시간 */}
            <AlarmGrayText>
              1시간 전
            </AlarmGrayText>

            {/* 알림 삭제 */}
            <AlarmButton>
              <AlarmGrayText>
                삭제
              </AlarmGrayText>
            </AlarmButton>
          </AlarmInnerBottom>
        </AlarmInner>

        {/* 알림 내용 부분 */}
        <AlarmInner>

          {/* 새로운 알림 */}
          <NewAlarmPoint />

          {/* 알림 링크 */}
          <AlarmLink>
            닉네임이 존나게 긴 사람님이 새로운 게시글을 작성하였습니다.
          </AlarmLink>

          {/* 알림 하단 삭제 시간 래퍼 */}
          <AlarmInnerBottom>

            {/* 알림 시간 */}
            <AlarmGrayText>
              1시간 전
            </AlarmGrayText>

            {/* 알림 삭제 */}
            <AlarmButton>
              <AlarmGrayText>
                삭제
              </AlarmGrayText>
            </AlarmButton>
          </AlarmInnerBottom>
        </AlarmInner>

        {/* 알림 내용 부분 */}
        <AlarmInner>

          {/* 알림 링크 */}
          <AlarmLink>
            닉네임이 준내게 길고 또 긴사람님이 댓글을 남겼습니다.
          </AlarmLink>

          {/* 알림 하단 삭제 시간 래퍼 */}
          <AlarmInnerBottom>

            {/* 알림 시간 */}
            <AlarmGrayText>
              1시간 전
            </AlarmGrayText>

            {/* 알림 삭제 */}
            <AlarmButton>
              <AlarmGrayText>
                삭제
              </AlarmGrayText>
            </AlarmButton>
          </AlarmInnerBottom>
        </AlarmInner>

        {/* 알림 내용 부분 */}
        <AlarmInner>

          {/* 알림 링크 */}
          <AlarmLink>
            fromUserId님이 새로운 게시글을 작성하였습니다.
          </AlarmLink>

          {/* 알림 하단 삭제 시간 래퍼 */}
          <AlarmInnerBottom>

            {/* 알림 시간 */}
            <AlarmGrayText>
              1시간 전
            </AlarmGrayText>

            {/* 알림 삭제 */}
            <AlarmButton>
              <AlarmGrayText>
                삭제
              </AlarmGrayText>
            </AlarmButton>
          </AlarmInnerBottom>
        </AlarmInner>

      </AlarmInnerWrap>
    </AlarmWrap>
  );
};

export default AlarmModal;