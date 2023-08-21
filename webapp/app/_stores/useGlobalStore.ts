import { create } from "zustand";

type GlobalStoreState = {
  file: File | null;
  setFile: (_file: File) => void;
};

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  file: null,
  setFile: (file: File) => set({ file }),
}));
