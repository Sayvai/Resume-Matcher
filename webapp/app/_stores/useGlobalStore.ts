import { create } from "zustand";
import { JobDescription } from "@/types/job-descriptions";
import { ResumeProcessorResponse } from "@/types/resume-processor";

type GlobalStoreState = {
  file: File | null;
  jobDescriptions: JobDescription[];
  resumeProcessorResponse: ResumeProcessorResponse | null;
  isBackendProcessing: boolean;
  processingError: string | null;
  setFile: (_file: File) => void;
  setJobDescriptions: (_jobDescriptions: JobDescription[]) => void;
  processData: () => void;
  clearResumeProcessorResponse: () => void;
};

export const useGlobalStore = create<GlobalStoreState>((set, get) => ({
  file: null,
  jobDescriptions: [],
  resumeProcessorResponse: null,
  isBackendProcessing: false,
  processingError: null,
  setFile: (file: File) => set({ file }),
  setJobDescriptions: (jobDescriptions) => {
    set({ jobDescriptions });
  },
  processData: async () => {
    const { file, jobDescriptions } = get();

    try {
      const formData = new FormData();
      formData.append("resume", file as Blob);
      formData.append("jobs", JSON.stringify(jobDescriptions));

      const response = await fetch("/api/resume-processor", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = (await response.json()) as ResumeProcessorResponse;

      set({ resumeProcessorResponse: result });
    } catch (error) {
      console.error(error);
      const message = "";
      set({ processingError: message });
    }
  },
  clearResumeProcessorResponse: () => {
    set({ resumeProcessorResponse: null });
  },
}));
