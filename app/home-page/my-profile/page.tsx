"use client";
import { ProfileBanner } from "@/components/index";
import { useAuth } from "@/contexts/AuthContext";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";
const MyProfile = () => {
  const client = generateClient<Schema>();
  const [userBannerUrl, setUserBannerUrl] = useState("");
  const { userId } = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: userData, errors } = await client.models.User.get({
          id: userId,
        });
        if (errors) {
          throw new Error(errors[0].message);
        } else {
          console.log(userData);
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
    <main className="myProfile p-4">
      <ProfileBanner bannerUrl={userBannerUrl} />
    </main>
  );
};

export default MyProfile;
