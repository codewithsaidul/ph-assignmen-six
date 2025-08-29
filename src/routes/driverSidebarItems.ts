
import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const ActiveRide = lazy(() => import("@/pages/driver/ActiveRide"));
const EarningAnalytics = lazy(() => import("@/pages/driver/EarningAnalytics"));
const IncomingRequest = lazy(() => import("@/pages/driver/IncomingRequest"));
const RideHistory = lazy(() => import("@/pages/ride/RideHistory"));


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