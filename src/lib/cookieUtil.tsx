"use server";
import { cookies } from "next/headers";

export async function deleteToken(token: string) {
  (await cookies()).delete(token);
}

export async function hasToken(token: string) {
  return (await cookies()).has(token);
}

export async function getToken(token: string) {
  const cookieStore = await cookies();
  let cookie = cookieStore.get(token);
  return cookie?.value;
}

export async function getAllTokens() {
  const cookieStore = await cookies();
  return cookieStore.getAll();
}
