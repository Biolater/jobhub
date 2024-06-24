"use client";
import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { LoadingButtonIcon } from "@/components/Icons";
import Link from "next/link";
import toast from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!loading) {
      e.preventDefault();
      try {
        setLoading(true);
        const { isSignedIn } = await signIn({
          username: email,
          password: password,
        });
        if (isSignedIn) {
          toast.success("Sign In Successful");
          router.push("/home-page");
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
        <label htmlFor="email" className="text-2xl font-semibold">
          Sign In
        </label>
        <input
          onChange={handleEmailChange}
          type="email"
          placeholder="Email"
          className="transition-all duration-300 w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
        <input
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
          className="transition-all duration-300 w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
        <div className="flex items-center gap-2">
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary flex items-center font-medium transition-colors hover:bg-whitish/80 py-2 px-4 rounded-md bg-whitish text-primary"
          >
            {!loading && "Sign In"}
            {loading && (
              <>
                <span className="me-1">Signing In</span>
                <LoadingButtonIcon />
              </>
            )}
          </button>
          <Link
            className="btn btn-primary flex items-center font-medium transition-colors py-2 px-4 rounded-md text-whitish/40 hover:underline hover:text-whitish"
            href="/sign-up"
          >
            Sign up now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
