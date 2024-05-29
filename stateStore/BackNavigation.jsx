import { create } from "zustand";

export const useBackNavigationStore = create((set) => ({
  isClicked: false,
  setClicked: () => set({ isClicked: true }),
}));
