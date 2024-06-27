import { create } from "zustand";

export const useWorkNavigation = create((set) => ({
  work: null,
  setWork: (index) => set({ work: index }),
}));
