import axios from "axios";
import { redirect } from "next/navigation";

const API_URL = process.env.BASE_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

interface Payload {
  name: string;
  email: string;
  password: string;
}
export async function registerUser(payload: Payload) {
  const result = await axios.post(`${API_URL}/api/auth/register`, payload);
  return result.data;
}

export async function login(payload: { email: string; password: string }) {
  const result = await axios.post(`${API_URL}/api/auth/login`, payload, {
    withCredentials: true,
  });
  return result.data;
}

export function loginWithGoogle() {
  window.location.href = `${API_URL}/api/auth/google`;
}

export async function logout() {
  const result = await axios.post(
    `${API_URL}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  if (result.status === 200) {
    redirect("/auth/login");
  }
}
