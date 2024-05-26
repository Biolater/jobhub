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

const SidebarWideScreen: FC = () => {
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
      width: 88
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
    }
  };

  // useEffect(() => {
  //   // const handleResize = () => {
  //   //   setSidebarWidth(window.innerWidth > 640 ? 80 : 320);
  //   // };
  //   // window.addEventListener("resize", handleResize);
  //   // return () => window.removeEventListener("resize", handleResize);
  // }, [window.innerWidth]);

  const { userName, email } = useAuth();
  return (
    <motion.div
      ref={sidebarRef}
      variants={sidebarContentVariants}
      data-testid="sidebarWideScreen"
      initial="initial"
      animate="animate"
      exit="exit"
      className="sidebar__content h-screen p-4 bg-zephyr"
    >
      <motion.div
        variants={sidebarInnerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="sidebar__inner h-full flex flex-col justify-between"
      >
        <motion.div layout className="sidebar__top">
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
        </motion.div>
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
  );
};

export default SidebarWideScreen;
