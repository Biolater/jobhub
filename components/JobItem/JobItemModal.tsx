import {
  FC,
  MouseEventHandler,
  RefObject,
  useRef,
  useEffect,
  useState,
} from "react";
import { CloseIcon } from "@/components/Icons";
import { JobItemModalProps } from "@/types/jobitemmodal.types";
import JobDetail from "./JobDetail";
import { motion } from "framer-motion";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import toast from "react-hot-toast";

type JobDetailType = {
  sectionName: string;
  content: string;
};

type UpdatedJobDetails = {
  title?: string;
  joburl?: string;
  company?: string;
  description?: string;
  status?: "Saved" | "Applied" | "Interviewing" | "Hired" | "Rejected";
  date?: string;
  notes?: string;
};

const JobItemModal: FC<JobItemModalProps> = ({
  jobId,
  isActive,
  handleCancel,
  companyName,
  jobDescription,
  status,
  jobTitle,
  jobUrl,
  date,
  notes,
}) => {
  const client = generateClient<Schema>();
  const { changeMade, changedDetails } = useJobDetail();
  const [loading, setLoading] = useState<boolean>(false);
  const jobDetails: JobDetailType[] = [
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
      sectionName: "Status",
      content: status,
    },
    {
      sectionName: "Notes",
      content: notes,
    },
  ];
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
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCancel();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleCancel]);

  const cancelButtonVariants = {
    transparent: { backgroundColor: "transparent" },
  };

  const saveButtonVariants = {
    default: { backgroundColor: "#969696" },
    save: { backgroundColor: "#333F44" },
  };

  return (
    <div
      onClick={handleOutsideClick}
      className={`jobDetails__overlay transition-all duration-300 ${
        isActive
          ? "opacity-100 pointer-events-auto z-[9999]"
          : "opacity-0 pointer-events-none"
      } fixed top-0 left-0 right-0 bottom-0 bg-black/50 h-screen w-full flex items-center justify-center`}
    >
      <div
        ref={jobDetailsRef}
        className="jobDetails w-full sm:w-1/2 sm:rounded-lg bg-primary"
      >
        <header className="jobDetails__header p-4 border-b border-white/20 flex items-center justify-between text-whitish">
          <p>View or edit job details</p>
          <motion.button
            className="p-1"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
          >
            <CloseIcon className="fill-whitish size-[14px]" />
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
          <motion.button
            variants={cancelButtonVariants}
            initial="transparent"
            animate="transparent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCancel}
            className="px-4 py-2 rounded-md text-whitish font-medium pointer-events-auto"
          >
            Cancel
          </motion.button>
          <motion.button
            disabled={loading}
            variants={saveButtonVariants}
            initial="default"
            animate={changeMade ? "save" : "default"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={async () => {
              if (changeMade) {
                setLoading(true);
                const updatedData: UpdatedJobDetails = {};
                changedDetails.forEach((detail) => {
                  switch (detail) {
                    case "title":
                      updatedData.title = jobTitle;
                      break;
                    case "joburl":
                      updatedData.joburl = jobUrl;
                      break;
                    case "company":
                      updatedData.company = companyName;
                      break;
                    case "description":
                      updatedData.description = jobDescription;
                      break;
                    case "date":
                      updatedData.date = date;
                      break;
                    case "notes":
                      updatedData.notes = notes;
                      break;
                    case "status":
                      //@ts-ignore
                      updatedData.status = status as
                        | "Saved"
                        | "Applied"
                        | "Interviewing"
                        | "Hired"
                        | "Rejected";
                      break;
                    default:
                      break;
                  }
                });

                try {
                  const { errors, data: newJob } =
                    await client.models.Job.update({
                      id: jobId,
                      ...updatedData,
                    },{
                      authMode: 'userPool'
                    });
                  if (errors) {
                    throw new Error(errors[0].message);
                  }
                  if (newJob) {
                    toast.success("Job details updated successfully");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("Failed to update job details");
                } finally {
                  setLoading(false);
                  handleCancel();
                }
              }
            }}
            className={`px-4 py-2 rounded-md text-whitish font-medium ${
              !changeMade ? "pointer-events-none" : ""
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </motion.button>
        </footer>
      </div>
    </div>
  );
};

export default JobItemModal;
