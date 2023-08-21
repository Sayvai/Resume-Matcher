import { create } from "zustand";
import { JobDescription } from "@/types/job-descriptions";

type GlobalStoreState = {
  file: File | null;
  jobDescriptions: JobDescription[];
  setFile: (_file: File) => void;
  setJobDescriptions: (_jobDescriptions: JobDescription[]) => void;
};

export const useGlobalStore = create<GlobalStoreState>((set) => ({
  file: null,
  jobDescriptions: [],
  setFile: (file: File) => set({ file }),
  setJobDescriptions: (jobDescriptions) => {
    set({ jobDescriptions });
  },
}));
