"use client";
import { AnimatePresence } from "framer-motion";
import {
  ProfileBanner,
  ProfileInformation,
  EditProfileModal,
  LoadingSpinner,
} from "@/components/index";
import { useAuth, UserDetailsType } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export type UserDetailsKeys = "email" | "username" | "profilePic" | "bio" | "portfolioUrl" | "location";

const MyProfile = () => {
  const { userDetails, userDetailsLoading, userId } = useAuth();
  const [userDetailsCopy, setUserDetailsCopy] = useState<UserDetailsType>(userDetails);
  const [changedDetails, setChangedDetails] = useState<Partial<Record<UserDetailsKeys, string>>>({});
  const [profileEditInputChanged, setProfileEditInputChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    if (showModal) {
      setUserDetailsCopy(userDetails);
    }
    setShowModal((prev) => !prev);
  };

  const handleUserDetailsInput = (key: UserDetailsKeys, value: string) => {
    setUserDetailsCopy((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setUserDetailsCopy(userDetails);
  }, [userDetails]);

  useEffect(() => {
    const keys = Object.keys(userDetails) as UserDetailsKeys[];
    const changedSet = new Set<UserDetailsKeys>();
    let hasChanged = false;
    for (let key of keys) {
      if (userDetails[key] !== userDetailsCopy[key]) {
        hasChanged = true;
        changedSet.add(key);
      }
    }
    setProfileEditInputChanged(hasChanged);

    const changedDetailsObj: Partial<Record<UserDetailsKeys, string>> = {};
    const changedDetailsArray = Array.from(changedSet);
    for (let i = 0; i < changedDetailsArray.length; i++) {
      const key = changedDetailsArray[i];
      changedDetailsObj[key] = userDetailsCopy[key] as string;
    }
    setChangedDetails(changedDetailsObj);
  }, [userDetailsCopy, userDetails]);

  return (
    <>
      {userDetailsLoading && (
        <LoadingSpinner className="h-[calc(100vh-64px)]" />
      )}
      {!userDetailsLoading && (
        <div className="myProfile flex flex-col gap-4 p-4 sm:px-10 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
          <AnimatePresence>
            {showModal && (
              <EditProfileModal
                userId={userId}
                changes={changedDetails}
                onInputChange={(key, value) =>
                  handleUserDetailsInput(key as UserDetailsKeys, value)
                }
                inputChanged={profileEditInputChanged}
                userDetails={userDetailsCopy}
                handleClose={handleModal}
              />
            )}
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
            portfolioUrl={userDetails.portfolioUrl}
            location={userDetails.location}
          />
        </div>
      )}
    </>
  );
};

export default MyProfile;
