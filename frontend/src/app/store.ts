import { create } from "zustand";

interface StoreState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

// useStore 훅이 StoreState 타입을 반환하도록 지정
const useStore = create<StoreState>((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useStore;