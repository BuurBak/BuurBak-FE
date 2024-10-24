import { Reservation, ReservationResponse } from "../Types/Reservation";
import { getToken } from "./auth/Cookies";

export const Reservations = async () => {
  try {
    const response = await fetch(
      `https://api.buurbak.nl/reservations`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            //Hier handmatig token toevoegen vanuit Swagger
            "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InN0ZXZlMjkzQGtwbi5ubCIsInN1YiI6IjU0MjcwMzBhLTFiYjItNDRiMi04NzRiLWE4M2E1MmE2ZjUyNiIsImV4cCI6MTczMDg5MjkwMywiaWF0IjoxNzI5NjgzMzAzfQ.mWhnvVc3N216zveCUhRZdOrxOb9-hKal10fYnZDNzO1ITOZkk3y05Rr5Dwbb4rLbOm5GQAFRHnicIEiOQcdqEA",
          "Content-Type": "application/json",
        },
      }
    );

    const data: any[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
export const getSpecificReservations = async (reservationId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${reservationId}`, // Id van de reservering
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

export const getTrailerReservationsOwner = async (ownerId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations?ownerId=${ownerId}`, // Id van de owner
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    const responseData: ReservationResponse = await response.json();
    return responseData;
  } catch (error) {
    console.warn(error);
  }
};

export const getTrailerReservationsRenter = async (renterId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations?renterId=${renterId}`, // Id van de renter
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (await getToken("access_token")),
          "Content-Type": "application/json",
        },
      }
    );

    const responseData: ReservationResponse = await response.json();
    return responseData;
  } catch (error) {
    console.warn(error);
  }
};

export const confirmTrailerReservations = async (reservationId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${reservationId}/confirm`, // Id van de reservering
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

export const cancelTrailerReservations = async (reservationId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${reservationId}/cancel`, // Id van de reservering
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
export const deleteTrailerReservations = async (reservationId: string) => {
  try {
    const response = await fetch(
      `https://pilot.buurbak.nl/api/v1/reservations/${reservationId}`, // Id van de reservering
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
