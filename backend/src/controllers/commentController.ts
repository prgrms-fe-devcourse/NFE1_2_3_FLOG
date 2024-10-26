import { Request, Response } from 'express';
import { createComment, getCommentsByPostId } from '../services/commentService';
// 댓글 생성 컨트롤러

export const createCommentController = async (req: Request, res: Response) => {
  const { postId, postType } = req.params;
  const { content } = req.body;
  const authorId = req.user?._id;

  if (!authorId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  if (!['Curation', 'Post'].includes(postType)) {
    res.status(400).json({ success: false, message: '유효하지 않은 postType입니다.' });
    return;
  }

  try {
    const comment = await createComment(
        postId,
        postType as 'Curation' | 'Post',
        authorId?.toString() || '', // toString()으로 문자열 변환
        content
      );
    res.status(201).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: '댓글 생성 중 오류가 발생했습니다.' });
  }
};

// 특정 postId에 달린 댓글 목록 조회 컨트롤러
export const getCommentsByPostController = async (req: Request, res: Response) => {
  const { postId, postType } = req.params;

  if (!['Curation', 'Post'].includes(postType)) {
    res.status(400).json({ success: false, message: '유효하지 않은 postType입니다.' });
    return;
  }

  try {
    const comments = await getCommentsByPostId(postId, postType as 'Curation' | 'Post');
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: '댓글 조회 중 오류가 발생했습니다.' });
  }
};
