import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useGetDriverProfileQuery,
  useUpdateDriverAvailityMutation,
} from "@/redux/feature/driver/driver.api";
import { useEffect, useState } from "react";

export default function DriverAvailabilityToggle({
  userRole,
}: {
  userRole: string;
}) {
  const { data: driverProfile, isLoading } = useGetDriverProfileQuery(
    undefined,
    { skip: userRole !== "driver" }
  );
  const [updateAvailability] = useUpdateDriverAvailityMutation();
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (driverProfile) {
      setIsOnline(driverProfile.availability === "online");
    }
  }, [driverProfile]);

  const handleToggle = async (checked: boolean) => {
    setIsOnline(checked);
    try {
      await updateAvailability({
        availability: checked ? "online" : "offline",
      }).unwrap();
    } catch {
      setIsOnline(!checked);
    }
  };

  if (isLoading || !driverProfile) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 tour-step-2-availability">
      <Switch
        id="availability-mode"
        checked={isOnline}
        onCheckedChange={handleToggle}
        className="cursor-pointer tour-step-2-availability"
      />
      <Label htmlFor="availability-mode" className="capitalize">
        {driverProfile.availability}
      </Label>
    </div>
  );
}
