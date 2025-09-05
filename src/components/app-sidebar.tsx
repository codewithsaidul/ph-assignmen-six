import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { IUser, TRole } from "@/types";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { Link, useLocation } from "react-router";
import Logo from "./logo/Logo";
import SidebarUser from "./SidebarUser";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userProfile: IUser | undefined;
}

export function AppSidebar({ userProfile, ...props }: AppSidebarProps) {
  const { pathname } = useLocation();

  const data = {
    navMain: getSidebarItems(userProfile?.role as TRole),
  };

  const getClassname =
    userProfile?.role === "driver"
      ? "tour-step-6-profile-menu"
      : userProfile?.role === "rider"
      ? "tour-step-5-profile-menu"
      : undefined;

  return (
    <Sidebar {...props} className="z-[99999]">
      <SidebarHeader>
        <div className="px-4 mt-6 mb-10">
          <Link to="/" className="flex items-center gap-2">
            <Logo width="28" height="28" />
            <h2 className="text-3xl font-ride-title">Rydex</h2>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item?.title}>
            <SidebarGroupLabel>{item?.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items?.map(
                  (item: {
                    title: string;
                    url: string;
                    tourClassName: string;
                  }) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className={cn(item.tourClassName)}
                      >
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarUser user={userProfile as IUser} tourClassName={getClassname} />
      </SidebarFooter>
    </Sidebar>
  );
}
