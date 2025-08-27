import { role } from "@/constants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { driverSidebarItems } from "@/routes/driverSidebarItems";
import { rideSidebarItems } from "@/routes/rideSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.rider:
      return [...rideSidebarItems];
    case role.driver:
      return [...driverSidebarItems];
    default:
      return [];
  }
};
