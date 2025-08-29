import Loading from "@/components/loading/Loading";
import RiderInfo from "@/components/modules/activeride(rider-driver)/RiderInfo";
import StatusControl from "@/components/modules/activeride(rider-driver)/StatusControl";
import LocationPickerMap from "@/components/modules/ride/LocationPickerMap";
import { useMyActiveRideQuery } from "@/redux/feature/ride/ride.api";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import L from "leaflet";
import { useMemo } from "react";

export default function ActiveRide() {
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const { data: activeRide, isLoading } = useMyActiveRideQuery(undefined);

  //   formating the location
  const formattedLocations = useMemo(() => {
    if (!activeRide) {
      return { pickup: null, destination: null };
    }

    // formating pickup location
    const pickup = {
      address: activeRide?.pickupAddress,
      latlng: new L.LatLng(
        activeRide?.pickupCoordinates.coordinates[0], // latitude
        activeRide?.pickupCoordinates.coordinates[1] // longitude
      ),
    };

    // formating destinaiton
    const destination = {
      address: activeRide?.destinationAddress,
      latlng: new L.LatLng(
        activeRide?.destinationCoordinates.coordinates[0], // latitude
        activeRide?.destinationCoordinates.coordinates[1] // longitude
      ),
    };

    return { pickup, destination };
  }, [activeRide]);

  if (isLoading) return <Loading />;

  if (!activeRide) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-ride-title font-bold">
          No Ride Details Found
        </p>
      </div>
    );
  }

  const riderTitle =
    userProfile?.role === "rider" &&
    `On your way to ${activeRide?.destinationAddress}`;
  const isDriver = userProfile?.role === "driver";

  const driverTitle =
    isDriver && activeRide?.rideStatus === "accepted"
      ? `Head to Pick "${activeRide?.rider?.name}"`
      : activeRide?.rideStatus === "picked_up" && `Drive to your Destination`;

  const tripData = {
    pickupAddress: activeRide.pickupAddress,
    destinationAddress: activeRide.destinationAddress,
    fare: activeRide.fare,
  };

  return (
    <div className="lg:px-6 w-full">
      <h1 className="text-3xl capitalize font-ride-title font-bold mb-12">
        {riderTitle || driverTitle}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 w-full">
        <div className="md:col-span-7 h-auto">
          <LocationPickerMap
            pickup={formattedLocations.pickup}
            destination={formattedLocations.destination}
            isInteractive={false}
          />
        </div>

        {/* Side Panel */}
        <div className="md:col-span-5 border-l border-border bg-muted/30 p-4 space-y-4 overflow-y-auto">
          <RiderInfo rider={activeRide?.rider} trip={tripData} />
          <StatusControl
            rideId={activeRide._id}
            currentStatus={activeRide.rideStatus}
          />
        </div>
      </div>
    </div>
  );
}
