import { create } from "zustand";

export const useBackNavigationStore = create((set) => ({
  isClicked: false,
  setIsClicked: (state) => set({ isClicked: state }),
}));
