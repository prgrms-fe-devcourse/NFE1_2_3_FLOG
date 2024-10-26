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
  photos: { 
    type: [String], 
    required: true, 
    validate: {
      validator: function(v: any) {
        // 디버깅용 로그 추가
        console.log("Validator Input: ", v);
  
        // photos 필드가 배열인지 확인
        if (!Array.isArray(v)) {
          console.log("Error: Not an array");
          return false;
        }
  
        // 배열 요소가 최소 1개 이상, 최대 3개 이하인지 확인
        if (v.length < 1 || v.length > 3) {
          console.log("Error: Invalid array length");
          return false;
        }
  
        // 각 요소가 문자열이고 공백이 아닌지 확인
        const allStrings = v.every((photo: any) => typeof photo === 'string' && photo.trim() !== '');
        if (!allStrings) {
          console.log("Error: Invalid array elements");
          return false;
        }
  
        return true; // 유효한 경우
      },
      message: '사진은 최소 1장, 최대 3장이어야 하며, 각각 유효한 문자열이어야 합니다.'
    }
  },  
  description: { type: String, maxlength: 20 },
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
  createdAt: { type: Date, default: Date.now }
});

export const Entry = mongoose.model<IEntry>('Entry', entrySchema);
