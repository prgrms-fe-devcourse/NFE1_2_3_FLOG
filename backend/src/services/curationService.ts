import { Curation, ICuration } from '../models/curationModel';
import mongoose from 'mongoose';

// 큐레이션 리스트 조회 (필터링 및 검색)
export const getCurations = async (
  page: number, 
  filters: { style?: string; gender?: string; age?: string[] | string; searchQuery?: string; status?: string }
): Promise<ICuration[]> => {
  const pageSize = 10;
  const query: any = {};

  // 필터 값이 존재하고 '전체'가 아닐 경우에만 필터 조건에 추가
  if (filters.style && filters.style !== '전체') {
    query.styleFilter = filters.style;
  }
  if (filters.gender && filters.gender !== '전체') {
    query.genderFilter = filters.gender;
  }
   // age 필터가 배열로 들어올 경우 $in 연산자로 처리
   if (filters.age && Array.isArray(filters.age)) {
    query.ageFilter = { $in: filters.age };  // age가 배열일 경우 $in 연산자로 필터링
  } else if (filters.age && filters.age !== '전체') {
    query.ageFilter = filters.age;  // age가 단일 값일 경우
  }
  if (filters.status) {
    query.status = filters.status;
  }

  // 검색어가 있을 경우에만 검색 조건 추가
  if (filters.searchQuery) {
    query.$or = [
      { title: { $regex: filters.searchQuery, $options: 'i' } },
      { content: { $regex: filters.searchQuery, $options: 'i' } }
    ];
  }

  const curations = await Curation.find(query)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return curations;
};

// 특정 큐레이션 상세 조회
export const getCurationById = async (curationId: string): Promise<ICuration | null> => {
  return await Curation.findById(curationId);
};

// 큐레이션 생성 (관리자만 가능)
export const createCuration = async (curationData: Partial<ICuration>): Promise<ICuration> => {
    const newCuration = new Curation(curationData);
    return await newCuration.save(); // DB에 저장
  };

  export const toggleCurationLike = async (curationId: string, userId: mongoose.Types.ObjectId) => {
    const curation = await Curation.findById(curationId);
    if (!curation) throw new Error('큐레이션을 찾을 수 없습니다.');
  
    const isLiked = curation.likes.some((id) => id.equals(userId));
    if (isLiked) {
      // 좋아요 취소
      curation.likes = curation.likes.filter((id) => !id.equals(userId));
    } else {
      // 좋아요 추가
      curation.likes.push(userId);
    }
  
    await curation.save();
    return curation;
  };