import { TrailerData } from "../Types/Reservation";
import { getToken } from "./auth/Cookies";

export const getTrailerReservationsRenter2 = async () => {
  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers`, // Id van de reservering
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

    const data: TrailerData[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
