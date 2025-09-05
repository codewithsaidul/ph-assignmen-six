import { lazy } from "react";
import type { ISidebarItem } from "@/types";
import ApplyForDriver from "@/pages/ride/ApplyForDriver";


const ActiveRide = lazy(() => import("@/pages/driver/ActiveRide"));
const RequestRide = lazy(() => import("@/pages/ride/RequestRide"));
const RideHistory = lazy(() => import("@/pages/ride/RideHistory"));


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
        title: "Apply Driver",
        url: "/ride/apply-for-driver",
        component: ApplyForDriver,
        tourClassName: "tour-step-3-apply-driver"
      },
      {
        title: "Ride History",
        url: "/ride/history",
        component: RideHistory,
        tourClassName: "tour-step-4-ride-history"
      },
    ],
  },
];