import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  isClickedIndex: null,
  setClickedIndex: (index) => set({ isClickedIndex: index }),
}));
