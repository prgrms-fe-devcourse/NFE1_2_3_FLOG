import { Comment, Reply } from "../models/commentModel";
import { Curation } from "../models/curationModel";
import { Post } from "../models/postModel";
import mongoose from "mongoose";

export const createComment = async (
  postId: string,
  postType: "Curation" | "Post",
  authorId: mongoose.Types.ObjectId,
  content: string
) => {
  const newComment = new Comment({
    postId,
    postType,
    authorId,
    content,
    likes: [],
    replies: [],
  });

  const savedComment = await newComment.save();

  const updateModel: any = postType === "Curation" ? Curation : Post;
  await updateModel.findByIdAndUpdate(postId, {
    $push: { comments: savedComment._id },
  });

  return savedComment;
};

export const getCommentById = async (commentId: string) => {
  const comment = await Comment.findById(commentId)
    .populate("authorId", "nickname profileImage")
    .populate("replies.authorId", "nickname profileImage");
  return comment;
};

export const deleteComment = async (
  commentId: string,
  postType: string,
  userId: mongoose.Types.ObjectId
) => {
  const deletedComment = await Comment.findById(commentId);
  if (!deletedComment) return null;

  // `ObjectId`를 문자열로 변환하여 비교
  if (deletedComment.authorId.toString() !== userId.toString()) return false;
  // 삭제 작업
  await Comment.findByIdAndDelete(commentId);
  const updateModel: any = postType === "Curation" ? Curation : Post;

  await updateModel.findByIdAndUpdate(deletedComment.postId, {
    $pull: { comments: commentId },
  });

  return true;
};

export const updateComment = async (
  commentId: string,
  content: string,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);

  // authorId와 userId를 문자열로 변환하여 비교
  if (!comment || comment.authorId.toString() !== userId.toString())
    return null;

  comment.content = content;
  return await comment.save();
};

export const toggleLikeComment = async (
  commentId: string,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  if (comment.likes.includes(userId)) {
    comment.likes = comment.likes.filter((like) => !like.equals(userId));
  } else {
    comment.likes.push(userId);
  }

  await comment.save();
  return comment;
};

export const getCurationComments = async (curationId: string) => {
  return await Comment.find({ postId: curationId, postType: "Curation" })
    .populate("authorId", "nickname profileImage")
    .populate("replies.authorId", "nickname profileImage")
    .sort({ createdAt: -1 });
};

// 포스트 댓글 조회 서비스 함수
export const getPostCommentsService = async (postId: string) => {
  return await Comment.find({ postId, postType: "Post" })
    .populate("authorId", "nickname profileImage")
    .populate("replies.authorId", "nickname profileImage")
    .sort({ createdAt: -1 });
};

// 대댓글 관련 서비스
export const createReply = async (
  commentId: string,
  authorId: mongoose.Types.ObjectId,
  content: string
) => {
  try {
    // 새로운 대댓글 생성
    const newReply = new Reply({
      authorId,
      content,
      likes: [],
      createAt: new Date(),
    });

    // 댓글을 찾기
    const comment = await Comment.findById(commentId);
    if (!comment) return null; // 댓글이 없으면 null 반환

    // 대댓글을 댓글의 replies 배열에 추가
    comment.replies.push(newReply);

    // 대댓글을 먼저 저장
    await newReply.save(); // 대댓글 저장

    // 댓글을 업데이트하여 대댓글을 추가
    await comment.save(); // 댓글 업데이트

    return newReply; // 생성된 대댓글 반환
  } catch (error) {
    console.error("대댓글 생성 중 오류:", error);
    throw new Error("대댓글 생성 중 오류가 발생했습니다.");
  }
};
// 대댓글 조회 서비스
export const getRepliesByCommentId = async (commentId: string) => {
  const comment = await Comment.findById(commentId).populate(
    "replies.authorId",
    "nickname profileImage"
  );

  if (!comment) return null;
  return comment.replies;
};

export const deleteReply = async (
  commentId: string,
  replyId: string,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  const reply = comment.replies.find((r) => r.id.toString() === replyId);
  if (!reply || !reply.authorId.equals(userId)) return false;

  comment.replies = comment.replies.filter((r) => r.id.toString() !== replyId);
  await comment.save();
  return true;
};

export const updateReply = async (
  commentId: string,
  replyId: string,
  userId: mongoose.Types.ObjectId,
  content: string
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  const reply = comment.replies.find((r) => r.id.toString() === replyId);
  if (!reply || !reply.authorId.equals(userId)) return false;

  reply.content = content;
  await comment.save();
  return reply;
};

export const toggleLikeReply = async (
  commentId: string,
  replyId: string,
  userId: mongoose.Types.ObjectId
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  const reply = comment.replies.find((r) => r.id.toString() === replyId);
  if (!reply) return null;

  if (reply.likes.includes(userId)) {
    reply.likes = reply.likes.filter((like) => !like.equals(userId));
  } else {
    reply.likes.push(userId);
  }

  await comment.save();
  return reply;
};
