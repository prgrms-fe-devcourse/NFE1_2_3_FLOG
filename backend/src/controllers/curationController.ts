import { Request, Response } from 'express';
import {
  getCurations,
  getCurationById,
  createCuration, 
  updateCuration,
  deleteCuration,
  toggleCurationLike,
  getRecommendCurationListService
} from '../services/curationService';
import mongoose from 'mongoose';

// 추천 큐레이션 리스트 조회
export const getRecommedCurationList = async (req: Request, res: Response) => {
  try {
    // 일주일 이내의 큐레이션 리스트
    const originalList = await getRecommendCurationListService();
    // 를 좋아요 순으로 솔트한 큐레이션 리스트
    const sortedList = originalList.sort((a, b) => {
      return b.likes.length - a.likes.length
    })
    // 를 3개만 잘라서 보내욧!
    const slicedList = sortedList.slice(0, 3)

    res.status(200).json({ success: true, curationList: slicedList })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: '추천 큐레이션 리스트를 불러오는 중 오류가 발생하였습니다.',
      err
    })
  }
}

// 큐레이션 리스트 조회 (어드민과 일반 사용자 구분)
export const getCurationList = async (req: Request, res: Response) => {
  const { page = 1, style = '전체', gender = '전체', age = '전체', searchQuery, status } = req.query;
  const isAdmin = (req as any).user?.isAdmin || false;  // 어드민 여부 확인 (JWT 등의 인증방식에서 가져옴)

   // 필터 객체 초기화
   const filters: any = {
    styleFilter: '전체',
    genderFilter: '전체',
    ageFilter: '전체',
   };

   // 필터 값이 있을 경우에만 필터 추가 ('전체'는 필터링에서 제외)
  if (style && style !== '전체') {
    filters.styleFilter = style;
  }
  if (gender && gender !== '전체') {
    filters.genderFilter = gender;
  }
  if (age && age !== '전체') {
    const ageArray = (age as string).split(',');  // "20대,30대" 형식으로 나이를 배열로 변환
    filters.ageFilter = { $in: ageArray };
  }
  if (searchQuery) {
    filters.$or = [
      { title: { $regex: searchQuery, $options: 'i' } }, // 대소문자 구분 없이 검색
      { content: { $regex: searchQuery, $options: 'i' } }
    ];
  }

   // 어드민일 경우 status를 요청에서 가져오고, 그렇지 않을 경우 'published'로 고정
   if (isAdmin) {
    if (status) {
      filters.status = status; // 관리자가 임시저장(draft) 큐레이션을 조회하고 싶다면 이 필터 사용
    }
  } else {
    filters.status = 'published'; // 일반 사용자는 출간된 큐레이션만 조회 가능
  }

  try {
    const curations = await getCurations(Number(page), filters);
    res.status(200).json({ success: true, curations });
  } catch (error) {
    res.status(500).json({ success: false, message: '큐레이션을 불러오는 중 오류가 발생했습니다.' });
  }
};

// 특정 큐레이션 조회 (어드민/일반 사용자 구분)
export const getCuration = async (req: Request, res: Response): Promise<void> => {
    const { curationId } = req.params;
    const isAdmin = (req as any).user?.isAdmin || false;  // 어드민 여부 확인
  
    try {
      const curation = await getCurationById(curationId);
      if (!curation) {
        res.status(404).json({ success: false, message: '큐레이션을 찾을 수 없습니다.' });
        return;
      }
  
      // 어드민이 아니고 큐레이션이 출간되지 않았다면 접근 불가
      if (!isAdmin && curation.status !== 'published') {
        res.status(403).json({ success: false, message: '이 큐레이션에 접근할 수 없습니다.' });
        return;
      }
  
      res.status(200).json({ success: true, curation });
    } catch (error) {
      res.status(500).json({ success: false, message: '큐레이션을 불러오는 중 오류가 발생했습니다.' });
    }
  };
  
  // 큐레이션 생성 (어드민만 가능)
  export const createCurationController = async (req: Request, res: Response): Promise<void> => {
    const isAdmin = (req as any).user?.isAdmin || false; // 어드민 여부 확인
    const adminId = (req as any).user?._id; // 토큰에서 추출한 admin의 userId

    if (!isAdmin) {
      res.status(403).json({ success: false, message: '큐레이션을 생성할 권한이 없습니다.' });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      res.status(400).json({ success: false, message: '유효하지 않은 관리자 ID입니다.' });
      return;
    }
  
    try {
      const newCuration = await createCuration({ ...req.body, adminId });
      res.status(201).json({ success: true, curation: newCuration });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: '큐레이션 생성 중 알 수 없는 오류가 발생했습니다.' });
      }
    }
  };  

  // 특정 큐레이션 수정 (관리자만)
export const updateCurationController = async (req: Request, res: Response) => {
  const { curationId } = req.params;
  const isAdmin = (req as any).user?.isAdmin || false;
  const updates = req.body;

  if (!isAdmin) {
    res.status(403).json({ success: false, message: '큐레이션을 수정할 권한이 없습니다.' });
    return;
  }

  try {
    const updatedCuration = await updateCuration(curationId, updates);
    if (!updatedCuration) {
      res.status(404).json({ success: false, message: '큐레이션을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({ success: true, curation: updatedCuration });
  } catch (error) {
    res.status(500).json({ success: false, message: '큐레이션 수정 중 오류가 발생했습니다.' });
  }
};

// 특정 큐레이션 삭제 (관리자만)
export const deleteCurationController = async (req: Request, res: Response) => {
  const { curationId } = req.params;
  const isAdmin = (req as any).user?.isAdmin || false;

  if (!isAdmin) {
    res.status(403).json({ success: false, message: '큐레이션을 삭제할 권한이 없습니다.' });
    return;
  }

  try {
    const deleted = await deleteCuration(curationId);
    if (!deleted) {
      res.status(404).json({ success: false, message: '큐레이션을 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({ success: true, message: '큐레이션이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ success: false, message: '큐레이션 삭제 중 오류가 발생했습니다.' });
  }
};

  export const likeCurationController = async (req: Request, res: Response) => {
    const { curationId } = req.params;
    const userId = req.user?._id;
  
    if (!userId) {
      res.status(401).json({ success: false, message: "인증된 사용자가 아닙니다." });
      return;
    }
  
    try {
      const curation = await toggleCurationLike(curationId, userId);
      res.status(200).json({ success: true, likes: curation.likes.length });
    } catch (error) {
      // Error 타입인지 확인한 후, message에 접근
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: "좋아요 처리 중 알 수 없는 오류가 발생했습니다." });
      }
    }
  };