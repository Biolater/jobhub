import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import { FC } from "react";
import { motion } from "framer-motion";
const ProfileInformation: FC<{
  profileImage: string;
  username: string;
  bio: string;
  email: string;
  joinDate: string;
  handleModalOpen: () => void;
}> = ({ profileImage, username, bio, email, joinDate, handleModalOpen }) => {
  const EDIT_BUTTON_VARIANTS = {
    whileHover: {
      scale: 1.065,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    whileTap: {
      scale: 0.97,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };
  return (
    <div className="profileInformation relative bg-zephyr py-4 px-2 rounded-lg flex flex-col justify-center items-center">
      <motion.button
        onClick={handleModalOpen}
        variants={EDIT_BUTTON_VARIANTS}
        whileTap="whileTap"
        whileHover="whileHover"
        className="absolute p-2 top-2 right-2 rounded-lg bg-secondary text-whitish font-semibold"
      >
        Edit profile
      </motion.button>
      <div className="profilePhoto mb-2 sm:mb-3">
        {profileImage && (
          <Image
            alt="profile photo"
            src={profileImage}
            width={100}
            height={100}
            className="rounded-full h-full"
            priority
          />
        )}
      </div>
      <p className="username text-whitish text-2xl font-semibold sm:text-3xl">
        {username}
      </p>
      <p className="bio mb-2 sm:mb-3 text-whitish sm:text-lg">{bio}</p>
      <ProfileDetails joinDate={joinDate} email={email} />
    </div>
  );
};

export default ProfileInformation;
