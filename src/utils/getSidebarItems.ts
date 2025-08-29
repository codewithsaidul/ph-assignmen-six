import { role } from "@/constants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { rideSidebarItems } from "@/routes/rideSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.rider:
      return [...rideSidebarItems];
    default:
      return [];
  }
};
