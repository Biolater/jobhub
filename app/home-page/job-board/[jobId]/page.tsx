import { FC } from "react";

const JobDetails: FC<{ params: { jobId: string } }> = ({ params }) => {
  return <div>{params.jobId}</div>;
};

export default JobDetails;
