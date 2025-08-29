import { role } from "@/constants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {

  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems, ...userSidebarItems];
    default:
      return [];
  }
};
