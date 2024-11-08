export type TrailerType = {
  name:
    | "Open aanhanger"
    | "Gesloten aanhanger"
    | "Motorfiets aanhanger"
    | "Bagage aanhanger"
    | "Fietsen aanhanger"
    | "Overig"
    | "Alle";
};

export type PostTrailer = {
  title: string;
  description: string;
  address: Address;
  location: Location;
  availability: Availability;
  dimensions: Dimensions;
  accessories: string[];
  car_driving_license: string;
  trailer_type: string;
  rental_price: number;
  images: any[];
};

type Address = {
  city: string;
  house_number: string;
  street_name: string;
  postal_code: string;
};

type Location = {
  latitude: number;
  longitude: number;
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
