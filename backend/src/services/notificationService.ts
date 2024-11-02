import mongoose from "mongoose";
import { wss } from "..";
import { Notification } from "../models/notificationModel";

// 알림 리스트 받아오기
export const getNotificationListService = async (userId: unknown) => {
  try {
    const notifications = await Notification.find({ userId }).populate("fromUserId", "nickname").lean()
    return notifications
  } catch (err) {
    throw new Error(`알림 조회 오류 : ${err}`)
  }
}

// 알림 생성하기
export const createNotificationService = async (
  userId: mongoose.Types.ObjectId,
  fromUserId: mongoose.Types.ObjectId,
  type: "like" | "comment" | "newPost",
  postId: mongoose.Types.ObjectId,
  message: string
) => {
  try {
    // 매개변수들로 알림 데이터 형성
    const notificationData = {
      userId,
      fromUserId,
      type,
      postId,
      message,
      isRead: false,
      createdAt: new Date()
    }

    const newNotification = new Notification(notificationData);
    await newNotification.save();

    wss.clients.forEach((client) => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newNotification))
      }
    })

    return newNotification
  } catch (err) {
    throw new Error(`알림 생성 오류 : ${err}`)
  }
}