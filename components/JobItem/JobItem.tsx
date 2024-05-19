import { FC } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { DeleteIcon } from "../Icons";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";
const variants = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
    },
  }),
  exit: {
    opacity: 0,
    y: 30,
  },
};

type JobItemProps = {
  index: number;
  jobId: string;
  jobTitle: string;
  companyName: string;
  jobUrl: string;
  onSelect: () => void;
  onDeleteButtonSelect: () => void;
};

const JobItem: FC<JobItemProps> = ({
  index,
  jobId,
  jobTitle,
  companyName,
  jobUrl,
  onSelect,
  onDeleteButtonSelect,
}) => {
  const [scope, animate] = useAnimate();

  const handleMouseEnter = () => {
    animate(
      ".jobItem__delete",
      { scale: 1 },
      { type: "spring", stiffness: 400 }
    );
  };

  const handleMouseLeave = () => {
    animate(
      ".jobItem__delete",
      { scale: 0 },
      { type: "spring", stiffness: 200 }
    );
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={scope}
      custom={index}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="jobItem cursor-pointer w-full relative rounded-xl flex flex-col gap-1 justify-center items-center bg-whitish p-4"
    >
      <DeleteButton onDeleteButtonSelect={onDeleteButtonSelect} />
      <CompanyName name={companyName} />
      <JobTitle title={jobTitle} />
      <ActionButtons onSelect={onSelect} jobUrl={jobUrl} />
    </motion.div>
  );
};

const DeleteButton: FC<{ onDeleteButtonSelect: () => void }> = ({
  onDeleteButtonSelect,
}) => {
  const { setDeleteJobModalActive } = useJobDetail();
  const handleClick = () => {
    setDeleteJobModalActive(true);
  };
  return (
    <motion.div
      onClick={() => {
        onDeleteButtonSelect();
        handleClick();
      }}
      title="Delete this job"
      initial={{ scale: 0 }}
      className="jobItem__delete group/deleteIcon absolute right-3 top-3 cursor-pointer size-7"
    >
      <DeleteIcon />
    </motion.div>
  );
};

const CompanyName: FC<{ name: string }> = ({ name }) => (
  <p className="companyName text-xl sm:text-2xl font-bold text-primary">
    {name}
  </p>
);

const JobTitle: FC<{ title: string }> = ({ title }) => (
  <p className="jobTitle text-primary text-sm sm:text-base font-medium mb-1">
    {title}
  </p>
);

type ActionButtonsProps = {
  onSelect: () => void;
  jobUrl: string;
};

const ActionButtons: FC<ActionButtonsProps> = ({ onSelect, jobUrl }) => (
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
      rel="noopener noreferrer"
    >
      Visit job
    </Link>
  </div>
);

export default JobItem;
