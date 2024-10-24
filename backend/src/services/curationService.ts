import { Curation, ICuration } from '../models/curationModel';

// 큐레이션 리스트 조회 (필터링 및 검색)
export const getCurations = async (
  page: number, 
  filters: { style?: string; gender?: string; age?: string; searchQuery?: string; status?: string }
): Promise<ICuration[]> => {
  const pageSize = 10;
  const query: any = {};

  if (filters.style) query.styleFilter = filters.style;
  if (filters.gender) query.genderFilter = filters.gender;
  if (filters.age) query.ageFilter = filters.age;
  if (filters.status) query.status = filters.status;

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