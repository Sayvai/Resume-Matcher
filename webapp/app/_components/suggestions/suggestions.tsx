"use client";

import { useGlobalStore } from "@/stores/useGlobalStore";

const Suggestions = () => {
  const { isBackendProcessing, resumeProcessorResponse } = useGlobalStore();

  if (!isBackendProcessing && !resumeProcessorResponse?.suggestionsSet)
    return null;

  function renderSuggestions() {
    const { suggestionsSet } = resumeProcessorResponse || {};

    if (!suggestionsSet) return null;

    return (
      <ul className="flex flex-col gap-6 bg-[#f9f2f2]">
        {suggestionsSet.map((suggestions) => {
          return (
            <li
              key={suggestions.jobId}
              className="flex flex-col gap-2 p-4 pl-8 border-2 border-dotted border-gray-300"
            >
              <h3 className="text-lg text-center text-gray-500">
                Suggestions for Job ID: {suggestions.jobId}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {suggestions.changes.map((change, index) => {
                  return (
                    <li
                      key={index}
                      className="border-b-2 border-dotted border-gray-200"
                    >
                      <ul
                        className="flex gap-8 justify-between list-disc list-outside-"
                        role="list"
                      >
                        <li className="w-1/2 list-['✗\002'] marker:text-red-500">
                          {change.changeFrom}
                        </li>
                        <li className="w-1/2 list-['✓\002'] marker:text-green-500">
                          {change.changeTo}
                        </li>
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className="flex flex-col gap-12 px-32 py-10">
      <h2 className="text-4xl font-normal leading-normal">Suggestions</h2>
      <div className="flex flex-col gap-8 text-black p-8 bg-[#FFF5F5]">
        {isBackendProcessing ? (
          <p>Processing suggestions...</p>
        ) : (
          renderSuggestions()
        )}
      </div>
    </section>
  );
};

export default Suggestions;
