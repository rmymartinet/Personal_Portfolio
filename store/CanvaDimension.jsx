import { create } from "zustand";

const useStore = create((set) => ({
  canvasDimensions: { width: 0, height: 0 },
  setCanvasDimensions: (width, height) =>
    set({ canvasDimensions: { width, height } }),
}));

export default useStore;
