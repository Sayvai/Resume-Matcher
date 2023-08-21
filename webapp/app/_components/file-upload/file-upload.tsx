"use client";

import clsx from "clsx";
import { useState } from "react";

type FileUploadProps = {
  buttonLabel?: string;
  dropZoneLabel?: string;
  onUpload: (file: File) => void;
};

const FileUpload = ({
  buttonLabel = "Select File",
  dropZoneLabel = "Or Drop File Here",
  onUpload,
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0] || null;

    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFileName(uploadedFile.name);
      onUpload(uploadedFile);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFileName(droppedFile.name);
      onUpload(droppedFile);
    }
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 p-6 border-2 border-dashed border-gray-600 rounded-lg",
        { "border-purple-100 opacity-50": isDragging }
      )}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="upload-btn"
        onChange={handleUpload}
        accept="application/pdf"
        hidden
        multiple={false}
      />
      <label
        htmlFor="upload-btn"
        className="block text-white text-4xl p-12 rounded-2xl cursor-pointer bg-gradient-to-r from-[#212234] to-[#1A2350]"
      >
        {buttonLabel}
      </label>
      {fileName ? (
        <span className="block text-2xl text-center text-emerald-500">
          {fileName}
        </span>
      ) : (
        <p className="block text-2xl text-center">{dropZoneLabel}</p>
      )}
    </div>
  );
};

export default FileUpload;
