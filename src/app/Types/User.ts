import { UserResponse } from "@supabase/supabase-js";

export type SupaUser = UserResponse["data"]["user"];

export type LoggedUser = {
  id: string;
  name: string;
  email: string;
  roles: [
    {
      name: string;
    }
  ];
  iban: any;
  number: string;
  address: {
    id: string;
    city: string;
    number: string;
    street_name: string;
    postal_code: string;
  };
  profilePicture: {
    id: string;
    originalFileName: string;
    public_url: string;
  };
  date_of_birth: any;
};

export type Login = {
  username: string;
  password: string;
  name?: string;
  phoneNumber?: number;
};

export type GetUser = {
  email: string;
  name: string;
  phone_number: string;
  profile_picture: string;
};
