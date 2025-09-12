export interface IAdsResponse {
  success: boolean;
  message: string;
  data: IAdsData;
}

export interface IAdsData {
  ads: IAd[];
  totalCount: number;
}

export interface IAd {
  _id: string;
  isActive: boolean;
  room: IRoom;
  createdBy: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  userName: string;
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
