import { Request, Response } from "express";
import {
  createComment as createCommentService,
  getCommentById as getCommentByIdService,
  deleteComment as deleteCommentService,
  updateComment as updateCommentService,
  toggleLikeComment as toggleLikeCommentService,
  getCurationComments as getCurationCommentsService,
  createReply as createReplyService,
  getRepliesByCommentId as getRepliesByCommentIdService,
  deleteReply as deleteReplyService,
  updateReply as updateReplyService,
  toggleLikeReply as toggleLikeReplyService,
  getPostCommentsService,
} from "../services/commentService";
import { Post } from "../models/postModel";
import { createNotification } from "./notificationController";
import mongoose from "mongoose";

// 댓글 생성
export const createComment = async (req: Request, res: Response) => {
  const { postId, postType } = req.params;
  const { content } = req.body;
  const authorId = req.user?._id;
  console.log(`authorId: ${authorId}`);

  if (!authorId) {
    console.error("인증되지 않은 사용자", { authorId });
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  if (!["Curation", "Post"].includes(postType)) {
    console.error("유효하지 않은 postType", { postType });
    res.status(400).json({ message: "유효하지 않은 postType입니다." });
    return;
  }

  console.log("postId:", postId);

  try {
    const comment = await createCommentService(
      postId,
      postType as "Curation" | "Post",
      authorId,
      content
    );

    // 댓글 작성후 알림 생성
    const post = await Post.findById(postId);
    const postAuthorId = post?.authorId;

    if (postAuthorId && postAuthorId !== authorId) {
      // 본인 게시물에는 알림X
      await createNotification(
        new mongoose.Types.ObjectId(postAuthorId),
        authorId,
        "comment",
        new mongoose.Types.ObjectId(postId),
        "새 댓글이 달렸습니다"
      );
    }

    res.status(201).json(comment);
    return;
  } catch (error) {
    console.error("댓글 생성 중 오류:", error);

    // 에러 메시지를 JSON으로 응답
    res.status(500).json({
      message: "댓글 생성 중 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "서버 오류",
      stack: error instanceof Error ? error.stack : undefined, // 스택 추적 추가
    });
    return;
  }
};

// 특정 댓글 조회
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await getCommentByIdService(commentId);

    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 조회 중 오류가 발생했습니다.", error });
  }
};

// 댓글 삭제
export const deleteComment = async (req: Request, res: Response) => {
  const { commentId, postType } = req.params;
  const userId = req.user?._id;

  // userId가 없는 경우 인증되지 않은 사용자로 처리
  if (!userId) {
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const deleted = await deleteCommentService(commentId, postType, userId);
    if (deleted === null) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    } else if (deleted === false) {
      res.status(403).json({ message: "삭제 권한이 없습니다." });
    } else {
      res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 삭제 중 오류가 발생했습니다.", error });
  }
};

// 댓글 수정
export const updateComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res
      .status(401)
      .json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const updatedComment = await updateCommentService(
      commentId,
      content,
      userId
    );
    if (!updatedComment) {
      res.status(404).json({
        message: "수정할 댓글을 찾을 수 없거나 수정 권한이 없습니다.",
      });
      return;
    }

    res.status(200).json({
      message: "댓글이 성공적으로 수정되었습니다.",
      comment: updatedComment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 수정 중 오류가 발생했습니다.", error });
  }
};

// 댓글 좋아요 기능
export const likeComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user?._id;

  // userId가 없는 경우 인증되지 않은 사용자로 처리
  if (!userId) {
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const comment = await toggleLikeCommentService(commentId, userId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ success: true, likes: comment.likes.length });
  } catch (error) {
    res
      .status(500)
      .json({ message: "좋아요 기능 처리 중 오류가 발생했습니다.", error });
  }
};

// 특정 큐레이션의 댓글 목록 조회
export const getCurationComments = async (req: Request, res: Response) => {
  const { curationId } = req.params;

  try {
    const comments = await getCurationCommentsService(curationId);
    if (!comments) {
      res
        .status(404)
        .json({ success: false, message: "큐레이션을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "댓글 목록 조회 중 오류가 발생했습니다.",
      error,
    });
  }
};

//특정 포스트의 댓글 목록 조회
export const getPostComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  try {
    const comments = await getPostCommentsService(postId);
    if (!comments) {
      res
        .status(404)
        .json({ success: false, message: "포스트를 찾을 수 없습니다." });
      return;
    }

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "댓글 목록 조회 중 오류가 발생했습니다.",
      error,
    });
  }
};

// 대댓글 생성
export const createReplies = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const authorId = req.user?._id;

  if (!authorId) {
    res
      .status(401)
      .json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const reply = await createReplyService(commentId, authorId, content);
    if (!reply) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(201).json(reply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 생성 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 조회
export const getRepliesByCommentId = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const replies = await getRepliesByCommentIdService(commentId);

    if (!replies) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json(replies);
  } catch (error) {
    console.error("대댓글 조회 중 오류:", error); // 오류 로그
    res
      .status(500)
      .json({ message: "대댓글 조회 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 삭제
export const deleteReplies = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const deleted = await deleteReplyService(commentId, replyId, userId);
    if (deleted === null) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    } else if (deleted === false) {
      res.status(403).json({ message: "삭제 권한이 없습니다." });
    } else {
      res.status(200).json({ message: "대댓글이 성공적으로 삭제되었습니다." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 삭제 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 수정
export const updateRepliesId = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params;
  const { content } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const reply = await updateReplyService(commentId, replyId, userId, content);
    if (!reply) {
      res.status(403).json({ message: "수정 권한이 없습니다." });
      return;
    }

    res
      .status(200)
      .json({ message: "대댓글이 성공적으로 수정되었습니다.", reply });
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 수정 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 좋아요 기능
export const likeReplies = async (req: Request, res: Response) => {
  const { commentId, replyId } = req.params;
  const userId = req.user?._id;

  // userId가 없는 경우 인증되지 않은 사용자로 처리
  if (!userId) {
    res.status(401).json({ message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const reply = await toggleLikeReplyService(commentId, replyId, userId);
    if (!reply) {
      res.status(404).json({ message: "대댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json(reply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 좋아요 처리 중 오류가 발생했습니다.", error });
  }
};
