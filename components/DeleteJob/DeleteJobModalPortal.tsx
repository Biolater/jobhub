"use client";
import { useState, useEffect, FC } from "react";
import DeleteJobModal from "./DeleteJobModal";
import { createPortal } from "react-dom";
const DeleteJobModalPortal: FC<{ jobId: string }> = ({ jobId }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return (
    isMounted && createPortal(<DeleteJobModal jobId={jobId} />, document.body)
  );
};

export default DeleteJobModalPortal;
