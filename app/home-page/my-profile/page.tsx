"use client";
import { ProfileBanner, ProfileInformation } from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
type userData = {
  profilePic: string | null;
  username: string;
  email: string;
  createdAt: string;
  bio: string;
  profileBanner: string | null;
};
Amplify.configure(outputs);
const MyProfile = () => {
  const client = generateClient<Schema>();
  const [userData, setUserData] = useState<userData>({} as userData);
  const { userId } = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, errors } = await client.models.User.get(
          {
            id: userId,
          },
          {
            authMode: "userPool",
            selectionSet: [
              "profilePic",
              "username",
              "email",
              "createdAt",
              "bio",
              "profileBanner",
            ],
          }
        );
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          if (userData) {
            setUserData({
              profilePic: userData?.profilePic || null,
              username: userData.username,
              email: userData?.email,
              createdAt: userData.createdAt,
              bio: userData?.bio || "No bio yet",
              profileBanner: userData?.profileBanner || null,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);
  return (
    <main className="myProfile flex flex-col gap-4 p-4">
      <ProfileBanner bannerUrl={userData?.profileBanner || null} />
      <ProfileInformation
        bio={userData.bio}
        email={userData.email}
        joinDate={userData.createdAt}
        profileImage={userData.profilePic}
        username={userData.username}
      />
    </main>
  );
};

export default MyProfile;
