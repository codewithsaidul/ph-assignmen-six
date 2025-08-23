import type { IUser } from "./user.types";

export interface IRides {
  _id: string;
  rider: IUser;
  driver: IUser;
  pickedupLocation: IPickedupLocation;
  destinationLocation: IDestinationLocation;
  fare: number;
  rideStatus: string;
  statusLogs: IStatusLog[];
  createdAt: string;
  updatedAt: string;
  platformEarnings: number;
  commisionRate: number;
}

export interface IPickedupLocation {
  type: string;
  coordinates: number[];
}

export interface IDestinationLocation {
  type: string;
  coordinates: number[];
}

export interface IStatusLog {
  status: string;
  timestamp: string;
}

export interface IRidesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  searchTerm?: string;
  fields?: string
}


export interface IRideData {
  data: IRides[]
}