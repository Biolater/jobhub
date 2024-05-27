import { FC, useRef, useState } from "react";
import { signOut } from "aws-amplify/auth";
import { motion } from "framer-motion";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
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

const TOP_SIDEBAR_ITEMS: {
  text: string;
  icon: JSX.Element;
  testId?: string;
  onClick: (router: ReturnType<typeof useRouter>) => void;
}[] = [
    {
      text: "Search through your jobs",
      icon: <SearchIcon />,
      testId: "sidebarWideScreen__searchButton",
      onClick: (router: ReturnType<typeof useRouter>) =>
        router.push("/home-page"),
    },
    {
      text: "Applications Dashboard",
      icon: <DashboardIcon />,
      onClick: (router: ReturnType<typeof useRouter>) =>
        router.push("/home-page/dashboard"),
    },
    {
      text: "Browse Job Board",
      icon: <BrowseJobsIcon />,
      onClick: (router: ReturnType<typeof useRouter>) =>
        router.push("/home-page/job-board"),
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
  animate: { width: 88 },
  exit: { width: 0 },
};

const SidebarWideScreen: FC<{ onSearchButtonClick: () => void }> = ({
  onSearchButtonClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { userName, email } = useAuth();

  const handleSignOut = async (text: string) => {
    if (text === "Logout") {
      try {
        await toast.promise(signOut(), {
          loading: "Logging out...",
          success: "Logged out successfully",
          error: "Error logging out",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTopSidebarItemClick = (index: number) => {
    setActiveIndex(index);
    const item = TOP_SIDEBAR_ITEMS[index];
    if (item.text === "Search through your jobs") {
      item.onClick(router);
        onSearchButtonClick()
    } else {
      item.onClick(router);
    }
  };

  return (
    <motion.div
      ref={sidebarRef}
      variants={SIDEBAR_CONTENT_VARIANTS}
      data-testid="sidebarWideScreen"
      initial="initial"
      animate="animate"
      exit="exit"
      className="sidebar__content min-h-screen p-4 bg-zephyr"
    >
      <motion.div
        variants={SIDEBAR_INNER_VARIANTS}
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
            {TOP_SIDEBAR_ITEMS.map((item, index) => (
              <SidebarItem
                key={index}
                data-testid={item?.testId}
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
        </motion.div>
        <div className="sidebar__bottom flex flex-col gap-2">
          {BOTTOM_SIDEBAR_ITEMS.map((item, index) => (
            <SidebarItem
              key={index}
              text={item.text}
              icon={item.icon}
              onClick={() => handleSignOut(item.text)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SidebarWideScreen;
