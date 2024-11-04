import { Entry, IEntry } from '../models/entryModel';
import { Curation } from '../models/curationModel'; 
import mongoose from 'mongoose';

// 출품작 생성 서비스
export const createEntry = async (entryData: Partial<IEntry>): Promise<IEntry> => {
  if (!entryData.curationId) {
      throw new Error('Curation ID is required to create an entry');
  }

   // 동일한 큐레이션과 사용자로 이미 출품한 기록이 있는지 확인
   const existingEntry = await Entry.findOne({
    curationId: entryData.curationId,
    authorId: entryData.authorId,
});

if (existingEntry) {
    throw new Error('이미 이 큐레이션에 출품한 사용자입니다.');
}

  // 출품작 생성
  const newEntry = new Entry(entryData);
  await newEntry.save(); // 트랜잭션 없이 저장

  // 큐레이션에 출품작 추가
  await Curation.findByIdAndUpdate(entryData.curationId, {
      $push: { entries: newEntry._id }
  });

  return newEntry;
};

// 출품작 조회 서비스 (큐레이션 ID로 조회)
export const getEntriesByCurationId = async (curationId: string): Promise<IEntry[]> => {
  return await Entry.find({ curationId }).populate('authorId', 'nickname profileImage');
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
