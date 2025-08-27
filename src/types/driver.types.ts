


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
