export interface IRoomResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  room: Room;
}

export interface Room {
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface IRoomRequest {
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
}
