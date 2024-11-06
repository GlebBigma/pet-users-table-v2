export type User = {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  bloodGroup: string;
  height: number;
  weight: number;
  hair: {
    color: string;
    type: string;
  };
  userAgent: string;
  ip: string;
  macAddress: string;
};

export type UsersData = {
  users: User[];
  limit: number;
  skip: number;
  total: number;
};
