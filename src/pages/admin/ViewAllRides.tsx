import Loading from "@/components/loading/Loading";
import RideActionMenu from "@/components/ModeToggle/RideActionMenu";
import PaginationPage from "@/components/pagination/PaginationPage";
import { Badge } from "@/components/ui/badge";
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
import { dateFormater } from "@/utils/dateFormater";
import { formatCurrency } from "@/utils/formateCurrency";
import { useState } from "react";

export default function ViewAllRides() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllRidesQuery({
    page: page,
    limit: 20,
    sortOrder: "desc",
    fields: "fare  rideStatus createdAt",
  });

  if (isLoading && !data) return <Loading />;

  const allRides = data?.data;
  const pagination = data?.meta;
  console.log(pagination?.total);

  return (
    <div className="lg:px-6">
      <h1 className="text-3xl text-foreground font-ride-title mb-10">
        All Rides
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Rider name
            </TableHead>
            <TableHead className="text-xl text-forground font-ride-title font-semibold">
              Driver name
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
          {Array.isArray(allRides) &&
            allRides.map((ride) => (
              <TableRow key={ride._id}>
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
                <TableCell className="text-right">
                  <RideActionMenu />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {pagination && pagination.total > 20 && (
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
