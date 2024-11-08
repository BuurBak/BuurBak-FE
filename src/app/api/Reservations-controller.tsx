"use server";
import { Session } from "@supabase/supabase-js";
import { PostReservations } from "../Types/Reservation";
import { getToken } from "./auth/Cookies";
import { getSession } from "./auth/Register";

//Any type of return
export const getReservationsRequests = async () => {
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            token
              ? token.replace("base64-", "")
              : process.env.NEXT_PUBLIC_JWT_TOKEN
          }`,
        },
      }
    );

    const data: any[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and any type of return
export const putReservations: any = async (id: number, confirmed: boolean) => {
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations?id=${id}&confirmed=${confirmed}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${
            token
              ? token.replace("base64-", "")
              : process.env.NEXT_PUBLIC_JWT_TOKEN
          }`,
        },
      }
    );

    const data: any = await response.json();
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and any type of return
export const postReservations = async (data: PostReservations) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          sessionToken
            ? sessionToken.access_token
            : process.env.NEXT_PUBLIC_JWT_TOKEN
        }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and any type of return
export const getReservations = async () => {
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations/account`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            token
              ? token.replace("base64-", "")
              : process.env.NEXT_PUBLIC_JWT_TOKEN
          }`,
        },
      }
    );

    const data: any = await response.json();
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
};
