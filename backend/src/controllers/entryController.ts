import { Request, Response } from 'express';
import mongoose from "mongoose"; 
import { createEntry, getEntriesByCurationId, getEntryById, voteForEntry } from '../services/entryService';

// 출품작 생성 컨트롤러
export const createEntryController = async (req: Request, res: Response): Promise<void> => {
  const { title, photos, description } = req.body;
  const { curationId } = req.params; // URL에서 curationId 가져옴
  const authorId = req.user?._id; // 인증된 사용자 ID

  // photos 필드가 배열로 전달되는지 확인하는 로그
  console.log("Request body photos field: ", req.body.photos); // 여기에서 req.body.photos의 값 확인

  if (!authorId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(curationId)) {
    res.status(400).json({ success: false, message: "유효하지 않은 큐레이션 ID입니다." });
    return;
  }

   // photos 필드가 배열인지 확인
   if (!Array.isArray(photos)) {
    res.status(400).json({ success: false, message: "photos 필드는 배열이어야 합니다." });
    return;
  }
  
  try {
    const newEntry = await createEntry({
      curationId: new mongoose.Types.ObjectId(curationId), // URL에서 가져온 curationId를 ObjectId로 변환
        title,
        authorId: new mongoose.Types.ObjectId(authorId), // ObjectId로 변환
        photos,
        description
      });
    res.status(201).json({ success: true, entry: newEntry });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: '출품작 생성 중 알 수 없는 오류가 발생했습니다.' });
    }
  }
};

// 큐레이션 ID로 출품작 리스트 조회 컨트롤러
export const getEntriesByCurationController = async (req: Request, res: Response): Promise<void> => {
  const { curationId } = req.params;

  try {
    const entries = await getEntriesByCurationId(curationId);
    res.status(200).json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: '출품작을 불러오는 중 오류가 발생했습니다.' });
  }
};

// 특정 출품작 조회 컨트롤러
export const getEntryController = async (req: Request, res: Response): Promise<void> => {
  const { entryId } = req.params;

  try {
    const entry = await getEntryById(entryId);
    if (!entry) {
      res.status(404).json({ success: false, message: '출품작을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({ success: true, entry });
  } catch (error) {
    res.status(500).json({ success: false, message: '출품작 조회 중 오류가 발생했습니다.' });
  }
};

// 출품작 투표 컨트롤러
export const voteForEntryController = async (req: Request, res: Response): Promise<void> => {
  const { entryId } = req.params;
  const userId = req.user?._id;
  if (!userId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const updatedEntry = await voteForEntry(entryId, userId.toString());
    if (!updatedEntry) {
      res.status(404).json({ success: false, message: '출품작을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({ success: true, entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: '투표 중 오류가 발생했습니다.' });
  }
};
