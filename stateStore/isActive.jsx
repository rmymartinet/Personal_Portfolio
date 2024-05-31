import { create } from "zustand";

export const useIsActiveStore = create((set) => ({
  isActive: false,
  setIsActive: (isActive) => set({ isActive: isActive }),
}));
