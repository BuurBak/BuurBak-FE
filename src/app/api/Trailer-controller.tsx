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
            "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InN0ZXZlNzY5QGtwbi5ubCIsInN1YiI6IjU1NmNjMTNhLTAwMjAtNDBhNC04YTk5LTg4YTFmMTUwOTYwNCIsImV4cCI6MTczMDgxMDk1NSwiaWF0IjoxNzI5NjAxMzU1fQ.JXKnslaW6q6RQYNh3qdC-uo3FfL5DymRccO9hwFQpOOrxBBRD6mtCD9XzX_yUgqSAa-kpGNY2gcS878VPXIncQ",
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
