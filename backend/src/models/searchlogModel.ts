import mongoose, { Document, mongo, Schema } from "mongoose";

export interface ISearchLog extends Document {
  _id: mongoose.Types.ObjectId;
  query: string;
  searchCount: number;
  createdAt: Date;
}

const searchLogSchema: Schema<ISearchLog> = new mongoose.Schema({
  query: { type: String, required: true },
  searchCount: { type: Number },
  createdAt: { type: Date, default: Date.now }
})

export const SearchLog = mongoose.model<ISearchLog>('SearchLog', searchLogSchema)