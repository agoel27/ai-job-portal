import ProgressBar from "@/components/new_job_post/progress_bar/ProgressBar";
import Title from "@/components/new_job_post/Title";
import Form from "@/components/new_job_post/new_job_applicant_info/Form";

function NewJobApplicantInfo() {
  return (
    <div className="h-screen flex flex-col h-full pt-[6vh] mb-[8vw]">
      <ProgressBar progress={1} />
      <div className="w-[50vw] xl:w-[40vw] mt-[8vw] xl:mt-[4vw] ml-[25vw] xl:ml-[30vw]">
        <Title>Applicant Information</Title>
      </div>
      <Form className="mb-[4vw]" />
    </div>
  );
}

export default NewJobApplicantInfo;
