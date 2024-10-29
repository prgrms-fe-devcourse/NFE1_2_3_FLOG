import { Request, Response } from "express";
import { Notification } from "../models/notificationModel";
import { IUser } from "../models/userModel";
import { WebSocketServer } from "ws";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as IUser)._id;

    const notifications = await Notification.find({ userId })
    res.status(200).json({ notifications })
  } catch(err) {
    console.log("알림 조회 오류" + err)
    res.status(500).json({ message: "서버 오류 발생", err })
  }
}

export const createNotification = async (data: any, wss: WebSocketServer) => {
  try {
    const newNotification = new Notification(data);
    await newNotification.save();

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newNotification))
      }
    });

    return newNotification
  } catch (err) {
    console.error("알림 생성 오류", err);
    throw err;
  }
}