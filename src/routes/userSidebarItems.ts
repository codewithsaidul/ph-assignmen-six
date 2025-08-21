
import UserProfile from "@/pages/user/UserProfile";
import type { ISidebarItem } from "@/types";



export const userSidebarItems: ISidebarItem[] = [
  {
    title: "My Account",
    url: "#",
    items: [
      {
        title: "My Profile",
        url: "/dashboard/profile",
        component: UserProfile,
      },
    ],
  },
];