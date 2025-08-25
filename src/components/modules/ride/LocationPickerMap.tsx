import L from "leaflet";
import "leaflet-routing-machine";
import { type Dispatch, type SetStateAction } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MapRouting from "./MapRouting";

interface ILocationPickerMapProps {
  pickup: L.LatLng | null;
  destination: L.LatLng | null;
  onPickupSelect: Dispatch<SetStateAction<L.LatLng | null>>;
  onDestinationSelect: Dispatch<SetStateAction<L.LatLng | null>>;
}

export default function LocationPickerMap({
  pickup,
  destination,
  onPickupSelect,
  onDestinationSelect,
}: ILocationPickerMapProps) {
  console.log({ pickup, destination });

  return (
    <MapContainer
      center={[23.81, 90.41]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pickup && <Marker position={pickup} />}
      {destination && <Marker position={destination} />}

      <MapRouting
        pickup={pickup}
        destination={destination}
        setPickup={onPickupSelect}
        setDestination={onDestinationSelect}
      />
    </MapContainer>
  );
}
