import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./userModel";

//IComment 인터페이스
export interface IReply extends Document {
  authorId: mongoose.Types.ObjectId;
  content: string;
  likes: mongoose.Types.ObjectId[];
  createAt: Date;
}

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  authorId: IUser;
  content: string;
  likes: mongoose.Types.ObjectId[];
  replies: IReply[];
  createAt: Date;
}

//IComment 스키마
const replySchema: Schema<IReply> = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, require: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  createAt: { type: Date, default: Date.now },
});

const commentSchema: Schema<IComment> = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  replies: [replySchema],
  createAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
export const Reply = mongoose.model<IReply>("Reply", replySchema);
