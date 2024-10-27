import { Comment, Reply } from "./../models/commentModel";
import { Request, Response } from "express";
import { Types } from "mongoose"; // Types를 임포트
import { Post } from "../models/postModel";
import mongoose from "mongoose";
import { IReply } from "./../models/commentModel";

//댓글
// 댓글 생성 함수
export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, authorId, content } = req.body;

    const newComment = new Comment({
      postId,
      authorId,
      content,
      likes: [],
      replies: [],
    });

    const savedComment = await newComment.save();
    // 해당 게시물의 comments 배열에 새 댓글 추가
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "댓글 생성 중 오류가 발생했습니다.", error });
  }
};

// 특정 댓글 조회
export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    // 댓글 조회
    const comment = await Comment.findById(commentId)
      .populate("authorId", "nickname profileImage") // 작성자 정보에서 닉네임과 프로필 이미지만 선택
      .populate("replies.authorId", "nickname profileImage"); // 댓글의 답글 작성자 정보

    // 댓글이 존재하지 않을 경우 처리
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    // 응답 포맷
    const response = {
      content: comment.content,
      author: {
        userId: comment.authorId,
        nickname: comment.authorId.nickname, // populate로 가져온 데이터에서 닉네임 추출
        profileImage: comment.authorId.profileImage, // populate로 가져온 데이터에서 프로필 이미지 추출
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
    // ObjectId 유효성 검증
    if (!mongoose.isValidObjectId(commentId)) {
      res.status(400).json({ message: "잘못된 댓글 ID 형식입니다." });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }
    // 게시물에서 삭제된 댓글 ID 제거
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
  const { commentId } = req.params; // URL 파라미터에서 댓글 ID 가져오기
  const { content } = req.body; // 요청 본문에서 수정할 내용 가져오기

  try {
    // 댓글 업데이트
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content }, // 수정할 내용
      { new: true } // 수정된 댓글 객체 반환
    );

    // 댓글이 존재하지 않을 경우
    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    // 수정된 댓글 반환
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
  try {
    const { commentId } = req.params; // 댓글 ID
    const { authorId, content } = req.body; // 대댓글 작성자 ID와 내용

    // 대댓글 객체 생성
    const newReply = new Reply({
      // Reply 모델을 사용하여 새 대댓글 생성
      authorId,
      content,
      likes: [], // 기본값으로 빈 배열
      createAt: new Date(), // 현재 시간
    });

    // 댓글에 대댓글 추가
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    // 댓글의 replies 배열에 대댓글 추가
    comment.replies.push(newReply); // IReply 형태로 새로운 대댓글을 추가
    await comment.save(); // 댓글 저장

    res.status(201).json(newReply); // 새 대댓글 응답
  } catch (error) {
    res
      .status(500)
      .json({ message: "대댓글 생성 중 오류가 발생했습니다.", error });
  }
};

// 대댓글 조회
export const getCommentByRepliesId = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params; // URL 파라미터에서 댓글 ID 가져오기

    // 댓글 조회
    const comment = await Comment.findById(commentId).populate(
      "replies.authorId",
      "nickname profileImage"
    ); // 대댓글 작성자 정보

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
    const { commentId, replyId } = req.params; // 댓글 ID 가져오기
    // ObjectId 유효성 검증
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

    // 대댓글 삭제
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
    const { commentId, replyId } = req.params; // URL 파라미터에서 댓글 ID와 대댓글 ID 가져오기
    const { userId } = req.body; // 요청 본문에서 사용자 ID 가져오기

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

    // 좋아요 추가 또는 제거
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
    const { commentId, replyId } = req.params; // URL 파라미터에서 댓글 ID와 대댓글 ID 가져오기
    const { content } = req.body; // 요청 본문에서 수정할 내용 가져오기

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

    // 대댓글 내용 수정
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
