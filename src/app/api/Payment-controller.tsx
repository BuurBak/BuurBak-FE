import { Session } from "@supabase/supabase-js";
import { CheckStripe, LinkToStripe } from "../Types/Payment";
import { getSession } from "../../lib/authUtil";

export const linkToStripe = async (returnUrl: string): Promise<LinkToStripe | undefined> => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/payments/setup?` + new URLSearchParams({ returnUrl }), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.warn(error);
  }
};

export const checkStripeConnection = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/payments/ready`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: CheckStripe = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
