import { useGetAllRidesQuery } from "@/redux/feature/ride/ride.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { dateFormater } from "@/utils/dateFormater";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formateCurrency";

const statusColorMap: Record<string, string> = {
  requested:
    "text-yellow-800 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/50",
  accepted: "text-sky-800 bg-sky-100 dark:text-sky-300 dark:bg-sky-900/50",
  picked_up: "text-blue-800 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50",
  in_transit:
    "text-indigo-800 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50",
  completed:
    "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50",
  cancelled: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
  rejected: "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50",
};

export default function RecentRides() {
  const { data } = useGetAllRidesQuery({
    page: 1,
    limit: 5,
    sortOrder: "asc",
    fields: "fare  rideStatus createdAt",
  });

  return (
    <div className="lg:px-6">
        <div>
            <h2 className="text-2xl text-forground font-ride-title mb-8">Recent Rides</h2>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rider name</TableHead>
            <TableHead>Driver name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fare</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data?.data) &&
            data.data.map((ride) => (
              <TableRow key={ride._id}>
                <TableCell className="font-medium">
                  {ride?.rider?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {ride?.driver?.name}
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
                  <Button
                    size="lg"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
