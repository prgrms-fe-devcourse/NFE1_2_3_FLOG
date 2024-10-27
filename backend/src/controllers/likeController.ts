import { Request, Response } from 'express';
import { toggleCurationLike, toggleCommentLike } from '../services/likeService';

export const likeCurationController = async (req: Request, res: Response) => {
  const { curationId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const curation = await toggleCurationLike(curationId, userId);
    res.status(200).json({ success: true, likes: curation.likes.length });
  } catch (error) {
    // Error 타입인지 확인한 후, message에 접근
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "좋아요 처리 중 알 수 없는 오류가 발생했습니다." });
    }
  }
};

export const likeCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const comment = await toggleCommentLike(commentId, userId);
    res.status(200).json({ success: true, likes: comment.likes.length });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "좋아요 처리 중 알 수 없는 오류가 발생했습니다." });
    }
  }
};

