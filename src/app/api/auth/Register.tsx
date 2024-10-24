"use server";

import { Login } from "@/app/Types/Register";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../../../../utils/supabase/server";
import { encodedRedirect } from "../../../../utils/utils";

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

  console.log("test");
  return redirect("/Dashboard");
};

// export const refresh = async () => {
//   // try {
//   //   const res = await fetch("https://pilot.buurbak.nl/api/v1/auth/refresh", {
//   //     method: "POST",
//   //     headers: {
//   //       Authorization: "Bearer " + (await getToken("refresh_token")),
//   //       "Content-Type": "application/json",
//   //     },
//   //     credentials: "include",
//   //     body: JSON.stringify({ deviceId: uuid() }),
//   //   });
//   //   if (!res.ok) {
//   //     throw new Error("Network response was not ok");
//   //   }
//   //   const result: Token = await res.json();
//   //   await storeLoginToken(result);
//   //   console.log(result);
//   //   return result;
//   // } catch (err) {
//   //   if (err instanceof Error) {
//   //     alert(err.message);
//   //   } else {
//   //     alert("An unknown error occurred");
//   //   }
//   // }
// };

export const register = async (data: Login) => {
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
      emailRedirectTo: `/Dashboard`,
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

export const getUser = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  return user;
};

export const updateUser = async (name: string, phoneNumber: string) => {
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
