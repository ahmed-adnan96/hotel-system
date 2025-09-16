export interface IRoomDetailsResponse {
  success: boolean;
  message: string;
  data: IData;
}

export interface IData {
  room: IRoom;
}

export interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: CreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  _id: string;
  userName: string;
}

export interface Facility {
  _id: string;
  name: string;
}

export interface IRoomReviewRes {
  success: boolean;
  message: string;
  data: IDataRoomReview;
}

export interface IDataRoomReview {
  roomReviews: IRoomReview[];
  totalCount: number;
}

export interface IRoomReview {
  _id: string;
  room: IRoomR;
  user: IUser;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  userName: string;
  profileImage: string;
}

interface IRoomR {
  _id: string;
  roomNumber: string;
}
