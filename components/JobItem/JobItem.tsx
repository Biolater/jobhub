import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
type JobItemProps = {
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  onSelect: () => void;
};
const JobItem: FC<JobItemProps> = ({
  jobTitle,
  companyName,
  jobUrl,
  onSelect,
}) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="jobItem w-full rounded-xl flex flex-col gap-1  justify-center items-center bg-whitish p-4">
      <p className="companyName text-xl sm:text-2xl font-bold text-primary">
        {companyName}
      </p>
      <p className="jobTitle text-primary text-sm sm:text-base font-medium mb-1">
        {jobTitle}
      </p>
      <div
        onClick={onSelect}
        className="jobItem__buttons flex flex-col sm:flex-row gap-2"
      >
        <button className="viewDetails transition-all duration-200 hover:scale-105 active:scale-90 px-4 py-2 rounded font-semibold text-medium bg-secondary text-whitish">
          View details
        </button>
        <Link
          href={jobUrl}
          target="_blank"
          className="viewJob transition-all duration-200 hover:scale-105 active:scale-90 px-4 py-2 rounded font-semibold text-medium bg-accent text-whitish"
        >
          Visit job
        </Link>
      </div>
    </motion.div>
  );
};

export default JobItem;
