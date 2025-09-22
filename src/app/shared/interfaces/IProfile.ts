export interface IProfile {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  user: IUser;
}

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
