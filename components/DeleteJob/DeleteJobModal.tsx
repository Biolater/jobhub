/**
 * @file DeleteJobModal component
 * @description A modal to confirm or cancel job deletion
 *
 * @requires
 * - react
 * - framer-motion
 * - react-hot-toast
 * - aws-amplify/data
 * - amplify-data-types
 *
 * @author Yusifbek Amirkhanov
 */

import { FC, useEffect, useState, useRef, MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { CloseIcon } from "../Icons";
import { useJobDetail } from "@/contexts/ActiveJobDetailsContext";
import toast from "react-hot-toast";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

/**
 * Variants for close icon animation
 */
const closeIconVariants = {
  whileHover: {
    scale: 1.2,
  },
  whileTap: {
    scale: 0.9,
  },
};

/**
 * Variants for modal buttons animation
 */
const ModalButtonVariants = {
  whileHover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
    },
  },
  whileTap: {
    scale: 0.9,
  },
  bgCancelBtn: {
    backgroundColor: "rgba(51, 63, 68, 0.5)",
  },
  bgDeleteBtn: {
    backgroundColor: "rgba(233, 25, 45, 0.5)",
  },
};

/**
 * DeleteJobModal component
 *
 * @param {Object} props - Component props
 * @param {string} jobId - Job ID to delete
 */
const DeleteJobModal: FC<{ jobId: string }> = ({ jobId }) => {
  const client = generateClient<Schema>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setDeleteJobModalActive } = useJobDetail();
  const handleClose = () => {
    setDeleteJobModalActive(false);
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data: deletedJob, errors } = await client.models.Job.delete({
        id: jobId,
      }, {
        authMode: 'userPool'
      });
      if (errors) {
        throw new Error(errors[0].message);
      }
      if (deletedJob) {
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting job");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const jobModalInnerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    if (
      jobModalInnerRef.current &&
      !jobModalInnerRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };
  /**
   * Effect hook to listen for escape key press and close the modal
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      onClick={handleClickOutside}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="deleteJobModal__layer z-[9999] fixed top-0 right-0 bottom-0 left-0 h-screen flex items-center justify-center w-full bg-black/50"
    >
      <div ref={jobModalInnerRef} className="deleteJobModal__inner sm:w-max sm:rounded-lg w-full bg-primary">
        <header className="deleteJobModal__header text-whitish border-b border-white/20 flex items-center justify-between p-4">
          <p>Delete Job</p>
          <motion.button
            disabled={loading}
            onClick={handleClose}
            variants={closeIconVariants}
            whileHover={"whileHover"}
            whileTap={"whileTap"}
            className="deleteJobModal__closeBtn"
          >
            <CloseIcon className="size-[14px] fill-whitish" />
          </motion.button>
        </header>
        <main className="deleteJobModal__main text-whitish p-4">
          <p className="text-xl max-w-[220px] sm:max-w-[300px] mx-auto sm:text-2xl text-center font-medium mb-4">
            Are you sure you want to delete this job?
          </p>
          <div className="deleteJobModal__buttons gap-4 flex items-center justify-between">
            <motion.button
              disabled={loading}
              onClick={handleClose}
              variants={ModalButtonVariants}
              whileHover={"whileHover"}
              whileTap={"whileTap"}
              animate={loading && "bgCancelBtn"}
              className={`bg-secondary text-medium font-semibold py-2 rounded-lg flex-1`}
            >
              Cancel
            </motion.button>
            <motion.button
              disabled={loading}
              onClick={handleDelete}
              variants={ModalButtonVariants}
              whileHover={"whileHover"}
              whileTap={"whileTap"}
              animate={loading && "bgDeleteBtn"}
              className="bg-danger/70 text-medium font-semibold py-2 rounded-lg flex-1"
            >
              Delete
            </motion.button>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default DeleteJobModal;
