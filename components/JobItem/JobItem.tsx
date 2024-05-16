import { FC } from "react";
type JobItemProps = {
  jobTitle: string;
  companyName: string;
};
const JobItem: FC<JobItemProps> = ({ jobTitle, companyName }) => {
  return (
    <div className="jobItem w-full rounded-xl flex flex-col gap-1 justify-center items-center bg-whitish p-4">
      <p className="companyName text-xl font-bold text-primary">
        {companyName}
      </p>
      <p className="jobTitle text-primary text-sm font-medium mb-1">{jobTitle}</p>
      <div className="jobItem__buttons flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2">
        <button className="viewDetails px-4 py-2 rounded font-semibold text-medium bg-secondary text-whitish">View details</button>
        <button className="viewDetails px-4 py-2 rounded font-semibold text-medium bg-accent text-whitish">Visit job</button>
      </div>
    </div>
  );
};

export default JobItem;
