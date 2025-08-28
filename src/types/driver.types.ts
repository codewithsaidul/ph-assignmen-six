


export interface IDriverStats {
  totalEarnings: number
  totalCompletedRides: number
  driverDailyEarnings: IDriverDailyEarning[]
}

export interface IDriverDailyEarning {
  date: string
  totalDriverEarnings: number
}


export interface IDriverStatsCardProps {
  totalEarnings: number;
  completedRides: number;
}



export interface IDriverProfile {
  vehicleInfo: IVehicleInfo
  _id: string
  driver: string
  licenseNumber: string
  availability: string
  driverStatus: string
  earnings: number
  createdAt: string
  updatedAt: string
}

export interface IVehicleInfo {
  vehicleType: string
  model: string
  plate: string
}
