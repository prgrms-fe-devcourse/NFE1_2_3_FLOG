import "../animation.css";

import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

import Exit from "../asset/Exit.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AlarmData {
  _id: string;
  userId: string;
  fromUserId: {
    _id: string;
    nickname: string
  };
  type: string;
  postId: string;
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
  cursor: pointer;
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

  const navigate = useNavigate();

  // 애니메이션 클래스 state
  const [fade, setFade] = useState("");
  
  const [alarmList, setAlarmList] = useState<AlarmData[] | null>(null);

  const webSocket = useRef<WebSocket | null>(null);

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
        return `${value.fromUserId.nickname}님이 새로운 게시물을 작성하였습니다.`;
      case "like":
        return `${value.fromUserId.nickname}님이 좋아요를 눌렀습니다.`;
      case "comment":
        return `${value.fromUserId.nickname}님이 댓글을 남겼습니다.`;
    }
  };

  // 알림 데이터 조회
  const loadAlarmList = async () => {
    const response = await axios.get('http://localhost:5000/api/notifications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    setAlarmList(response.data.notifications);
  }

  // 알림 클릭시 isRead변경 및 게시물로 Navigate & 삭제 기능
  const setNotificationRead = async (
    alarm: AlarmData,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    // e.target이 삭제버튼이 아니면 isRead 수정 & 해당게시물 navigate
    if (!(e.target instanceof HTMLSpanElement)) {
      if (alarm.isRead === false) {
        await axios.put(`http://localhost:5000/api/notifications/read/${alarm._id}`,{}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
      }
      onAlarm();
      navigate(`/detail/${alarm.postId}`)
    } else if (e.target instanceof HTMLSpanElement) { // e.target이 삭제버튼이면
      if (alarmList !== null) {
        await axios.delete(`http://localhost:5000/api/notifications/delete/${alarm._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
        // 클라이언트 알림 리스트에서 해당 알림 제거
        const copyAlarmList = [...alarmList]
        const filtedAlarmList = copyAlarmList.filter((item) => {
          return item._id !== alarm._id
        })
        setAlarmList(filtedAlarmList);
      }
    }
  }

  // 알림 삭제 기능
  // const handleAlarmDelete = (alarmId: string) => {
  //   const copyAlarmList:AlarmData[] = [...alarmList];
  //   const filtedAlarmList = copyAlarmList.filter((alarm) => {
  //     return alarm._id !== alarmId;
  //   })

  //   setAlarmList(filtedAlarmList);
  // };

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
  // useEffect(() => {
  //   const copyAlarmList: AlarmData[] = [...alarmList];
  //   copyAlarmList.sort((a, b) => {
  //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //   });

  //   return () => {
  //     setAlarmList(copyAlarmList)
  //   };
  // }, []);

  useEffect(() => {
    loadAlarmList()
  }, [])

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
         {alarmList && alarmList.map((alarm, index) => {
          return (
            <AlarmInner
              key={alarm._id}
              onClick={(e) => {setNotificationRead(alarm, e)}}
            >
              {/* 알림 읽었는지 안 읽었는지 */}
              {alarm.isRead ? null : <NewAlarmPoint />}
              {/* 댓글 & 좋아요 인지 새로운 게시물인지? */}
              <AlarmLink>{alarmTypeDivision(alarm)}</AlarmLink>
              <AlarmInnerBottom>
                <AlarmGrayText>{timeForToday(alarm)}</AlarmGrayText>
                <AlarmButton>
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
