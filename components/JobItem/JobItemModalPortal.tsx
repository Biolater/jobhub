"use client";
import { createPortal } from "react-dom";
import { useState, useEffect, FC } from "react";
import JobItemModal from "./JobItemModal";

type JobItemModalPortalProps = {
  isActive: boolean;
  handleCancel: () => void;
  companyName: string;
  jobDescription: string;
  jobTitle: string;
  jobUrl: string;
  date: string;
  notes: string;
};

const JobItemModalPortal: FC<JobItemModalPortalProps> = ({
  isActive,
  handleCancel,
  companyName,
  jobDescription,
  jobTitle,
  jobUrl,
  date,
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
        companyName={companyName}
        jobDescription={jobDescription}
        jobTitle={jobTitle}
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
