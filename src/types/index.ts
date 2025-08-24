import type { ComponentType, Dispatch, SetStateAction } from "react";

export type {
  ILogin,
  ILoginResponse,
  IRegister,
  IChangePassword,
} from "./auth.types";
export type { IUser, IUpdateProfile, IUserProfile, IRiderUpdateStatus, IUpdateDriverStatus } from "./user.types";
export type { SidebarContextProps } from "./sidebar.types";
export type {
  IStatsCardProps,
  IAdminAnalytics,
  IDailyRevenueData,
  IAdminAnalyticsResponseData,
} from "./admin.types";
export type {
  IRide,
  IRideData,
  IStatusLog,
  IRidesParams,
  IPickedupLocation,
  IDestinationLocation,
  IUpdateRideStatus,
} from "./ride.types";

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
