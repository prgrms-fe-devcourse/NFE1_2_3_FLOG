import { create } from "zustand";

// 포스트 생성의 모든 데이터 타입을 정의하는 인터페이스
export interface IPostCreate {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  genderFilter: string[];
  ageFilter: string[];
  styleFilter: string[];
  postType: string; // 예: "post", "promotion", "event"
  status: string; // "published" 또는 "draft"
}

// 포스트 생성 Store을 사용할때 필요한 인터페이스
interface IPostCreateStore {
  data: IPostCreate;
  setData: (newData: Partial<IPostCreate>) => void;
  resetData: () => void;
}

interface IDraftPostStore {
  isDraftedPost: boolean;
  setIsDraftedPost: (state: boolean) => void;
}

// Draft Post Store
export const useDraftPostStore = create<IDraftPostStore>((set) => ({
  isDraftedPost: false,
  setIsDraftedPost: (state) => {
    set({ isDraftedPost: state });
  },
}));

const usePostCreateStore = create<IPostCreateStore>((set) => ({
  // 데이터의 초기값을 설정
  data: {
    title: "",
    content: "",
    thumbnail: "",
    tags: [],
    genderFilter: [],
    ageFilter: [],
    styleFilter: [],
    postType: "post",
    status: "published",
  },
  // 데이터를 변경할 때 사용하는 setData 메소드
  setData: (newData: Partial<IPostCreate>) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  // 데이터를 리셋할 때 사용하는 resetData 메소드
  resetData: () =>
    set({
      data: {
        title: "",
        content: "",
        thumbnail: "",
        tags: [],
        genderFilter: [],
        ageFilter: [],
        styleFilter: [],
        postType: "",
        status: "",
      },
    }),
}));

export default usePostCreateStore;
