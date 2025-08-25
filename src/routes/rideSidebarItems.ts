import RequestRide from "@/pages/ride/RequestRide";
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
    ],
  },
];