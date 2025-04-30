"use server";
import { cookies } from "next/headers";

export async function deleteToken(token: string) {
  cookies().delete(token);
}

export async function hasToken(token: string) {
  return cookies().has(token);
}

export async function getToken(token: string) {
  let cookie = cookies().get(token);
  return cookie?.value;
}

export async function getAllTokens() {
  let cookie = cookies().getAll();
  return cookie;
}
