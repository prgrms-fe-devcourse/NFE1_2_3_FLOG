import { Curation } from '../models/curationModel';
import { Comment } from '../models/commentModel';
import mongoose from 'mongoose';

export const toggleCurationLike = async (curationId: string, userId: mongoose.Types.ObjectId) => {
  const curation = await Curation.findById(curationId);
  if (!curation) throw new Error('큐레이션을 찾을 수 없습니다.');

  const isLiked = curation.likes.some((id) => id.equals(userId));
  if (isLiked) {
    // 좋아요 취소
    curation.likes = curation.likes.filter((id) => !id.equals(userId));
  } else {
    // 좋아요 추가
    curation.likes.push(userId);
  }

  await curation.save();
  return curation;
};

export const toggleCommentLike = async (commentId: string, userId: mongoose.Types.ObjectId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error('댓글을 찾을 수 없습니다.');

  const isLiked = comment.likes.some((id) => id.equals(userId));
  if (isLiked) {
    // 좋아요 취소
    comment.likes = comment.likes.filter((id) => !id.equals(userId));
  } else {
    // 좋아요 추가
    comment.likes.push(userId);
  }

  await comment.save();
  return comment;
};
