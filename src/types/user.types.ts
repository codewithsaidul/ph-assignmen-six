

export interface IUser {
  _id: string
  name: string
  email: string
  address: string
  role: string
  isVerified: boolean
  isActive: string
  isDeleted: boolean
}


export interface IUpdateProfile {
  userId: string;
  userData: IUserProfile
}

export interface IUserProfile {
  name: string;
  phoneNumber: string;
  address: string;
}