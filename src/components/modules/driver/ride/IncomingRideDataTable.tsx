import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/userLocalStorage";
import { useUpdateRideStatusMutation } from "@/redux/feature/ride/ride.api";
import type { IIncomingRideRequest } from "@/types";
import { dateFormater } from "@/utils/dateFormater";
import { formatCurrency } from "@/utils/formateCurrency";
import { Eye } from "lucide-react";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  minFare?: string;
  maxFare?: string;
}

export default function IncomingRideDataTable({
  allIncomingRides,
  queryParams,
}: {
  allIncomingRides: IIncomingRideRequest[], queryParams: QueryParams;
}) {
  const [dismissedRideIds, setDismissedRideIds] = useLocalStorage<string[]>(
    "dismissedRideIds",
    []
  );
  const [updateRideStatus] = useUpdateRideStatusMutation();

  useEffect(() => {
    if (allIncomingRides?.length > 0 && dismissedRideIds.length > 0) {
      const currentRideIds = new Set(allIncomingRides?.map((ride) => ride._id));

      const relevantDismissedIds = dismissedRideIds.filter((id) =>
        currentRideIds.has(id)
      );

      if (relevantDismissedIds.length !== dismissedRideIds.length) {
        setDismissedRideIds(relevantDismissedIds);
      }
    }
  }, [allIncomingRides, dismissedRideIds, setDismissedRideIds]);

  const incomingRidesToShow = useMemo(() => {
    return allIncomingRides?.filter(
      (ride) => !dismissedRideIds.includes(ride._id)
    );
  }, [allIncomingRides, dismissedRideIds]);

  const handleReject = (rideIdToDismiss: string) => {
    if (!dismissedRideIds.includes(rideIdToDismiss)) {
      setDismissedRideIds((prevIds) => [...prevIds, rideIdToDismiss]);
    }
  };

  const acceptRide = async (rideId: string) => {
    try {
      const rideStatus = { rideStatus: "accepted" };
      const res = await updateRideStatus({ rideId, rideStatus, ...queryParams }).unwrap();
      if (res.success) {
        toast.success(res.message);
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
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Rider name
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Pickedup Address
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Destination Address
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Fare
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-xl text-forground font-ride-title font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomingRidesToShow.length > 0 &&
            incomingRidesToShow?.map((ride) => (
              <TableRow key={ride._id}>
                <TableCell className="font-medium">
                  {ride?.rider?.name}
                </TableCell>
                <TableCell className="font-medium max-w-sm truncate">
                  {ride?.pickupAddress}
                </TableCell>
                <TableCell className="font-medium max-w-sm truncate">
                  {ride?.destinationAddress}
                </TableCell>
                <TableCell>{formatCurrency(ride?.fare)}</TableCell>
                <TableCell>{dateFormater(new Date(ride?.createdAt))}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-3">
                  {/* <div> */}
                  <Button
                    size="sm"
                    variant="default"
                    className="cursor-pointer"
                    onClick={() => acceptRide(ride._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="cursor-pointer bg-red-600 hover:bg-red-600/90"
                    onClick={() => handleReject(ride._id)}
                  >
                    Reject
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    asChild
                  >
                    <Link to={`/dashboard/rideDetails/${ride?._id}`}>
                      <Eye />
                    </Link>
                  </Button>
                  {/* </div> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {allIncomingRides.length === 0 && (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
          <div className="text-center">
            <h3 className="text-xl font-semibold">All Caught Up!</h3>
            <p className="text-muted-foreground mt-2">
              There are no new ride requests at the moment.
            </p>
          </div>
        </div>
      )}

      {incomingRidesToShow.length === 0 && (
        <div className="flex justify-center items-center w-full min-h-[60vh]">
          <div className="text-center">
            <h3 className="text-xl font-semibold font-ride-title">
              List Cleared
            </h3>
            <p className="text-muted-foreground mt-2">
              You have dismissed all current requests. New rides will appear
              here.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
