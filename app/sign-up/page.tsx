"use client";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import toast from "react-hot-toast";
import { LoadingButtonIcon } from "@/components/Icons";

Amplify.configure(outputs);
const Signup = () => {
  const { setUserEmail } = useAuth();
  const client = generateClient<Schema>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const createDefAvatar = (seed: string) => {
    const avatar = createAvatar(pixelArt, {
      seed,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      backgroundType: ["gradientLinear"],
    });

    const dataUri = avatar.toDataUriSync();
    return dataUri;
  };
  const handleSignUp = async (username: string, password: string) => {
    try {
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      setLoading(true);
      const avatarUri = createDefAvatar(name);
      const userFromAws = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email: username,
          },
          autoSignIn: false,
        },
      });
      const { data, errors } = await client.models.User.create({
        id: userFromAws?.userId,
        email: email,
        username: name,
        profilePic: avatarUri,
      });
      if (errors) {
        setLoading(false);
        throw new Error(errors[0].message);
      } else if (data) {
        setUserEmail(email);
        toast.success("Account created successfully");
        router.push("/confirm-password");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    if (!loading) {
      event.preventDefault();
      handleSignUp(email, password);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 p-4 h-screen w-full flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl font-semibold text-whitish">Sign Up</h2>

      <div className="flex flex-col text-whitish">
        <label htmlFor="name" className="text-sm mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="transition-all duration-300  w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-whitish mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all duration-300  w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm text-whitish mb-1">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="transition-all duration-300  w-full col-span-3 bg-primary text-whitish border-2 focus-visible:outline-none focus-visible:border-whitish border-zephyr py-2 px-3 rounded-lg"
        />
      </div>
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
      </button>
    </form>
  );
};

export default Signup;
