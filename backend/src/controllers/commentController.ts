import { Comment, Reply } from "./../models/commentModel";
import { Curation } from "./../models/curationModel";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { Post } from "../models/postModel";
import mongoose from "mongoose";
import { IReply } from "./../models/commentModel";

//댓글
// 댓글 생성 함수
export const createComment = async (req: Request, res: Response) => {
  console.log("createComment call");
  const { postId, postType } = req.params;
  const { content } = req.body;
  const authorId = req.user?._id;

  if (!authorId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  if (!["Curation", "Post"].includes(postType)) {
    res.status(400).json({ success: false, message: "유효하지 않은 postType입니다." });
    return;
  }

  try {
    const newComment = new Comment({
      postId,
      postType,
      authorId,
      content,
      likes: [],
      replies: [],
    });

    const savedComment = await newComment.save();
    
    // `postType`에 따라 Curation 또는 Post의 comments 배열에 새 댓글 추가
    const updateModel: any = postType === "Curation" ? Curation : Post;
    await updateModel.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "댓글 생성 중 오류가 발생했습니다.", error });
  }
};

// 특정 댓글 조회
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId)
      .populate("authorId", "nickname profileImage")
      .populate("replies.authorId", "nickname profileImage");

    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    // 응답 포맷
    const response = {
      content: comment.content,
      author: {
        userId: comment.authorId,
        nickname: comment.authorId.nickname,
        profileImage: comment.authorId.profileImage,
      },
      likes: comment.likes,
      replies: comment.replies,
      createdAt: comment.createAt,
    };

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 조회 중 오류가 발생했습니다.", error });
  }
};

// 댓글 삭제
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.body;

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }
    await Post.findByIdAndUpdate(deletedComment.postId, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 삭제 중 오류가 발생했습니다.", error });
  }
};

//댓글 수정
export const updateComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating comment", error });
  }
};

// 댓글 좋아요 기능
export const likeComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter((like) => !like.equals(userId));
    } else {
      comment.likes.push(new Types.ObjectId(userId));
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "좋아요 기능 처리 중 오류가 발생했습니다.", error });
  }
};

//대댓글
// 대댓글 생성
export const createReplies = async (req: Request, res: Response) => {
  console.log("createReplies call");
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const authorId = req.user?._id; // 인증된 사용자 ID를 req.user에서 가져옴

  if (!authorId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

    const newReply = new Reply({
      authorId,
      content,
      likes: [],
      createAt: new Date(),
    });

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    comment.replies.push(newReply);
    await comment.save();

    res.status(201).json(newReply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 생성 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 조회
export const getCommentByRepliesId = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId).populate(
      "replies.authorId",
      "nickname profileImage"
    );

    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    res.status(200).json(comment.replies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 조회 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 삭제
export const deleteReplies = async (req: Request, res: Response) => {
  try {
    const { commentId, replyId } = req.params;
    if (
      !mongoose.isValidObjectId(commentId) ||
      !mongoose.isValidObjectId(replyId)
    ) {
      res
        .status(400)
        .json({ message: "잘못된 댓글 또는 대댓글 ID 형식입니다." });
      return;
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    comment.replies = comment.replies.filter(
      (reply) => reply.id.toString() !== replyId
    );
    await comment.save();

    res.status(200).json({ message: "대댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 삭제 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 좋아요 기능
export const likeReplies = async (req: Request, res: Response) => {
  try {
    const { commentId, replyId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    const reply = comment.replies.find((r) => r.id.toString() === replyId);
    if (!reply) {
      res.status(404).json({ message: "대댓글을 찾을 수 없습니다." });
      return;
    }
    if (reply.likes.includes(userId)) {
      reply.likes = reply.likes.filter((like: any) => !like.equals(userId));
    } else {
      reply.likes.push(new Types.ObjectId(userId));
    }

    await comment.save();
    res.status(200).json(reply);
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 좋아요 처리 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 수정
export const updateRepliesId = async (req: Request, res: Response) => {
  try {
    const { commentId, replyId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    const reply = comment.replies.find((r) => r.id.toString() === replyId);

    if (!reply) {
      res.status(404).json({ message: "대댓글을 찾을 수 없습니다." });
      return;
    }

    reply.content = content;

    const saveResult = await comment.save();
    if (!saveResult) {
      res.status(500).json({ message: "대댓글 저장 중 오류가 발생했습니다." });
      return;
    }

    res
      .status(200)
      .json({ message: "대댓글이 성공적으로 수정되었습니다.", reply });
  } catch (error) {
    console.error("대댓글 수정 중 오류:", error); // 오류 로그
    res
      .status(500)
      .json({ message: "대댓글 수정 중 오류가 발생했습니다.", error });
  }
};
