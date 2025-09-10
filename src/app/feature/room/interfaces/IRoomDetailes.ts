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
