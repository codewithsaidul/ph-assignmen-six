export type { ILogin, ILoginResponse } from "./auth.types"
export type {  } from "./user.types"




export type Theme = "dark" | "light" | "system"



export interface IResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}