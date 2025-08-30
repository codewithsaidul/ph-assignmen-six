import { Button } from "@/components/ui/button";
import type { ILocationMapProps } from "@/types";
import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import CurrentLocationFinder from "./CurrentLocationFinder";
import MapLogic from "./MapLogic";
import { cn } from "@/lib/utils";

const markerSvg = `
  <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
`;

// 👇 ধাপ ২.২: দুটি কাস্টম DivIcon তৈরি করুন
const pickupIcon = new L.DivIcon({
  html: markerSvg,
  className: "custom-marker-svg pickup-marker-svg",
  iconSize: [36, 36],
  iconAnchor: [18, 36], // আইকনের পিন-পয়েন্ট (মাঝখানে নিচে)
});

const destinationIcon = new L.DivIcon({
  html: markerSvg,
  className: "custom-marker-svg destination-marker-svg",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

// Defining bangladesh border
const bounds = new L.LatLngBounds(
  new L.LatLng(20.74, 88.01), // South-West corner
  new L.LatLng(26.64, 92.68) // North-East corner
);

export default function LocationPickerMap({
  pickup,
  destination,
  isInteractive,
  onPickupSelect,
  onDestinationSelect,
  onFareCalculated,
}: ILocationMapProps) {
  const handleResetPickup = () => {
    onPickupSelect?.(null); // reseting only pickup location
    onFareCalculated?.(null); // fare reseting
  };

  const handleResetDestination = () => {
    onDestinationSelect?.(null); // reseting only destination location
    onFareCalculated?.(null); // fare reseting
  };
  return (
    <div className="relative">
      {isInteractive && (
        <div className="absolute top-2 left-1/2 w-full max-w-xl -translate-x-1/2 z-[1000] p-2 bg-background/80 text-foreground rounded-md shadow-lg flex items-center gap-4 backdrop-blur-3xl bg-opacity-50">
          <div className="flex flex-col gap-5 items-center p-5 w-full">
            <p className="font-semibold text-sm">
              {/* ডাইনামিক টেক্সট */}
              {!pickup
                ? "Click on the map to set Pickup Location"
                : !destination
                ? "Now, set your Destination Location"
                : "Locations selected! Ready to go."}
            </p>
            {/* when minimum one location was selected then show the reset button if location selected was wrong */}
            <div className="flex flex-col justify-between ">
              {/* Pickup section */}
              <div>
                {pickup ? (
                  <p className="text-sm font-medium">
                    ✅ Pickup: {pickup.address}
                  </p>
                ) : (
                  <p className="text-sm font-semibold">
                    📍 Click map to set Pickup
                  </p>
                )}
                {pickup && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleResetPickup}
                    className="cursor-pointer text-primary mt-3"
                  >
                    Change Pickup
                  </Button>
                )}
              </div>

              <hr className="my-2 mr-5" />

              {/* Destination section */}
              <div>
                {destination && (
                  <p className="text-sm font-medium">
                    ✅ Destination: {destination.address}
                  </p>
                )}
                {destination && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleResetDestination}
                    className="cursor-pointer text-primary mt-3"
                  >
                    Change Destination
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <MapContainer
        center={[24.8949, 91.8687]}
        zoom={12}
        maxBounds={bounds}
        minZoom={12}
        maxZoom={30}
        maxBoundsViscosity={1.0}
        className={cn(
          "w-full",
          isInteractive ? "h-[500px]" : "h-72 md:h-[800px]"
        )}
        // style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CurrentLocationFinder />
        {pickup && <Marker position={pickup.latlng} icon={pickupIcon} />}
        {destination && (
          <Marker position={destination.latlng} icon={destinationIcon} />
        )}

        <MapLogic
          pickup={pickup}
          destination={destination}
          onPickupSelect={onPickupSelect}
          onDestinationSelect={onDestinationSelect}
          isInteractive={isInteractive}
        />
      </MapContainer>
    </div>
  );
}
