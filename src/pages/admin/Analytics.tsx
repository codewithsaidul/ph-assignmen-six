import Loading from "@/components/loading/Loading";
import StatsCards from "@/components/modals/admin/Analytics/StatsCards";
import { useGetAdminAnalyticsQuery } from "@/redux/feature/admin/admin.api";

export default function Analytics() {
  const { data: analytics, isLoading } = useGetAdminAnalyticsQuery(undefined);

  if (isLoading || !analytics) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-ride-title mb-10">Dashboard</h1>

      <div>
        <StatsCards
          totalRevenue={analytics.totalPlatformRevenue}
          completedRides={analytics.completedRides}
          activeUser={analytics.activeUser}
          onlineDrivers={analytics.availableDriver}
        />
      </div>
    </div>
  );
}
