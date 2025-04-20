import { UserResponse } from "@supabase/supabase-js";

export type SupaUser = UserResponse["data"]["user"];

export type SignInCredentials = {
  username: string;
  password: string;
};

export type UserDetails = {
  name: string;
  phone_number: string;
  profile_picture?: string;
};

export type RegisterUserParams = SignInCredentials & UserDetails

