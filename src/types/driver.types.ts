import type {
  IDestinationCoordinates,
  IPickedupCoordinates,
  IStatusLog,
} from "./ride.types";

export interface IDriverStats {
  totalEarnings: number;
  totalCompletedRides: number;
  driverDailyEarnings: IDriverDailyEarning[];
}

export interface IDriverDailyEarning {
  date: string;
  totalDriverEarnings: number;
}

export interface IDriverStatsCardProps {
  totalEarnings: number;
  completedRides: number;
}

export interface IDriverProfile {
  vehicleInfo: IVehicleInfo;
  _id: string;
  driver: string;
  licenseNumber: string;
  availability: string;
  driverStatus: string;
  earnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface IVehicleInfo {
  vehicleType: string;
  model: string;
  plate: string;
}


export interface IIncomingRideRequest {
  _id: string;
  rider: Rider;
  driver: string;
  paymentMethod: string;
  pickupAddress: string;
  destinationAddress: string;
  pickupCoordinates: IPickedupCoordinates;
  destinationCoordinates: IDestinationCoordinates;
  fare: number;
  rideStatus: string;
  statusLogs: IStatusLog[];
  commisionRate: number;
  platformEarnings: number;
  createdAt: string;
  updatedAt: string;
}

export interface Rider {
  _id: string;
  name: string;
  phoneNumber?: string;
}

export interface IIncomingRequestParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minFare?: string;
  maxFare?: string;
}
