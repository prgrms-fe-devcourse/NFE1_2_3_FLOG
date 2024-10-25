export const searchData = [
  {
    _id: "ObjectId",
    query: "55번", // 검색어
    searchCount: 55, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "66번", // 검색어
    searchCount: 66, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "23번", // 검색어
    searchCount: 23, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "12번", // 검색어
    searchCount: 12, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "226번", // 검색어
    searchCount: 226, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "42번", // 검색어
    searchCount: 42, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
  {
    _id: "ObjectId",
    query: "27번", // 검색어
    searchCount: 27, // 검색 횟수
    createdAt: "date", // 검색 기록 생성일
  },
];

export const curationData = [
  {
    _id: "ObjectId",
    title: "큐레이션 제목 예제임 큐레이션 제목 예제", // 큐레이션 제목
    adminId: "ObjectId", // 큐레이션을 만든 관리자 ID
    thumbnail: "string", // 썸네일 이미지 URL
    startDate: "date", // 큐레이션 시작일
    endDate: "date", // 큐레이션 종료일
    content: ["string"], // 큐레이션 내용
    tags: ["string"], // 태그 목록
    likes: ["ObjectId"], // 좋아요 누른 사용자 목록
    comments: ["ObjectId"], // 댓글 목록
    entries: ["ObjectId"], // 큐레이션 출품작 목록
    createdAt: "date",
    updatedAt: "date",
    status: "string", // "published" or "draft" (출간 여부)
    genderFilter: ["string"], // 성별 필터 (예: ["남자", "여자", "전체"])
    ageFilter: ["string"], // 연령 필터 (예: ["20대", "30대", "전체"])
    styleFilter: ["string"], // 스타일 필터 (예: ["캐주얼", "스트릿", "전체"])
  },
  {
    _id: "ObjectId",
    title: "큐레이션 제목 예제 두번째임 큐레이션 제목 예제", // 큐레이션 제목
    adminId: "ObjectId", // 큐레이션을 만든 관리자 ID
    thumbnail: "string", // 썸네일 이미지 URL
    startDate: "date", // 큐레이션 시작일
    endDate: "date", // 큐레이션 종료일
    content: ["string"], // 큐레이션 내용
    tags: ["string"], // 태그 목록
    likes: ["ObjectId"], // 좋아요 누른 사용자 목록
    comments: ["ObjectId"], // 댓글 목록
    entries: ["ObjectId"], // 큐레이션 출품작 목록
    createdAt: "date",
    updatedAt: "date",
    status: "string", // "published" or "draft" (출간 여부)
    genderFilter: ["string"], // 성별 필터 (예: ["남자", "여자", "전체"])
    ageFilter: ["string"], // 연령 필터 (예: ["20대", "30대", "전체"])
    styleFilter: ["string"], // 스타일 필터 (예: ["캐주얼", "스트릿", "전체"])
  },
  {
    _id: "ObjectId",
    title: "큐레이션 제목 예제 세번째임 큐레이션 제목 예제", // 큐레이션 제목
    adminId: "ObjectId", // 큐레이션을 만든 관리자 ID
    thumbnail: "string", // 썸네일 이미지 URL
    startDate: "date", // 큐레이션 시작일
    endDate: "date", // 큐레이션 종료일
    content: ["string"], // 큐레이션 내용
    tags: ["string"], // 태그 목록
    likes: ["ObjectId"], // 좋아요 누른 사용자 목록
    comments: ["ObjectId"], // 댓글 목록
    entries: ["ObjectId"], // 큐레이션 출품작 목록
    createdAt: "date",
    updatedAt: "date",
    status: "string", // "published" or "draft" (출간 여부)
    genderFilter: ["string"], // 성별 필터 (예: ["남자", "여자", "전체"])
    ageFilter: ["string"], // 연령 필터 (예: ["20대", "30대", "전체"])
    styleFilter: ["string"], // 스타일 필터 (예: ["캐주얼", "스트릿", "전체"])
  },
  {
    _id: "ObjectId",
    title: "큐레이션 제목 예제임 이거는 나오면 안됌 큐레이션 제목 예제", // 큐레이션 제목
    adminId: "ObjectId", // 큐레이션을 만든 관리자 ID
    thumbnail: "string", // 썸네일 이미지 URL
    startDate: "date", // 큐레이션 시작일
    endDate: "date", // 큐레이션 종료일
    content: ["string"], // 큐레이션 내용
    tags: ["string"], // 태그 목록
    likes: ["ObjectId"], // 좋아요 누른 사용자 목록
    comments: ["ObjectId"], // 댓글 목록
    entries: ["ObjectId"], // 큐레이션 출품작 목록
    createdAt: "date",
    updatedAt: "date",
    status: "string", // "published" or "draft" (출간 여부)
    genderFilter: ["string"], // 성별 필터 (예: ["남자", "여자", "전체"])
    ageFilter: ["string"], // 연령 필터 (예: ["20대", "30대", "전체"])
    styleFilter: ["string"], // 스타일 필터 (예: ["캐주얼", "스트릿", "전체"])
  },
];
