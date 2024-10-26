import { Comment, IComment } from '../models/commentModel';

// 댓글 생성 서비스
export const createComment = async (
  postId: string,
  postType: 'Curation' | 'Post',
  authorId: string,
  content: string
): Promise<IComment> => {
  const newComment = new Comment({
    postId,
    postType,
    authorId,
    content,
  });
  return await newComment.save();
};

// 특정 postId에 달린 댓글 목록 조회 서비스
export const getCommentsByPostId = async (
  postId: string,
  postType: 'Curation' | 'Post'
): Promise<IComment[]> => {
  return await Comment.find({ postId, postType });
};
