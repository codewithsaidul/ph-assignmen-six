import Loading from "@/components/loading/Loading";
import DriverInformation from "@/components/modules/rideDetails/DriverInformation";
import FareBreakDown from "@/components/modules/rideDetails/FareBreakDown";
import RiderInformation from "@/components/modules/rideDetails/RiderInformation";
import RideStatus from "@/components/modules/rideDetails/RideStatus";
import RouteInformation from "@/components/modules/rideDetails/RouteInformation";
import { Button } from "@/components/ui/button";
import { useRideDetailsQuery } from "@/redux/feature/ride/ride.api";
import { useGetUserProfileQuery } from "@/redux/feature/user/user.api";
import { dateFormater } from "@/utils/dateFormater";
import L from "leaflet";
import { lazy, useMemo } from "react";
import { useParams } from "react-router";



const LocationPickerMap =  lazy(() => import("@/components/modules/ride/LocationPickerMap"));


export default function RideDetails() {
  const { rideId } = useParams();
  const { data: rideDetails, isLoading } = useRideDetailsQuery(
    rideId as string
  );
  const { data: userProfile } = useGetUserProfileQuery(undefined);
  const formattedLocations = useMemo(() => {
    if (!rideDetails) {
      return { pickup: null, destination: null };
    }

    // formating pickup location
    const pickup = {
      address: rideDetails?.pickupAddress,
      latlng: new L.LatLng(
        rideDetails?.pickupCoordinates.coordinates[0], // latitude
        rideDetails?.pickupCoordinates.coordinates[1] // longitude
      ),
    };

    // formating destinaiton
    const destination = {
      address: rideDetails?.destinationAddress,
      latlng: new L.LatLng(
        rideDetails?.destinationCoordinates.coordinates[0], // latitude
        rideDetails?.destinationCoordinates.coordinates[1] // longitude
      ),
    };

    return { pickup, destination };
  }, [rideDetails]);

  if (isLoading) return <Loading />;

  if (!rideDetails) {
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
    `your trip ${dateFormater(new Date(rideDetails?.createdAt))}`;
  const adminTitle =
    userProfile?.role === "admin" && `Ride Details: #${rideDetails?._id}`;
  const driverTitle =
    userProfile?.role === "driver" && `Trip with ${rideDetails?.rider?.name}`;

  return (
    <div className="lg:px-6">
      <h1 className="text-3xl capitalize font-ride-title font-bold mb-12">
        {riderTitle || driverTitle || adminTitle}
      </h1>

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Ride Details</h1>
            <p className="text-muted-foreground">
              {dateFormater(new Date(rideDetails.createdAt))}
            </p>
          </div>

          {rideDetails?.rideStatus === "requested" && (
            <div className="flex items-center gap-2">
              <Button className="cursor-pointer">Accept</Button>
              <Button
                variant="default"
                className="cursor-pointer bg-red-600 hover:bg-red-500"
              >
                Reject
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status & Timeline */}
            <RideStatus
              rideStatus={rideDetails.rideStatus}
              statusLogs={rideDetails.statusLogs}
            />

            {/* Route Information */}
            <RouteInformation
              pickupAddress={rideDetails.pickupAddress}
              destinationAddress={rideDetails.destinationAddress}
              pickupCoordinates={rideDetails.pickupCoordinates}
              destinationCoordinates={rideDetails.destinationCoordinates}
            />

            {/* Fare Breakdown */}
            <FareBreakDown
              fare={rideDetails.fare}
              platformEarnings={rideDetails.platformEarnings}
              commisionRate={rideDetails.commisionRate}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Information */}
            <DriverInformation driver={rideDetails.driver} />

            {/* Rider Information */}
            <RiderInformation rider={rideDetails.rider} />

            {/* Quick Actions */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Book Again
                </Button>
                <Button variant="outline" className="w-full">
                  Share Receipt
                </Button>
                <Button variant="outline" className="w-full">
                  Report Issue
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>

        <div className="my-20">
          <LocationPickerMap
            pickup={formattedLocations.pickup}
            destination={formattedLocations.destination}
            isInteractive={false}
          />
        </div>
      </div>
    </div>
  );
}
