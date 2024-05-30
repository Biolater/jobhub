"use client";
import { ProfileBanner, ProfileInformation } from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { type Schema } from "@/amplify/data/resource";
import { LoadingSpinner } from "@/components/index";

const MyProfile = () => {
  const { userDetails, userDetailsLoading } = useAuth();

  return userDetailsLoading ? (
    <LoadingSpinner className="h-[calc(100vh-64px)]" />
  ) : (
    <main className="myProfile flex flex-col gap-4 p-4">
      <h1 className="text-center text-whitish font-semibold text-2xl">
        My profile
      </h1>
      <ProfileBanner bannerUrl={userDetails?.profileBanner} />
      <ProfileInformation
        bio={userDetails.bio}
        email={userDetails.email}
        joinDate={userDetails.joinDate}
        profileImage={userDetails.profilePic}
        username={userDetails.username}
      />
    </main>
  );
};

export default MyProfile;
