import type { ComponentType, Dispatch, SetStateAction } from "react";

export type {
  IAdminAnalytics,
  IAdminAnalyticsResponseData,
  IDailyRevenueData,
  IStatsCardProps,
} from "./admin.types";
export type {
  IChangePassword,
  ILogin,
  ILoginResponse,
  IRegister,
} from "./auth.types";
export type {
  IDestinationCoordinates,
  ILocationMapProps,
  IPickedupCoordinates,
  IRide,
  IRideData,
  IRideRequest,
  IRidesParams,
  IStatusLog,
  IUpdateRideStatus,
} from "./ride.types";
export type { SidebarContextProps } from "./sidebar.types";
export type {
  IDriver,
  IRider,
  IRiderUpdateStatus,
  IUpdateDriverStatus,
  IUpdateProfile,
  IUser,
  IUserProfile,
} from "./user.types";

export type { IDriverDailyEarning, IDriverStats, IDriverStatsCardProps } from "./driver.types"

export type Theme = "dark" | "light" | "system";

export type TRole = "admin" | "rider" | "driver";

export interface IModalsProps {
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: Meta;
  data: T;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export interface PaginationPageProps {
  page: number;
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
}
