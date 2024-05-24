import { FC } from "react";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";

const sidebarOverlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const sidebarContentVariants = {
  initial: {
    width: 0,
  },
  animate: {
    width: 300,
  },
  exit: {
    width: 0,
  },
};

const Sidebar: FC = () => {
  return (
    <motion.div
      variants={sidebarOverlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="sidebar__overlay z-50 h-screen bg-black/30 fixed top-0 left-0 bottom-0 w-full"
    >
      <motion.div
        variants={sidebarContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="sidebar__content h-full bg-zephyr"
      ></motion.div>
    </motion.div>
  );
};

export default Sidebar;
