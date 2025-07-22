import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the cookie by setting it to expire
  response.cookies.set("authToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
