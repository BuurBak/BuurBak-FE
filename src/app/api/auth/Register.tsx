import { Login } from "@/app/Types/Register";
// import { cookies } from "next/headers";

// export const logOut = () => {
//   console.log("fired");
//   cookies().delete("access_token");
//   cookies().delete("refresh_token");
// };

type LoginResponse = {
  status: number;
  data?: any;
  error?: string;
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
    let responseData;

    if (status === 401) {
      responseData = { error: "Invalid email or password" };
      return { status, ...responseData };
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    responseData = await response.json();
    return { status, data: responseData };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 500, error: error.message };
    }
    return { status: 500, error: "An unexpected error occurred" };
  }
};
