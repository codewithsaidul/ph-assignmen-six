import type { IUser } from "./user.types";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  role: "rider" | "driver";
  licenseNumber?: string;
  vehicleInfo?: IVehicleInfo;
}

export interface IVehicleInfo {
  vehicleType?: string;
  model?: string;
  plate?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
