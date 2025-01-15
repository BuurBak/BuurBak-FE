"use server";
import { GetUser, Login } from "@/app/Types/User";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../../../../utils/supabase/server";
import { encodedRedirect } from "../../../../utils/utils";
import { deleteToken } from "./Cookies";

export const logIn = async (userData: Login) => {
  const email = userData.username;
  const password = userData.password;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.status === 400) {
      return encodedRedirect(
        "error",
        "/",
        "Jouw email of wachtwoord is onjuist"
      );
    } else {
      return encodedRedirect(
        "error",
        "/",
        "Er is iets fout gegaan. Probeer het later nog eens"
      );
    }
  }

  return encodedRedirect("success", "/", "Je bent ingelogd");
};

export const registerAccount = async (userData: Login) => {
  const email = userData.username;
  const password = userData.password;
  const supabase = createClient();

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `/dashboard`,
      data: {
        name: userData.name,
        phoneNumber: userData.phoneNumber,
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
      "Bedankt voor het inloggen! Check je email voor de bevestegings link."
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
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
    });

    const data: GetUser = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

//TODO remove any
export const updateUser = async (data: GetUser) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts/info`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
      body: JSON.stringify(data),
    });

    const res: any = await response.json();
    console.log("user", res);

    return res;
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
      console.error("unkown error");
    }
  } else {
    console.error("User token not found");
  }
};
