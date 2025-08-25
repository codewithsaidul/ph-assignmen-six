import type { ILocationMapProps } from "@/types";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";
import { useMap, useMapEvents } from "react-leaflet";



export default function MapLogic({
  pickup,
  destination,
  onPickupSelect,
  onDestinationSelect,
}: ILocationMapProps) {
  const routingControlRef = useRef<L.Control | null>(null);
  const map = useMap();

  useMapEvents({
    async click(e) {
      const latlng = e.latlng;

      // রিভার্স জিওকোডিং API কল
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
      );
      const data = await response.json();
      const address =
        data.display_name ||
        `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;

      const locationData = { latlng, address };

      if (!pickup) {
        onPickupSelect(locationData);
      } else if (!destination) {
        onDestinationSelect(locationData);
      }
    },
  });

  useEffect(() => {
    // যদি ম্যাপে আগে থেকেই কোনো রাউটিং কন্ট্রোল থাকে, তাহলে সেটিকে সরিয়ে দিন
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    // pickup এবং destination দুটোই থাকলেই শুধুমাত্র নতুন রাউট তৈরি হবে
    if (pickup && destination) {
      // একটি নতুন রাউটিং কন্ট্রোল তৈরি করুন
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickup.latlng.lat, pickup.latlng.lng),
          L.latLng(destination.latlng.lat, destination.latlng.lng),
        ],
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`,
        }),
        // অপ্রয়োজনীয় UI গুলো বন্ধ করে দিন
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        show: false,
        lineOptions: {
          styles: [{ color: "#FF4D00", weight: 4, opacity: 0.7 }],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
      }).addTo(map);

      // নতুন কন্ট্রোলটিকে ref-এ সেভ করে রাখুন
      routingControlRef.current = routingControl;
    }
  }, [pickup, destination, map]); // pickup বা destination পরিবর্তন হলেই এই ইফেক্টটি চলবে

  return null;
}
