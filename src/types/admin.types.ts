
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
  revenueTrend: RevenueTrend
}

export interface RevenueTrend {
  lastSevenDaysPlatformEarnings: number
  lastThirtyDaysPlatformEarnings: number
  lastNintyDaysPlatformEarnings: number
}
