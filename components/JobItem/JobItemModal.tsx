import { FC, MouseEventHandler, RefObject, useRef } from "react";
import { CloseIcon } from "@/components/Icons";
import { JobItemModalProps } from "@/types/jobitemmodal.types";
import JobDetail from "./JobDetail";
import { motion } from "framer-motion";
type JobDetail = {
  sectionName: string;
  content: string;
};

const JobItemModal: FC<JobItemModalProps> = ({
  isActive,
  handleCancel,
  companyName,
  jobDescription,
  jobTitle,
  jobUrl,
  date,
  notes,
}) => {
  const jobDetails: JobDetail[] = [
    {
      sectionName: "Title",
      content: jobTitle,
    },
    {
      sectionName: "Job URL",
      content: jobUrl,
    },
    {
      sectionName: "Company Name",
      content: companyName,
    },
    {
      sectionName: "Job Description",
      content: jobDescription,
    },
    {
      sectionName: "Publish Date",
      content: date,
    },
    {
      sectionName: "Notes",
      content: notes,
    },
  ];
  const footerButtons: string[] = ["Cancel", "Save"];
  const jobDetailsRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    if (
      jobDetailsRef.current &&
      !jobDetailsRef.current.contains(event.target as Node)
    ) {
      handleCancel();
    }
  };
  return (
    <div
      onClick={handleOutsideClick}
      className={`jobDetails__overlay transition-all duration-300 ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 right-0 bottom-0 bg-black/50 h-screen w-full flex items-center justify-center`}
    >
      <div ref={jobDetailsRef} className="jobDetails w-full bg-primary">
        <header className="jobDetails__header p-4 border-b border-white/20 flex items-center justify-between text-whitish">
          <p>View or edit job details</p>
          <motion.button
            className="p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
          >
            <CloseIcon />
          </motion.button>
        </header>
        <main className="jobDetails__body max-h-[calc(100svh-180px)] overflow-auto p-4 text-whitish">
          <h1 className="text-2xl font-semibold text-center mb-2">
            {jobTitle}
          </h1>
          <div className="jobDetails__details flex flex-col gap-2">
            {jobDetails.map((detail, index) => (
              <JobDetail key={index} {...detail} />
            ))}
          </div>
        </main>
        <footer className="jobDetails__footer p-4 border-t border-white/20 flex items-center justify-between text-whitish">
          {footerButtons.map((button, index) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (index === 0) {
                  handleCancel();
                } else {
                }
              }}
              key={index}
              className={`px-4 py-2 rounded-md text-whitish font-medium ${
                index === 1 ? "bg-secondary" : ""
              }`}
            >
              {button}
            </motion.button>
          ))}
        </footer>
      </div>
    </div>
  );
};

export default JobItemModal;
