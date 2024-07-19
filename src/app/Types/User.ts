import { Address } from "./Address";
import { Role } from "./Role";

export interface User {
  id: string;
  name?: string;
  email?: string;
  roles: Role[];
  iban?: string;
  number?: string;
  address?: Address;
  date_of_birth?: Date;
  profilePictureUrl?: string;
  rating?: number;
}

export type LoggedUser = {
  id: string;
  name: string;
  email: string;
  roles: [
    {
      name: string;
    },
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
