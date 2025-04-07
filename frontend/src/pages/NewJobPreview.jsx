import React, { useState } from "react";

function MatchedSkills({ userSkills, companySkills, selectedSkills }) {
  return (
    <div className="mt-6">
      <p className="font-bold text-[#382D5E] text-[24px]"> Matched Skills </p>
      <div className="gap-2 mt-3 flex flex-wrap">
        {userSkills.map((skill) => (
          <button
            key={skill}
            className={`w-[179px] h-[33px] flex items-center justify-center border rounded-full px-4 py-1 mr-4  ${
              selectedSkills.includes(skill)
                ? "bg-[#382D5E] text-white"
                : companySkills.includes(skill)
                  ? "bg-[#382D5E] text-white"
                  : "border-[#382D5E]  bg-[#D1CAEB] text-[#382D5E]"
            }`}
          >
            {companySkills.includes(skill) && (
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M6.54961 13.0001L0.849609 7.3001L2.27461 5.8751L6.54961 10.1501L15.7246 0.975098L17.1496 2.4001L6.54961 13.0001Z"
                  fill="white"
                />
              </svg>
            )}
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}
function NewJobPreview() {
  const companyName = "Blah Blah Industries";
  const jobTitle = "Name of Job";
  const jobTime = "Full Time";
  const jobLocation = "Riverside, CA";
  const jobPayYorN = "Paid";
  const jobPay = "$30-40/hr";
  const jobDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.";
  const jobDescriptionP2 =
    "Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

  const userSkills = [
    "communication",
    "teamwork",
    "skill1",
    "skill2",
    "skill4",
    "skill5",
  ];
  const companySkills = ["communication", "teamwork"];
  const [selectedSkills] = useState([]);

  return (
    <div className="mt-10">
      <div className="max-w-4xl mx-auto flex justify-end gap-3 mb-4 ">
        <button
          className=" w-127px h-35px border rounded-full px-4 py-1 mr-4"
          style={{
            borderColor: "#000000",
            color: "#382D5E",
            backgroundColor: "#E5E3ED",
          }}
        >
          Save Draft
        </button>

        <button
          className="  w-127px h-35px border rounded-full px-9 py-1"
          style={{
            borderColor: "#382D5E",
            color: "#FFFFFF",
            backgroundColor: "#382D5E",
          }}
        >
          Post
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[20px] p-15 min-h-[900px] ">
        <div>
          <div className="flex  items-center mt-3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.9997 25H26.6663V28.3333H29.9997M29.9997 18.3333H26.6663V21.6667H29.9997M33.333 31.6667H19.9997V28.3333H23.333V25H19.9997V21.6667H23.333V18.3333H19.9997V15H33.333M16.6663 11.6667H13.333V8.33333H16.6663M16.6663 18.3333H13.333V15H16.6663M16.6663 25H13.333V21.6667H16.6663M16.6663 31.6667H13.333V28.3333H16.6663M9.99967 11.6667H6.66634V8.33333H9.99967M9.99967 18.3333H6.66634V15H9.99967M9.99967 25H6.66634V21.6667H9.99967M9.99967 31.6667H6.66634V28.3333H9.99967M19.9997 11.6667V5H3.33301V35H36.6663V11.6667H19.9997Z"
                fill="black"
              />
            </svg>
            <p
              className=" text-black font-normal ml-3 underline "
              style={{ fontSize: "15px", fontFamily: "Nunito" }}
            >
              {companyName}
            </p>
          </div>

          <div className="ml-17">
            <div className="flex justify-between items-center mt-3">
              <p
                className=" text-black text-2l font-semibold mt-7"
                style={{ fontSize: "30px", fontFamily: "sans-serif" }}
              >
                {jobTitle}
              </p>
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 31.5V7.5C7.5 6.675 7.794 5.969 8.382 5.382C8.97 4.795 9.676 4.501 10.5 4.5H25.5C26.325 4.5 27.0315 4.794 27.6195 5.382C28.2075 5.97 28.501 6.676 28.5 7.5V31.5L18 27L7.5 31.5ZM10.5 26.925L18 23.7L25.5 26.925V7.5H10.5V26.925Z"
                  fill="black"
                />
              </svg>
            </div>

            <div
              className="flex  space-x-3 mt-2"
              style={{
                fontSize: "16px",
                fontFamily: "Nunito",
                color: "#4C4C4C",
              }}
            >
              <span>{jobTime}</span>
              <span> | </span>
              <span>{jobLocation}</span>
              <span> | </span>
              <span>{jobPayYorN}</span>
            </div>

            <hr className="border-[#4C4C4C] mt-2 border-1px" />
            <p className=" mt-3 ml-1.5 font-bold text-[#382D5E] text-[24px]">
              Job Details
            </p>

            <div className="flex  items-center mt-3">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.583 22.9167C14.583 21.8116 15.022 20.7518 15.8034 19.9704C16.5848 19.189 17.6446 18.75 18.7497 18.75H39.583C40.6881 18.75 41.7479 19.189 42.5293 19.9704C43.3107 20.7518 43.7497 21.8116 43.7497 22.9167V35.4167C43.7497 36.5217 43.3107 37.5815 42.5293 38.3629C41.7479 39.1443 40.6881 39.5833 39.583 39.5833H18.7497C17.6446 39.5833 16.5848 39.1443 15.8034 38.3629C15.022 37.5815 14.583 36.5217 14.583 35.4167V22.9167Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M35.4167 18.7501V14.5834C35.4167 13.4783 34.9777 12.4185 34.1963 11.6371C33.4149 10.8557 32.3551 10.4167 31.25 10.4167H10.4167C9.3116 10.4167 8.25179 10.8557 7.47039 11.6371C6.68899 12.4185 6.25 13.4783 6.25 14.5834V27.0834C6.25 28.1885 6.68899 29.2483 7.47039 30.0297C8.25179 30.8111 9.3116 31.2501 10.4167 31.2501H14.5833M25 29.1667C25 30.2718 25.439 31.3316 26.2204 32.113C27.0018 32.8944 28.0616 33.3334 29.1667 33.3334C30.2717 33.3334 31.3315 32.8944 32.1129 32.113C32.8943 31.3316 33.3333 30.2718 33.3333 29.1667C33.3333 28.0617 32.8943 27.0019 32.1129 26.2205C31.3315 25.4391 30.2717 25.0001 29.1667 25.0001C28.0616 25.0001 27.0018 25.4391 26.2204 26.2205C25.439 27.0019 25 28.0617 25 29.1667Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className=" ml-3 text-[22px] text-black font-semi-bold font-sans-serif">
                {jobPay}{" "}
              </p>
            </div>

            <MatchedSkills
              userSkills={userSkills}
              companySkills={companySkills}
              selectedSkills={selectedSkills}
            />
            <div className="mt-7 flex items-center">
              <p className=" font-bold text-[#382D5E] text-[24px]">
                Job Description
              </p>
              <hr className="  flex-grow border border-[#4C4C4C] " />
            </div>

            <p className="text-sm mt-2 text-gray-700">{jobDescription}</p>
            <p className="text-sm mt-5 text-gray-700">{jobDescriptionP2}</p>
          </div>
        </div>
      </div>

      <div className=" mt-4 max-w-4xl mx-auto flex justify-end gap-3 mb-4 ">
        <button
          className=" w-127px h-35px border rounded-full px-4 py-1 mr-4"
          style={{
            borderColor: "#000000",
            color: "#382D5E",
            backgroundColor: "#E5E3ED",
          }}
        >
          Save Draft
        </button>

        <button
          className="  w-127px h-35px border rounded-full px-9 py-1"
          style={{
            borderColor: "#382D5E",
            color: "#FFFFFF",
            backgroundColor: "#382D5E",
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default NewJobPreview;
