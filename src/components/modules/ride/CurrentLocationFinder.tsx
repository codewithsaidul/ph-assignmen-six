import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMap } from "react-leaflet";

export default function CurrentLocationFinder() {
  const map = useMap();

  // Debounce-এর জন্য useEffect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 12);
      },
      (error) => {
        toast.error(error.message);
      }
    );
  }, [map]);

  return null;
}
