export type { ILogin, ILoginResponse, IRegister } from "./auth.types"
export type { IUser } from "./user.types"




export type Theme = "dark" | "light" | "system"



export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}