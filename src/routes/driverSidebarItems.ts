import ActiveRide from "@/pages/driver/ActiveRide";
import EarningAnalytics from "@/pages/driver/EarningAnalytics";
import IncomingRequest from "@/pages/driver/IncomingRequest";
import RideHistory from "@/pages/ride/RideHistory";
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
        tourClassName: "tour-step-1-analytics"
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
        tourClassName: "tour-step-3-incoming-requests"
      },
      {
        title: "Active Ride",
        url: "/driver/active-ride",
        component: ActiveRide,
        tourClassName: "tour-step-4-active-ride"
      },
      {
        title: "Ride History",
        url: "/driver/ride-history",
        component: RideHistory,
        tourClassName: "tour-step-5-ride-history"
      },
    ],
  },
];