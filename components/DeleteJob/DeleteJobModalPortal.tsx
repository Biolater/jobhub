"use client"
/**
 * DeleteJobModalPortal component
 *
 * @description A portal that renders a DeleteJobModal component
 *              when the component is mounted
 *
 * @param {Object} props - Component props
 * @param {string} props.jobId - Job ID to delete
 */
import { useState, useEffect, FC } from "react";
import DeleteJobModal from "./DeleteJobModal";
import { createPortal } from "react-dom";

/**
 * @function DeleteJobModalPortal
 * @type {FC<{ jobId: string }>} - Function component with jobId prop
 */
const DeleteJobModalPortal: FC<{ jobId: string }> = ({ jobId }) => {
  /**
   * State hook to keep track of component mount status
   */
  const [isMounted, setIsMounted] = useState<boolean>(false);

  /**
   * Effect hook to set isMounted state to true when component mounts
   * and set it to false when component unmounts
   */
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  /**
   * JSX element to render when component is mounted
   */
  return (
    isMounted && createPortal(<DeleteJobModal jobId={jobId} />, document.body)
  );
};

/**
 * @exports DeleteJobModalPortal
 */
export default DeleteJobModalPortal;
