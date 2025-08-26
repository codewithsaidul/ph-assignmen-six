import Loading from "@/components/loading/Loading";
import LocationPickerMap from "@/components/modules/ride/LocationPickerMap";
import { useRideDetailsQuery } from "@/redux/feature/ride/ride.api";
import { useMemo } from "react";
import { useParams } from "react-router";
import L from "leaflet"


export default function RideDetails() {
  const { rideId } = useParams();
  const { data: rideDetails, isLoading, isError } = useRideDetailsQuery(
    rideId as string
  );

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
  }, [rideDetails]); // শুধুমাত্র rideData পরিবর্তন হলেই এই কোডটি আবার চলবে

  if (isLoading && !rideDetails) return <Loading />;


  console.log(isError)

  return (
    <div>
      <h1>This is RideDetails Component</h1>

      <div>
        <LocationPickerMap
          pickup={formattedLocations.pickup}
          destination={formattedLocations.destination}
          isInteractive={false}
        />
      </div>
    </div>
  );
}
