"use server";

import { Login } from "@/app/Types/Register";
import { cookies } from "next/headers";

type LoginResponse = {
  status: number;
  data?: any;
  error?: string;
};

type Token = {
  access_token: string;
  refresh_token: string;
};

type Tokens = "access_token" | "refresh_token";

export async function logOut(token: Tokens) {
  cookies().delete(token);
}

export const logIn = async (data: Login): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://pilot.buurbak.nl/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const status = response.status;
    let responseData: Token;

    if (status === 401) {
      return { status };
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    responseData = await response.json();
    cookies().set("access_token", responseData.access_token);
    cookies().set("refresh_token", responseData.refresh_token);
    return { status, data: responseData };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, error: error.message };
    }
    return { status: 500, error: "An unexpected error occurred" };
  }
};
