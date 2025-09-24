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

export interface IRoomR {
  _id: string;
  roomNumber: string;
}





export  interface IRoomCommentRes {
  success: boolean;
  message: string;
  data: IData;
}

export  interface IData {
  roomComments: IRoomComment[];
  totalCount: number;
}

export interface IRoomComment {
  _id: string;
  room: IRoom;
  user: IUser;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  userName: string;
  profileImage: string;
}

export interface IRoom {
  _id: string;
  roomNumber: string;
}

export interface IReviewReq {
  roomId: string;
  rating: number;
  review: string;
}


export interface ICommentReq {
  roomId: string;
  comment: string;
}
// booking
export interface IBookingReq{
  startDate: string;
  endDate: string;
  room: string;
  totalPrice: number;
}


export interface IBookingRes{
  success: boolean;
  message: string;
  data: IDataBooking;
}

export interface IDataBooking {
  booking: IBooking;
}

export interface IBooking {
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: string;
  room: string;
  status: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// payment
export interface IPaymentRes {
  success: boolean;
  message: string;
  data: IDataPayment;
}

export interface IDataPayment {
  booking: IBooking;
}

export interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: string;
  room: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  stripeChargeId: string;
}
