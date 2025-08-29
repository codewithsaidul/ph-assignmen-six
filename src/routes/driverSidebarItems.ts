import ActiveRide from "@/pages/driver/ActiveRide";
import EarningAnalytics from "@/pages/driver/EarningAnalytics";
import IncomingRequest from "@/pages/driver/IncomingRequest";
import type { ISidebarItem } from "@/types";



export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/driver/earnings-analytics",
        component: EarningAnalytics,
      },
    ],
  },
  {
    title: "Ride Management",
    url: "#",
    items: [
      {
        title: "Incoming Request",
        url: "/driver/incoming-request",
        component: IncomingRequest,
      },
      {
        title: "Active Ride",
        url: "/driver/active-ride",
        component: ActiveRide,
      },
    ],
  },
];