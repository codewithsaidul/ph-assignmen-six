import type { ISidebarItem } from "@/types";
import { lazy } from "react";



const AllUsers = lazy(() => import("@/pages/admin/AllUsers"));
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
const ViewAllRides = lazy(() => import("@/pages/admin/ViewAllRides"));


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        tourClassName: ""
      },
      {
        title: "View All Rides",
        url: "/admin/view-all-rides",
        component: ViewAllRides,
        tourClassName: ""
      },
      {
        title: "Users",
        url: "/admin/all-users",
        component: AllUsers,
        tourClassName: ""
      },
    ],
  },
];