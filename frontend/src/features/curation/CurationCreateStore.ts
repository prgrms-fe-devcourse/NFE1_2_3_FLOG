import { create } from "zustand";

// 큐레이션 생성에 필요한 데이터 타입 정의
export interface ICurationCreate {
  title: string;
  adminId: string | null;
  thumbnail: string;
  startDate: Date | null;
  endDate: Date | null;
  content: string[];
  tags: string[];
  genderFilter: ("남자" | "여자" | "전체")[];
  ageFilter: ("10대 미만" | "10대" | "20대" | "30대" | "40대" | "50대 이상" | "전체")[];
  styleFilter: ("casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체")[];
  status: "published" | "draft";
}

// 큐레이션 생성 Store을 사용할 때 필요한 인터페이스
interface ICurationCreateStore {
  data: ICurationCreate;
  setData: (newData: Partial<ICurationCreate>) => void;
  resetData: () => void;
}

interface IDraftCurationStore {
  isDraftedCuration: boolean;
  setIsDraftedCuration: (state: boolean) => void;
}

// Draft Curation Store
export const useDraftCurationStore = create<IDraftCurationStore>((set) => ({
  isDraftedCuration: false,
  setIsDraftedCuration: (state) => {
    set({ isDraftedCuration: state });
  },
}));

const useCurationCreateStore = create<ICurationCreateStore>((set) => ({
  // 데이터의 초기값을 설정
  data: {
    title: "",
    adminId: null,
    thumbnail: "",
    startDate: null,
    endDate: null,
    content: [],
    tags: [],
    genderFilter: ["전체"] as ("남자" | "여자" | "전체")[], // 리터럴 타입으로 설정
    ageFilter: ["전체"] as ("10대 미만" | "10대" | "20대" | "30대" | "40대" | "50대 이상" | "전체")[],
    styleFilter: ["전체"] as ("casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체")[],
    status: "draft",
  },
  // 데이터를 변경할 때 사용하는 setData 메소드
  setData: (newData: Partial<ICurationCreate>) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  // 데이터를 리셋할 때 사용하는 resetData 메소드
  resetData: () =>
    set({
      data: {
        title: "",
        adminId: null,
        thumbnail: "",
        startDate: null,
        endDate: null,
        content: [],
        tags: [],
        genderFilter: ["전체"] as ("남자" | "여자" | "전체")[],
        ageFilter: ["전체"] as ("10대 미만" | "10대" | "20대" | "30대" | "40대" | "50대 이상" | "전체")[],
        styleFilter: ["전체"] as ("casual" | "street" | "feminine" | "punk" | "sporty" | "business" | "전체")[],
        status: "draft",
      },
    }),
}));

export default useCurationCreateStore;
