export interface IFacilities {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  facilities: Facility[];
  totalCount: number;
}

export interface Facility {
  _id: string;
  name: string;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedBy {
  _id: string;
  userName: string;
}
