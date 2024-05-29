"use client"
import { motion } from "framer-motion";
import { useRef, useEffect, FC } from "react";
import ProfileBadge from "./ProfileBadge";
import { UserCircleIcon, LogoutIcon } from "../Icons";
import ProfileActionButton from "./ProfileActionButton";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const profilePopUpVariants = {
  inital: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -30,
  },
};

type badgeItem = {
  bgColor: string;
  textColor: string;
  content: string;
  contentValue: number;
};

type profileActionsItem = {
  icon: JSX.Element;
  text: string;
};

/**
 * Signs out the user
 */
const handleSignOut = async () => {
  try {
    toast.promise(signOut(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Error logging out",
    });
  } catch (err) {
    console.error(err);
  }
};

const ProfilePopUp: FC<{
  handleOutsideClickPopUp: (event: MouseEvent) => void;
}> = ({ handleOutsideClickPopUp }) => {
  const { email, userName, userJobStatuses } = useAuth();
  const router = useRouter();
  const badgeItems: badgeItem[] = [
    {
      bgColor: "bg-gray-700",
      textColor: "text-gray-300",
      content: "Saved",
      contentValue: userJobStatuses?.filter((status) => status === "Saved")
        .length,
    },
    {
      bgColor: "bg-yellow-900",
      textColor: "text-yellow-300",
      content: "Applied",
      contentValue: userJobStatuses?.filter((status) => status === "Applied")
        .length,
    },
    {
      bgColor: "bg-green-900",
      textColor: "text-green-300",
      content: "Interviewing",
      contentValue: userJobStatuses?.filter(
        (status) => status === "Interviewing"
      ).length,
    },
    {
      bgColor: "bg-indigo-900",
      textColor: "text-indigo-300",
      content: "Hired",
      contentValue: userJobStatuses?.filter((status) => status === "Hired")
        .length,
    },
    {
      bgColor: "bg-red-900",
      textColor: "text-red-300",
      content: "Rejected",
      contentValue: userJobStatuses?.filter((status) => status === "Rejected")
        .length,
    },
  ];
  const handleProfileActionClick = (text: string) => {
    if (text === "Logout") {
      handleSignOut();
    } else if (text === "View Profile") {
      router.push(`/home-page/my-profile`);
    }
  };
  const profileActions: profileActionsItem[] = [
    {
      icon: <UserCircleIcon />,
      text: "View Profile",
    },
    {
      icon: <LogoutIcon />,
      text: "Logout",
    },
  ];
  const profilePopUpRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      profilePopUpRef.current &&
      !profilePopUpRef.current.contains(event.target as Node)
    ) {
      handleOutsideClickPopUp(event);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <motion.div
      ref={profilePopUpRef}
      variants={profilePopUpVariants}
      initial="inital"
      animate="animate"
      exit="exit"
      className="profilePopUp p-4 z-[5] right-5 md:right-0 flex flex-col gap-4  items-center top-[66px] absolute bg-zephyr rounded-xl max-w-[300px]"
    >
      <div className="profilePicture size-[80px]">
        <div className="w-full h-full bg-black rounded-full"></div>
      </div>
      <div className="profile__details text-center text-whitish">
        <h3 className="profile__name text-2xl font-semibold">
          Hi, {userName} 😊
        </h3>
        <p className="profile__email mb-2">{email}</p>
        <div className="badges flex items-center text-xs flex-wrap justify-center font-medium gap-2">
          {badgeItems.map((item, index) => (
            <ProfileBadge
              bgColor={item.bgColor}
              textColor={item.textColor}
              content={item.content}
              contentValue={item.contentValue}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="profile__actions w-full flex flex-col gap-3">
        {profileActions.map((item, index) => (
          <ProfileActionButton
            onClick={handleProfileActionClick}
            icon={item.icon}
            text={item.text}
            key={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfilePopUp;
