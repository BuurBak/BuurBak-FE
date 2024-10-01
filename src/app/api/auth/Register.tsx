import { Login } from "@/app/Types/Register";
import { storeLoginToken } from "./Cookies";

type LoginResponse = {
  status: number;
  data?: any;
  error?: string;
};

type Token = {
  access_token: string;
  refresh_token: string;
};

export const logIn = async (data: Login): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://pilot.buurbak.nl/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const status = response.status;
    let responseData: Token;

    if (status === 401) {
      return { status };
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    responseData = await response.json();
    await storeLoginToken(responseData);
    return { status, data: responseData };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, error: error.message };
    }
    return { status: 500, error: "An unexpected error occurred" };
  }
};

export const refresh = async () => {
  // try {
  //   const res = await fetch("https://pilot.buurbak.nl/api/v1/auth/refresh", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + (await getToken("refresh_token")),
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({ deviceId: uuid() }),
  //   });
  //   if (!res.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   const result: Token = await res.json();
  //   await storeLoginToken(result);
  //   console.log(result);
  //   return result;
  // } catch (err) {
  //   if (err instanceof Error) {
  //     alert(err.message);
  //   } else {
  //     alert("An unknown error occurred");
  //   }
  // }
};
