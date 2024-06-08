"use client";
import Image from "next/image";
import ProfileDetails from "./ProfileDetails";
import { EditIcon } from "../Icons";
import {
  FileUploaderRegular,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import { FC, useRef, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
const ProfileInformation: FC<{
  profileImage: string;
  username: string;
  bio: string;
  email: string;
  joinDate: string;
  location: string | null;
  portfolioUrl: string | null;
  handleModalOpen: () => void;
}> = ({
  profileImage,
  username,
  bio,
  email,
  joinDate,
  location,
  portfolioUrl,
  handleModalOpen,
}) => {
  const client = generateClient<Schema>();

  const { userId } = useAuth();
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
  const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);
  const handleEditButtonClick = () => {
    const button = document.querySelector(
      ".fileUploaderWrapper-2 button"
    ) as HTMLButtonElement;
    button?.click();
  };
  const [uploadedPicUrl, setUploadedPicUrl] = useState("");
  const handleProfilePhotoUpdate = async () => {
    try {
      const { data, errors } = await client.models.User.update(
        {
          id: userId,
          profilePic: uploadedPicUrl,
        },
        {
          authMode: "userPool",
        }
      );
      if (errors) {
        throw new Error(errors[0].message);
      } else if (data) {
        toast.success("Profile picture uploaded successfully");
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (err) {
      toast.error("Error updating profile picture");
    }
  };
  const handleDoneClick = () => {
    handleProfilePhotoUpdate();
    uploaderRef.current?.uploadCollection.clearAll();
  };
  const handleModalClose = () => {
    uploaderRef.current?.uploadCollection.clearAll();
  };
  return (
    <div className="profileInformation relative bg-zephyr py-4 px-2 rounded-lg flex flex-col justify-center items-center">
      <motion.button
        data-testid="editProfileButton"
        onClick={handleModalOpen}
        variants={EDIT_BUTTON_VARIANTS}
        whileTap="whileTap"
        whileHover="whileHover"
        className="absolute p-2 top-2 right-2 rounded-lg bg-secondary text-whitish font-semibold"
      >
        Edit profile
      </motion.button>
      <div className="profilePhoto group/profilePhoto relative mb-2 sm:mb-3">
        {profileImage && (
          <Image
            
            quality={100}
            alt="profile photo"
            src={profileImage}
            width={100}
            height={100}
            className="rounded-full h-full object-cover"
          />
        )}
        <FileUploaderRegular
          apiRef={uploaderRef}
          className="fileUploaderWrapper opacity-0 fileUploaderWrapper-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          cropPreset="1:1"
          onDoneClick={handleDoneClick}
          onModalClose={handleModalClose}
          onFileUploadSuccess={(e) => setUploadedPicUrl(e.cdnUrl)}
          pubkey="4c3aa865a371a495bdbd"
          maxLocalFileSizeBytes={5000000}
          multiple={false}
          imgOnly={true}
          sourceList="local, url, camera, dropbox"
        />
        <div
          onClick={handleEditButtonClick}
          className="editIcon cursor-pointer inset-0 opacity-0 pointer-events-none group-hover/profilePhoto:opacity-100 group-hover/profilePhoto:pointer-events-auto group-hover/profilePhoto:bg-black/50 rounded-full transition-all duration-300  w-full h-full absolute flex items-center justify-center"
        >
          <EditIcon className=" fill-whitish size-8" />
        </div>
      </div>
      <p className="username text-whitish text-2xl font-semibold sm:text-3xl">
        {username}
      </p>
      <p className="bio mb-2 sm:mb-3 text-whitish sm:text-lg">{bio}</p>
      <ProfileDetails
        location={location}
        portfolioUrl={portfolioUrl}
        joinDate={joinDate}
        email={email}
      />
    </div>
  );
};

export default ProfileInformation;
