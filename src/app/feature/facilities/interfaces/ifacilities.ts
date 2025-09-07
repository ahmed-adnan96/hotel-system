export interface IFacilities {
  facilities: Facility[];
  totalCount: number;
}
interface Facility {
  _id: string;
  name: string;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
}

interface CreatedBy {
  _id: string;
  userName: string;
}
