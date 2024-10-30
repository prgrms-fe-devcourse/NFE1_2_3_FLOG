// src/models/userModel.ts

import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// 회원가입 유저 인터페이스 정의
export interface IUser extends Document {
  userId: string;
  password: string;
  nickname: string;
  profileImage?: string;
  blogName?: string;
  bio?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  bookmarkedPosts?: mongoose.Types.ObjectId[];
  isAdmin?: boolean;
  notifications?: mongoose.Types.ObjectId[];
  tier?: string;
  points?: number;
  styleActivities?: {
    casual?: mongoose.Types.ObjectId[];
    street?: mongoose.Types.ObjectId[];
    feminine?: mongoose.Types.ObjectId[];
    punk?: mongoose.Types.ObjectId[];
    sporty?: mongoose.Types.ObjectId[];
    business?: mongoose.Types.ObjectId[];
  };
  curationParticipations?: {
    curationId: mongoose.Types.ObjectId;
    participationDate: Date;
    award: {
      isWinner: boolean;
      position: string;
    };
  }[];
  lifetimeItem?: {
    brandName: string;
    productName: string;
    description: string;
    photoUrl: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>; // comparePassword 추가
}

// 회원가입 유저 스키마 정의
const userSchema = new mongoose.Schema<IUser>({
  userId: { type: String, required: true, maxlength: 16, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true, maxlength: 20 },
  profileImage: { type: String },
  blogName: { type: String },
  bio: { type: String },
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  bookmarkedPosts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  isAdmin: { type: Boolean, default: false },
  notifications: [{ type: mongoose.Types.ObjectId, ref: "Notification" }],
  tier: { type: String },
  points: { type: Number, default: 0 },
  styleActivities: {
    casual: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    street: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    feminine: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    punk: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    sporty: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    business: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  },
  curationParticipations: [
    {
      curationId: { type: mongoose.Types.ObjectId, ref: "Curation" },
      participationDate: { type: Date },
      award: {
        isWinner: { type: Boolean, default: false },
        position: { type: String },
      },
    },
  ],
  lifetimeItem: {
    brandName: { type: String },
    productName: { type: String },
    description: { type: String },
    photoUrl: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// 비밀번호 비교 메서드 추가
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 모델 생성
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
