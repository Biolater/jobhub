"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import action from "@/app/actions";
Amplify.configure(outputs);

const AuthContext = createContext({
  isLoggedIn: false,
  email: "",
  userName: "",
  userId: "",
  userJobStatuses: [""],
  setUserEmail: (email: string) => {},
  setUserId: (id: string) => {},
  setUserName: (name: string) => {},
  setUserJobStatuses: (jobs: any) => {},
});

export const useAuth = () => useContext(AuthContext);
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userJobStatuses, setUserJobStatuses] = useState<string[]>([]);
  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        //@ts-ignore
        setUserEmail(payload.data.signInDetails?.loginId);
        action(true);
        setIsLoggedIn(true);
        setUserId(payload.data.username);
        router.push("/jobs");
        break;
      case "signedOut":
        action(false);
        setIsLoggedIn(false);
        setUserId("");
        setUserEmail("");
        setUserName("");
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
        action(false);
        setUserName("");
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        email,
        setUserEmail,
        userId,
        setUserId,
        userName,
        setUserName,
        userJobStatuses,
        setUserJobStatuses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
