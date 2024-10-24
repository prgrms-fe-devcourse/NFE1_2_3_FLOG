import { Request, Response } from 'express';
import { getCurations, getCurationById, createCuration } from '../services/curationService';

// 큐레이션 리스트 조회 (어드민과 일반 사용자 구분)
export const getCurationList = async (req: Request, res: Response) => {
  const { page = 1, style = '전체', gender = '전체', age = '전체', searchQuery } = req.query;
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

  if (!isAdmin) {
    // 어드민이 아닐 경우 출간된 큐레이션만 조회 가능
    filters.status = 'published';
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
  
    if (!isAdmin) {
      res.status(403).json({ success: false, message: '큐레이션을 생성할 권한이 없습니다.' });
      return;
    }
  
    try {
      const newCuration = await createCuration(req.body);
      res.status(201).json({ success: true, curation: newCuration });
    } catch (error) {
      res.status(500).json({ success: false, message: '큐레이션 생성 중 오류가 발생했습니다.' });
    }
  };  