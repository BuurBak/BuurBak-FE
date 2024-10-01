import { LoggedUser } from "../Types/User";
import { getToken } from "./auth/Cookies";

export const getAccount = async () => {
  try {
    const res = await fetch("https://pilot.buurbak.nl/api/v1/customers/self", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await getToken("access_token")),
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const result: LoggedUser = await res.json();
    return result;
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("An unknown error occurred");
    }
  }
};
