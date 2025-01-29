"use server";
import { cookies } from "next/headers";

export async function deleteToken(token: string) {
  cookies().delete(token);
}

export async function hasToken(hasToken: string) {
  return cookies().has(hasToken);
}

export async function getToken(token: string) {
  let cookie = cookies().get(token);
  return cookie?.value;
}

export async function getAllTokens() {
  let cookie = cookies().getAll();
  return cookie;
}
