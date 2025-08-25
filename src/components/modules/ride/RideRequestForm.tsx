import { Button } from "@/components/ui/button";
import { calculateDistanceInKm } from "@/utils/calculateDistanceInKm";
import { calculateFare } from "@/utils/calculateFare";
import { useEffect, useState, type FormEvent } from "react";
import LocationPickerMap from "./LocationPickerMap";
import { useRequestRideMutation } from "@/redux/feature/ride/ride.api";
import toast from "react-hot-toast";

interface LocationData {
  latlng: L.LatLng;
  address: string;
}

export default function RideRequestForm() {
  // জিওকোডিং থেকে পাওয়া স্থানাঙ্ক (coordinates) এবং ভাড়ার জন্য useState
  const [pickup, setPickupSelect] = useState<LocationData | null>(null);
  const [destination, setDestinationSelect] = useState<LocationData | null>(
    null
  );
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [requestRide] = useRequestRideMutation();

  // Counting fare using useEffect
  useEffect(() => {
    if (pickup && destination) {
      const distance = calculateDistanceInKm(
        pickup.latlng.lat,
        pickup.latlng.lng,
        destination.latlng.lat,
        destination.latlng.lng
      );
      const fare = calculateFare(distance);
      setEstimatedFare(fare);
    }
  }, [pickup, destination]);

  // handle ride request form
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating Ride...");

    const rideData = {
      pickupAddress: pickup?.address as string,
      destinationAddress: destination?.address as string,
      pickupCoordinates: [pickup?.latlng?.lat, pickup?.latlng?.lng] as number[],
      destinationCoordinates: [
        destination?.latlng?.lat,
        destination?.latlng?.lng,
      ] as number[],
      fare: estimatedFare as number,
    };

    try {
      const res = await requestRide(rideData).unwrap();

      if (res.success && res.statusCode === 201) {
        toast.success(res.message, { id: toastId });
        setPickupSelect(null);
        setDestinationSelect(null);
        setEstimatedFare(null);
      }
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: unknown }).data === "object" &&
        (error as { data?: unknown }).data !== null &&
        "message" in (error as { data?: { message?: string } }).data!
          ? (error as { data: { message: string } }).data.message
          : "An error occurred";
      toast.error(errorMessage, { id: toastId });
      setPickupSelect(null);
      setDestinationSelect(null);
      setEstimatedFare(null);
    }
  };

  return (
    <div>
      <form id="ride-request-form" onSubmit={onSubmit} className="space-y-6">
        <LocationPickerMap
          pickup={pickup}
          destination={destination}
          onPickupSelect={setPickupSelect}
          onDestinationSelect={setDestinationSelect}
          onFareCalculated={setEstimatedFare}
        />

        {estimatedFare !== null && (
          <div className="text-center p-4 bg-secondary rounded-lg">
            <h3 className="text-lg font-semibold">Estimated Fare</h3>
            <p className="text-3xl font-bold">৳{estimatedFare}</p>
          </div>
        )}

        <Button
          type="submit"
          form="ride-request-form"
          disabled={!pickup || !destination}
          className="cursor-pointer"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
}
