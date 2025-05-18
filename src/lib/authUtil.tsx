"use server";
import { UserDetails, SignInCredentials, RegisterUserParams } from "@/app/Types/User";
import { Session } from "@supabase/supabase-js";
import { createClient } from "../../utils/supabase/server";
import { encodedRedirect } from "../../utils/utils";


export const signIn = async (userData: SignInCredentials): Promise<UserDetails | undefined> => {
  const supabase = createClient();
  const email = userData.username;
  const password = userData.password;

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    response.error.status === 400 ?
      encodedRedirect(
        "error",
        "/",
        "Jouw email of wachtwoord is onjuist"
      ) :
      encodedRedirect(
        "error",
        "/",
        "Er is iets fout gegaan. Probeer het later nog eens"
      );
    return;
  };

  return response.data.user.user_metadata as UserDetails;
};

export const signOut = async () => {
  const supabase = createClient();
  const error = await supabase.auth.signOut();
  if (error) {
    console.warn(error);
  }
};

export const registerAccount = async (registerUserParams: RegisterUserParams) => {
  const email = registerUserParams.username;
  const password = registerUserParams.password;
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
        name: registerUserParams.name,
        phoneNumber: registerUserParams.phone_number,
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
      "Bedankt voor het inloggen! Check je email voor de bevestigings link."
    );
  }
};

export const forgotPassword = async (email: string, origin: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email,
    { redirectTo: origin + '/wachtwoord_veranderen' }
  );

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
      "/wachtwoord_veranderen",
      "Je wachtwoord is succesvol veranderd"
    );
  }
};

export const getUserSupaBase = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  return user;
};

export const getSignedInUserOrUndefined = async (): Promise<UserDetails | undefined> => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts/info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.message) {
      console.log(JSON.stringify(responseJson));
      return;
    }


    return responseJson;
  } catch (error) {
    console.warn(error);
  }
};

//TODO remove any
export const updateUser = async (data: Partial<UserDetails>) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts/info`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
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


export const deleteUser = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/accounts`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    await response.json();
    await signOut();
    return encodedRedirect("success", "/", "Wij hebben je account verwijderd");
  } catch (error) {
    return encodedRedirect(
      "error",
      "",
      "Er is helaas wat mis gegaan met het verwijderen van je account."
    );
  }
};
