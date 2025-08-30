import RideRequestForm from "@/components/modules/ride/RideRequestForm";
import { Button } from "@/components/ui/button";
import { useMyActiveRideQuery } from "@/redux/feature/ride/ride.api";
import { Link } from "react-router";

export default function RequestRide() {
  const { data: activeRide } = useMyActiveRideQuery(undefined, {
    pollingInterval: 15000,
  });

  if (activeRide) {
    return (
      <div className="flex  items-center justify-center min-h-[85vh] text-center lg:px-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-primary">
            You have an active ride!
          </h2>
          <p className="text-muted-foreground mb-6">
            You can't request another ride until the current one is complete.
          </p>

          {/* You can show the current status */}
          <div className="">
            <div className="bg-blue-100 text-blue-800 rounded-full px-4 max-w-60 mx-auto py-1 text-sm font-semibold mb-6">
              Status:{" "}
              {activeRide.rideStatus.charAt(0).toUpperCase() +
                activeRide.rideStatus.slice(1)}
            </div>

            <Button className="w-full max-w-sm cursor-pointer">
              <Link to="/ride/active-ride">View Your Active Ride</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:px-6">
      <div>
        <h1 className="text-3xl font-ride-title">Request a new Ride</h1>
        {/* <RideRequestForm /> */}
      </div>

      <div className="mt-10">
        <RideRequestForm />
      </div>
    </div>
  );
}
