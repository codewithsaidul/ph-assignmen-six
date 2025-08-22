
export interface IStatsCardProps {
  totalRevenue: number;
  activeUser: number;
  completedRides: number;
  onlineDrivers: number;
}


export interface IAdminAnalyticsResponseData {
    data: IAdminAnalytics
}


export interface IAdminAnalytics {
  totalUsers: number
  activeUser: number
  availableDriver: number
  completedRides: number
  totalPlatformRevenue: number
  dailyRevenueData: IDailyRevenueData[]
}

export interface IDailyRevenueData {
  date: string
  totalPlatformRevenue: number
  totalGrossFare: number
}
