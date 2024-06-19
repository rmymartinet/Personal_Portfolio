import { create } from "zustand";

export const useHomeNavigationStore = create((set) => ({
  isHomeClicked: false,
  setIsHomeClicked: (state) => {
    set({ isHomeClicked: state });

    if (state) {
      setTimeout(() => {
        set({ isHomeClicked: false });
      }, 3000);
    }
  },
}));
