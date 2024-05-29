"use client";
import { FC, MouseEventHandler, useRef, useEffect, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import {
  SearchIcon,
  BrowseJobsIcon,
  DashboardIcon,
  SettingsIcon,
  LogoutIcon,
  ThreeDotsIcon,
} from "../Icons";
import { useAuth } from "@/contexts/AuthContext";
import SidebarItem from "./SidebarItem";

const TOP_SIDEBAR_ITEMS = (router: ReturnType<typeof useRouter>) => [
  {
    text: "Search through your jobs",
    icon: <SearchIcon />,
    onClick: () => router.push("/home-page"),
  },
  {
    text: "Applications Dashboard",
    icon: <DashboardIcon />,
    onClick: () => router.push("/home-page/dashboard"),
  },
  {
    text: "Browse Job Board",
    icon: <BrowseJobsIcon />,
    onClick: () => router.push("/home-page/job-board"),
  },
];

const BOTTOM_SIDEBAR_ITEMS = [
  {
    text: "Settings",
    icon: <SettingsIcon />,
  },
  {
    text: "Logout",
    icon: <LogoutIcon />,
  },
];

const SIDEBAR_INNER_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const SIDEBAR_CONTENT_VARIANTS = {
  initial: { width: 0 },
  animate: { width: 320 },
  exit: { width: 0 },
};

const Sidebar: FC<{
  onOutsideClick: () => void;
  onHide: () => void;
  onSearchBar: () => void;
}> = ({ onOutsideClick, onHide, onSearchBar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { userName, email } = useAuth();

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

  const handleTopSidebarItemClick = (index: number) => {
    setActiveIndex(index);
    onOutsideClick();
    const item = TOP_SIDEBAR_ITEMS(router)[index];
    if (item.text === "Search through your jobs") {
      item.onClick();
      setTimeout(() => {
        onSearchBar()
      }, 200)
    } else if (item.onClick) {
      item.onClick();
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
  }, [onOutsideClick]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) {
        onHide();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onHide]);

  return (
    <motion.div
      data-testid="sidebar"
      onClick={handleOutsideClick}
      className="sidebar__overlay sm:hidden z-50 h-screen fixed top-0 left-0 bottom-0 w-full"
    >
      <motion.div
        ref={sidebarRef}
        variants={SIDEBAR_CONTENT_VARIANTS}
        initial="initial"
        animate="animate"
        exit="exit"
        className="sidebar__content px-4 pb-4 pt-16 h-full bg-zephyr"
      >
        <motion.div
          variants={SIDEBAR_INNER_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="sidebar__inner h-full flex flex-col justify-between"
        >
          <div className="sidebar__top">
            <Link href="/home-page/my-profile">
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
              {TOP_SIDEBAR_ITEMS(router).map((item, index) => (
                <SidebarItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  isActive={
                    activeIndex === index ||
                    (pathname === "/home-page/dashboard" && index === 1) ||
                    (pathname === "/home-page/job-board" && index === 2)
                  }
                  onClick={() => handleTopSidebarItemClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="sidebar__bottom flex flex-col gap-2">
            {BOTTOM_SIDEBAR_ITEMS.map((item, index) => (
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
