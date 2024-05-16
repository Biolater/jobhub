import { FC } from "react";

type JobDetailProps = {
  sectionName: string;
  content: string;
};

const JobDetail: FC<JobDetailProps> = ({ sectionName, content }) => {
  return (
    <div className="flex text-whitish flex-col gap-1">
      <p>{sectionName}</p>
      <p>{content}</p>
    </div>
  );
};

export default JobDetail;
