"use client";

import { Session } from "@supabase/supabase-js";
import { PostImageRes } from "../Types/Image";
import { getSession } from "./auth/Register";

// Console.log no return yet and guessed the type of return
export const putImage = async (uuid: string) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(
      `https://api.buurbak.nl/images/profile-picture/${uuid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionToken?.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and guessed the type of return
export const getAllImages = async () => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/images`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and guessed the type of return
export const postImages = async (images: File[]) => {
  const sessionToken: Session | null = await getSession();

  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append(`files`, image);
    });

    const response = await fetch(`https://api.buurbak.nl/images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
      },
      body: formData,
    });

    const data: PostImageRes = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and guessed the type of return
export const getImage = async (file_name: string) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/images/${file_name}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};

// Console.log no return yet and guessed the type of return
export const deleteImage = async (uuid: string) => {
  const sessionToken: Session | null = await getSession();

  try {
    const response = await fetch(`https://api.buurbak.nl/images/${uuid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    const data: any = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
