"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import action from "@/app/actions";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
Amplify.configure(outputs);

export type UserDetailsType = {
  email: string;
  username: string;
  profilePic: string;
  bio: string;
  joinDate: string;
  profileBanner: string | null;
  portfolioUrl: string | null;
  location: string | null;
};

const AuthContext = createContext({
  isLoggedIn: false,
  email: "",
  userId: "",
  userJobStatuses: [""],
  userDetails: {} as UserDetailsType,
  userDetailsLoading: true,
  setUserEmail: (email: string) => {},
  setUserId: (id: string) => {},
  setUserJobStatuses: (jobs: any) => {},
  setUserDetails: (details: UserDetailsType) => {},
  setUserDetailsLoading: (value: boolean) => {},
});

export const useAuth = () => useContext(AuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = generateClient<Schema>();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userDetails, setUserDetails] = useState({} as UserDetailsType);
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const [userJobStatuses, setUserJobStatuses] = useState<string[]>([]);
  const getUserData = async (userid: string) => {
    try {
      const { data, errors } = await client.models.User.get(
        {
          id: userid,
        },
        {
          authMode: "userPool",
          selectionSet: [
            "profilePic",
            "username",
            "email",
            "bio",
            "createdAt",
            "profileBanner",
            "portfolioUrl",
            "location",
          ],
        }
      );
      if (errors) {
        throw new Error(errors[0].message);
      } else {
        if (data) {
          setUserDetails({
            email: data.email,
            username: data.username,
            profilePic: data.profilePic,
            bio: data?.bio || "No bio yet",
            joinDate: data.createdAt,
            profileBanner: data?.profileBanner || null,
            portfolioUrl: data?.portfolioUrl || "",
            location: data?.location || "",
          });
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUserDetailsLoading(false);
    }
  };
  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        //@ts-ignore
        setUserEmail(payload.data.signInDetails?.loginId);
        action(true);
        setIsLoggedIn(true);
        setUserId(payload.data.username);
        getUserData(payload.data.username);
        router.push("/home-page");
        break;
      case "signedOut":
        action(false);
        setIsLoggedIn(false);
        setUserId("");
        setUserEmail("");
        setUserJobStatuses([]);
        setUserDetails({
          email: "",
          username: "",
          profilePic: "",
          bio: "",
          joinDate: "",
          profileBanner: null,
          portfolioUrl: "",
          location: "",
        });
        router.push("/");
        break;
      default:
        break;
    }
  });
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setIsLoggedIn(true);
          action(true);
          setUserId(user.userId);
          if (!email) {
            setUserEmail(user.signInDetails?.loginId || "");
          }
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUserId("");
        setUserEmail("");
        setUserDetails({
          email: "",
          username: "",
          profilePic: "",
          bio: "",
          joinDate: "",
          profileBanner: null,
          portfolioUrl: "",
          location: "",
        });
        action(false);
        setUserJobStatuses([]);
      }
    };
    checkAuth();
  }, []);
  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        setUserEmail,
        userId,
        userDetailsLoading,
        setUserDetailsLoading,
        setUserId,
        setUserDetails,
        userDetails,
        userJobStatuses,
        setUserJobStatuses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
