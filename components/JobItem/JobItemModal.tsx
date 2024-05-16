import { FC } from "react";
import { CloseIcon } from "@/components/Icons";
import { JobItemModalProps } from "@/types/jobitemmodal.types";
import JobDetail from "./JobDetail";

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
  return (
    <div
      className={`jobDetails__overlay transition-all duration-300 ${
        isActive
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 right-0 bottom-0 bg-black/50 h-screen w-full flex items-center justify-center`}
    >
      <div className="jobDetails w-full bg-primary">
        <header className="jobDetails__header p-4 border-b border-white/20 flex items-center justify-between text-whitish">
          <p>View or edit job details</p>
          <button onClick={handleCancel}>
            <CloseIcon />
          </button>
        </header>
        <main className="jobDetails__body p-4 text-whitish">
          <h1 className="text-2xl font-semibold text-center mb-2">
            {jobTitle}
          </h1>
          {jobDetails.map((detail, index) => (
            <JobDetail key={index} {...detail} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default JobItemModal;
