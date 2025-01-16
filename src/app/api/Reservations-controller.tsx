"use server";
import { Session } from "@supabase/supabase-js";
import { encodedRedirect } from "../../../utils/utils";
import {
  CancelTrailer,
  CancelTrailerRes,
  PostReservations,
  ResReservations,
} from "../Types/Reservation";
import { getSession } from "./auth/Register";

export const getReservationsRequests = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/reservations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
    });

    const data: ResReservations[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const cancelTrailer = async (trailer: CancelTrailer) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/reservations`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
      body: JSON.stringify(trailer),
    });

    const res: CancelTrailerRes = await response.json();
    return res;
  } catch (error) {
    return encodedRedirect(
      "error",
      "",
      "Er is helaas iets mis gegaan met het weigeren van deze trailer."
    );
  }
};

// Console.log no return yet and any type of return
export const postReservations = async (data: PostReservations) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/reservations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();
    return res;
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
