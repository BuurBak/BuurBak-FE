import { Login } from "@/app/Types/Register";
// import { cookies } from "next/headers";

// export const logOut = () => {
//   console.log("fired");
//   cookies().delete("access_token");
//   cookies().delete("refresh_token");
// };

export const logIn = async (data: Login) => {
  console.log(data);

  try {
    const response = await fetch("http://beta.buurbak.nl/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data_1 = await response.json();
    console.log("Success:", data_1);
    return data_1;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};
