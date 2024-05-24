import { FC, MouseEventHandler, useRef } from "react";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";

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

const Sidebar: FC<{ onOutsideClick: () => void }> = ({ onOutsideClick }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick: MouseEventHandler = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
      onOutsideClick();
    }
  };
  return (
    <motion.div
      onClick={handleOutsideClick}
      className="sidebar__overlay z-50 h-screen fixed top-0 left-0 bottom-0 w-full"
    >
      <motion.div
        ref={sidebarRef}
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
