import Resume from "@/components/resume/resume";
import JobDescriptions from "@/components/job-descriptions/job-descriptions";
import VectorScore from "@/components/vector-score/vector-scores";

export default function Home() {
  return (
    <main>
      <Resume />
      <JobDescriptions />
      <VectorScore />
    </main>
  );
}
