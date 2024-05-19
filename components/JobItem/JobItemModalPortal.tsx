"use client";
import { createPortal } from "react-dom";
import { useState, useEffect, FC } from "react";
import JobItemModal from "./JobItemModal";

type JobItemModalPortalProps = {
  jobId: string;
  isActive: boolean;
  handleCancel: () => void;
  companyName: string;
  jobDescription: string;
  jobTitle: string;
  status: "Saved" | "Applied" | "Interviewing" | "Hired" | "Rejected";
  jobUrl: string;
  date: string;
  notes: string;
};

const JobItemModalPortal: FC<JobItemModalPortalProps> = ({
  jobId,
  isActive,
  handleCancel,
  companyName,
  jobDescription,
  jobTitle,
  jobUrl,
  date,
  status,
  notes,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return (
    isMounted &&
    createPortal(
      <JobItemModal
        jobId={jobId}
        companyName={companyName}
        jobDescription={jobDescription}
        jobTitle={jobTitle}
        status={status}
        jobUrl={jobUrl}
        date={date}
        notes={notes}
        isActive={isActive}
        handleCancel={handleCancel}
      />,
      document.body
    )
  );
};

export default JobItemModalPortal;
