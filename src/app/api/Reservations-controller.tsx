"use server";
import { Session } from "@supabase/supabase-js";
import {
  CancelTrailer,
  CancelTrailerRes,
  PostReservations,
} from "../Types/Reservation";
import { getSession } from "./auth/Register";

//Any type of return
export const getReservationsRequests = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
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
export const cancelTrailer: any = async (trailer: CancelTrailer) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/reservations`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
      body: JSON.stringify(trailer),
    });

    const data: CancelTrailerRes = await response.json();
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
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations/account`,
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
