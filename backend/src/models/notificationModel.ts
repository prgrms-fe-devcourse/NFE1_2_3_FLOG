import mongoose, { Document, mongo, Schema } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  fromUserId: mongoose.Types.ObjectId
  type: "like" | "comment" | "newPost"
  postId: mongoose.Types.ObjectId
  message: string
  isRead: boolean
  createdAt: Date
}

const notificationSchema: Schema<INotification> = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fromUserId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: { 
    type: String,
    enum: ["like", "comment", "newPost"],
    required: true
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
   },
  message: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export const notification = mongoose.model<INotification>("Notification", notificationSchema)