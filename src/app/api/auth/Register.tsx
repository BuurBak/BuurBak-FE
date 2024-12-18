"use server";
import { GetUser, Login } from "@/app/Types/User";
import { Session } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import { encodedRedirect } from "../../../../utils/utils";
import { deleteToken } from "./Cookies";

type LoginResponse = {
  status: number;
  data?: any;
  error?: string;
};

export const logIn = async (data: Login): Promise<LoginResponse> => {
  const email = data.username;
  const password = data.password;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("error", "/", error.message);
    return encodedRedirect("error", "/", error.message);
  }

  return redirect("");
};

export const registerAccount = async (data: Login) => {
  const email = data.username;
  const password = data.password;
  const supabase = createClient();
  const origin = headers().get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `/dashboard`,
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const forgotPassword = async (email: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/wachtwoord_verranderen",
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/",
      "We hebben een mail gestuurd als je bij ons bent aangemeld"
    );
  }
};

export const resetPassword = async (newPassword: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/wachtwoord_verranderen",
      "Je wachtwoord is succesvol verranderd"
    );
  }
};

export const getUserSupaBase = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  return user;
};

export const getUser = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          sessionToken
            ? sessionToken.access_token
            : process.env.NEXT_PUBLIC_JWT_TOKEN
        }`,
        "Content-Type": "application/json",
      },
    });

    const data: GetUser = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const updateUser = async (data: GetUser) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts/info`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${
          sessionToken ? sessionToken : process.env.NEXT_PUBLIC_JWT_TOKEN
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const updateSupaUser = async (name: string, phoneNumber: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    data: { name: name, phoneNumber: phoneNumber },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/", error.message);
  } else {
    return encodedRedirect("success", "", "Gegevens succesvol aangepast");
  }
};

export const getSession = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("error", "/", error.message);
    return encodedRedirect("error", "/", error.message);
  }

  return data.session;
};

export const signOut = async () => {
  await deleteToken("sb-tnffbjgnzpqsjlaumogv-auth-token");
};

export const deleteUser = async () => {
  const supabase = createClient();

  const sessionToken: Session | null = await getSession();

  if (sessionToken) {
    const { data, error } = await supabase.auth.admin.deleteUser(
      sessionToken.toString()
    );

    if (data) {
      console.log(data);
    }
    if (error) {
      console.warn(error);
    } else {
      console.log("unkown error");
    }
  } else {
    console.log("User token not found");
  }
};
