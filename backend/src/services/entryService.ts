import { Entry, IEntry } from '../models/entryModel';

// 출품작 생성 서비스
export const createEntry = async (entryData: Partial<IEntry>): Promise<IEntry> => {
  const newEntry = new Entry(entryData);
  return await newEntry.save(); // DB에 저장
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
