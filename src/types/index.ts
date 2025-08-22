import type { ComponentType, Dispatch, SetStateAction } from "react"

export type { ILogin, ILoginResponse, IRegister } from "./auth.types"
export type { IUser, IUpdateProfile, IUserProfile } from "./user.types"
export type { SidebarContextProps } from "./sidebar.types"



export type Theme = "dark" | "light" | "system"

export type TRole = "admin" | "rider" | "driver"


export interface IModalsProps {
  open: boolean;
  onChange: Dispatch<SetStateAction<boolean>>
}

export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}

export interface ISidebarItem {
  title: string;
  url: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[]
}


