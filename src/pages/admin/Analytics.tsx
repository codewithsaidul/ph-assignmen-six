import Loading from "@/components/loading/Loading";
import RevenueChart from "@/components/modals/admin/Analytics/RevenueChart";
import StatsCards from "@/components/modals/admin/Analytics/StatsCards";
import { useGetAdminAnalyticsQuery } from "@/redux/feature/admin/admin.api";

export default function Analytics() {
  const { data: analytics, isLoading } = useGetAdminAnalyticsQuery(undefined);

  if (isLoading || !analytics) return <Loading />;

  console.log(analytics.dailyRevenueData)

  return (
    <div>
      <h1 className="text-3xl font-ride-title mb-10">Dashboard</h1>

      <div className="space-y-16">
        <StatsCards
          totalRevenue={analytics.totalPlatformRevenue}
          completedRides={analytics.completedRides}
          activeUser={analytics.activeUser}
          onlineDrivers={analytics.availableDriver}
        />

        <RevenueChart dailyRevenueData={analytics.dailyRevenueData} />
      </div>
    </div>
  );
}
