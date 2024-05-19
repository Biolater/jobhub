import { FC } from "react";
import { motion } from "framer-motion";
const DeleteJobModal: FC<{ jobId: string }> = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="deleteJobModal__layer fixed top-0 right-0 bottom-0 left-0 h-screen flex items-center justify-center w-full bg-black/50"
    >
      <div className="deleteJobModal__inner size-[300px] bg-primary"></div>
    </motion.div>
  );
};

export default DeleteJobModal;
