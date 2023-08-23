"use client";

import DOMPurify from "dompurify";
import { useGlobalStore } from "@/stores/useGlobalStore";

const CommonWords = () => {
  const { isBackendProcessing, resumeProcessorResponse } = useGlobalStore();

  if (!isBackendProcessing && !resumeProcessorResponse?.commonWordsSet)
    return null;

  function renderCommonWords() {
    const { commonWordsSet } = resumeProcessorResponse || {};

    if (!commonWordsSet) return null;

    return (
      <ul className="flex flex-col gap-6 bg-[#f9f2f2]">
        {commonWordsSet.map((commonWord) => {
          const sanitisedHtmlText = DOMPurify.sanitize(commonWord.text);

          return (
            <li key={commonWord.jobId}>
              <article className="flex flex-col gap-2 p-4 border-2 border-dotted border-gray-300">
                <h3 className="text-lg text-center text-gray-500">
                  Common Words for Job ID: {commonWord.jobId}
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: sanitisedHtmlText }}
                ></div>
              </article>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="flex flex-col gap-12 px-32 py-10">
      <h2 className="text-4xl font-normal leading-normal">
        Common Words between Job Descriptions and Resumes Highlighted
      </h2>
      <div className="flex flex-col gap-8 text-black p-8 bg-[#FFF5F5]">
        {isBackendProcessing ? (
          <p>Processing common words...</p>
        ) : (
          renderCommonWords()
        )}
      </div>
    </section>
  );
};

export default CommonWords;
