"use client";

import Button from "@/component/Button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Confirm password and password are not same.");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, dob }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      toast.success(
        data.message ||
          "Registration successful! Please check your email inbox (or spam folder) to verify your account and complete the sign-up process."
      );
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to register");
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo/logo.jpg"
            alt="Logo"
            width={60}
            height={60}
          />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create Account
          </h1>
        </div>

        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 max-w-3xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-900 text-base font-semibold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example23@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="text-gray-900 text-base font-semibold mb-2"
              >
                Date of Birth
              </label>
              <input
                required
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-900 text-base font-semibold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-900 text-base font-semibold mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center mt-8 gap-4">
            {/* <button
              type="submit"
              className="w-[70%] bg-[#0993EC] hover:bg-[#0882d2] text-white font-semibold py-3 rounded-md text-base transition-all"
            >
              Sign Up
            </button> */}
            <Button text="Sign Up" isLoading={isLoading} />

            <div className="text-sm text-gray-500">or</div>

            <Link
              href="/login"
              className="w-[70%] text-center border border-[#0993EC] text-[#0993EC] hover:bg-[#0993EC] hover:text-white font-semibold py-2 rounded-md text-base transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
