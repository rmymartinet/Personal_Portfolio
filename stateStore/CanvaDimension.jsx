import { create } from "zustand";

const useStore = create((set) => ({
  isClicked: false,
  setIsClicked: () => set((state) => ({ isClicked: !state.isClicked })),
}));

export default useStore;
