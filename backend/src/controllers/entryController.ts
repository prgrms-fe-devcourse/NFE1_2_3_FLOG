import { Request, Response } from 'express';
import mongoose from "mongoose"; 
import { createEntry, getEntriesByCurationId, getEntryById, voteForEntry } from '../services/entryService';

// 출품작 생성 컨트롤러
export const createEntryController = async (req: Request, res: Response): Promise<void> => {
  const { curationId, title, photos, description } = req.body;
  const authorId = req.user?._id; // 인증된 사용자 ID
  if (!authorId) {
    res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
    return;
  }

  try {
    const newEntry = await createEntry({
        curationId, 
        title,
        authorId: new mongoose.Types.ObjectId(authorId), // ObjectId로 변환
        photos,
        description
      });
    res.status(201).json({ success: true, entry: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: '출품작 생성 중 오류가 발생했습니다.' });
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
    const updatedEntry = await voteForEntry(entryId, userId);
    if (!updatedEntry) {
      res.status(404).json({ success: false, message: '출품작을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({ success: true, entry: updatedEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: '투표 중 오류가 발생했습니다.' });
  }
};
