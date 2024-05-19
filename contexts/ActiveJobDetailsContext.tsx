"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

// Define the types for job details and context
type JobDetails = {
  title: string;
  jobUrl: string;
  company: string;
  description: string;
  date: string;
  notes: string;
};

type JobDetailsContextType = {
  previousJobDetails: JobDetails;
  newJobDetails: JobDetails;
  changeMade: boolean;
  changedDetails: string[];
  setPreviousJobDetails: Dispatch<SetStateAction<JobDetails>>;
  setNewJobDetails: Dispatch<SetStateAction<JobDetails>>;
  setChangeMade: Dispatch<SetStateAction<boolean>>;
  setChangedDetails: Dispatch<SetStateAction<string[]>>;
};

// Create the context with default values
const JobDetailsContext = createContext<JobDetailsContextType>({
  previousJobDetails: {
    title: "",
    jobUrl: "",
    company: "",
    description: "",
    date: "",
    notes: "",
  },
  newJobDetails: {
    title: "",
    jobUrl: "",
    company: "",
    description: "",
    date: "",
    notes: "",
  },
  changeMade: false,
  changedDetails: [],
  setPreviousJobDetails: () => {},
  setNewJobDetails: () => {},
  setChangeMade: () => {},
  setChangedDetails: () => {},
});

// Custom hook to use the context
export const useJobDetail = () => useContext(JobDetailsContext);

// Context provider component
export default function JobDetailsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [previousJobDetails, setPreviousJobDetails] = useState<JobDetails>({
    title: "",
    jobUrl: "",
    company: "",
    description: "",
    date: "",
    notes: "",
  });
  const [newJobDetails, setNewJobDetails] = useState<JobDetails>({
    title: "",
    jobUrl: "",
    company: "",
    description: "",
    date: "",
    notes: "",
  });
  const [changeMade, setChangeMade] = useState<boolean>(false);
  const [changedDetails, setChangedDetails] = useState<string[]>([]);

  useEffect(() => {
    const keys = Object.keys(previousJobDetails) as (keyof JobDetails)[];
    let hasChanged = false;
    const changedSet = new Set<string>();

    for (let key of keys) {
      if (previousJobDetails[key] !== newJobDetails[key]) {
        hasChanged = true;
        if (key === "jobUrl") {
          changedSet.add("joburl");
        } else {
          changedSet.add(key);
        }
      }
    }
    setChangeMade(hasChanged);
    setChangedDetails(Array.from(changedSet));
  }, [newJobDetails, previousJobDetails]);
  useEffect(() => {
    console.log(changedDetails)
  },[changedDetails])
  const value: JobDetailsContextType = {
    previousJobDetails,
    newJobDetails,
    changeMade,
    changedDetails,
    setPreviousJobDetails,
    setNewJobDetails,
    setChangeMade,
    setChangedDetails,
  };

  return (
    <JobDetailsContext.Provider value={value}>
      {children}
    </JobDetailsContext.Provider>
  );
}
