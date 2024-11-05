import { Curation, ICuration } from '../models/curationModel';
import User from '../models/userModel';
import { Entry } from '../models/entryModel';
import mongoose from 'mongoose';

// 추천 큐레이션 리스트 조회
export const getRecommendCurationListService = async () => {
  const dateWeekAgo = new Date();
  dateWeekAgo.setDate(dateWeekAgo.getDate() - 7)

  const filter: any = {
    createdAt: { $gte: dateWeekAgo }
  }

  return await Curation.find(filter)
}

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

  // 특정 큐레이션 수정 (관리자만 가능)
export const updateCuration = async (curationId: string, updates: Partial<ICuration>): Promise<ICuration | null> => {
  delete updates.adminId;
  const updatedCuration = await Curation.findByIdAndUpdate(curationId, updates, { new: true });
  return updatedCuration;
};

// 특정 큐레이션 삭제 (관리자만 가능)
export const deleteCuration = async (curationId: string): Promise<boolean> => {
  const deleted = await Curation.findByIdAndDelete(curationId);
  return !!deleted;
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

  // 포인트 분배 서비스 함수
export const distributePointsToParticipants = async (curationId: mongoose.Types.ObjectId) => {
  try {
    // 해당 큐레이션의 출품작을 투표 수 내림차순으로 정렬하여 가져옴
    const entries = await Entry.find({ curationId })
      .populate('authorId') // 출품자 정보 포함
      .sort({ votes: -1 }); // 투표 수 내림차순 정렬

    if (entries.length === 0) return;

    // 1, 2, 3위에게 포인트 지급
    const prizePoints = [10000, 5000, 1000];
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const user = await User.findById(entry.authorId);
      if (user) {
        // 상위 3위까지만 각각 10000, 5000, 1000 포인트 지급, 나머지는 100 포인트
        const points = prizePoints[i] || 100;
        user.points = (user.points || 0) + points;
        await user.save();
      }
    }

    console.log(`포인트 지급 완료: 큐레이션 ID ${curationId}`);
  } catch (error) {
    console.error('포인트 지급 중 오류 발생:', error);
  }
};