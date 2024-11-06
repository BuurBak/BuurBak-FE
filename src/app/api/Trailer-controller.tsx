import { TrailerData } from "../Types/Reservation";
import { PostTrailer } from "../Types/TrailerType";
import { getToken } from "./auth/Cookies";

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
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers`, // Id van de reservering
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            token
              ? token.replace("base64-", "")
              : process.env.NEXT_PUBLIC_JWT_TOKEN
          }`,
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
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(`https://api.buurbak.nl/trailers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          token
            ? token.replace("base64-", "")
            : process.env.NEXT_PUBLIC_JWT_TOKEN
        }`,
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
  const token = await getToken("sb-tnffbjgnzpqsjlaumogv-auth-token");

  try {
    const response = await fetch(
      `https://api.buurbak.nl/trailers/search?address=${address}&city=${city}`,
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
