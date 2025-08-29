import ActiveRide from "@/pages/driver/ActiveRide";
import RequestRide from "@/pages/ride/RequestRide";
import RideHistory from "@/pages/ride/RideHistory";
import type { ISidebarItem } from "@/types";



export const rideSidebarItems: ISidebarItem[] = [
  {
    title: "Ride Management",
    url: "#",
    items: [
      {
        title: "Request Ride",
        url: "/ride/request-ride",
        component: RequestRide,
        tourClassName: "tour-step-1-request-ride"
      },
      {
        title: "Active Ride",
        url: "/ride/active-ride",
        component: ActiveRide,
        tourClassName: "tour-step-2-active-ride"
      },
      {
        title: "Ride History",
        url: "/ride/history",
        component: RideHistory,
        tourClassName: "tour-step-3-ride-history"
      },
    ],
  },
];