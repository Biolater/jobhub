import { FC } from "react";

type JobDetailProps = {
  sectionName: string;
  content: string;
};

const JobDetail: FC<JobDetailProps> = ({ sectionName, content }) => {
  return (
    <div className="flex text-center text-whitish flex-col gap-1">
      <p>{sectionName}</p>
      <input
        type="text"
        value={content}
        className="bg-whitish px-2 py-1 rounded-md outline-none text-primary font-medium"
      />
    </div>
  );
};

export default JobDetail;
