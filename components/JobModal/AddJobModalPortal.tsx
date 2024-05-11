"use client";
import { useState, useEffect, FC } from "react";
import { createPortal } from "react-dom";
import { AddJobModal } from "@/components";
const AddJobModalPortal: FC<{
  isActive: boolean;
  handleCancel: () => void;
}> = ({ isActive, handleCancel }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  return (
    isMounted &&
    createPortal(
      <AddJobModal handleCancel={handleCancel} isActive={isActive} />,
      document.body
    )
  );
};

export default AddJobModalPortal;
