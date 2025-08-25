import Loading from "@/components/loading/Loading";
import PaginationPage from "@/components/pagination/PaginationPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function RideHistory() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 20;

  // --- Debounce Logic ---
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchTerm(inputValue); // Updating searchTerm after 500ms
    }, 500); // 500ms delay

    // Cleanup function to clear the timeout if inputValue changes before 500ms
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  // fetch all rides
  const { data, isLoading } = useRideHistoryQuery({
    page,
    limit,
    sortBy: sortConfig.sortBy,
    sortOrder: sortConfig.sortOrder,
    searchTerm,
    fields: "fare pickupAddress destinationAddress paymentMethod  rideStatus createdAt",
  });

  if (isLoading && !data) return <Loading />;

  const rideHistory = data?.data;
  const pagination = data?.meta;

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

  console.log(rideHistory)

  return (
    <div className="lg:px-6">
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">Ride History</h1>
      </div>

      <div className="mb-10">
        <Input
          placeholder="Search rider, driver, status..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSearchOnKeyDown}
          className="max-w-sm"
        />
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
                  >
                    <Eye />
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
