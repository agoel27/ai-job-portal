import React, { useState } from "react";
import aiStar from "../../public/aiStar.svg";
import AIParsing from "../components/AiParsing";

function SubmitResume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showParser, setShowParser] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        alert("only PDFs PLS");
        setSelectedFile(null);
        setFileName("");
        setShowParser(false);
        event.target.value = null;
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert("Why ur file so big?(max 20MB).");
        setSelectedFile(null);
        setFileName("");
        setShowParser(false);
        event.target.value = null;
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      setShowParser(true);
      console.log("Selected file:", file);
    } else {
      setSelectedFile(null);
      setFileName("");
      setShowParser(false);
    }
  };

  return (
    <div className="py-10">
      <div className="w-[60%] mx-auto mb-8">
        <p className="text-[40px] !important font-sans font-bold text-[#382D5E] mb-[10px] text-center">
          Submit Resume
        </p>
        <div className="border-b border-gray-300" />
      </div>
      <div className="w-[60%] mx-auto bg-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={aiStar} s alt="AI Star Icon" className="flex-shrink-0" />
          <div>
            <p className="text-lg font-semibold text-[#382D5E]">AI Autofill</p>
            <p className="text-sm text-gray-600 mt-1">
              Upload your resume directly and let our AI tool fill out the
              details for you.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <label
            htmlFor="resume-upload"
            className="bg-[#382D5E] text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 transition duration-200"
          >
            Upload PDF
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          {fileName && (
            <p
              className="text-xs text-gray-500 mt-2 truncate w-32 text-center"
              title={fileName}
            >
              {fileName}
            </p>
          )}
        </div>
      </div>

      <div className="w-[60%] mx-auto">
        {showParser && selectedFile && (
          <AIParsing file={selectedFile} onComplete={handleParsingComplete} />
        )}
      </div>
    </div>
  );
}

export default SubmitResume;
