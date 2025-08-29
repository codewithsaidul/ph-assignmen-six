
import AllUsers from "@/pages/admin/AllUsers";
import Analytics from "@/pages/admin/Analytics";
import ViewAllRides from "@/pages/admin/ViewAllRides";
import type { ISidebarItem } from "@/types";



export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "View All Rides",
        url: "/admin/view-all-rides",
        component: ViewAllRides,
      },
      {
        title: "Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
];