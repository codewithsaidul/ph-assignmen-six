import Loading from "@/components/loading/Loading";
import PaginationPage from "@/components/pagination/PaginationPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rideStatusColorMap, sortOptions } from "@/constants";
import { cn } from "@/lib/utils";
import {
  useGetDriverProfileQuery,
  useGetIncomingRideRequestsQuery,
} from "@/redux/feature/driver/driver.api";
import { dateFormater } from "@/utils/dateFormater";
import { formatCurrency } from "@/utils/formateCurrency";
import { Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

export default function IncomingRequest() {
  const [page, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("createdAt-desc");
  const [fareRange, setFareRange] = useState({ min: "", max: "" });
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");
  const sortParams = useMemo(() => {
    const [sortBy, sortOrder] = sortValue.split("-");
    return { sortBy, sortOrder };
  }, [sortValue]);
  const { data: driverProfile } = useGetDriverProfileQuery(undefined);

  // --- Debounce Logic ---
  useEffect(() => {
    const timerId = setTimeout(() => {
      setMinFare(fareRange.min);
      setMaxFare(fareRange.max);
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if inputValue changes before 500ms
    return () => {
      clearTimeout(timerId);
    };
  }, [fareRange.min, fareRange.max]);


  // fetch incoming ride request data from db using rtk query
  const { data, isLoading } = useGetIncomingRideRequestsQuery({
    page,
    sortBy: sortParams.sortBy,
    sortOrder: sortParams.sortOrder,
    minFare,
    maxFare,
    limit: 15,
  });

  if (isLoading && !data) return <Loading />;

  if (data && driverProfile?.availability !== "online") {
    return (
      <div>
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>

        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="font-semibold text-2xl min-[370px]:text-4xl font-ride-title">
              You are currently Offline.
            </h2>
            <p className="text-xs min-[370px]:text-base mt-3">
              To accept rides, you need to go online first.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const allIncomingRides = data?.data;
  const pagination = data?.meta;
  const serialNumber = (page - 1) * 20;

  const handleResetFilterr = () => {
    setFareRange({ min: "", max: ""})
    setSortValue("createdAt-desc")
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">
          Incoming Ride Request
        </h1>
      </div>

      <div className="mb-10 flex items-center flex-wrap gap-5">
        <div className="flex items-center h-8 max-w-52 bg-card w-fit p-0 rounded border">
          <Input
            placeholder="Min Fare"
            value={fareRange.min}
            onChange={(e) =>
              setFareRange((prev) => ({ ...prev, min: e.target.value }))
            }
            className="border-0 rounded-0! bg-transparent! outline-0 focus-visible:focus-ring-0! focus:ring-0!  focus:outline-0!"
          />

          <Separator orientation="vertical" color="#fff" />

          <Input
            placeholder="Max Fare"
            value={fareRange.max}
            onChange={(e) =>
              setFareRange((prev) => ({ ...prev, max: e.target.value }))
            }
            className="border-0 rounded-0! bg-transparent! outline-0 focus-visible:focus-ring-0! focus:ring-0! focus:outline-0!"
          />
        </div>
        <Select value={sortValue} onValueChange={setSortValue}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleResetFilterr} size="lg" className="cursor-pointer">
          Reset
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              SL
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Rider name
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Phone Number
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Pickedup Address
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Destination Address
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Status
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
          {allIncomingRides?.map((ride, idx) => (
            <TableRow key={ride._id}>
              <TableCell className="font-medium">
                {serialNumber + idx + 1}
              </TableCell>
              <TableCell className="font-medium">{ride?.rider?.name}</TableCell>
              <TableCell className="font-medium">
                {ride?.rider?.phoneNumber || "Not Provided"}
              </TableCell>
              <TableCell className="font-medium max-w-sm truncate">
                {ride?.pickupAddress}
              </TableCell>
              <TableCell className="font-medium max-w-sm truncate">
                {ride?.destinationAddress}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize max-w-fit",
                    rideStatusColorMap[ride?.rideStatus]
                  )}
                >
                  {ride?.rideStatus?.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>{formatCurrency(ride?.fare)}</TableCell>
              <TableCell>{dateFormater(new Date(ride?.createdAt))}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-3">
                {/* <div> */}
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

      {Array.isArray(allIncomingRides) &&
        allIncomingRides?.length > 19 &&
        pagination &&
        pagination.total > 20 && (
          <div className="mt-10">
            <PaginationPage
              page={page}
              setPage={setPage}
              totalPages={pagination?.totalPages}
            />
          </div>
        )}
    </div>
  );
}
