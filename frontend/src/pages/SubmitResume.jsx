import React from "react";

function SubmitResume() {
  return (
    <div className="group absolute w-full top-3">
      <h1 className="text-[40px] ml-[20%] font-sans font-bold text-[#382D5E] mb-[10px]">
        Submit Resume
      </h1>
      <div className="w-[60%] mx-auto border-b border-black mb-10"></div>

      <div className="w-[60%] mx-auto p-6 bg-white border border-gray-300 rounded-xl flex justify-between items-center shadow-md">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-[#382D5E] flex items-center gap-2">
          <img src="/Vector.png" alt="Upload" className="w-5 h-5" />
            AI Autofill
          </h2>
          <p className="text-gray-700">
            Upload your resume directly and let our AI tool fill out the details for you.
          </p>
        </div>

        <label className="bg-[#2E285E] text-white px-6 py-2 rounded-xl shadow-md cursor-pointer hover:bg-[#241f47] transition flex items-center gap-2">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                console.log("Selected file:", file.name);
                // Handle upload logic here
              }
            }}
          />
          <img src="/material-symbols_upload.png" alt="Upload icon" className="w-6 h-6" />
          Upload file
        </label>
      </div>
    </div>
  );
}

export default SubmitResume;
