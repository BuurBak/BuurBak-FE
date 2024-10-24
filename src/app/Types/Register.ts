export type Login = {
  username: string;
  password: string;
  name?: string;
  phoneNumber?: number;
};

export type Register = {
  email: "string";
  password: "string";
  name: "string";
  number: "string";
  address: {
    city: "string";
    streetName: "string";
    houseNumber: "string";
    postalCode: "string";
  };
};

export type Refresh = {
  deviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
};

export type ChangePassword = {
  currentPassword: "string";
  newPassword: "string";
};
