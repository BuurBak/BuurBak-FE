"use server";
import { cookies } from "next/headers";

type Tokens = "access_token" | "refresh_token";

type Token = {
  access_token: string;
  refresh_token: string;
};

export async function deleteToken(token: Tokens) {
  cookies().delete(token);
}

export async function storeLoginToken(storeToken: Token) {
  cookies().set("access_token", storeToken.access_token);
  cookies().set("refresh_token", storeToken.refresh_token);
}

export async function hasToken(hasToken: string) {
  return cookies().has(hasToken);
}
