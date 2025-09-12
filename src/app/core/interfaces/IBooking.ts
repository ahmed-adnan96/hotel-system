export interface IBookingRootObject {
  success: boolean;
  message: string;
  data: IBookingData;
}

export interface IBookingData {
  booking: IBooking[];
  totalCount: number;
}

export interface IBooking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: User;
  room: Room;
  status: string;
  createdAt: string;
  updatedAt: string;
  stripeChargeId?: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
}

export interface User {
  _id: string;
  userName: string;
}
