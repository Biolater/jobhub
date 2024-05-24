import { FC, MouseEventHandler, useRef, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { motion } from "framer-motion";
import {
  SearchIcon,
  BrowseJobsIcon,
  DashboardIcon,
  SettingsIcon,
  LogoutIcon,
} from "../Icons";
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
  const topSidebarItems = [
    {
      text: "Search through your jobs",
      icon: <SearchIcon />,
    },
    {
      text: "Applications Dashboard",
      icon: <DashboardIcon />,
    },
    {
      text: "Browse Job Board",
      icon: <BrowseJobsIcon />,
    },
  ];
  const bottomSidebarItems = [
    {
      text: "Settings",
      icon: <SettingsIcon />,
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
    },
  ];
  const handleOutsideClick: MouseEventHandler = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
      onOutsideClick();
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOutsideClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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
      >
        <div className="sidebar__top">
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
