import { AlertCircle, CheckCircle, Flag, Navigation } from "lucide-react";


type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "accepted":
      return {
        label: "Head to Pickup Location",
        nextAction: "Confirm Pickup",
        nextStatus: "picked_up",
        icon: Navigation,
        variant: "default" as ButtonVariant,
      };

    case "picked_up":
      return {
        label: "Passenger is On Board",
        nextAction: "Start Trip",
        nextStatus: "in_transit",
        icon: Navigation, 
        variant: "default" as ButtonVariant,
      };

    case "in_transit":
      return {
        label: "On the way to Destination",
        nextAction: "Complete Ride",
        nextStatus: "completed",
        icon: Flag,
        variant: "default" as ButtonVariant,
      };

    case "completed":
      return {
        label: "Trip Completed",
        nextAction: null,
        nextStatus: null,
        icon: CheckCircle,
        variant: "ghost" as ButtonVariant,
      };

    default:
      return {
        label: "Unknown Status",
        nextAction: null,
        nextStatus: null,
        icon: AlertCircle,
        variant: "outline" as ButtonVariant,
      };
  }
};
