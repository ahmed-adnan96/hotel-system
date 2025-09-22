export interface Iroom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: any[];
  createdBy: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  isBooked: boolean;
}
