import User, { IUser } from "../models/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Types } from "mongoose";

export const toggleFollow = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const myId = req.user?._id;
  const userObjectId = new Types.ObjectId(userId);

  if (!myId) {
    res.status(401).json({ success: false, message: "로그인이 필요합니다." });
    return;
  }

  try {
    // 현재 사용자 정보 조회
    const currentUser = (await User.findById(myId)) as IUser | null;
    const targetUser = (await User.findById(userId)) as IUser | null;

    if (!currentUser) {
      res
        .status(404)
        .json({ success: false, message: "현재 사용자를 찾을 수 없습니다." });
      return;
    }

    if (!targetUser) {
      res
        .status(404)
        .json({ success: false, message: "대상 사용자를 찾을 수 없습니다." });
      return;
    }

    // 팔로우 상태 확인
    const isFollowing = currentUser.following?.includes(userObjectId) ?? false;

    if (isFollowing) {
      // 팔로우 취소
      currentUser.following = currentUser.following?.filter(
        (id) => id.toString() !== userId
      );
      targetUser.followers = targetUser.followers?.filter((id) => id !== myId);
      await currentUser.save();
      await targetUser.save();
      res
        .status(200)
        .json({ success: true, message: "팔로우 취소되었습니다." });
      return;
    } else {
      // 팔로우
      currentUser.following?.push(userObjectId);
      targetUser.followers?.push(myId);
      await currentUser.save();
      await targetUser.save();
      res.status(200).json({ success: true, message: "팔로우되었습니다." });
      return;
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
    return;
  }
};

// 팔로워 및 팔로잉 상세 정보 조회
export const getFollowersAndFollowing = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    // 사용자 정보 조회
    const user = await User.findById(userId)
      .populate("followers") // 팔로워
      .populate("following"); // 팔로잉

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "사용자를 찾을 수 없습니다." });
      return;
    }

    // 팔로워 상세 정보
    const followersDetails = await Promise.all(
      (user.followers || []).map(async (followerId) => {
        const follower = await User.findById(followerId);
        console.log(follower);
        return {
          userId: follower?._id,
          nickname: follower?.nickname,
          profileImage: follower?.profileImage,
          blogName: follower?.blogName,
          bio: follower?.bio,
        };
      })
    );

    // 팔로잉 상세 정보
    const followingDetails = await Promise.all(
      (user.following || []).map(async (followingId) => {
        const following = await User.findById(followingId);
        return {
          userId: following?._id,
          nickname: following?.nickname,
          profileImage: following?.profileImage,
          blogName: following?.blogName,
          bio: following?.bio,
        };
      })
    );

    res.status(200).json({
      success: true,
      userId: user._id,
      followers: followersDetails,
      following: followingDetails,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "서버 오류가 발생했습니다." });
  }
};
