import type { IUser } from "./user.types";

export interface IRide {
  _id: string;
  rider: IUser;
  driver: IUser;
  pickupAddress: string;
  destinationAddress: string;
  pickupCoordinates: number[];
  destinationCoordinates: number[];
  fare: number;
  rideStatus: string;
  statusLogs: IStatusLog[];
  createdAt: string;
  updatedAt: string;
  platformEarnings: number;
  commisionRate: number;
  paymentMethod: string;
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
  fields?: string;
}

export interface IRideData {
  data: IRide[];
}

export interface RideStatus {
  rideStatus: string;
}
export interface IUpdateRideStatus {
  rideId: string;
  rideStatus: RideStatus;
}

export interface IRideRequest {
  pickupAddress: string;
  destinationAddress: string;
  pickupCoordinates: number[];
  destinationCoordinates: number[];
  fare: number;
  paymentMethod: "cash";
}

export interface ILocationMapProps {
  pickup: { latlng: L.LatLng; address: string } | null;
  destination: { latlng: L.LatLng; address: string } | null;
  onPickupSelect: (
    location: { latlng: L.LatLng; address: string } | null
  ) => void;
  onDestinationSelect: (
    location: { latlng: L.LatLng; address: string } | null
  ) => void;
}
