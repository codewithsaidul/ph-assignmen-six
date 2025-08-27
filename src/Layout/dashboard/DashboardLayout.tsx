import { AppSidebar } from "@/components/app-sidebar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useGetDriverProfileQuery, useUpdateDriverAvailityMutation } from "@/redux/feature/driver/driver.api";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { data: driverProfile } = useGetDriverProfileQuery(undefined);
  const [updateAvailability] = useUpdateDriverAvailityMutation()
  const [isOnline, setIsOnline] = useState(false);


   useEffect(() => {
    if (driverProfile) {
      setIsOnline(driverProfile.availability === 'online');
    }
  }, [driverProfile]);

  const handleToggle = async (checked: boolean) => {
    console.log(checked)
    setIsOnline(checked);
    try {
      const status = {
        availability: checked ? 'online' : 'offline'
      }
      await updateAvailability({ driverId: driverProfile?.driver, availability: status }).unwrap();
    } catch (error) {
      setIsOnline(!checked);
      console.log(error)
    }
  };


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b px-4 lg:px-6">
          <div className="flex h-16 shrink-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>

          {driverProfile && (
            <div className="flex items-center space-x-2">
              <Switch
                id="availability-mode"
                checked={isOnline}
                onCheckedChange={handleToggle}
                onClick={() => setIsOnline(!isOnline)}
              />
              <Label htmlFor="availability-mode" className="capitalize">
                {driverProfile?.availability}
              </Label>
            </div>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
