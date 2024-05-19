import { FC } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { DeleteIcon } from "../Icons";
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
  const [scope, animate] = useAnimate();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => {
        animate(
          ".jobItem__delete",
          { scale: 1 },
          { type: "spring", stiffness: 400 }
        );
      }}
      onMouseLeave={() => {
        animate(
          ".jobItem__delete",
          { scale: 0 },
          { type: "spring", stiffness: 200 }
        );
      }}
      ref={scope}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="jobItem cursor-pointer w-full relative rounded-xl flex flex-col gap-1  justify-center items-center bg-whitish p-4"
    >
      <motion.div title="Delete this job" initial={{ scale: 0 }} className="jobItem__delete group/deleteIcon absolute right-5 top-3 cursor-pointer size-7">
        <DeleteIcon />
      </motion.div>
      <p className="companyName text-xl sm:text-2xl font-bold text-primary">
        {companyName}
      </p>
      <p className="jobTitle text-primary text-sm sm:text-base font-medium mb-1">
        {jobTitle}
      </p>
      <div className="jobItem__buttons flex flex-col sm:flex-row gap-2">
        <button
          onClick={onSelect}
          className="viewDetails transition-all duration-200 hover:scale-105 active:scale-90 px-4 py-2 rounded font-semibold text-medium bg-secondary text-whitish"
        >
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
