import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
import { calculateDistanceInKm } from "@/utils/calculateDistanceInKm";
import { calculateFare } from "@/utils/calculateFare";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRequestRideMutation } from "@/redux/feature/ride/ride.api";

// Zod Schema শুধু টেক্সট ইনপুটগুলো ভ্যালিডেট করবে
const FormSchema = z.object({
  pickupAddress: z
    .string()
    .min(5, { message: "Please enter a valid pickup address." }),
  destinationAddress: z
    .string()
    .min(5, { message: "Please enter a valid destination address." }),
});

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function RideRequestModal() {
  // ফর্মের টেক্সট ইনপুটের জন্য react-hook-form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pickupAddress: "", destinationAddress: "" },
  });

  // জিওকোডিং থেকে পাওয়া স্থানাঙ্ক (coordinates) এবং ভাড়ার জন্য useState
  const [pickupCoords, setPickupCoords] = useState<LocationCoords | null>(null);
  const [destinationCoords, setDestinationCoords] =
    useState<LocationCoords | null>(null);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState({
    pickup: false,
    destination: false,
  });
  const [isOpen, setIsOpen] = useState(false)
  const [requestRide] = useRequestRideMutation();

  // ভাড়া গণনার জন্য useEffect
  useEffect(() => {
    if (pickupCoords && destinationCoords) {
      const distance = calculateDistanceInKm(
        pickupCoords.latitude,
        pickupCoords.longitude,
        destinationCoords.latitude,
        destinationCoords.longitude
      );
      const fare = calculateFare(distance);
      setEstimatedFare(fare);
    }
  }, [pickupCoords, destinationCoords]);

  // "Find" বাটনে ক্লিক করলে কাজ করবে
  const handleGeocode = async (type: "pickup" | "destination") => {
    const address =
      type === "pickup"
        ? form.getValues("pickupAddress")
        : form.getValues("destinationAddress");
    if (address.length < 5) return;

    setIsLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=jsonv2&countrycodes=BD&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const location = data[0];
        const coords = {
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        };
        if (type === "pickup") setPickupCoords(coords);
        else setDestinationCoords(coords);
        toast(
          `${type === "pickup" ? "Pickup" : "Destination"} location verified!`
        );
      } else {
        toast("Location not found.");
        if (type === "pickup") setPickupCoords(null);
        else setDestinationCoords(null);
      }
    } catch {
      toast("Failed to fetch location.");
    } finally {
      setIsLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // চূড়ান্ত ফর্ম সাবমিশনের জন্য
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // নিশ্চিত করুন যে দুটি লোকেশনই ভেরিফাই করা হয়েছে
    if (!pickupCoords || !destinationCoords) {
      toast("Please verify both location");
      return;
    }

    const toastId = toast.loading("Creating...");

    const finalRideData = {
      pickupAddress: values.pickupAddress,
      destinationAddress: values.destinationAddress,
      pickupCoordinates: [pickupCoords.latitude, pickupCoords.longitude],
      destinationCoordinates: [destinationCoords.latitude, destinationCoords.longitude],
      fare: estimatedFare as number,
    };

    try {
      const res = await requestRide(finalRideData).unwrap();

      if (res.success && res.statusCode === 201) {
        toast.success(res.message, { id: toastId });
        setIsOpen(false)
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
      setIsOpen(false)
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Request Ride</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a new ride</DialogTitle>
          <DialogDescription>
            Please provide your valid address to request a new ride
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              id="ride-request-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Location</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          placeholder="Enter pickup address..."
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => handleGeocode("pickup")}
                        disabled={isLoading.pickup}
                      >
                        {isLoading.pickup ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : pickupCoords ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          "Find"
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destinationAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Location</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          placeholder="Enter destination address..."
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => handleGeocode("destination")}
                        disabled={isLoading.destination}
                      >
                        {isLoading.destination ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : destinationCoords ? (
                          <CheckCircle2 className="h-4 w-4 text-green-200" />
                        ) : (
                          "Find"
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {estimatedFare !== null && (
                <div className="text-center p-4 bg-secondary rounded-lg">
                  <h3 className="text-lg font-semibold">Estimated Fare</h3>
                  <p className="text-3xl font-bold">৳{estimatedFare}</p>
                </div>
              )}
            </form>
          </Form>
        </div>

        <DialogFooter className="flex w-full flex-row justify-end items-center gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="ride-request-form"
            disabled={!pickupCoords || !destinationCoords}
            className="cursor-pointer"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
