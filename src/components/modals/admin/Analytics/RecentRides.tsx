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
import { Eye } from "lucide-react";
import { statusColorMap } from "@/constants";


export default function RecentRides() {
  const { data } = useGetAllRidesQuery({
    page: 1,
    limit: 5,
    sortOrder: "desc",
    fields: "fare  rideStatus createdAt",
  });

  return (
    <div className="lg:px-6">
      <div>
        <h2 className="text-2xl text-forground font-ride-title mb-8">
          Recent Rides
        </h2>
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
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    <Eye />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
