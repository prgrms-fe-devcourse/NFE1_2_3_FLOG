import mongoose, { Document, Schema } from 'mongoose';

// Entry 인터페이스 정의
export interface IEntry extends Document {
  curationId: mongoose.Types.ObjectId;
  title: string;
  authorId: mongoose.Types.ObjectId;
  photos: string[];
  description?: string;
  votes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

// Entry 스키마 정의
const entrySchema: Schema<IEntry> = new mongoose.Schema({
  curationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Curation' },
  title: { type: String, required: true, maxlength: 50 },
  authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  photos: [{ 
    type: String, 
    required: true, 
    validate: {
      validator: function(v: string[]) {
        return v.length >= 1 && v.length <= 3;  // 최소 1개, 최대 3개 사진
      },
      message: '사진은 최소 1장, 최대 3장이어야 합니다.'
    }
  }],
  description: { type: String, maxlength: 20 },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now }
});

export const Entry = mongoose.model<IEntry>('Entry', entrySchema);
