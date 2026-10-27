import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export async function POST(request: Request) {
  try {
    // 1. Read the request body
    const payload = await request.json();
    console.log("2. Payload:", payload);

    // 2. Call your backend login API
    const result = await axios.post(`${API_URL}/api/auth/login`, payload);

    console.log("3. Backend response:", result.data);

    // 3. Extract values from the Axios response
    const { token, user } = result.data;

    if (!token) {
      console.error("Token missing:", result.data);

      return NextResponse.json(
        { message: "Token missing from backend response" },
        { status: 500 },
      );
    }

    // 4. Create the Next.js response
    const response = NextResponse.json({
      message: "Login successful",
      data: user,
    });

    // 5. Set the cookie on this response
    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    console.log("4. Cookie added to response");

    // 6. Return the response containing the cookie
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Backend error:",
        error.response?.status,
        error.response?.data ?? error.message,
      );
    } else {
      console.error("Route error:", error);
    }

    return NextResponse.json(
      { message: "Login request failed" },
      { status: 500 },
    );
  }
}
