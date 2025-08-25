import { useMap, useMapEvents } from 'react-leaflet'; 
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react';

interface IMapRoutingProps {
    pickup: L.LatLng | null;
    destination: L.LatLng | null;
    setPickup: Dispatch<SetStateAction<L.LatLng | null>>;
    setDestination: Dispatch<SetStateAction<L.LatLng | null>>;
}

export default function MapRouting ({ pickup, destination, setPickup, setDestination }: IMapRoutingProps)  {
    const routingControlRef = useRef<L.Control | null>(null);
    const map = useMap()


  useMapEvents({
    click(e) {
      if (!pickup) {
        setPickup(e.latlng);
      } else if (!destination) {
        setDestination(e.latlng);
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
          L.latLng(pickup.lat, pickup.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        router: L.Routing.osrmv1({
          serviceUrl: `https://router.project-osrm.org/route/v1`
        }),
        // অপ্রয়োজনীয় UI গুলো বন্ধ করে দিন
        routeWhileDragging: false,
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#2463eb', weight: 4, opacity: 0.7 }],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        }
      }).addTo(map);

      // নতুন কন্ট্রোলটিকে ref-এ সেভ করে রাখুন
      routingControlRef.current = routingControl;
    }

  }, [pickup, destination, map]); // pickup বা destination পরিবর্তন হলেই এই ইফেক্টটি চলবে

  return null;
};