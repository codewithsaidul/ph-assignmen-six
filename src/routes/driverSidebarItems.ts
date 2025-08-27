import EarningAnalytics from "@/pages/driver/EarningAnalytics";
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
];