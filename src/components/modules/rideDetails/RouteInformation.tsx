import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IDestinationCoordinates, IPickedupCoordinates } from "@/types";
import { MapPin, Navigation } from "lucide-react";

export default function RouteInformation( { pickupAddress, destinationAddress, pickupCoordinates, destinationCoordinates }: { pickupAddress: string, destinationAddress: string, pickupCoordinates: IPickedupCoordinates, destinationCoordinates: IDestinationCoordinates } ) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          Route Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-accent mt-2" />
          <div>
            <p className="font-medium">Pickup Location</p>
            <p className="text-muted-foreground">{pickupAddress}</p>
            <p className="text-xs text-muted-foreground">
              {pickupCoordinates.coordinates[0]},{" "}
              {pickupCoordinates.coordinates[1]}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-px h-8 bg-border" />
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-destructive mt-1" />
          <div>
            <p className="font-medium">Destination</p>
            <p className="text-muted-foreground">
              {destinationAddress}
            </p>
            <p className="text-xs text-muted-foreground">
              {destinationCoordinates.coordinates[0]},{" "}
              {destinationCoordinates.coordinates[1]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
