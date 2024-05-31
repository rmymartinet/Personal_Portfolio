import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  isClickedIndex: null,
  setIsClickedIndex: (index) => set({ isClickedIndex: index }),
}));
