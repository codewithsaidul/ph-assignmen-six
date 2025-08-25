import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Button } from "@/components/ui/button";
import MapLogic from "./MapLogic";
import type { ILocationMapProps } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import CurrentLocationFinder from "./CurrentLocationFinder";




// Defining bangladesh border
const bounds = new L.LatLngBounds(
  new L.LatLng(20.74, 88.01), // South-West corner
  new L.LatLng(26.64, 92.68)  // North-East corner
);


interface ILocationPickerProps extends ILocationMapProps {
  onFareCalculated: Dispatch<SetStateAction<number | null>>;
}

export default function LocationPickerMap({
  pickup,
  destination,
  onPickupSelect,
  onDestinationSelect,
  onFareCalculated,
}: ILocationPickerProps) {
  const handleResetPickup = () => {
    onPickupSelect(null); // reseting only pickup location
    onFareCalculated(null); // fare reseting
  };

  const handleResetDestination = () => {
    onDestinationSelect(null); // reseting only destination location
    onFareCalculated(null); // fare reseting
  };
  return (
    <div className="relative">
      <div className="absolute top-2 left-1/2 w-full max-w-xl -translate-x-1/2 z-[1000] p-2 bg-background/80 text-foreground rounded-md shadow-lg flex items-center gap-4 backdrop-blur-sm">
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
                <p className="text-sm font-medium">✅ Pickup: {pickup.address}</p>
              ) : (
                <p className="text-sm font-semibold">
                  📍 Click map to set Pickup
                </p>
              )}
              {pickup && (
                <Button variant="link" size="sm" onClick={handleResetPickup} className="cursor-pointer text-primary mt-3">
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
      <MapContainer
        center={[24.8949, 91.8687]}
        zoom={12}
        maxBounds={bounds}
        minZoom={12}
        maxZoom={30}
        maxBoundsViscosity={1.0}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CurrentLocationFinder />
        {pickup && <Marker position={pickup.latlng}   />}
        {destination && <Marker position={destination.latlng}  />}

        <MapLogic
          pickup={pickup}
          destination={destination}
          onPickupSelect={onPickupSelect}
          onDestinationSelect={onDestinationSelect}
        />
      </MapContainer>
    </div>
  );
}
