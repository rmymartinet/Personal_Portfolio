import { create } from "zustand";

const useStoreScale = create((set) => ({
  scale: [0.3, 0.3],
  setScale: (newScale) => set({ isScale: newScale }),
}));

export default useStoreScale;
