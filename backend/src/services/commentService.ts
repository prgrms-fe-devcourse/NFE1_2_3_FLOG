import { Comment, IComment, IReply } from '../models/commentModel';
import { Curation } from '../models/curationModel'; 
import { Post } from '../models/postModel'; 

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
 
   // 댓글 저장
   const savedComment = await newComment.save();

   // 큐레이션 또는 게시물에 댓글 ID 추가
   if (postType === "Curation") {
     await Curation.findByIdAndUpdate(
       postId,
       { $push: { comments: savedComment._id } }
     );
   } else if (postType === "Post") {
     await Post.findByIdAndUpdate(
       postId,
       { $push: { comments: savedComment._id } }
     );
   }
 
   return savedComment;
};

// 특정 댓글 또는 대댓글에 대댓글 추가
export const addReply = async (
    commentId: string,
    replyData: Partial<IReply>,
    parentReplyId?: string
  ): Promise<IComment | null> => {
    const newReply = {
      ...replyData,
      createdAt: new Date(),
    };
  
    if (parentReplyId) {
      // 특정 대댓글에 대댓글을 추가
      return await Comment.findOneAndUpdate(
        { _id: commentId, 'replies._id': parentReplyId },
        { $push: { 'replies.$.replies': newReply } },
        { new: true }
      );
    } else {
      // 댓글에 대댓글 추가
      return await Comment.findByIdAndUpdate(
        commentId,
        { $push: { replies: newReply } },
        { new: true }
      );
    }
  };
  
// 특정 postId에 달린 댓글 목록 조회 서비스
export const getCommentsByPostId = async (
  postId: string,
  postType: 'Curation' | 'Post'
): Promise<IComment[]> => {
  return await Comment.find({ postId, postType });
};
