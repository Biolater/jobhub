"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { LoadingButtonIcon } from "@/components/Icons";
import toast from "react-hot-toast";

const ConfirmPassword = () => {
  const { email } = useAuth();
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    if (!loading) {
      e.preventDefault();
      try {
        setLoading(true);
        const { isSignUpComplete } = await confirmSignUp({
          username: email,
          confirmationCode: code,
        });
        if (isSignUpComplete) {
          toast.success("Sign Up Successful");
          router.push("/");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex text-whitish flex-col justify-center items-center gap-3 text-center"
      >
        <label htmlFor="password" className="text-2xl font-semibold">
          Confirm code
        </label>
        <input
          onChange={handleChange}
          type="password"
          className="transition-all duration-300  w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary flex items-center font-medium transition-colors hover:bg-whitish/80 py-2 px-4 rounded-md bg-whitish text-primary"
        >
          {!loading && "Sign Up"}
          {loading && (
            <>
              <span className="me-1">Signing Up</span>
              <LoadingButtonIcon />
            </>
          )}
        </button>{" "}
      </form>
    </div>
  );
};

export default ConfirmPassword;
