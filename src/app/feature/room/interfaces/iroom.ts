export interface IRootObject {
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
  facilities: IFacility[];
  createdBy: ICreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreatedBy {
  _id: string;
  userName: string;
}

export interface IFacility {
  _id: string;
  name: string;
}


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
