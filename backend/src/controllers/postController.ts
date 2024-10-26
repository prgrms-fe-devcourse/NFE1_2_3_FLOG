import { Request, Response } from "express";
import { getPostById } from "../services/postService";

//특정 포스트 조회
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params; //요청 파라미터에서 포스트 id가져옴
  try {
    const post = await getPostById(postId);
    if (!post) {
      res
        .status(404)
        .json({ success: false, message: "포스트를 찾을 수 없습니다." });
      return;
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "포스트를 불러오는 중 오류가 발생했습니다.",
      });
  }
};
