import ProgressBar from "../components/new_job_post/ProgressBar";
import NewJobPostTitle from "../components/new_job_post/NewJobPostTitle";

const NewJobPost = () => {
    // progress values should only be 0 <= progress <= 2
    return (
        <>
            <ProgressBar progress={2} />
            <NewJobPostTitle title="Test" />
           
        </>
    )
}

export default NewJobPost;