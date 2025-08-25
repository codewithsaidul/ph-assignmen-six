import Loading from "@/components/loading/Loading";
import RecentRides from "@/components/modules/admin/Analytics/RecentRides";
import RevenueChart from "@/components/modules/admin/Analytics/RevenueChart";
import StatsCards from "@/components/modules/admin/Analytics/StatsCards";
import { useGetAdminAnalyticsQuery } from "@/redux/feature/admin/admin.api";

export default function Analytics() {
  const { data: analytics, isLoading } = useGetAdminAnalyticsQuery(undefined);

  if (isLoading || !analytics) return <Loading />;

  return (
    <div className="lg:px-6">
      <h1 className="text-3xl font-ride-title mb-10">Dashboard</h1>

      <div className="space-y-16">
        <StatsCards
          totalRevenue={analytics.totalPlatformRevenue}
          completedRides={analytics.completedRides}
          activeUser={analytics.activeUser}
          onlineDrivers={analytics.availableDriver}
        />

        <RevenueChart dailyRevenueData={analytics.dailyRevenueData} />

        <RecentRides />
      </div>
    </div>
  );
}
