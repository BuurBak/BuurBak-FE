import { PostTrailer } from "../Types/TrailerType";
import { getToken } from "./auth/Cookies";

export const getTrailers = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/trailers`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " +
            //Hier handmatig token toevoegen vanuit Swagger
            "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6InN0ZXZlMjM5QGtwbi5ubCIsInN1YiI6ImU1MzdjNGM3LWFiODUtNDQ0Ny1hZmY2LTQ2Yjk0NmU1ODk1YSIsImV4cCI6MTcyODk5NjY2MywiaWF0IjoxNzI3Nzg3MDYzfQ.ktRUc-dCyNqwZqwZy1mtAcYRFOfvPQhg8ajO0tJb-jrLSveqeYjVMRN6JPjgp3hymdv-NgObSDE-UnooSBGO9Q",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(await response.json());
  } catch (error) {
    console.warn(error);
  }
};

export const postTrailer = async (data: PostTrailer) => {
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  if (token) {
    try {
      const response = await fetch(`https://api.buurbak.nl/trailers`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token.replace("base64-", ""),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(await response.json());
    } catch (error) {
      console.warn(error);
    }
  } else {
    console.warn("Missing token");
  }
};
