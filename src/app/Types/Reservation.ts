export type PostReservations = {
  message: string;
  trailer_uuid: string;
  start_date: string;
  end_date: string;
  pick_up_time: string;
};

export interface TrailerData {
  uuid: string;
  title: string;
  description: string;
  trailer_type: string;
  rental_price: number;
  address: Address;
  availability: Availability;
  car_driving_license: string;
  created_at: string;
  updated_at: string;
  dimensions: Dimensions;
  location: Location;
  accessories: string[];
  images: string[];
  owner: Owner;
}

type Address = {
  city: string;
  number: string;
  street_name: string;
  postal_code: string;
};

type Availability = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

type Dimensions = {
  length: number;
  width: number;
  height: number;
};

type Location = {
  latitude: number;
  longitude: number;
};

type Owner = {
  profile_picture: string;
  name: string;
};
