export type PostReservations = {
  message: string;
  trailer_uuid: string;
  start_date: string;
  end_date: string;
  pick_up_time: string;
};

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

export type Reservation = {
  trailerId: string;
  startTime: string;
  endTime: string;
  message: string;
  name: string;
  email: string;
  number: string;
};

export type ReservationResponse = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  content: [
    {
      id: string;
      renter: {
        id: string;
        name: string;
        email: string;
        number: string;
        roles: [
          {
            name: string;
          }
        ];
        profilePictureUrl: string;
      };
      trailer: {
        id: string;
        owner: {
          id: string;
          name: string;
          email: string;
          number: string;
          roles: [
            {
              name: string;
            }
          ];
          profilePictureUrl: string;
        };
        trailerType: {
          name: string;
        };
        length: number;
        height: number;
        width: number;
        description: string;
        licensePlate: string;
        driversLicenseType: string;
        address: {
          city: string;
          streetName: string;
          number: string;
          postalCode: string;
        };
        price: number;
        nearbyLatitude: number;
        nearbyLongitude: number;
        trailerWeekScheduleTemplate: TrailerWeekSchedule;
        trailerDaySchedules: [
          {
            date: string;
            price: number;
            timeSlots: Day[];
          }
        ];
        coverImage: string;
        images: string[];
        accesoires: string[];
        createdAt: string;
        updatedAt: string;
      };
      transactionDetails: {
        transactionId: string;
        transactionFee: number;
        serviceFee: number;
        warrantyFee: number;
        basePrice: number;
        totalPrice: number;
      };
      startTime: string;
      endTime: string;
      message: string;
      price: number;
      paid: boolean;
      confirmed: boolean;
      confirmedAt: string;
      canceledAt: string;
      canceledBy: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
  };
  last: boolean;
  empty: boolean;
};

type TrailerWeekSchedule = {
  monday: {
    price: number;
    timeSlots: Day[];
  };
  tuesday: {
    price: number;
    timeSlots: Day[];
  };
  wednesday: {
    price: number;
    timeSlots: Day[];
  };
  thursday: {
    price: number;
    timeSlots: Day[];
  };
  friday: {
    price: number;
    timeSlots: Day[];
  };
  saturday: {
    price: number;
    timeSlots: Day[];
  };
  sunday: {
    price: number;
    timeSlots: Day[];
  };
};

type Day = {
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  endTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
};
