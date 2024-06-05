import { create } from "zustand";

export const useIsHoverStore = create((set) => ({
  isHover: false,
  setIsHover: (isHover) => set({ isHover: isHover }),
}));
