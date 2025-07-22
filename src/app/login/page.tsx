"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(error.message || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form onSubmit={handleSubmit} className="text-center">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo/logo.jpg"
            alt="Logo"
            width={60}
            height={60}
          />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Welcome Back
        </h1>

        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 max-w-sm sm:w-[477px] w-full">
          <div className="mb-4 text-left">
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Example23@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 text-left">
            <label
              className="block text-gray-900 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end mt-1">
              <Link href="#" className="text-xs text-blue-500 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button className="w-[70%] bg-[#0993EC] hover:bg-[#0882d2] text-white font-medium py-2 rounded-md text-sm transition-all">
            Sign In
          </button>

          <div className="text-center my-3 text-sm text-gray-500">or</div>

          <Link
            href="/sign-up"
            className="w-[70%] mx-auto block text-center border border-[#0993EC] text-[#0993EC] hover:bg-[#0993EC] hover:text-white font-medium py-2 rounded-md text-sm transition-all"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
