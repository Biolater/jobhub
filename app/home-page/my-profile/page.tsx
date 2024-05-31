"use client";
import { AnimatePresence } from "framer-motion";
import {
  ProfileBanner,
  ProfileInformation,
  EditProfileModal,
  LoadingSpinner,
} from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
const MyProfile = () => {
  const { userDetails, userDetailsLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal((prev) => !prev);
  return userDetailsLoading ? (
    <LoadingSpinner className="h-[calc(100vh-64px)]" />
  ) : (
    <div className="myProfile flex flex-col gap-4 p-4 sm:px-10 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
      <AnimatePresence>
        {showModal && <EditProfileModal handleClose={handleModal} />}
      </AnimatePresence>
      <h1 className="text-center text-whitish font-semibold text-2xl sm:text-3xl lg:text-4xl">
        My profile
      </h1>
      <ProfileBanner bannerUrl={userDetails?.profileBanner} />
      <ProfileInformation
        handleModalOpen={handleModal}
        bio={userDetails.bio}
        email={userDetails.email}
        joinDate={userDetails.joinDate}
        profileImage={userDetails.profilePic}
        username={userDetails.username}
      />
    </div>
  );
};

export default MyProfile;
