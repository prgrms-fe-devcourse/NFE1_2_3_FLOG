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
    const { commentId, postType, postId } = req.params; // postType, postId를 params로 받아옴
    const userId = req.user?._id; // 인증된 사용자 ID 가져오기

  if (!userId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    // 삭제하려는 유저가 댓글 작성자가 맞는지 확인
if (deletedComment.authorId.toString() !== userId.toString()) {
  res.status(403).json({ success: false, message: "삭제 권한이 없습니다." });
  return;
}

    // postType에 따라 Curation 또는 Post 모델 업데이트
    const updateModel: any = postType === "Curation" ? Curation : Post;
    await updateModel.findByIdAndUpdate(deletedComment.postId, {
      $pull: { comments: commentId },
    });

    res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "댓글 삭제 중 오류가 발생했습니다.", error });
  }
};

//댓글 수정
export const updateComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const userId = req.user?._id; // 인증된 사용자 ID 가져오기

  if (!userId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    // 수정할 댓글 찾기
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      return;
    }

    // 수정하려는 유저가 댓글 작성자가 맞는지 확인
    if (comment.authorId.toString() !== userId.toString()) {
      res.status(403).json({ success: false, message: "수정 권한이 없습니다." });
      return;
    }

    // 댓글 내용 업데이트
    comment.content = content;
    const updatedComment = await comment.save();

    res.status(200).json({
      message: "댓글이 성공적으로 수정되었습니다.",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ message: "댓글 수정 중 오류가 발생했습니다.", error });
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

// 특정 큐레이션의 댓글 목록 조회
export const getCurationComments = async (req: Request, res: Response) => {
  const { curationId } = req.params;

  try {
    // 큐레이션이 존재하는지 확인
    const curationExists = await Curation.findById(curationId);
    if (!curationExists) {
      res.status(404).json({ success: false, message: "큐레이션을 찾을 수 없습니다." });
      return;
    }

    // 큐레이션에 달린 댓글을 조회
    const comments = await Comment.find({ postId: curationId, postType: "Curation" })
      .populate("authorId", "nickname profileImage") // 작성자 정보 포함
      .populate("replies.authorId", "nickname profileImage") // 대댓글 작성자 정보 포함
      .sort({ createdAt: -1 }); // 최신 순으로 정렬

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("댓글 목록 조회 중 오류:", error);
    res.status(500).json({ success: false, message: "댓글 목록 조회 중 오류가 발생했습니다.", error });
  }
};

//대댓글
// 대댓글 생성
export const createReplies = async (req: Request, res: Response) => {
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
    const userId = req.user?._id; // 인증된 사용자 ID 가져오기

    if (!userId) {
      res.status(401).json({ message: "인증된 사용자가 아닙니다." });
      return;
    }

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

     // 대댓글 찾기
     const reply = comment.replies.find((r) => r.id.toString() === replyId);

     if (!reply) {
       res.status(404).json({ message: "대댓글을 찾을 수 없습니다." });
       return;
     }
 
     // 삭제하려는 유저가 대댓글 작성자가 맞는지 확인
     if (!reply.authorId.equals(userId)) {
       res.status(403).json({ message: "삭제 권한이 없습니다." });
       return;
     }
 
     // 대댓글 삭제
     comment.replies = comment.replies.filter(
       (r) => r.id.toString() !== replyId
     );
     await comment.save();
 
     res.status(200).json({ message: "대댓글이 성공적으로 삭제되었습니다." });
   } catch (error) {
     console.error("대댓글 삭제 중 오류:", error);
     res.status(500).json({ message: "대댓글 삭제 중 오류가 발생했습니다.", error });
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
    const userId = req.user?._id; // 인증된 사용자 ID 가져오기

    if (!userId) {
      res.status(401).json({ message: "인증된 사용자가 아닙니다." });
      return;
    }

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

    // 수정하려는 유저가 대댓글 작성자가 맞는지 확인
    if (!reply.authorId.equals(userId)) {
      res.status(403).json({ message: "수정 권한이 없습니다." });
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
