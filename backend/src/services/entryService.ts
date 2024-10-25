import { Entry, IEntry } from '../models/entryModel';
import { Curation } from '../models/curationModel'; 
import mongoose from 'mongoose';

// 출품작 생성 서비스 (트랜잭션 적용)
export const createEntry = async (entryData: Partial<IEntry>): Promise<IEntry> => {
    if (!entryData.curationId) {
      throw new Error('Curation ID is required to create an entry');
    }
  
    const session = await mongoose.startSession(); // 트랜잭션 세션 시작
    session.startTransaction(); // 트랜잭션 시작
  
    try {
      // 출품작 생성
      const newEntry = new Entry(entryData);
      await newEntry.save({ session }); // 트랜잭션 세션에 포함
  
      // 큐레이션에 출품작 추가
      await Curation.findByIdAndUpdate(entryData.curationId, {
        $push: { entries: newEntry._id }
      }, { session }); // 트랜잭션 세션에 포함
  
      await session.commitTransaction(); // 트랜잭션 커밋
      session.endSession(); // 세션 종료
  
      return newEntry;
  
    } catch (error) {
      await session.abortTransaction(); // 트랜잭션 롤백
      session.endSession(); // 세션 종료
      throw error; // 에러를 상위로 던짐
    }
  };

// 출품작 조회 서비스 (큐레이션 ID로 조회)
export const getEntriesByCurationId = async (curationId: string): Promise<IEntry[]> => {
  return await Entry.find({ curationId });
};

// 특정 출품작 조회 서비스
export const getEntryById = async (entryId: string): Promise<IEntry | null> => {
  return await Entry.findById(entryId);
};

// 출품작 투표 서비스 (투표한 사용자 추가)
export const voteForEntry = async (entryId: string, userId: string): Promise<IEntry | null> => {
  return await Entry.findByIdAndUpdate(
    entryId,
    { $addToSet: { votes: userId } }, // 중복 투표 방지
    { new: true }
  );
};
