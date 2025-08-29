import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IRider } from "@/types";

export default function RiderInformation( { rider }: { rider: IRider } ) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rider Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xl font-bold mx-auto mb-2">
            {rider?.name.charAt(0).toUpperCase()}
          </div>
          <h3 className="font-semibold text-lg capitalize">
            {rider?.name}
          </h3>
        </div>
        <div className="mt-5">
          <p className="text-sm">
            <strong>Rider Id:</strong> {rider._id}
          </p>
          <p className="text-sm">
            <strong>Email:</strong> {rider.email}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
