"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
Amplify.configure(outputs);

const AuthContext = createContext({
  isLoggedIn: false,
  email: "",
  setUserEmail: (email: string) => {},
  userId: "",
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
  Hub.listen("auth", ({ payload }) => {
    switch (payload.event) {
      case "signedIn":
        setIsLoggedIn(true);
        router.push("/jobs");
        break;
      case "signedOut":
        setIsLoggedIn(false);
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
          setUserId(user.userId);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, email, setUserEmail, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
