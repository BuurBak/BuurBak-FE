import { v4 as uuid } from "uuid";
import { Reservation } from "../Types/Reservation";
import { getToken } from "./auth/Cookies";

//   startTime: new Date(getValues("dateStart")).toISOString(),
//   endTime: new Date(getValues("dateEnd")).toISOString(),
// getValues("message")

export const getReservations = async () => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${uuid()}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const getTrailerReservations = async () => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations?ownerId=${uuid()}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const confirmTrailerReservations = async () => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${uuid()}/confirm`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const cancelTrailerReservations = async () => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${uuid()}/cancel`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};
export const deleteTrailerReservations = async () => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${uuid()}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const reservation = async (data: Reservation) => {
  try {
    const res = await fetch("https://pilot.buurbak.nl/api/v1/reservations", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (await getToken("access_token")),
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("An unknown error occurred");
    }
  } finally {
  }
};
