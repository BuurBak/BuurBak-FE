import { Session } from "@supabase/supabase-js";
import { LinkToStripe, PayWithStripe } from "../Types/Payment";
import { getSession } from "./auth/Register";

export const linkToStripe = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/payments/setup`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: LinkToStripe = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

export const payWithStripe = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/payments/ready`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: PayWithStripe = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
