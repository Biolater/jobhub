"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const ConfirmPassword = () => {
  const { email } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-center">
        <label htmlFor="password">Confirm code</label>
        <input onChange={handleChange} type="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConfirmPassword;
