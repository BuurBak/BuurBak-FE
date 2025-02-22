"use server";
import { Session } from "@supabase/supabase-js";
import { encodedRedirect } from "../../../utils/utils";
import { TrailerData } from "../Types/Reservation";
import { PostTrailer } from "../Types/TrailerType";
import { getSession } from "./auth/Register";

export const getAllTrailers = async () => {
  // const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(`https://api.buurbak.nl/trailers/all`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${
        //   token
        //     ? token.replace("base64-", "")
        //     : process.env.NEXT_PUBLIC_JWT_TOKEN
        // }`,
        "Content-Type": "application/json",
      },
    });

    const data: TrailerData[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const getTrailers = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data: TrailerData[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet
export const postTrailer = async (data: PostTrailer) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/trailers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and guessed the type of return
export const getTrailer = async (uuid: string) => {
  try {
    const response = await fetch(`https://api.buurbak.nl/trailers/${uuid}`, {
      method: "GET",
    });

    const data: TrailerData = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and any type of return
export const getTrailerOfLocation = async (address: string, city: string) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers/search?address=${address}&city=${city}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
        },
      }
    );

    const data: any = await response.json();
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
};

export const getTrailerAvalibility = async (uuid: string) => {
  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers/availability/${uuid}`,
      {
        method: "GET",
      }
    );

    const data: string[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const deleteTrailer = async (uuid: string) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/trailers/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return encodedRedirect(
      "error",
      "",
      "Er is helaas iets mis gegaan met het verwijderen van je trailer."
    );
  }
};
