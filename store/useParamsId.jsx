import { create } from "zustand";

export const useParamsId = create((set) => ({
  isIndex: null,
  setIsIndex: (index) => set({ isIndex: index }),
}));
