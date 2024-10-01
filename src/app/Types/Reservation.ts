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
          },
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
            },
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
          },
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
    },
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
