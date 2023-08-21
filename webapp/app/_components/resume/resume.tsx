"use client";

import { useState } from "react";
import FileUpload from "@/components/file-upload/file-upload";
import PDFViewer from "@/components/pdf-viewer/pdf-viewer";

const Resume = () => {
  const [file, setFile] = useState<File | null>(null);

  function handleUpload(file: File) {
    console.log("file", file);
    setFile(file);
  }

  return (
    <>
      <section className="flex flex-col gap-12 px-32 py-10 items-center bg-gradient-to-r from-[#2C203E] to-[#030205]">
        <h1 className="text-5xl font-normal text-center leading-normal">
          Free and Open Source ATS to help your resume pass the screening stage.
        </h1>
        <FileUpload buttonLabel="Upload Your Resume" onUpload={handleUpload} />
      </section>
      {file ? (
        <section className="flex flex-col gap-12 px-32 py-10">
          <h2 className="text-4xl font-normal leading-normal">
            Resume at a Glance
          </h2>
          <div className="text-black bg-[#FFF5F5]">
            <PDFViewer file={file} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Resume;
