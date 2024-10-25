import mongoose, { Document, Schema } from 'mongoose';

// ICuration 인터페이스
export interface ICuration extends Document {
  title: string;
  adminId: mongoose.Types.ObjectId;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
  content: string[];
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  entries: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  status: 'published' | 'draft';
  genderFilter: ('남자' | '여자' | '전체')[];
  ageFilter: ('10대 미만' | '10대' | '20대' | '30대' | '40대' | '50대 이상' | '전체')[];
  styleFilter: ('casual' | 'street' | 'feminine' | 'punk' | 'sporty' | 'business' | '전체')[];
}

// Curation 스키마 정의
const curationSchema: Schema<ICuration> = new mongoose.Schema({
  title: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },  // adminId 부분 수정
  thumbnail: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  content: [{ type: String }],
  tags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry', default: [] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  genderFilter: [{ type: String, enum: ['남자', '여자', '전체'], default: '전체' }], // 기본값 "전체"
  ageFilter: [{ type: String, enum: ['10대 미만', '10대', '20대', '30대', '40대', '50대 이상', '전체'], default: '전체' }], // 기본값 "전체"
  styleFilter: [{ type: String, enum: ['casual', 'street', 'feminine', 'punk', 'sporty', 'business', '전체'], default: '전체' }], // 기본값 "전체"
});

export const Curation = mongoose.model<ICuration>('Curation', curationSchema);
