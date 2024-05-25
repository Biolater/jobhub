import { FC, MouseEventHandler, useRef, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { signOut } from "aws-amplify/auth";
import { motion } from "framer-motion";
import {
  SearchIcon,
  BrowseJobsIcon,
  DashboardIcon,
  SettingsIcon,
  LogoutIcon,
  ThreeDotsIcon,
} from "../Icons";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";

const Sidebar: FC<{ onOutsideClick: () => void, onHide: () => void }> = ({ onOutsideClick, onHide }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
  const sidebarInnerVariants = {
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
      width: 320,
    },
    exit: {
      width: 0,
    },
  };
  const handleSignOut = (text: string) => {
    if (text === "Logout") {
      toast.promise(signOut(), {
        loading: "Logging out...",
        success: "Logged out successfully",
        error: "Error logging out",
      });
    } else {
      onOutsideClick();
    }
  };
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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        onHide();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);
  
  const { userName, email } = useAuth();
  return (
    <motion.div
      data-testid="sidebar"
      onClick={handleOutsideClick}
      className="sidebar__overlay sm:hidden z-50 h-screen fixed top-0 left-0 bottom-0 w-full"
    >
      <motion.div
        ref={sidebarRef}
        variants={sidebarContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="sidebar__content px-4 pb-4 pt-16 h-full bg-zephyr"
      >
        <motion.div
          variants={sidebarInnerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="sidebar__inner h-full flex flex-col justify-between"
        >
          <div className="sidebar__top">
            <Link href="/my-profile">
              <div className="userProfile sm:items-center sm:justify-center cursor-pointer p-2 rounded-lg mb-2 transition-all duration-200 hover:bg-disabledColor/20 flex items-center justify-between">
                <div className="userProfile__left flex items-center gap-2">
                  <div className="userProfile__pic size-[40px]">
                    <div className="w-full h-full rounded-full bg-black"></div>
                  </div>
                  <div className="userProfile__details sm:hidden flex flex-col">
                    <p className="userProfile__name text-lg text-whitish font-semibold">
                      {userName}
                    </p>
                    <p className="userProfile__email text-sm text-whitish/50">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="userProfile__dots sm:hidden">
                  <ThreeDotsIcon />
                </div>
              </div>
            </Link>
            <div className="sidebar__items flex flex-col gap-2">
              {topSidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  isActive={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="sidebar__bottom flex flex-col gap-2">
            {bottomSidebarItems.map((item, index) => (
              <SidebarItem
                onClick={() => handleSignOut(item.text)}
                key={index}
                text={item.text}
                icon={item.icon}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
