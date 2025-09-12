export interface IUserRootObject {
  success: boolean;
  message: string;
  data: IUserData;
}

export interface IUserData {
  users: IUserDetails[];
  totalCount: number;
}

export interface IUserDetails {
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
