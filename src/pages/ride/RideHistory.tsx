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
import { rideStatusColorMap } from "@/constants";
import { cn } from "@/lib/utils";
import { useRideHistoryQuery } from "@/redux/feature/ride/ride.api";
import { dateFormater } from "@/utils/dateFormater";
import { formatCurrency } from "@/utils/formateCurrency";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const rideStatuses = ["completed", "cancelled", "rejected"];

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fareRange, setFareRange] = useState({ min: "", max: "" });
  const [minFare, setMinFare] = useState("");
  const [maxFare, setMaxFare] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [rideStatus, setRideStatus] = useState("");
  const limit = 20;

  // --- Debounce Logic ---
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(inputValue); // Updating searchTerm after 500ms
      setMinFare(fareRange.min);
      setMaxFare(fareRange.max);
      setRideStatus(statusFilter);
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if inputValue changes before 500ms
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue, fareRange.min, fareRange.max, statusFilter]);

  // fetch all rides
  const { data, isLoading } = useRideHistoryQuery({
    page,
    limit,
    sortBy: sortConfig.sortBy,
    sortOrder: sortConfig.sortOrder,
    searchTerm,
    minFare,
    maxFare,
    rideStatus: rideStatus === "all" ? "" : rideStatus,
    fields:
      "fare pickupAddress destinationAddress paymentMethod  rideStatus createdAt",
  });

  if (isLoading && !data) return <Loading />;

  const rideHistory = data?.data;
  const pagination = data?.meta;

  if (data && Array.isArray(rideHistory) && rideHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[85vh]">
        <p className="text-2xl text-slate-600 dark:text-primary-foreground font-ride-title font-bold">
          No Ride Details Found
        </p>
      </div>
    );
  }

  const serialNumber = (page - 1) * limit;

  // handle sorting by fare or createdAt(asc or desc)
  const handleSort = (field: string) => {
    let newSortOrder = "asc";
    // যদি একই ফিল্ডে আবার ক্লিক করা হয়, তাহলে অর্ডার উল্টে দিন
    if (sortConfig.sortBy === field && sortConfig.sortOrder === "asc") {
      newSortOrder = "desc";
    }
    setSortConfig({ sortBy: field, sortOrder: newSortOrder });
  };

  // handle search when enter key was clicked
  const handleSearchOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchTerm(inputValue);
    }
  };

  return (
    <div className="lg:px-6">
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">
          Ride History
        </h1>
      </div>

      <div className="mb-10 flex items-center justify-between flex-wrap gap-5">
        <Input
          placeholder="Search rider, driver, status..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearchOnKeyDown}
          className="max-w-sm"
        />

        {/* ফিল্টারিং UI */}
        <div className="flex flex-wrap items-center gap-4">
          {/* ভাড়ার ইনপুট */}
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

          {/* 👇 স্ট্যাটাস ড্রপডাউন */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {rideStatuses.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              Driver name
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
            <TableHead
              onClick={() => handleSort("fare")}
              className="cursor-pointer"
            >
              <p className="flex items-center gap-1">
                <span>Fare</span>
                {sortConfig.sortBy === "fare" &&
                  (sortConfig.sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </p>
            </TableHead>
            <TableHead
              onClick={() => handleSort("createdAt")}
              className="cursor-pointer flex items-center gap-1"
            >
              <p className="flex items-center gap-1">
                <span>Date</span>
                {sortConfig.sortBy === "createdAt" &&
                  (sortConfig.sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </p>
            </TableHead>
            <TableHead className="text-right text-xl text-forground font-ride-title font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(rideHistory) &&
            rideHistory.map((ride, idx) => (
              <TableRow key={ride._id}>
                <TableCell className="font-medium">
                  {serialNumber + idx + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {ride?.rider?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {ride?.driver?.name || "Not Assigned"}
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
                <TableCell>{dateFormater(ride?.createdAt)}</TableCell>
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

      {Array.isArray(rideHistory) &&
        rideHistory.length > 20 &&
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
