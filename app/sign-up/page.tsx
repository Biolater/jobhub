"use client";
import { useState } from "react";
import { signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
const Signup = () => {
  const { setUserEmail, setUserId } = useAuth();
  Amplify.configure(outputs);
  const client = generateClient<Schema>();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (username: string, password: string) => {
    try {
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
      const { errors, data: newUser } = await client.models.User.create({
        id: userFromAws?.userId,
        email: email,
        username: name,
        password: password,
      });
      if (errors) {
        throw new Error(errors[0].message);
      } else {
        setUserEmail(email);
        setUserId(newUser?.id as string);
        router.push("/confirm-password");
        console.log(newUser);
        console.log(userFromAws);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSignUp(email, password);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="space-y-4 h-screen w-full flex flex-col items-center justify-center"
    >
      <h2 className="text-xl font-medium text-gray-700">Sign Up</h2>

      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm text-gray-600">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm text-gray-600">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm text-gray-600">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
