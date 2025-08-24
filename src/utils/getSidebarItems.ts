import { role } from "@/constants";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {

  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    default:
      return [];
  }
};
