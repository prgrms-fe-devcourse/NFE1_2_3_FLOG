import { Request, Response } from "express";
import User from "../models/userModel";

// 비밀번호 변경 컨트롤러
export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // 인증된 사용자 ID를 req.user에서 가져옴
  const userId = req.user?._id;
  if (!userId) {
    res
      .status(401)
      .json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }
  console.log(userId);

  try {
    // 사용자 조회
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      return;
    }

    // 현재 비밀번호가 일치하는지 확인
    const isPasswordMatch = await user.comparePassword(currentPassword);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "현재 비밀번호가 일치하지 않습니다." });
      return;
    }

    // 새 비밀번호와 비밀번호 확인이 일치하는지 검증
    if (newPassword !== confirmNewPassword) {
      res
        .status(400)
        .json({ message: "새 비밀번호가 서로 일치하지 않습니다." });
      return;
    }

    // 비밀번호 업데이트
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 변경 중 오류:", error);
    res
      .status(500)
      .json({ message: "비밀번호 변경 중 오류가 발생했습니다.", error });
  }
};
