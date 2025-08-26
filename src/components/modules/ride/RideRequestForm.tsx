import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRequestRideMutation } from "@/redux/feature/ride/ride.api";
import { calculateDistanceInKm } from "@/utils/calculateDistanceInKm";
import { calculateFare } from "@/utils/calculateFare";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import LocationPickerMap from "./LocationPickerMap";

interface LocationData {
  latlng: L.LatLng;
  address: string;
}

const FormSchema = z.object({
  paymentMethod: z.enum(["cash"], { message: "Payment method is required" }),
});

export default function RideRequestForm() {
  const [pickup, setPickupSelect] = useState<LocationData | null>(null);
  const [destination, setDestinationSelect] = useState<LocationData | null>(
    null
  );
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [requestRide] = useRequestRideMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentMethod: "cash",
    },
  });

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
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
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
      paymentMethod: values.paymentMethod
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
      <Form {...form}>
        <form
          id="ride-request-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <LocationPickerMap
            pickup={pickup}
            destination={destination}
            onPickupSelect={setPickupSelect}
            onDestinationSelect={setDestinationSelect}
            onFareCalculated={setEstimatedFare}
            isInteractive={true}
          />

          {estimatedFare !== null && (
            <div className="text-center p-4 bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold">Estimated Fare</h3>
              <p className="text-3xl font-bold">৳{estimatedFare}</p>
            </div>
          )}

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="cash"
                          className="border-slate-500 dark:border-slate-400"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">💵 Cash</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            form="ride-request-form"
            disabled={!pickup || !destination}
            className="cursor-pointer"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
