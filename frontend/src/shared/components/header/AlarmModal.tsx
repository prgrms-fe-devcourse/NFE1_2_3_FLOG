import "../animation.css";

import styled from "styled-components";
import { useEffect, useState } from "react";

import Exit from "../asset/Exit.svg";
import { alarmData } from "./data/alarmMockData";

interface AlarmData {
  _id: string;
  userId: string;
  fromUserId: string;
  type: string;
  postId: string;
  postUrl: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
interface AlarmPropTypes {
  onAlarm: () => void;
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
  // 애니메이션 클래스 state
  const [fade, setFade] = useState("");
  const [alarmList, setAlarmList] = useState<AlarmData[]>(alarmData);

  // 시간 계산 함수
  const timeForToday = (value: AlarmData) => {
    const today = new Date();
    const timeValue = new Date(value.createdAt);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );

    if (betweenTime < 1) {
      return "방금 전";
    }
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 7) {
      return `${betweenTimeDay}일 전`;
    }

    const betweenTimeWeek = Math.floor(betweenTimeDay / 7);
    if (betweenTimeWeek < 4) {
      return `${betweenTimeWeek}주 전`;
    }

    const betweenTimeMonth = Math.floor(betweenTimeDay / 30);
    if (betweenTimeMonth < 12) {
      return `${betweenTimeMonth}달 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  };

  // 알림 타입별 구문 출력
  const alarmTypeDivision = (value: AlarmData) => {
    switch (value.type) {
      case "newPost":
        return `${value.fromUserId}님이 새로운 게시물을 작성하였습니다.`;
      case "like":
        return `${value.fromUserId}님이 좋아요를 눌렀습니다.`;
      case "comment":
        return `${value.fromUserId}님이 댓글을 남겼습니다.`;
    }
  };

  // 알림 삭제 기능
  const handleAlarmDelete = (alarmId: string) => {
    const copyAlarmList:AlarmData[] = [...alarmList];
    const filtedAlarmList = copyAlarmList.filter((alarm) => {
      return alarm._id !== alarmId;
    })
    
    setAlarmList(filtedAlarmList);
  };

  // 진입시 애니메이션
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFade("end");
    }, 50);
    return () => {
      clearTimeout(fadeTimer);
      setFade("");
    };
  }, []);

  // 시간순 알림 정렬
  useEffect(() => {
    const copyAlarmList: AlarmData[] = [...alarmList];
    copyAlarmList.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return () => {
      setAlarmList(copyAlarmList)
    };
  }, []);

  return (
    <AlarmWrap className={`start ${fade}`}>
      {/* 알림 모달 타이틀 */}
      <AlarmTitle>알림</AlarmTitle>

      {/* 알림 모달 닫기 버튼 */}
      <AlarmButton
        onClick={onAlarm}
        style={{
          position: "absolute",
          top: "30px",
          right: "20px",
        }}
      >
        <img src={Exit} alt="알림 닫기" />
      </AlarmButton>

      {/* 알림 내부 래퍼 */}
      <AlarmInnerWrap>
        {alarmList.map((alarm, index) => {
          return (
            <AlarmInner key={index}>
              {/* 알림 읽었는지 안 읽었는지 */}
              {alarm.isRead ? null : <NewAlarmPoint />}
              {/* 댓글 & 좋아요 인지 새로운 게시물인지? */}
              <AlarmLink>{alarmTypeDivision(alarm)}</AlarmLink>
              <AlarmInnerBottom>
                <AlarmGrayText>{timeForToday(alarm)}</AlarmGrayText>
                <AlarmButton onClick={() => handleAlarmDelete(alarm._id)}>
                  <AlarmGrayText>삭제</AlarmGrayText>
                </AlarmButton>
              </AlarmInnerBottom>
            </AlarmInner>
          );
        })}
      </AlarmInnerWrap>
    </AlarmWrap>
  );
};

export default AlarmModal;
