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
  await updateModel.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });

  return savedComment;
};

export const getCommentById = async (commentId: string) => {
  const comment = await Comment.findById(commentId)
    .populate("authorId", "nickname profileImage")
    .populate("replies.authorId", "nickname profileImage");
  return comment;
};

export const deleteComment = async (commentId: string, postType: string, userId: mongoose.Types.ObjectId) => {
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

export const updateComment = async (commentId: string, content: string, userId: mongoose.Types.ObjectId) => {
  const comment = await Comment.findById(commentId);
  
   // authorId와 userId를 문자열로 변환하여 비교
   if (!comment || comment.authorId.toString() !== userId.toString()) return null;

  comment.content = content;
  return await comment.save();
};

export const toggleLikeComment = async (commentId: string, userId: mongoose.Types.ObjectId) => {
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

// 대댓글 관련 서비스
export const createReply = async (commentId: string, authorId: mongoose.Types.ObjectId, content: string) => {
  const newReply = new Reply({ authorId, content, likes: [], createAt: new Date() });
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  comment.replies.push(newReply);
  await comment.save();
  return newReply;
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

export const deleteReply = async (commentId: string, replyId: string, userId: mongoose.Types.ObjectId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  const reply = comment.replies.find((r) => r.id.toString() === replyId);
  if (!reply || !reply.authorId.equals(userId)) return false;

  comment.replies = comment.replies.filter((r) => r.id.toString() !== replyId);
  await comment.save();
  return true;
};

export const updateReply = async (commentId: string, replyId: string, userId: mongoose.Types.ObjectId, content: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) return null;

  const reply = comment.replies.find((r) => r.id.toString() === replyId);
  if (!reply || !reply.authorId.equals(userId)) return false;

  reply.content = content;
  await comment.save();
  return reply;
};

export const toggleLikeReply = async (commentId: string, replyId: string, userId: mongoose.Types.ObjectId) => {
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
