import Loading from "@/components/loading/Loading";
import DriverEarningsCharts from "@/components/modules/driver/Analytics/DriverEarningsCharts";
import DriverStatsCard from "@/components/modules/driver/Analytics/DriverStatsCard";
import { useGetDriverAnalyticsQuery } from "@/redux/feature/driver/driver.api";
import type { IDriverDailyEarning } from "@/types";

export default function EarningAnalytics() {
  const { data: driverStats, isLoading } =
    useGetDriverAnalyticsQuery(undefined);

  if (isLoading && !driverStats) return <Loading />;


  return (
    <div className="lg:px-6">
      <h1 className="text-3xl font-ride-title mb-10">Dashboard</h1>

      <div className="space-y-16">
        <DriverStatsCard
          totalEarnings={driverStats?.totalEarnings || 0}
          completedRides={driverStats?.totalCompletedRides || 0}
        />

        <DriverEarningsCharts
          dailyRevenueData={driverStats?.driverDailyEarnings as IDriverDailyEarning[]}
        />
      </div>
    </div>
  );
}
