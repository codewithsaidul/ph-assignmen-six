import { AppSidebar } from "@/components/app-sidebar";
import GuidedTour from "@/components/GuidedTour";
import DriverAvailabilityToggle from "@/components/modules/driver/DriverAvailabilityToggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { data: userProfile } = useGetUserProfileQuery(undefined);

  return (
    <SidebarProvider>
      <AppSidebar userProfile={userProfile} />
      <SidebarInset className="z-50">
        <header className="flex items-center justify-between border-b px-4 lg:px-6">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          {userProfile?.role === "driver" && <DriverAvailabilityToggle userRole={userProfile?.role} />}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>

        <GuidedTour userRole={userProfile?.role} />
      </SidebarInset>
    </SidebarProvider>
  );
}
