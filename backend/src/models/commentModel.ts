import mongoose, { Document, Schema } from 'mongoose';

export interface IReply {
  authorId: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  replies: IReply[];
  createdAt: Date;
}
export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  postType: 'Curation' | 'Post';
  authorId: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  replies: IReply[];
  createdAt: Date;
}

const replySchema = new Schema<IReply>({
    authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply', default: [] }], // 대댓글에 대한 대댓글
    createdAt: { type: Date, default: Date.now },
  });
  
const commentSchema = new Schema<IComment>({
  postId: { type: Schema.Types.ObjectId, required: true, refPath: 'postType' },
  postType: { type: String, required: true, enum: ['Curation', 'Post'] },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User', default: [] }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);