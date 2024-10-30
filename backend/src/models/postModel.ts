import mongoose, { Document, Schema } from "mongoose";

// IPost 인터페이스
export interface IPost extends Document {
  title: string;
  authorId: mongoose.Types.ObjectId;
  thumbnail: string;
  content: string[];
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  status: "published" | "draft";
  postType: "post" | "promotion" | "event";
  genderFilter: ("남자" | "여자" | "전체")[];
  ageFilter: ("10대 미만" | "10대" | "20대" | "30대" | "40대" | "50대 이상" | "전체")[];
  styleFilter: ("casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체")[];
}

//IPost 스키마
const postSchema: Schema<IPost> = new Schema({
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  thumbnail: { type: String },
  content: [{ type: String, required: true }],
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: [] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["published", "draft"], default: "draft" },
  postType: {
    type: String,
    enum: ["post", "promotion", "event"],
    required: true,
  },
  genderFilter: [{ type: String, enum: ["남자", "여자", "전체"], default: "전체" }],
  ageFilter: [
    {
      type: String,
      enum: ["10대 미만", "10대", "20대", "30대", "40대", "50대 이상", "전체"],
      default: "전체",
    },
  ],
  styleFilter: [
    {
      type: String,
      enum: ["casual", "street", "feminine", "punk", "sporty", "business", "전체"],
      default: "전체",
    },
  ],
});

export const Post = mongoose.model<IPost>("Post", postSchema);
