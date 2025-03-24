import ProgressBar from "../components/new_job_post/progress_bar/ProgressBar";
import Form from "../components/new_job_post/new_job_details/Form";

const NewJobDetails = () => {
  // progress values should only be 0 <= progress <= 2
  return (
    <div className="h-screen py-[6%] xl:py-[4%] flex flex-col items-center">
      <ProgressBar progress={2} />
      <Form />
    </div>
  );
};

export default NewJobDetails;
