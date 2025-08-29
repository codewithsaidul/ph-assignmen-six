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
      },
      {
        title: "Ride History",
        url: "/ride/history",
        component: RideHistory,
      },
    ],
  },
];