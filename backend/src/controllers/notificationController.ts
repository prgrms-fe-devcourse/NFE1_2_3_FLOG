import { deleteNotificationService, setNotificationReadService } from './../services/notificationService';
import { Request, Response } from "express";
import { getNotificationListService, createNotificationService } from "../services/notificationService";
import mongoose from "mongoose";
import User from "../models/userModel";

// 알림 삭제
export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedNotification = await deleteNotificationService(id);
    if (deletedNotification) {
      res.status(200).json({ success: true, notification: deletedNotification })
    } else {
      res.status(404).json({ success: false, message: "알림을 삭제 할 수 없습니다." })
    }
  } catch (err) {
    console.error("알림 삭제 변경 중 오류" + err)
    res.status(500).json({ success: false, message: "알림 삭제 중 오류 발생" })
  }
}

// 알림 상태 변경
export const setNotificationRead = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedNotification = await setNotificationReadService(id);
    if (updatedNotification) {
      res.status(200).json({ success: true, notification: updatedNotification })
    } else {
      res.status(404).json({ success: false, message: "알림을 조회할 수 없습니다." })
    }
  } catch (err) {
    console.error("알림 상태 변경 중 오류" + err)
    res.status(500).json({ success: false, message: "알림 변경 중 오류 발생" })
  }
}

// 알림 리스트 받아오기
export const getNotificationList = async (req: Request, res: Response) => {
  try {
    // 유저 고유 아이디
    const userId = req.user?._id;
    console.log(userId)

    // 서비스에서 return 한 값
    const notifications = await getNotificationListService(userId)
    res.status(200).json({ notifications })
  } catch(err) {
    console.log("알림 조회 오류" + err)
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}

// 알림 생성하기
export const createNotification = async (
  userId: mongoose.Types.ObjectId,
  fromUserId: mongoose.Types.ObjectId,
  type: "like" | "comment" | "newPost",
  postId: mongoose.Types.ObjectId,
  message: string
) => {
  try {
    const newNotification = await createNotificationService(
      userId,
      fromUserId,
      type,
      postId,
      message
    );

    // 유저 필드의 notifications에 알림 ObjectId추가
    await User.findByIdAndUpdate(userId, {
      $push: { notifications: newNotification._id },
    });

    return newNotification
  } catch (err) {
    console.error("알림 생성 오류", err);
    throw Error (`알림 생성 오류 : ${err}`)
  }
}