import Loading from "@/components/loading/Loading";
import { RideStatusUpdateModal } from "@/components/modals/common/RideStatusUpdateModal";
import PaginationPage from "@/components/pagination/PaginationPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusColorMap } from "@/constants";
import { cn } from "@/lib/utils";
import { useGetAllRidesQuery } from "@/redux/feature/ride/ride.api";
import type { IRide } from "@/types";
import { dateFormater } from "@/utils/dateFormater";
import { formatCurrency } from "@/utils/formateCurrency";
import { ChevronDown, ChevronUp, Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function ViewAllRides() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);
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
  const { data, isLoading } = useGetAllRidesQuery({
    page,
    limit,
    sortBy: sortConfig.sortBy,
    sortOrder: sortConfig.sortOrder,
    searchTerm,
    fields: "fare  rideStatus createdAt",
  });

  if (isLoading && !data) return <Loading />;

  const allRides = data?.data;
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


  // handle status update modal
  const handleModal = (ride: IRide) => {
    setSelectedRide(ride)
    setIsOpen(true)
  }

  return (
    <div className="lg:px-6">
      <div className="mb-10">
        <h1 className="text-3xl text-foreground font-ride-title">All Rides</h1>
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
          {Array.isArray(allRides) &&
            allRides.map((ride, idx) => (
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
                <TableCell>
                  <Badge
                    className={cn(
                      "capitalize max-w-fit",
                      statusColorMap[ride?.rideStatus]
                    )}
                  >
                    {ride?.rideStatus?.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(ride?.fare)}</TableCell>
                <TableCell>{dateFormater(ride?.createdAt)}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-3">
                  {/* <div> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        onClick={() => handleModal(ride)}
                        className="cursor-pointer bg-blue-700 dark:text-foreground dark:bg-blue-500"
                      >
                        <Pencil />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
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

      {Array.isArray(allRides) &&
        allRides.length > 0 &&
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


        {/* =============== open status update modal */}
        {
          isOpen && selectedRide && <RideStatusUpdateModal ride={selectedRide} open={isOpen} onChange={setIsOpen} />
        }
    </div>
  );
}
